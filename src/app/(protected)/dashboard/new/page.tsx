"use client";

import ButtonGroups from "@/components/custom/button-group";
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
import Link from "next/link";
import React from "react";

const NewPage = () => {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Add New Appointment</CardTitle>
          <CardDescription>
            Create a new appointment type that allows people to book you.
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="30 minute meeting" />
            </div>

            {/* URL */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="url">URL</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                  {process.env.NEXT_PUBLIC_BASE_URL}
                </span>
                <Input
                  id="url"
                  placeholder="example-url-30minute"
                  className="rounded-l-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Let's catch up in the meeting."
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label>Duration of Meeting</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <ButtonGroups />
          </CardContent>
          <CardFooter className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link href={"/dashboard"}>
              <Button
                type="button"
                size={"sm"}
                variant={"destructive"}
                className="w-full"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              size={"sm"}
              variant={"secondary"}
              className="w-full"
            >
              Create Event
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewPage;
