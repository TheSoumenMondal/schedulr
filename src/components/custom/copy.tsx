'use client';

import { IconCopy } from "@tabler/icons-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

export function CopyLink(url: { url: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url.url);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <IconCopy />
      Copy
    </DropdownMenuItem>
  );
}
