import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ethers } from "ethers";
import {
  getEphemeralKey,
  getHashedSharedSecret,
  getSharedSecret,
  getStealthPublicKey,
  publicKeyToAddress,
} from "../../utils/crypto";
import { abi as RegistryABI } from "../../contracts/Registry.json";
import { useEthersSigner } from "@/lib/useEthersSigner";
import { REGISTRY_CONTRACT } from "@/constants";

export const TransferTab = () => {
  const [recipientStealthAddress, setRecipientStealthAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [transactionHash, setTransactionHash] = useState(0);
  const [uiError, setUiError] = useState("");
  const signer = useEthersSigner();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUiError("");
    setRecipientStealthAddress(e.target.value);
  };

  const handleTransferAmountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setUiError("");
    setTransferAmount(+e.target.value);
  };

  const handleTranferClick = async () => {
    // 1. Get stealth metadata address of the receiver from contract
    let testMetaAddress =
      "st:eth:0x02f8364efabd9694abf56d503e4a18b09b41d78b37289599c7d6487e4828446b6a020cd51a5583c7b2aeab902f46078aeeab600e4228c8f158dd815f15f9fac825f9";
    testMetaAddress = testMetaAddress.replace("st:eth:", "");
    const spendingPublicKey = testMetaAddress.substring(0, 68);
    const viewingPublicKey = "0x" + testMetaAddress.substring(68);

    // 2. Generate Ephemeral Private Key
    const [ephemeralPrivateKey, ephemeralPublicKey] = getEphemeralKey();

    // 3. Create shared secret
    const sharedSecret = getSharedSecret(ephemeralPrivateKey, viewingPublicKey);
    const hashedSharedSecret = getHashedSharedSecret({ sharedSecret });

    // 4. Generate stealth address
    const stealthPublicKey = getStealthPublicKey({
      spendingPublicKey,
      hashedSharedSecret,
    });
    const stealthAddress = publicKeyToAddress({
      publicKey: stealthPublicKey,
    });

    // 5. Send funds to stealth address
    // TODO: Do the deposit smart contract call here(deposit)
    console.log("Stealth address:", stealthAddress);

    const registryContract = new ethers.Contract(
      REGISTRY_CONTRACT,
      RegistryABI,
      signer
    );
    try {
      const tx = await registryContract.deposit(stealthAddress, {
        value: ethers.parseEther(transferAmount.toString()),
      });
      setTransactionHash(tx.hash);
      await tx.wait();
      console.log("Funds sent to stealth address:", stealthAddress);
    } catch (error) {
      console.log({ error });
    }

    if (!recipientStealthAddress) {
      setUiError("Recipient Stealth Meta Address is required");
      return;
    }
    setUiError("");
  };

  return (
    <div className="w-full p-16 rounded-lg bg-white text-black flex flex-col justify-between gap-8">
      <h3 className="font-bold text-center w-full">Transfer</h3>
      <Input
        type="text"
        onChange={handleInputChange}
        value={recipientStealthAddress}
        placeholder="Recipient Stealth Meta Address"
      />
      <Input
        type="number"
        onChange={handleTransferAmountInputChange}
        value={transferAmount}
        placeholder="Recipient Stealth Meta Address"
      />

      <Button className="bg-accent" onClick={handleTranferClick}>
        Transfer
      </Button>
      <p className="text-red-500">{uiError}</p>
      <p className="text-green-500">{transactionHash}</p>
    </div>
  );
};
