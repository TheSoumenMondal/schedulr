import SettingsForm from "@/components/custom/settings-form";
import { CheckAuth } from "@/hooks/check-auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });
  if (!data) {
    return notFound();
  }

  return data;
}

const page = async () => {
  const session = await CheckAuth();
  const data = await getData(session.user?.id as string);

  return (
    <div>
      <SettingsForm
        fullName={data.name as string}
        email={data.email}
        profileImage={data.image as string}
      />
    </div>
  );
};

export default page;
