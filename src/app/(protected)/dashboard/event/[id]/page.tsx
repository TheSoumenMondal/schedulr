import { VideoCallProviders } from "@/components/custom/button-group";
import { EditEventForm } from "@/components/custom/edit-event-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function fetchData(eventId: string) {
  const data = await prisma.event.findUnique({
    where: { id: eventId },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      VideoCallingApp: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { id: Promise<string> };
}) {
  const eventId = await params.id;
  const data = await fetchData(eventId);
  return (
    <EditEventForm
      id={data.id}
      title={data.title}
      description={data.description}
      url={data.url}
      duration={data.duration}
      videoCallSoftware={data.VideoCallingApp as VideoCallProviders}
    />
  );
}
