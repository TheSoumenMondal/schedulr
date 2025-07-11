"use client";

import { Button } from "@/components/ui/button";

export type VideoCallProviders =
  | "Zoom Meeting"
  | "Google Meet"
  | "Microsoft Teams";

export interface ButtonGroupsProps {
  value?: VideoCallProviders;
  onChange: (val: VideoCallProviders) => void;
}

const ButtonGroups: React.FC<ButtonGroupsProps> = ({ value, onChange }) => {
  const platforms: VideoCallProviders[] = [
    "Zoom Meeting",
    "Google Meet",
    "Microsoft Teams",
  ];

  return (
    <div className="flex w-full gap-2 divide-x rounded-md divide-primary-foreground/30 shadow-xs">
      {platforms.map((platform, idx) => (
        <Button
          key={platform}
          type="button"
          onClick={() => onChange(platform)}
          variant={value === platform ? "default" : "outline"}
          className={`flex-1 relative overflow-hidden rounded-none ${
            idx === 0 ? "rounded-l-md" : ""
          } ${idx === platforms.length - 1 ? "rounded-r-md" : ""} before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] focus-visible:z-10 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]`}
        >
          {platform}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroups;
