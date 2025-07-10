"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { onboardingSchema } from "@/lib/zodSchema";
import { OnboardingAction } from "@/lib/actions";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconChevronRight, IconLoader3 } from "@tabler/icons-react";
import { toast } from "sonner";

type OnboardingInput = z.infer<typeof onboardingSchema>;

export default function OnboardingRoute() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onSubmit = (data: OnboardingInput) => {
    startTransition(async () => {
      const result = await OnboardingAction(undefined, data);

      if (result?.status === "success") {
        toast.success("Success", {
          description: "Your profile has been updated.",
        });

        router.push("/dashboard");
      } else {
        toast.error("Error", {
          description: result?.message ?? "Please try again later.",
        });
      }
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="min-w-sm w-md">
        <CardHeader>
          <CardTitle>Welcome to schedulr</CardTitle>
          <CardDescription>
            Get started by setting up your profile and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-4 flex flex-col"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex rounded-md shadow-sm">
                <span className="border-input bg-background/20 inline-flex items-center rounded-s-md border px-3 text-sm">
                  {process.env.NEXT_PUBLIC_BASE_URL ?? ""}
                </span>
                <Input
                  id="username"
                  placeholder="johndoe"
                  className="-ms-px rounded-s-none ring-0 focus:ring-0 focus:ring-offset-0 focus:outline-0 focus:border-0 focus-visible:ring-0"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="rounded-lg mt-4 gap-1 hover:gap-2"
            >
              {isPending ? (
                <>
                  Please wait <IconLoader3 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  Continue <IconChevronRight />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
