"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";

import ButtonGroups, {
  VideoCallProviders,
} from "@/components/custom/button-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { CreateEventTypeAction } from "@/lib/actions";
import { eventTypeSchema } from "@/lib/zodSchema";
import { IconLoader3, IconPlus } from "@tabler/icons-react";

type FormData = z.infer<typeof eventTypeSchema>;

const NewPage: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      url: "",
      description: "",
      duration: 30,
      videoCallSoftware: "Google Meet",
    },
  });

  const onSubmit = async (data: FormData) => {
    const res = await CreateEventTypeAction(data);
    console.log(res);
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Add New Appointment</CardTitle>
          <CardDescription>
            Create a new appointment type that allows people to book you.
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
                  {...register("url", {
                    required: "URL slug is required",
                  })}
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
                control={control}
                name="duration"
                rules={{ required: "Please select a duration" }}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value?.toString()}
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
                control={control}
                name="videoCallSoftware"
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
                  Creating <IconLoader3 className="animate-spin w-4 h-4" />{" "}
                </>
              ) : (
                <>
                  Create Event <IconPlus className="w-4 h-4 rounded-full  " />{" "}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewPage;
