import EmptyState from "@/components/custom/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckAuth } from "@/hooks/check-auth";
import { nylas } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { cancelMeetingAction } from "@/lib/actions";
import {
  IconVideoFilled,
  IconCalendar,
  IconClock,
  IconUsers,
} from "@tabler/icons-react";
import {
  format,
  fromUnixTime,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";
import React from "react";
import { CancelMeetingButton } from "@/components/custom/CancelMeetingButton";

const getData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { grantId: true, grantEmail: true },
  });

  if (!user) throw new Error("User not found");

  const events = await nylas.events.list({
    identifier: user.grantId!,
    queryParams: { calendarId: user.grantEmail! },
  });

  return events;
};

const formatDateLabel = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEE, dd MMM");
};

const getTimeUntilMeeting = (timestamp: number) => {
  const now = new Date();
  const meetingTime = fromUnixTime(timestamp);
  const diff = Math.floor(
    (meetingTime.getTime() - now.getTime()) / (1000 * 60)
  );

  if (diff < 0) return "Past";
  if (diff < 60) return `${diff}m`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h`;
  return `${Math.floor(diff / 1440)}d`;
};

const page = async () => {
  const session = await CheckAuth();
  const data = await getData(session.user?.id!);
  // @ts-ignore
  const meetings = data.data.sort(
     // @ts-ignore
    (a, b) => a.when.startTime - b.when.startTime
  );

  if (!meetings.length) {
    return (
      <EmptyState
        title="No meetings found"
        description="You don't have any meetings scheduled."
        buttonText="Create a new"
        href="/dashboard/new"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Meetings</h1>
        <p className="text-muted-foreground">
          {meetings.length} meeting{meetings.length !== 1 && "s"} scheduled
        </p>
      </div>

      <div className="grid gap-4">
        {meetings.map((item) => {
          // @ts-ignore
          const start = fromUnixTime(item.when.startTime);
          // @ts-ignore
          const end = fromUnixTime(item.when.endTime);
          const isUpcoming = start > new Date();
          // @ts-ignore
          const timeUntil = getTimeUntilMeeting(item.when.startTime);

          return (
            <Card key={item.id} className={`transition-all hover:shadow-md`}>
              <CardContent className="p-6">
                <form action={cancelMeetingAction}>
                  <input type="hidden" name="eventId" value={item.id} />

                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    {/* Time & Meta */}
                    <div className="space-y-2 min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <IconCalendar className="size-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {
                            // @ts-ignore
                            formatDateLabel(item.when.startTime)
                          }
                        </span>
                        {isUpcoming && timeUntil !== "Past" && (
                          <Badge variant="secondary" className="text-xs">
                            {timeUntil}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <IconClock className="size-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {format(start, "hh:mm a")} – {format(end, "hh:mm a")}
                        </span>
                      </div>

                      {
                        // @ts-ignore
                        item.conferencing?.details?.url && (
                          <div className="flex items-center gap-2">
                            <IconVideoFilled className="size-4 text-primary" />
                            <a
                              // @ts-ignore
                              href={item.conferencing.details.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              Join Meeting
                            </a>
                          </div>
                        )
                      }
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1 space-y-2 min-w-[220px]">
                      <h3 className="font-semibold text-lg">
                        {item.title || "Untitled Meeting"}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <IconUsers className="size-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          You
                          {item.participants?.[0]?.name
                            ? ` and ${item.participants[0].name}`
                            : ""}
                          {item.participants?.length > 1 &&
                            ` +${item.participants.length - 1} others`}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 items-end min-w-fit">
                      {!isUpcoming && (
                        <Badge variant="outline" className="text-xs">
                          Completed
                        </Badge>
                      )}
                      <CancelMeetingButton />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default page;
