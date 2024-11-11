"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";

type ConnectWalletButtonProps = {
  address: string | undefined;
};

export const ConnectWalletButton = (address: ConnectWalletButtonProps) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const onSubmit = () => {
          openConnectModal();
          localStorage.setItem("smartContractAddress", JSON.stringify(address));
        };
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={onSubmit} type="button">
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    variant={"destructive"}
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div className="flex flex-wrap-reverse items-center gap-2">
                  <Button
                    className="flex w-full items-center px-4 py-3 md:w-auto"
                    variant={"outline"}
                    onClick={openChainModal}
                  >
                    {chain.hasIcon && (
                      <div className="mr-2">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={openAccountModal}
                    className="w-full p-4 md:w-auto"
                    type="button"
                  >
                    {account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
