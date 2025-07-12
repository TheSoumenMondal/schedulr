"use client";

import { Switch } from "../ui/switch";
import { ToggleEventActive } from "@/lib/actions";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

export function MenuActiveSwitch({
  initialChecked,
  eventId,
}: {
  initialChecked: boolean;
  eventId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(ToggleEventActive, undefined);
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      className="cursor-pointer"
      disabled={isPending}
      defaultChecked={initialChecked}
      onCheckedChange={(checked) => {
        startTransition(() => {
          action({ eventId, isActive: checked });
        });
      }}
    />
  );
}
