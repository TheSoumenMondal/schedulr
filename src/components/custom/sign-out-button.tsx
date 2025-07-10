"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export function SignOut() {
  return (
    <Button
      variant={"outline"}
      className="w-full flex items-start justify-start"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
