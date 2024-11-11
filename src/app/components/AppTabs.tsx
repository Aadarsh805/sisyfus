"use client";

import { TabsData } from "./tabs-data";
import { TabsTrigger, Tabs, TabsContent, TabsList } from "./ui/tabs";

export const AppTabs = () => {
  return (
    <Tabs defaultValue="deposit" className="space-y-6 w-[30rem]">
      <TabsList className="flex justify-betweem overflow-auto w-full h-12 gap-1">
        {TabsData.map((tab, idx) => (
          <TabsTrigger key={idx} value={tab.tabValue} className="w-full h-full font-extrabold">
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {TabsData.map(({ title, tabValue, tabContent: TabContent }, idx) => (
        <TabsContent key={idx} value={tabValue} className="min-h-96 h-96 max-h-full overflow-y-scroll">
          {TabContent && <TabContent />}
        </TabsContent>
      ))}
    </Tabs>
  );
};