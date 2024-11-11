"use client";

import { TabsData } from "./tabs-data";
import { TabsTrigger, Tabs, TabsContent, TabsList } from "./ui/tabs";

export const AppTabs = () => {
  return (
    <Tabs defaultValue="deposit" className="space-y-6 w-[30rem]">
      <TabsList className="flex justify-betweem overflow-auto w-full">
        {TabsData.map((tab, idx) => (
          <TabsTrigger key={idx} value={tab.tabValue} className="">
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {TabsData.map(({ title, tabValue, tabContent: TabContent }, idx) => (
        <TabsContent key={idx} value={tabValue}>
          {TabContent && <TabContent />}
        </TabsContent>
      ))}
    </Tabs>
  );
};
