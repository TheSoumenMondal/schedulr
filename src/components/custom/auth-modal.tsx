"use client";

import React from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Variants, Transition } from "motion/react";
import { SignInWith } from "./signin-auth-provider";

const AuthModal = () => {
  const customVariants: Variants = {
    initial: {
      scale: 0.9,
      filter: "blur(10px)",
      y: "100%",
    },
    animate: {
      scale: 1,
      filter: "blur(0px)",
      y: 0,
    },
  };

  const customTransition: Transition = {
    type: "spring",
    bounce: 0,
    duration: 0.4,
  };

  return (
    <Dialog variants={customVariants} transition={customTransition}>
      <DialogTrigger className="bg-primary text-background px-3 py-2 rounded-lg text-[12px] font-semibold hover:bg-primary/90 cursor-pointer">
        Try Now
      </DialogTrigger>
      <DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-white text-xl font-bold text-center w-full">
            schedulr
          </DialogTitle>
          <DialogDescription className="text-xs w-full text-center">
            Please sign in to continue
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col space-y-2">
          <SignInWith provider={"google"} icon="./google.svg" />
          <SignInWith provider={"github"} icon="./github.svg" />
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
