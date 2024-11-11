import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const LandingPageNavbar = () => {
  return (
    <div className="py-6 px-32 flex items-center justify-between w-full">
      {/* logo */}
      <div className="logo flex items-center gap-2">
        <div className="w-6 h-6 bg-accent rounded-full"></div>
        <div className="text-white text-lg">BitcoinHack</div>
      </div>
      {/* navlinks */}
      <div className="flex gap-4 items-center justify-between">
        <div className="text-white text-sm font-light">Home</div>
        <div className="text-white text-sm font-light">About</div>
        <div className="text-white text-sm font-light">Product</div>
        <div className="text-white text-sm font-light">Contact</div>
      </div>
      {/* cta */}
      <Link
        href="/app"
        className={cn(buttonVariants({}), "bg-accent text-white font-bold")}
      >
        Launch App
      </Link>
    </div>
  );
};
