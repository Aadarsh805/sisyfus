import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Chain } from "viem";

export const projectId = "2bdf921b09df7e7043bfe5e0cda9733a";

const CitreaTestnet = {
  id: 5115,
  name: "Citrea Testnet",
  nativeCurrency: { name: "cBTC", symbol: "cBTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.citrea.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "CitreaBlockExplorer",
      url: "https://explorer.testnet.citrea.xyz/",
    },
  },
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: "Bitcoinhack",
  projectId,
  chains: [CitreaTestnet],
  ssr: true,
});
