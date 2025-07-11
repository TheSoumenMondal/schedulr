// lib/zodSchema.ts
import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name is too long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(100, "Username is too long")
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username can only contain letters and numbers",
    }),
});

export function onboardingSchemaUsernameValidation(option?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(100, "Username is too long")
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Username can only contain letters and numbers",
      })
      .refine(
        async (username) => {
          if (typeof option?.isUsernameUnique === "function") {
            try {
              const isUnique = await option.isUsernameUnique();
              return isUnique;
            } catch (error) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Username is already taken",
        }
      ),
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(100, "Full name is too long"),
  });
}

export const settingsSchema = z.object({
  fullName: z.string().min(3).max(100),
  profileImage: z.string(),
});

export const eventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  duration: z.number().min(15).max(60),
  url: z.string().min(3).max(150),
  description: z.string().min(3).max(350),
  videoCallSoftware: z.string().min(3),
});
