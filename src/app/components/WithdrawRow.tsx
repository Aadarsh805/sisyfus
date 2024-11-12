import { TWallet } from "@/types/Wallet";
import React, { useState } from "react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { useEthersSigner } from "@/lib/useEthersSigner";
import { CITREA_RPC, WITHDRAW_ADDRESS } from "@/constants";
import { useSendTransaction } from "wagmi";
import { parseEther } from "ethers";
import Web3 from "web3";
import { useToast } from "@/hooks/use-toast";

type WithdrawRowProps = {
  wallet: TWallet;
  i: number;
  myWallets: TWallet[];
};

export const WithdrawRow = ({ wallet, i, myWallets }: WithdrawRowProps) => {
  const shortenedAddress =
    wallet.address.slice(0, 6) + "..." + wallet.address.slice(-6);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 w-full text-black" key={i}>
        <div className="flex flex-col">
          <p className="text-black flex items-center justify-between w-full">
            {i + 1}. {shortenedAddress}
          </p>
          <span className="text-xs text-gray-600">{wallet.balance} cBTC</span>
        </div>
        <div className="flex items-center gap-4 justify-self-end">
          <WithdrawButtonModal wallet={wallet} />
          <ExportPrivateKeyModal wallet={wallet} />
        </div>
      </div>
      {i < myWallets.length - 1 && (
        <div className="w-full h-[1px] bg-black"></div>
      )}
    </div>
  );
};

const WithdrawButtonModal = ({ wallet }: { wallet: TWallet }) => {
  const [recipientStealthAddress, setRecipientStealthAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");
  const [uiError, setUiError] = useState("");
  const [isLaoding, setIsLoading] = useState(false);
  const { sendTransactionAsync } = useSendTransaction();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

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

  const handleWithdrawClick = async () => {
    if (!recipientStealthAddress) {
      setUiError("Bitcoin address is required");
      return;
    }
    if (!transferAmount) {
      setUiError("Transfer amount is required");
      return;
    }
    if (+transferAmount <= 0) {
      setUiError("Transfer amount must be greater than 0");
      return;
    }
    if (+transferAmount > +wallet.balance) {
      setUiError("Transfer amount must be less than or equal to your balance");
      return;
    }

    console.log({ recipientStealthAddress }, wallet.balance);

    // makeWithdrawTransaction(recipientStealthAddress, wallet.balance);
    // todo
    await makeWithdrawTransaction(
      recipientStealthAddress,
      wallet.privateKey,
      wallet.address
    );
  };

  async function makeWithdrawTransaction(
    btcAddress: string,
    pvtKey: string,
    address: string
  ) {
    try {
      setIsLoading(true);
      const web3 = new Web3(new Web3.providers.HttpProvider(CITREA_RPC));
      const txObj: any = {
        to: WITHDRAW_ADDRESS,
        value: parseEther("0.0001"),
        data: Web3.utils.toHex(btcAddress),
        from: address,
      };
      const gasPrice = await web3.eth.getGasPrice();
      txObj.gasPrice = gasPrice;
      let gas = await web3.eth.estimateGas(txObj);
      txObj.gas = gas;
      const gasCost = BigInt(gasPrice) * BigInt(gas);
      const balance = await web3.eth.getBalance(address);
      const amountToSend = BigInt(balance) - gasCost;
      txObj.value = amountToSend;

      const txRaw = await web3.eth.accounts.signTransaction(txObj, pvtKey);
      const tx = await web3.eth.sendSignedTransaction(txRaw.rawTransaction);
      console.log(`Transaction Hash: ${tx.transactionHash}\n`);
      setIsLoading(false);

      setIsDialogOpen(false);

      toast({
        title: "Funds sent to :" + btcAddress,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger>
        <Button size={"sm"} className=" py-0 bg-accent w-fit text-xs">
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4 text-black w-full text-center">
            Withdraw Funds
          </DialogTitle>
          <div className="flex flex-col gap-4 text-black">
            <Input
              type="text"
              onChange={handleInputChange}
              value={recipientStealthAddress}
              placeholder="Your Bitcoin Address"
              className="w-full text-black"
            />
            <div className="flex gap-2 items-end justify-end">
              <Input
                type="number"
                onChange={handleTransferAmountInputChange}
                value={transferAmount}
                placeholder="0"
                className="w-full text-black"
              />
              <span className="">cBtc</span>
            </div>
            <p>Total balance: {wallet.balance}cBTC</p>
            <Button className="bg-accent" onClick={handleWithdrawClick}>
              Withdraw
            </Button>
            {uiError && <p className="text-red-500">{uiError}</p>}
            {transactionHash && (
              <p className="text-green-500 break-all">{transactionHash}</p>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const ExportPrivateKeyModal = ({ wallet }: { wallet: TWallet }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(wallet.privateKey);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"sm"} className=" py-0 bg-accent w-fit text-xs">
          Export PrivateKey
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4 text-black w-full text-center">
            Export Private key
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-black">
          <p className="break-all">Private Key: {wallet.privateKey}</p>
        </div>
        <Button className="bg-accent" onClick={handleCopyToClipboard}>
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
