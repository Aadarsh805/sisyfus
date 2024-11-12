import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { REGISTRY_CONTRACT } from "@/constants";
import { abi as RegistryABI } from "../../contracts/Registry.json";
import Web3 from "web3";
import { computeStealthKey } from "@/utils/crypto";
import { getStealthMetaData } from "@/utils/stealthMetaData";
import { privateKeyToAddress } from "viem/accounts";
import BN from "bn.js";
import { TWallet } from "@/types/Wallet";
import { WithdrawRow } from "./WithdrawRow";

export const WithdrawTab = () => {
  const [myWallets, setMyWallets] = useState<TWallet[]>([]);
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

      const [spendingPrivateKey, viewingPrivateKey] = stealthMetaData;
      const registryContract = new web3.eth.Contract(
        RegistryABI,
        REGISTRY_CONTRACT
      );
      const totalDepositsInBn: bigint = await registryContract.methods
        .totalDeposits()
        .call();
      const totalDeposits = parseInt(totalDepositsInBn.toString());
      const deposits: string[] = await registryContract.methods
        .getDeposits(0, totalDeposits)
        .call();

      const wallets = (
        await Promise.all(
          deposits.map(async (ephemeralPublicKey) => {
            const computedStealthKey = computeStealthKey({
              ephemeralPublicKey,
              spendingPrivateKey,
              viewingPrivateKey,
            });

            const stealthAddress = privateKeyToAddress(
              `0x${computedStealthKey.replace("0x", "")}`
            );
            const balanceBI = await web3.eth.getBalance(stealthAddress);
            const balance = new BN(balanceBI.toString());

            if (balance.gt(new BN("0"))) {
              return {
                address: stealthAddress,
                privateKey: computedStealthKey,
                balance: Web3.utils.fromWei(balanceBI.toString(), "ether"),
              };
            }
            return null;
          })
        )
      ).filter(Boolean) as TWallet[];

      setMyWallets(wallets);
    } catch (error) {
      console.log({ error });
    }
  }

  const totalBalance = myWallets.reduce(
    (acc, curr) => acc + Number(curr.balance),
    0
  );
  
  return (
    <div className="w-full p-8 rounded-lg bg-white text-black flex flex-col justify-between gap-8">
      <h3 className="font-extrabold text-center w-full">Withdraw</h3>
      <div className="flex flex-col gap-3 w-full">
        <p>Total Balance: {totalBalance.toFixed(6)}</p>
        {myWallets.map((wallet, i) => (
          <WithdrawRow key={i} wallet={wallet} i={i} myWallets={myWallets} />
        ))}
      </div>
    </div>
  );
};
