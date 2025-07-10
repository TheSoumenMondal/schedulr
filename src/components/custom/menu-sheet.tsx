"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignOut } from "./sign-out-button";

interface IAppProps {
  id: number;
  name: string;
  link: string;
}

const NavLinks: IAppProps[] = [
  { id: 1, name: "Events", link: "/" },
  { id: 2, name: "Meetings", link: "/meetings" },
  { id: 3, name: "Availability", link: "/availability" },
  { id: 4, name: "Settings", link: "/settings" },
];

const MenuSheet = () => {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">Menu</Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="max-w-4xl w-full mx-auto rounded-b-lg dark:bg-transparent backdrop-blur-2xl"
      >
        <SheetHeader>
          <SheetTitle className="mt-4 text-xl mb-2 font-bold text-center">
            schedulr
          </SheetTitle>
          <SheetDescription className="grid grid-cols-1 gap-3">
            {NavLinks.map((link) => (
              <SheetClose asChild key={link.id}>
                <Link href={`/dashboard${link.link}`} passHref>
                  <Button
                    asChild
                    variant={
                      pathName === `/dashboard${link.link}` ||
                      (link.link === "/" && pathName === "/dashboard")
                        ? "secondary"
                        : "outline"
                    }
                    className={cn("gap-2 w-full justify-start")}
                  >
                    <span>{link.name}</span>
                  </Button>
                </Link>
              </SheetClose>
            ))}

            <SheetClose asChild>
              <SignOut />
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant="destructive"
                className="flex items-center gap-1 group"
              >
                <IconX className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-90" />
                Cancel
              </Button>
            </SheetClose>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
