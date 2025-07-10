"use client";

import Link from "next/link";
import React from "react";
import ToggleTheme from "./theme-toggle";
import AuthModal from "./auth-modal";

const Navbar = () => {
  return (
    <div className="w-full py-5 flex items-center justify-between select-none">
      <Link href={"/"} className="text-sm font-bold">schedulr</Link>
      <div className="flex gap-3 items-center">
        <ToggleTheme className="cursor-pointer" />
        <AuthModal/>
      </div>
    </div>
  );
};

export default Navbar;
