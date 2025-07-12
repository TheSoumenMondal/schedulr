import AvailabilityForm from "@/components/custom/AvailabilityForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckAuth } from "@/hooks/check-auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

const week_order: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

async function getData(id: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: id,
    },
  });
  if (!data) return notFound();
  return data.sort((a, b) => week_order[a.day] - week_order[b.day]);
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
      <AvailabilityForm data={data} />
    </Card>
  );
};

export default Page;
