import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../../../public/sisyphus-logo.png";
import Image from "next/image";

export const AppNavbar = () => {
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

      {/* cta */}
      <ConnectButton />
    </div>
  );
};