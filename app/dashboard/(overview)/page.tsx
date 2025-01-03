"use client";

import { CopyTradingOptions } from "@/components/copytrading-options";
import { StatsCards } from "../../../components/stats-cards";
import { StatisticsChart } from "@/components/statistics-chart";
import { StockOptions } from "@/components/stock-options";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { CryptoExchange } from "@/components/exchange";

// Sample data
const stats = {
  balance: 40000.063,
  spending: 103000,
  saved: 103000,
  balanceChange: 25.74,
  spendingChange: 10.74,
  savedChange: 10.74,
};

export default function UserDashboard() {
  const userState = useSelector((state: RootState) => state.user.isLoggedIn);
  console.log(userState);
  return (
    <div className="flex flex-col lg:flex-row h-full flex-1 gap-6">
      <div className="flex-1 h-full overflow-y-scroll space-y-6">
        <StatsCards stats={stats} />
        <StatisticsChart />
        <StockOptions />
      </div>
      <div className="w-full lg:w-80 space-y-6">
        <CopyTradingOptions />
        {/*<CryptoExchange />*/}
        {/* <Card className="p-6">
          <QuickTransfer users={quickTransferUsers} />
        </Card> */}
      </div>
    </div>
  );
}
