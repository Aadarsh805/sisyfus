"use client";

import { LandingPageNavbar } from "../app/components/LandingPageNavbar";
import { Button, buttonVariants } from "../app/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="h-screen flex flex-col  w-full bg-[url('../../public/bg.svg')] bg-cover bg-center bg-no-repeat">
      <LandingPageNavbar />
      <motion.div
        initial={{ opacity: 0, y: 400 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          ease: "linear",
          duration: 0.5,
        }}
        className="flex flex-col justify-center items-center w-full h-[calc(100vh-12rem)] gap-6"
      >
        <h1 className="text-center text-[5rem] leading-none text-white font-bold tracking-tighter">
          Rolling <span className="text-accent">Bitcoin</span> Privacy
          <br />
          Forward with Untraceable
          <br />
          Stealth Addresses on <span className="text-accent">Citrea</span>
          <br />
        </h1>
        <p className="text-base text-white opacity-50 font-bold text-center max-w-[50rem]">
          Sisyfus, rolling Bitcoin privacy forward with programmable stealth
          addresses on Citrea. Cheap and native Bitcoin stealth address achieved
          through verifieble off-chain cryptography.
        </p>
        <div className="flex items-center gap-8">
          <Link
            href="https://github.com/leostelon/sisyfus"
            className={cn(
              buttonVariants({ size: "lg" }),
              " text-white font-bold"
            )}
            target="_blank"
          >
            Learn more
          </Link>
          <Link
            href="/app"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-white font-bold"
            )}
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
