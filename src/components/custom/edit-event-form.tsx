"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { EditEventTypeAction } from "@/lib/actions";
import { eventTypeSchema } from "@/lib/zodSchema";
import { IconLoader3, IconCheck } from "@tabler/icons-react";
import ButtonGroups, {
  VideoCallProviders,
} from "@/components/custom/button-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import z from "zod";

type FormData = z.infer<typeof eventTypeSchema>;

interface EditEventFormProps {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  videoCallSoftware: VideoCallProviders;
}

export function EditEventForm({
  id,
  title,
  description,
  url,
  duration,
  videoCallSoftware,
}: EditEventFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { title, url, description, duration, videoCallSoftware },
  });

  const onSubmit = async (data: FormData) => {
    await EditEventTypeAction(data, id);
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Edit Your Appointment</CardTitle>
          <CardDescription>
            Update your appointment details below.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="30 minute meeting"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* URL */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="url">URL</Label>
              <div className="flex w-full">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                  {process.env.NEXT_PUBLIC_BASE_URL}
                </span>
                <Input
                  id="url"
                  placeholder="example-url-30minute"
                  className="rounded-l-none"
                  {...register("url", { required: "URL slug is required" })}
                />
              </div>
              {errors.url && (
                <p className="text-sm text-red-500">{errors.url.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Let's catch up in the meeting."
                {...register("description")}
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label>Duration of Meeting</Label>
              <Controller
                name="duration"
                control={control}
                rules={{ required: "Please select a duration" }}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={String(field.value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectGroup>
                        <SelectLabel>Duration</SelectLabel>
                        {[15, 30, 45, 60].map((min) => (
                          <SelectItem key={min} value={min.toString()}>
                            {min === 60 ? "1 hour" : `${min} minutes`}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.duration && (
                <p className="text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Video Call Software */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label>Video Call Software</Label>
              <Controller
                name="videoCallSoftware"
                control={control}
                rules={{ required: "Please pick a provider" }}
                render={({ field }) => (
                  <ButtonGroups
                    value={field.value as VideoCallProviders}
                    onChange={(val: VideoCallProviders) => field.onChange(val)}
                  />
                )}
              />
              {errors.videoCallSoftware && (
                <p className="text-sm text-red-500">
                  {errors.videoCallSoftware.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-2 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              asChild
              type="button"
              size="sm"
              variant="destructive"
              className="w-full"
            >
              <a href="/dashboard">Cancel</a>
            </Button>
            <Button
              type="submit"
              size="sm"
              variant="default"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  Updating <IconLoader3 className="animate-spin w-4 h-4" />
                </>
              ) : (
                <>
                  Update Event <IconCheck className="w-4 h-4 rounded-full" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
