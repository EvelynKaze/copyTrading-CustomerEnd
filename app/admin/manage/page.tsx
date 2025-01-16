"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminStocks from "./edit-stocks";
import CryptocurrenciesAdmin from "./manage-crypto";
import AdminCopyTrading from "./edit-copytrades";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("stocks");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto h-full overflow-y-scroll p-4"
    >
      <h1 className="text-xl md:text-3xl font-bold mb-6">Manage Options</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            className="overflow-hidden text-xs sm:text-base"
            value="stocks"
          >
            Cryptocurrency
          </TabsTrigger>
          <TabsTrigger
            className="overflow-hidden text-xs sm:text-base"
            value="component1"
          >
            Stock Options
          </TabsTrigger>
          <TabsTrigger
            className="overflow-hidden text-xs sm:text-base"
            value="component2"
          >
            Copy Trades
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stocks" className="mt-6">
          <CryptocurrenciesAdmin />
        </TabsContent>
        <TabsContent value="component1" className="mt-6">
          <AdminStocks />
        </TabsContent>
        <TabsContent value="component2" className="mt-6">
          <AdminCopyTrading />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
