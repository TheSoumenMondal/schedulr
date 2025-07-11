"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export type VideoCallProviders =
  | "Zoom Meeting"
  | "Google Meet"
  | "Microsoft Teams";

const ButtonGroups = () => {
  const [activePlatform, setActivePlatform] = useState<VideoCallProviders>();

  return (
    <div className="divide-primary-foreground/30 divide-x rounded-md shadow-xs w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
      <Button
        type="button"
        onClick={() => setActivePlatform("Zoom Meeting")}
        variant={activePlatform === "Zoom Meeting" ? "default" : "outline"}
        className="relative overflow-hidden  shadow-none before:absolute before:inset-0  before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] focus-visible:z-10 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)] "
      >
        Zoom Meeting
      </Button>
      <Button
        type="button"
        onClick={() => setActivePlatform("Google Meet")}
        variant={activePlatform === "Google Meet" ? "default" : "outline"}
        className="relative overflow-hidden before:absolute before:inset-0  before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] focus-visible:z-10 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]"
      >
        Google Meet
      </Button>
      <Button
        type="button"
        onClick={() => setActivePlatform("Microsoft Teams")}
        variant={activePlatform === "Microsoft Teams" ? "default" : "outline"}
        className="relative overflow-hidden  shadow-none before:absolute before:inset-0  before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] focus-visible:z-10 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]"
      >
        Microsoft Teams
      </Button>
    </div>
  );
};

export default ButtonGroups;
