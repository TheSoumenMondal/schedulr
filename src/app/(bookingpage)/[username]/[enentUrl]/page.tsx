import { Calendar } from "@/components/custom/booking/calendar";
import { RenderCalendar } from "@/components/custom/booking/render-calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  params: {
    username: string;
    eventUrl: string;
  };
  searchParams: { date?: string };
}) {
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  const data = await fetchData(params.eventUrl, params.username);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
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
            <p className="text-sm text-muted-foreground">{data.description}</p>

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

          {/* Separator */}
          <div className="col-start-2 flex justify-center h-full">
            <Separator
              orientation="vertical"
              className="h-full w-px bg-muted-foreground/30"
            />
          </div>

          {/* Right: Calendar */}
          <div className="col-start-3">
            <RenderCalendar availability={data.User?.availability as any} />
          </div>

          {/* Separator */}
          <div className="col-start-4 flex justify-center h-full">
            <Separator
              orientation="vertical"
              className="h-full w-px bg-muted-foreground/30"
            />
          </div>

          <div className="col-start-5">
            will be implemented later
          </div>

          {/* Right: Time Select Component  */}
        </CardContent>
      </Card>
    </div>
  );
}
