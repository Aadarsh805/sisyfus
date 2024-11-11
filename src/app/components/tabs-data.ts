import { ComponentType } from "react";
import { DepositTab } from "./DepositTab";
import { TransferTab } from "./TransferTab";
import { WithdrawTab } from "./WithdrawTab";

type TTabsData = {
  title: string;
  tabValue: string;
  tabContent: ComponentType;
}[];

export const TabsData: TTabsData = [
  {
    title: "Deposit",
    tabValue: "deposit",
    tabContent: DepositTab,
  },
  {
    title: "Transfer",
    tabValue: "transfer",
    tabContent: TransferTab,
  },
  {
    title: "Withdraw",
    tabValue: "withdraw",
    tabContent: WithdrawTab,
  },
];