import { TWallet } from "@/types/Wallet";
import React, { useState } from "react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";

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
      {i < myWallets.length -1 && <div className="w-full h-[1px] bg-black"></div>}
    </div>
  );
};

const WithdrawButtonModal = ({ wallet }: { wallet: TWallet }) => {
  const [recipientStealthAddress, setRecipientStealthAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [transactionHash, setTransactionHash] = useState("");
  const [uiError, setUiError] = useState("");

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

  const handleWithdrawClick = () => {
    if (!recipientStealthAddress) {
      setUiError("Recipient stealth address is required");
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

    // todo
  };

  return (
    <Dialog>
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
              placeholder="Recipient Stealth Meta Address"
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