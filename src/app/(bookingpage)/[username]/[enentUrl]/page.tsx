import { RenderCalendar } from "@/components/custom/booking/render-calendar";
import { TimeTable } from "@/components/custom/booking/time-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createMeetingAction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { IconCalendar, IconClock, IconVideoFilled } from "@tabler/icons-react";
import { notFound } from "next/navigation";

async function fetchData(eventUrl: string, userName: string) {
  const data = await prisma.event.findFirst({
    where: {
      url: eventUrl,
      User: {
        username: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      VideoCallingApp: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params: Promise<{
    username: string;
    eventUrl: string;
  }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const selectedDate = resolvedSearchParams?.date
    ? new Date(resolvedSearchParams.date)
    : new Date();

  const { username, eventUrl } = resolvedParams;

  const data = await fetchData(eventUrl, username);
  const showForm = !!resolvedSearchParams?.date && !!resolvedSearchParams?.time;

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px]  w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] items-start gap-6">
            <div className="col-start-1 select-none">
              <img
                src={(data.User?.image as string) || "/placeholder.png"}
                alt="profile image"
                className="size-9 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-lg font-semibold">{data.title}</h1>
              <p className="text-sm text-muted-foreground">
                {data.description}
              </p>
              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <IconCalendar className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p className="flex items-center">
                  <IconClock className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <IconVideoFilled className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.VideoCallingApp}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-start-2 flex justify-center h-full">
              <Separator
                orientation="vertical"
                className="h-full w-px bg-muted-foreground/30"
              />
            </div>
            <form
              action={createMeetingAction}
              className="col-start-3 flex flex-col gap-y-4"
            >
              <p className="text-xl font-bold">Event Booking Form </p>
              <input
                type="hidden"
                name="fromTime"
                value={resolvedSearchParams.time}
              />
              <input
                type="hidden"
                name="eventDate"
                value={resolvedSearchParams.date}
              />
              <input type="hidden" name="meetingLength" value={data.duration} />
              <input
                type="hidden"
                name="provider"
                value={data.VideoCallingApp}
              />
              <input
                type="hidden"
                name="username"
                value={resolvedParams.username}
              />
              <input type="hidden" name="eventTypeId" value={data.id} />

              <div className="flex flex-col gap-y-2">
                <Label>Name</Label>
                <Input name="name" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input name="email" placeholder="email@example.com" />
              </div>
              <Button className="mt-5 w-full" type="submit">
                Book Meeting{" "}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-4xl w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] items-start gap-6">
            <div className="col-start-1 select-none">
              <img
                src={(data.User?.image as string) || "/placeholder.png"}
                alt="profile image"
                className="size-9 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-lg font-semibold">{data.title}</h1>
              <p className="text-sm text-muted-foreground">
                {data.description}
              </p>
              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <IconCalendar className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p className="flex items-center">
                  <IconClock className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <IconVideoFilled className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.VideoCallingApp}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-start-2 flex justify-center h-full">
              <Separator
                orientation="vertical"
                className="h-full w-px bg-muted-foreground/30"
              />
            </div>
            <div className="col-start-3">
              <RenderCalendar availability={data.User?.availability as any} />
            </div>
            <div className="col-start-4 flex justify-center h-full">
              <Separator
                orientation="vertical"
                className="h-full w-px bg-muted-foreground/30"
              />
            </div>
            <div className="col-start-5">
              <TimeTable
                duration={data.duration}
                selectedDate={selectedDate}
                username={username}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
