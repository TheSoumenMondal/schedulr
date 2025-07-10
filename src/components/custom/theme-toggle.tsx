'use client'

import { cn } from "@/lib/utils";
import { IconBrightness } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React from "react";

const ToggleTheme = ({ className }: { className?: string }) => {
  const { setTheme } = useTheme();
  const handleSetTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  return (
    <IconBrightness
      onClick={handleSetTheme}
      className={cn("w-4 h-4", className)}
    />
  );
};

export default ToggleTheme;
