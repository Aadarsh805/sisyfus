import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";
import { ConnectWalletButton } from "./wallet-connect/ConnectWalletButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const DepositTab = () => {
  const { isConnected } = useAccount();

  return (
    <div className="w-full p-16 rounded-lg bg-white text-black flex flex-col items-center justify-between gap-8">
      <h3 className="font-bold text-center w-full">Deposit</h3>
      {isConnected ? (
        <Link
          href="https://citrea.xyz/bridge"
          target="_blank"
          className={cn(buttonVariants({}), "bg-accent")}
        >
          Deposit
        </Link>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
