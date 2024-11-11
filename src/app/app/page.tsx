"use client";
import { AppTabs } from "../components/AppTabs";
import { AppNavbar } from "../components/AppNavbar";
import { useEffect, useState } from "react";
import { generateRandomStealthMetaAddress } from "@/utils/crypto";
import { REGISTRY_CONTRACT } from "@/constants";
import { abi as RegistryABI } from "../../contracts/Registry.json";
import { useEthersSigner } from "@/lib/useEthersSigner";
import { ethers } from "ethers";
import { Button } from "../components/ui/button";

export default function page() {
  const signer = useEthersSigner();

  const [myStealthMetaDataString, setMyStealthMetaDataString] = useState("");

  useEffect(() => {
    // 1. Check if local storage has stealth meta data
    let stealthMetaDataString = window.localStorage.getItem("stealthMetaData");

    setMyStealthMetaDataString(stealthMetaDataString!);
  }, []);

  const generateMyStealth = async () => {
    console.log("testin");
    const stealthMetaData = generateRandomStealthMetaAddress();

    // 3. Store the stealthMetaData address into contract
    const stealthMetaAddress = stealthMetaData[4];
    console.log(stealthMetaAddress);
    const txHash = await updateStealthAddress(stealthMetaAddress);

    // 4. Store the generated metadata into local db
    if (!!txHash) {
      window.localStorage.setItem(
        "stealthMetaData",
        JSON.stringify({ data: stealthMetaData })
      );
    }
  };

  async function updateStealthAddress(stealthMetaAddress: string) {
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
      return tx.hash;
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div className="h-screen flex flex-col w-full bg-[url('../../public/bg.svg')] bg-cover bg-center bg-no-repeat">
      <AppNavbar />
      <div className="flex flex-col justify-start items-center w-full mt-20 gap-6">
        {myStealthMetaDataString ? (
          <AppTabs />
        ) : (
          <Button onClick={generateMyStealth}>Generate Stealth Address</Button>
        )}
      </div>
    </div>
  );
}