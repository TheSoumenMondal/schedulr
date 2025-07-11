import EmptyState from "@/components/custom/empty-state";
import { CheckAuth } from "@/hooks/check-auth";
import { prisma } from "@/lib/prisma";
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
        <p>This are the event types</p>
      )}
    </>
  );
}
