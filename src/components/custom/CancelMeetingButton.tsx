"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { IconTrash, IconLoader3 } from "@tabler/icons-react";
import React from "react";

export function CancelMeetingButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" variant="destructive" type="submit" disabled={pending}>
      {pending ? (
        <IconLoader3 className="size-4 mr-1 animate-spin" />
      ) : (
        <IconTrash className="size-4 mr-1" />
      )}
      {pending ? "Deleting..." : "Cancel"}
    </Button>
  );
}
