"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CryptoExchange() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant={activeTab === "buy" ? "default" : "ghost"}
          className={`font-semibold ${
            activeTab === "buy"
              ? "bg-appCardGold text-appDarkCard"
              : "dark:text-white text-appDarkCard"
          }`}
          onClick={() => setActiveTab("buy")}
        >
          Buy
        </Button>
        <Button
          variant={activeTab === "sell" ? "default" : "ghost"}
          className={`font-semibold ${
            activeTab === "sell"
              ? "bg-appCardGold text-appDarkCard"
              : "dark:text-white text-appDarkCard"
          }`}
          onClick={() => setActiveTab("sell")}
        >
          Sell
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <div className="mb-2 text-sm text-muted-foreground">
            Ethereum Price
          </div>
          <div className="text-2xl font-bold">$3,110.31</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input defaultValue="0.1824" />
            <Select defaultValue={activeTab === "buy" ? "usd" : "eth"}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eth">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Input defaultValue={activeTab === "buy" ? "567.32" : "0.1824"} />
            <Select defaultValue={activeTab === "buy" ? "eth" : "usd"}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eth">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-appCardGold text-appDark">
            {activeTab === "buy" ? "Buy ETH" : "Sell ETH"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
