"use server";

import { CheckAuth } from "@/hooks/check-auth";
import { prisma } from "./prisma";
import {
  onboardingSchemaUsernameValidation,
  settingsSchema,
} from "./zodSchema";
import { redirect } from "next/navigation";

export async function OnboardingAction(_: any, data: unknown) {
  const session = await CheckAuth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { username: true },
  });

  if (existingUser?.username) {
    redirect("/dashboard");
  }

  const isUsernameUnique = async () => {
    const parsedData = data as { username?: string };
    if (!parsedData.username) return false;
    const existingUsername = await prisma.user.findUnique({
      where: { username: parsedData.username },
    });
    return !existingUsername;
  };

  const schema = onboardingSchemaUsernameValidation({ isUsernameUnique });
  const result = await schema.safeParseAsync(data);

  if (!result.success) {
    return {
      status: "error",
      message: "Username is not available",
      errors: result.error.message,
    };
  }

  const { fullName, username } = result.data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: fullName,
      username,
      availability: {
        createMany: {
          data: [
            { day: "Monday", fromTime: "08:00", tillTime: "19:00" },
            { day: "Tuesday", fromTime: "08:00", tillTime: "19:00" },
            { day: "Wednesday", fromTime: "08:00", tillTime: "19:00" },
            { day: "Thursday", fromTime: "08:00", tillTime: "19:00" },
            { day: "Friday", fromTime: "08:00", tillTime: "19:00" },
            { day: "Saturday", fromTime: "10:00", tillTime: "19:00" },
            { day: "Sunday", fromTime: "10:00", tillTime: "19:00" },
          ],
        },
      },
    },
  });

  redirect("/onboarding/grant-permission");
}

export async function SettingsActions(data: unknown) {
  const session = await CheckAuth();
  if (!session?.user?.id) {
    return {
      status: "error",
      message: "Unauthorized",
    };
  }

  const result = settingsSchema.safeParse(data);

  if (!result.success) {
    return {
      status: "error",
      message: "Invalid Submission",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { fullName, profileImage } = result.data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: fullName,
      image: profileImage,
    },
  });

  return { status: "success" };
}
