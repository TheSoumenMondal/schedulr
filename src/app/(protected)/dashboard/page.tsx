import EmptyState from "@/components/custom/empty-state";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { CheckAuth } from "@/hooks/check-auth";
import { prisma } from "@/lib/prisma";
import {
  IconCopy,
  IconExternalLink,
  IconPencil,
  IconSettings2,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      events: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function Home() {
  const session = await CheckAuth();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.events.length === 0 ? (
        <EmptyState
          title="No Events Found"
          description="Looks like you don't have any events yet."
          buttonText="Create Event"
          href="/dashboard/new"
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden sm:grid gap-y-1">
              <h1 className="text-xl font-bold">Events</h1>
              <p className="text-muted-foreground font-semibold text-sm">
                Create and manage your events
              </p>
            </div>
            <Link href={"/dashboard/new"}>
              <Button variant="outline">Create Event</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {data.events.map((event, index) => (
              <div
                key={event.id || index}
                className="bg-card rounded-lg shadow overflow-hidden relative"
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full border-none bg-card hover:bg-card dark:bg-card dark:hover:bg-card"
                      >
                        <IconSettings2 />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link target="blank" href={`/${data.username}/${event.url}`}>
                            <IconExternalLink />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconCopy />
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconPencil />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <IconTrash />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href={"/"} className="flex items-center p-5">
                  <div className="shrink-0">
                    <IconUser />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {event.duration}
                      </dt>
                      <dd className="text-lg font-medium">{event.title}</dd>
                    </dl>
                  </div>
                </Link>

                <div className="bg-muted px-5 py-3 items-center flex justify-between">
                  <Switch />
                  <Button>Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
