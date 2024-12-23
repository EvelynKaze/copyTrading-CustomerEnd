import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: CryptoStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="text-appDarkCard overflow-x-scroll dark:text-white hover:bg-appCardGold hover:dark:text-appDarkCard transition-all duration-300 ease-linear">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Balance</CardTitle>
          <Wallet className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.balance.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <ArrowUpRight className="h-4 w-4" />
            {stats.balanceChange}%
          </div>
        </CardContent>
      </Card>
      <Card className="text-appDarkCard overflow-x-scroll dark:text-white hover:bg-appCardGold hover:dark:text-appDarkCard transition-all duration-300 ease-linear">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Spending</CardTitle>
          <Wallet className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            -${stats.spending.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-red-500">
            <ArrowUpRight className="h-4 w-4" />
            {stats.spendingChange}%
          </div>
        </CardContent>
      </Card>
      <Card className="text-appDarkCard overflow-x-scroll dark:text-white hover:bg-appCardGold hover:dark:text-appDarkCard transition-all duration-300 ease-linear">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Saved</CardTitle>
          <Wallet className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.saved.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <ArrowUpRight className="h-4 w-4" />
            {stats.savedChange}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
