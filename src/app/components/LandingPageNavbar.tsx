import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/sisyphus-logo.png";

export const LandingPageNavbar = () => {
  return (
    <div className="py-6 px-32 flex items-center justify-between w-full">
      {/* logo */}
      <div className="logo flex items-center gap-2">
        <Image
          src={logo}
          alt="logo"
          className="w-10 aspect-1 border-[1px] border-accent rounded-full"
        />
        <div className="text-white text-lg font-bold">Sisyphus Protocol</div>
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