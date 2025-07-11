import { IconBan, IconChevronRight } from "@tabler/icons-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const EmptyState = ({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) => {
  return (
    <div className="w-full flex flex-col h-[calc(100vh_-_120px)] items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 space-y-3">
      <div className="flex items-center justify-center size-16 rounded-full bg-primary/20">
        <IconBan className="size-8" />
      </div>
      <h1 className="text-lg font-semibold">{title}</h1>
      <h5 className="text-xs max-w-xs text-center flex-wrap text-muted-foreground">{description}</h5>
      <Link href={href}>
        <Button className="gap-0 hover:gap-2 transition-transform duration-200">
          {buttonText} <IconChevronRight />{" "}
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
