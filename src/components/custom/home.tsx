"use client";

import { IconCalendar } from "@tabler/icons-react";
import { Button } from "../ui/button";
import AuthModal from "./auth-modal";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative w-full h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden px-4 ">
      <motion.div
        className="absolute top-1/3 left-[10%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-yellow-400 to-rose-500 opacity-20 blur-2xl"
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -15, 25, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative z-10 backdrop-blur-xl rounded-3xl p-10 flex flex-col items-center space-y-6 max-w-xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            className="rounded-full text-xs group"
            variant="outline"
            size="sm"
          >
            <IconCalendar className="text-primary group-hover:-rotate-12 transition-transform duration-300" />
            <span className="ml-2">Manage your meetings effortlessly</span>
          </Button>
        </motion.div>

        <motion.h1
          className="text-3xl md:text-5xl font-serif font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          The better way to schedule your meetings
        </motion.h1>

        <motion.p
          className="max-w-md text-sm text-center "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          schedulr helps you sync calendars, manage availability, and share
          booking links—all in one place. Designed for professionals who value
          time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <AuthModal />
        </motion.div>
      </motion.div>
    </div>
  );
}
