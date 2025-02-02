"use client";
import { CopyTradingOptions } from "@/components/copytrading-options";
import { StatsCards } from "@/components/stats-cards";
import { StatisticsChart } from "@/components/statistics-chart";
import { StockOptions } from "@/components/stock-options";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { CryptoExchange } from "@/components/exchange";
import { useProfile } from "../../context/ProfileContext";



export default function UserDashboard() {
  const userState = useSelector((state: RootState) => state.user.isLoggedIn);
  const { profile } = useProfile();


  console.log("Profileee", profile);

  const stats = {
    total_investment: profile?.total_investment || 0.00,
    current_value: profile?.current_value || 0.00,
    roi: profile?.roi || 0,
    // investmentChange: 0,
    // valueChange: 0,
    // roiChange: 0,
  }

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
