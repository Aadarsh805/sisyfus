import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { REGISTRY_CONTRACT } from "@/constants";
import { ethers } from "ethers";
import { abi as RegistryABI } from "../../contracts/Registry.json";
import { Web3, Contract } from "web3";

export const WithdrawTab = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc.testnet.citrea.xyz")
  );

  useEffect(() => {
    fetchAllWithdraws();
  }, []);

  async function fetchAllWithdraws() {
    try {
      const registryContract = new web3.eth.Contract(RegistryABI, REGISTRY_CONTRACT);
      // const totalDeposits = await registryContract.methods.deposits().call();
      // console.log(totalDeposits)
      // Start index and end index should be cached on local storage and should be dynamically updated based on previous scan
      const deposits = await registryContract.methods
        .getDeposits(0, 2)
        .call();
      console.log(deposits);
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <div className="w-full p-8 rounded-lg bg-white text-black flex flex-col justify-between gap-8">
      <h3 className="font-bold text-center w-full">Withdraw</h3>

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
