import React from "react";
import { Button } from "./ui/button";

export const WithdrawTab = () => {
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
