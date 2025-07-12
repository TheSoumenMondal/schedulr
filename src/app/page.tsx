"use client";

import HomePage from "@/components/custom/home";
import Navbar from "@/components/custom/navbar";
import { IconLoader3 } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <IconLoader3 className="animate-spin" />
      </div>
    );
  }

  if (status === "authenticated" && session.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-4 lg:px-8">
      <Navbar />
      <HomePage />
    </div>
  );
}
