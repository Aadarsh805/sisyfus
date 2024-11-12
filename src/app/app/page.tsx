"use client";

import { AppTabs } from "../components/AppTabs";
import { AppNavbar } from "../components/AppNavbar";
import { useEffect, useState } from "react";
import { generateRandomStealthMetaAddress } from "@/utils/crypto";
import { REGISTRY_CONTRACT } from "@/constants";
import RegistryAbi from "../../contracts/Registry.json";
import { useEthersSigner } from "@/lib/useEthersSigner";
import { ethers } from "ethers";
import { Button } from "../components/ui/button";
import { Loader } from "lucide-react";
import { getStealthMetaData } from "@/utils/stealthMetaData";

export default function page() {
  const signer = useEthersSigner();
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [myStealthMetaDataString, setMyStealthMetaDataString] = useState("");

  useEffect(() => {
    // 1. Check if local storage has stealth meta data
    let stealthMetaDataString = window.localStorage.getItem("stealthMetaData");

    setMyStealthMetaDataString(stealthMetaDataString!);
  }, []);

  const generateMyStealth = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  async function updateStealthAddress(stealthMetaAddress: string) {
    try {
      const registryContract = new ethers.Contract(
        REGISTRY_CONTRACT,
        RegistryAbi.abi,
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

  // const myStealthMetaData = getStealthMetaData();

  // const myStealthMetaAdress = myStealthMetaData?.[4];

  // const handleCopyToClipboard = () => {
  //   navigator.clipboard.writeText(myStealthMetaAdress!);
  //   setIsCopied(true);

  //   setIsCopied(true);
  //   setTimeout(() => {
  //     setIsCopied(false);
  //   }, 2000);
  // };

  return (
    <div className="h-screen flex flex-col w-full bg-[url('../../public/bg.svg')] bg-cover bg-center bg-no-repeat">
      <AppNavbar />
      <div className="flex flex-col justify-start items-center w-full mt-20 gap-6">
        {myStealthMetaDataString ? (
          <div className="flex-col gap-4 items-center">
            <AppTabs />
            {/* <p className="flex flex-col gap-2 mt-2">
              Your Stealth Meta Address:{" "}
              <span
                onClick={handleCopyToClipboard}
                className="cursor-pointer break-all max-w-96"
              >
                {isCopied ? "Copied!" : myStealthMetaAdress}
              </span>
            </p> */}
          </div>
        ) : (
          <Button
            onClick={generateMyStealth}
            className="flex items-center gap-2"
          >
            Generate Stealth Address
            {isLoading ? <Loader className="size-8 animate-spin" /> : null}
          </Button>
        )}
      </div>
    </div>
  );
}
