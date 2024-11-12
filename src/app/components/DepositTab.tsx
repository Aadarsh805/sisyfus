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
    <div className="w-full h-full p-8 rounded-lg bg-white text-black flex flex-col items-center justify-between gap-4">
      <h3 className="font-extrabold text-center w-full">Deposit</h3>

      <p className="text-sm text-black opacity-70 max-w-[50rem]">
        Deposits are currently managed by <Link href='https://citrex.xyz/' target="_blank" className="underline text-accent">Citrex</Link>, a third-party bridge.
        Alternatively, you can use the <Link href='https://citrea.xyz/faucet' target="_blank" className="underline text-accent">Citrea faucets</Link> to claim testnet funds for
        testing purposes. Simply click the button below to claim your testnet
        funds.
      </p>

      <p className="text-sm text-black opacity-70 max-w-[50rem]">
        Simply click the button below to claim your testnet funds.
      </p>

      <Link
        href="https://citrea.xyz/bridge"
        target="_blank"
        className={cn(buttonVariants({}), "bg-accent w-full")}
      >
        Deposit
      </Link>
    </div>
  );
};
