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
    <div className="w-full h-full p-8 rounded-lg bg-white text-black flex flex-col items-center justify-between gap-8">
      <h3 className="font-extrabold text-center w-full">Deposit</h3>

      <p className="text-sm text-black opacity-30 max-w-[50rem]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        asperiores pariatur perferendis laboriosam sunt! Inventore enim saepe
      </p>

      <p className="text-sm text-black opacity-30 max-w-[50rem]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        asperiores pariatur perferendis laboriosam sunt! Inventore enim saepe
      </p>

      {isConnected ? (
        <Link
          href="https://citrea.xyz/bridge"
          target="_blank"
          className={cn(buttonVariants({}), "bg-accent w-full")}
        >
          Deposit
        </Link>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};