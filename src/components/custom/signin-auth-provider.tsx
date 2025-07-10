"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { ProviderId } from "next-auth/providers";
import { useState } from "react";
import { toast } from "sonner";
import { IconLoader3 } from "@tabler/icons-react";
import Image from "next/image";

export function SignInWith({
  provider,
  icon,
}: {
  provider: ProviderId;
  icon?: string;
}) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSignIn = async () => {
    try {
      setSubmitting(true);
      await signIn(provider);
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong,please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Button disabled={submitting} className="w-full" onClick={handleSignIn}>
      {submitting ? (
        <>
          <IconLoader3 className="w-4 h-4 animate-spin" />
        </>
      ) : (
        <>
          {icon && <Image src={icon} alt="logo" width={25} height={25} />}
          Sign In with {provider}
        </>
      )}
    </Button>
  );
}
