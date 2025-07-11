import MenuSheet from "@/components/custom/menu-sheet";
import ToggleTheme from "@/components/custom/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckAuth } from "@/hooks/check-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function checkHasUserName(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: { username: true, grantId: true },
  });
  if (!data?.username) {
    return redirect("/onboarding");
  }

  if (!data.grantId) {
    return redirect("/onboarding/grant-permission");
  }
}

const Layout = async ({ children }: Props) => {
  const session = await CheckAuth();
  await checkHasUserName(session.user?.id as string);

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="relative w-full max-w-4xl px-4 sm:px-4 lg:px-8 flex flex-col">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-50 bg-background py-5 flex items-center justify-between select-none">
          <p className="text-sm font-bold">schedulr</p>
          <div className="flex gap-3 items-center">
            <ToggleTheme className="cursor-pointer" />
            <MenuSheet />
            <Avatar>
              <AvatarImage
                src={session?.user?.image || "placeholder.png"}
                alt={(session?.user?.name as string) || "logo"}
              />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Page content */}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
