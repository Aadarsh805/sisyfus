"use client";
import { AppTabs } from "../components/AppTabs";
import { AppNavbar } from "../components/AppNavbar";
import { useEffect, useState } from "react";
import { generateRandomStealthMetaAddress } from "@/utils/crypto";
import { REGISTRY_CONTRACT } from "@/constants";
import { abi as RegistryABI } from "../../contracts/Registry.json";
import { useEthersSigner } from "@/lib/useEthersSigner";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

export default function page() {
  const signer = useEthersSigner();

  const { isConnecting, isConnected } = useAccount();

  useEffect(() => {
    if (isConnecting || !isConnected) return;
    console.log(signer?.address);
    // 1. Check if local storage has stealth meta data
    let stealthMetaDataString = window.localStorage.getItem("stealthMetaData");

    // if (stealthMetaDataString) return;
    // 2. Create Stealth meta data
    const stealthMetaData = generateRandomStealthMetaAddress();

    // 3. Store the stealthMetaData address into contract
    const stealthMetaAddress = stealthMetaData[4];
    console.log(stealthMetaAddress);
    updateStealthAddress(stealthMetaAddress, stealthMetaData);

    // 4. Store the generated metadata into local db
    // Added inside updateStealthAddress
  }, [isConnecting, isConnected]);

  async function updateStealthAddress(
    stealthMetaAddress: string,
    stealthMetaData: string[]
  ) {
    try {
      const registryContract = new ethers.Contract(
        REGISTRY_CONTRACT,
        RegistryABI,
        signer
      );
      const tx = await registryContract.updateStealthMetaAddress(
        stealthMetaAddress,
        {}
      );
      console.log({ tx });
      await tx.wait();

      window.localStorage.setItem(
        "stealthMetaData",
        JSON.stringify({ data: stealthMetaData })
      );
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div className="h-screen flex flex-col  w-full bg-[url('../../public/bg.svg')] bg-cover bg-center bg-no-repeat">
      <AppNavbar />
      <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-16rem)] gap-6">
        <AppTabs />
      </div>
    </div>
  );
}
