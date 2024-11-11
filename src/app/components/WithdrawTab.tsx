import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { REGISTRY_CONTRACT } from "@/constants";
import { abi as RegistryABI } from "../../contracts/Registry.json";
import { Web3 } from "web3";
import { computeStealthKey } from "@/utils/crypto";
import { getStealthMetaData } from "@/utils/stealthMetaData";
import { privateKeyToAddress } from "viem/accounts";
import BN from "bn.js";
import { TWallet } from "@/types/Wallet";

export const WithdrawTab = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc.testnet.citrea.xyz")
  );

  useEffect(() => {
    fetchAllWithdraws();
  }, []);

  async function fetchAllWithdraws() {
    try {
      const stealthMetaData = getStealthMetaData();
      if (!stealthMetaData)
        return alert("Local stealth meta data is not there.");
      const spendingPrivateKey = stealthMetaData[0];
      const viewingPrivateKey = stealthMetaData[1];
      const registryContract = new web3.eth.Contract(
        RegistryABI,
        REGISTRY_CONTRACT
      );
      const totalDepositsInBn: bigint = await registryContract.methods
        .totalDeposits()
        .call();
      const totalDeposits = parseInt(totalDepositsInBn.toString());
      // Start index and end index should be cached on local storage and should be dynamically updated based on previous scan
      const deposits: string[] = await registryContract.methods
        .getDeposits(0, totalDeposits)
        .call();
      const myWallets: TWallet[] = [];
      deposits.forEach(async (ephemeralPublicKey) => {
        const computedStealthKey = computeStealthKey({
          ephemeralPublicKey,
          spendingPrivateKey,
          viewingPrivateKey,
        });
        console.log(computedStealthKey);
        const stealthAddress = privateKeyToAddress(
          `0x${computedStealthKey.replace("0x", "")}`
        );
        const balanceBI: BigInt = await web3.eth.getBalance(stealthAddress);
        const balance = new BN(balanceBI.toString());
        const zeroBI = new BN("0");
        if (balance > zeroBI) {
          myWallets.push({
            address: stealthAddress,
            privateKey: computedStealthKey,
            balance: Web3.utils.fromWei(balanceBI.toString(), "ether"),
          });
        }
        console.log(myWallets);
      });
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <div className="w-full p-8 rounded-lg bg-white text-black flex flex-col justify-between gap-8">
      <h3 className="font-extrabold text-center w-full">Withdraw</h3>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-black flex items-center justify-between w-full">
          0x08901328390182901830830183080080
        </p>
        <div className="flex items-center w-full gap-4 justify-self-end">
          <Button className="bg-accent w-fit">Withdraw</Button>
          <Button className="bg-accent w-fit">Export PrivateKey</Button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black"></div>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-black flex items-center justify-between w-full">
          0x08901328390182901830830183080080
        </p>
        <div className="flex items-center w-full gap-4 justify-self-end">
          <Button className="bg-accent w-fit">Withdraw</Button>
          <Button className="bg-accent w-fit">Export PrivateKey</Button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black"></div>

      <div className="flex flex-col gap-3 w-full">
        <p className="text-black flex items-center justify-between w-full">
          0x08901328390182901830830183080080
        </p>
        <div className="flex items-center w-full gap-4 justify-self-end">
          <Button className="bg-accent w-fit">Withdraw</Button>
          <Button className="bg-accent w-fit">Export PrivateKey</Button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black"></div>

      <div className="flex flex-col gap-3 w-full">
        <p className="text-black flex items-center justify-between w-full">
          0x08901328390182901830830183080080
        </p>
        <div className="flex items-center w-full gap-4 justify-self-end">
          <Button className="bg-accent w-fit">Withdraw</Button>
          <Button className="bg-accent w-fit">Export PrivateKey</Button>
        </div>
      </div>
    </div>
  );
};
