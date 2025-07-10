"use client";

import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { settingsSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { SettingsActions } from "@/lib/actions";
import { toast } from "sonner";
import { IconLoader3, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";

interface IUserProps {
  fullName: string;
  email: string;
  profileImage: string;
}

type SettingsInput = z.infer<typeof settingsSchema>;

const SettingsForm = ({ fullName, email, profileImage }: IUserProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName,
      profileImage,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [currentProfileImage, setCurrentProfileImage] =
    React.useState(profileImage);
  const router = useRouter();

  const onSubmit = (data: SettingsInput) => {
    startTransition(async () => {
      const formData = {
        ...data,
        profileImage: currentProfileImage,
      };

      const result = await SettingsActions(formData);
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

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
    setValue("profileImage", "");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your profile from here</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input disabled defaultValue={email} type="email" />
          </div>
          <div className="flex flex-col gap-6">
            <Label htmlFor="profileImage">Profile Image</Label>

            {currentProfileImage ? (
              <div className="relative w-16 h-16">
                <img
                  src={currentProfileImage}
                  alt="Profile Image"
                  className="rounded-lg w-16 h-16 object-cover"
                />
                <Button
                  onClick={handleDeleteImage}
                  className="absolute -top-2 -right-2 w-5 h-5 p-0"
                  variant="outline"
                  type="button"
                  size="sm"
                >
                  <IconX className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    console.log("Upload complete:", res);
                    const imageUrl = res[0].ufsUrl;
                    setCurrentProfileImage(imageUrl);
                    setValue("profileImage", imageUrl);
                    toast.success("Image uploaded successfully");
                  }
                }}
                onUploadError={(error) => {
                  console.error("Upload error:", error);
                  toast.error("Upload failed", {
                    description: error.message || "Please try again later.",
                  });
                }}
                endpoint="imageUploader"
                appearance={{
                  container: "w-full py-8",
                  uploadIcon: "h-40 w-40",
                  button:
                    "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm rounded-lg",
                  allowedContent: "text-muted-foreground",
                }}
              />
            )}

            {errors.profileImage && (
              <p className="text-sm text-red-500">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? (
              <>
                Saving <IconLoader3 className="w-4 h-4 animate-spin ml-2" />
              </>
            ) : (
              "Save"
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default SettingsForm;
