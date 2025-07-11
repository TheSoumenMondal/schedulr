"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { availabilityActions } from "@/lib/actions";
import { times } from "@/lib/times";
import { toast } from "sonner";
import { IconLoader3 } from "@tabler/icons-react";

type Props = {
  data: {
    id: string;
    day: string;
    fromTime: string;
    tillTime: string;
    isActive: boolean;
  }[];
};

export default function AvailabilityForm({ data }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await availabilityActions(formData);
        toast.success("Availability updated successfully!");
      } catch (error) {
        toast.error("Failed to update availability. Please try again.");
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            className="grid grid-cols-1 md:grid-cols-3 items-center gap-4"
          >
            <input type="hidden" name={`id-${item.id}`} value={item.id} />

            {/* Day + Toggle */}
            <div className="flex items-center gap-3">
              <Switch
                name={`isActive-${item.id}`}
                defaultChecked={item.isActive}
              />
              <span className="text-sm font-medium">{item.day}</span>
            </div>

            {/* From Time */}
            <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
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
            <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
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
        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {isPending ? (
            <>
              Updating <IconLoader3 className="animate-spin ml-2" />
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </form>
  );
}
