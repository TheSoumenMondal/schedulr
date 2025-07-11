"use server";

import { CheckAuth } from "@/hooks/check-auth";
import { prisma } from "./prisma";
import {
  eventTypeSchema,
  onboardingSchemaUsernameValidation,
  settingsSchema,
} from "./zodSchema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import z from "zod";

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

export const availabilityActions = async (formData: FormData) => {
  const session = await CheckAuth();

  const rawData = Object.fromEntries(formData.entries());

  const availabilityData = Object.keys(rawData)
    .filter((keys) => keys.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availability");
  } catch (error) {
    console.log(error);
  }
};

export async function CreateEventTypeAction(
  formData: z.infer<typeof eventTypeSchema>
) {
  const session = await CheckAuth();

  const submission = eventTypeSchema.safeParse(formData);

  if (!submission.success) {
    return { error: submission.error.flatten().fieldErrors };
  }

  console.log(submission);

  const { title, url, description, duration, videoCallSoftware } =
    submission.data;

  await prisma.event.create({
    data: {
      title,
      url,
      description,
      duration: Number(duration),
      VideoCallingApp: videoCallSoftware,
      userId: session.user?.id,
    },
  });

  return redirect("/dashboard");
}
