"use client";

import { BarChart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "../../../components/header";
import { MarketTrends } from "../../../components/market-trends";
import { QuickTransfer } from "../../../components/quick-transfer";
import { Sidebar } from "../../../components/sidebar";
import { StatsCards } from "../../../components/stats-cards";

// Sample data
const stats = {
  balance: 40000.063,
  spending: 103000,
  saved: 103000,
  balanceChange: 25.74,
  spendingChange: 10.74,
  savedChange: 10.74,
};

const trends = [
  {
    token: "BNB",
    icon: "cryptocurrency-color:bnb",
    symbol: "BNB",
    lastPrice: 41263.0,
    change24h: 35.74,
    marketCap: "$784,393M",
  },
  {
    token: "Bitcoin",
    icon: "logos:bitcoin",
    symbol: "BTC",
    lastPrice: 41263.0,
    change24h: 35.74,
    marketCap: "$784,393M",
  },
];

const quickTransferUsers = [
  { id: "1", name: "User 1", avatar: "/placeholder.svg" },
  { id: "2", name: "User 2", avatar: "/placeholder.svg" },
  { id: "3", name: "User 3", avatar: "/placeholder.svg" },
  { id: "4", name: "User 4", avatar: "/placeholder.svg" },
];

export default function UserDashboard() {
  return (
    <div className="flex h-full flex-1 gap-6">
      <div className="flex-1 h-full overflow-y-scroll space-y-6">
        <StatsCards stats={stats} />
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Statistics</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="spending">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spending">Spending</SelectItem>
                  <SelectItem value="earnings">Earnings</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="2022">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <BarChart className="h-full w-full text-muted-foreground" />
          </div>
        </Card>
        <MarketTrends trends={trends} />
      </div>
      <div className="w-80 space-y-6">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <Button variant="ghost" className="font-semibold text-primary">
              Buy
            </Button>
            <Button variant="ghost">Sell</Button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                Ethereum Price
              </div>
              <div className="text-2xl font-bold">$3,110.31</div>
            </div>
            <div className="space-y-2">
              <Input defaultValue="0.1824" />
              <div className="flex items-center gap-2">
                <Input defaultValue="0.1824" />
                <Select defaultValue="eth">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Buy ETH</Button>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <QuickTransfer users={quickTransferUsers} />
        </Card>
      </div>
    </div>
  );
}
