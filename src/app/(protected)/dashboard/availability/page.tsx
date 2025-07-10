import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CheckAuth } from "@/hooks/check-auth";
import { prisma } from "@/lib/prisma";
import { times } from "@/lib/tims";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: id,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

const Page = async () => {
  const session = await CheckAuth();
  const data = await getData(session.user?.id as string);

  return (
    <Card className="w-full max-w-4xl mx-auto px-4 bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Availability</CardTitle>
        <CardDescription className="mt-1 text-sm text-muted-foreground">
          Set your available slots for meetings. This helps others know when
          you&apos;re free.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 ">
        {data?.map((item, index) => (
          <div
            key={item.id || index}
            className="grid grid-cols-1 md:grid-cols-3 items-center gap-4"
          >
            {/* Day + Toggle */}
            <div className="flex items-center gap-3">
              <Switch defaultChecked={item.isActive} />
              <span className="text-sm font-medium">{item.day}</span>
            </div>

            {/* From Time */}
            <Select defaultValue={item.fromTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="From Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {times.map((time) => (
                    <SelectItem key={time.id} value={time.time}>
                      {time.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Till Time */}
            <Select defaultValue={item.tillTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Till Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {times.map((time) => (
                    <SelectItem key={time.id} value={time.time}>
                      {time.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default Page;
