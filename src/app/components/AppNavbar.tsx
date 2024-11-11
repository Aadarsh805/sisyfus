import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const AppNavbar = () => {
  return (
    <div className="py-6 px-32 flex items-center justify-between w-full">
      {/* logo */}
      <div className="logo flex items-center gap-2">
        <div className="w-6 h-6 bg-accent rounded-full"></div>
        <div className="text-white text-lg">BitcoinHack</div>
      </div>

      {/* cta */}
      <ConnectButton />
    </div>
  );
};
