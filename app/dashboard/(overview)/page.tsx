"use client";
import { CopyTradingOptions } from "@/components/copytrading-options";
import { StatsCards } from "@/components/stats-cards";
import { StockOptions } from "@/components/stock-options";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { CryptoExchange } from "@/components/exchange";
import { useProfile } from "../../context/ProfileContext";
import TradingViewWidget from "@/components/TradingViewWidget"
import {databases, Query} from "@/lib/appwrite";
import { useEffect, useState } from "react";
import ENV from "@/constants/env";
import { useToast } from "@/hooks/use-toast";



export default function UserDashboard() {
  const userState = useSelector((state: RootState) => state.user.isLoggedIn);
  const { profile } = useProfile();
  const [userPortfolio, setUserPortfolio] = useState({ total_investment: 0, current_value: 0, roi: 0})
  const user_id = profile?.user_id as string;
  const { toast } = useToast()


  const fetchUserPortfolio = async () => {
    try {
        const response = await databases.listDocuments(
            ENV.databaseId,
            ENV.collections.profile,
            [Query.equal("user_id", user_id)]
        );

        const portfolio = response.documents.map((doc) => ({
            total_investment: doc?.total_investment,
            current_value: doc?.current_value,
            roi: doc?.roi
        }))
        setUserPortfolio(portfolio[0])
    } catch (err) {
        const error = err as Error
        console.error("Error fetching cryptocurrencies:", error);
        toast({
            title: "Error",
            description: "Failed to fetch Portfolio data",
            variant: "destructive",
        });
    }
  }

    useEffect(() => {

        fetchUserPortfolio()
    }, [toast, user_id]);
    
    

  console.log("Profileee", profile);
  console.log("User Portfolio", userPortfolio)

  const stats = {
    total_investment: userPortfolio?.total_investment || 0.00,
    current_value: userPortfolio?.current_value || 0.00,
    roi: userPortfolio?.roi || 0,
  }

  console.log(userState);
  return (
    <div className="flex flex-col lg:flex-row h-full flex-1 gap-6">
      <div className="flex-1 h-full overflow-y-scroll space-y-6">
        <StatsCards stats={stats} />
        <TradingViewWidget />
        <StockOptions 
          portfolio={userPortfolio} 
          profile={profile} 
          fetchPortfolio={fetchUserPortfolio} 
        />
      </div>
      <div className="w-full lg:w-80 space-y-6">
        <CopyTradingOptions 
          portfolio={userPortfolio} 
          profile={profile} 
          fetchPortfolio={fetchUserPortfolio} 
        />
        {/*<CryptoExchange />*/}
        {/* <Card className="p-6">
          <QuickTransfer users={quickTransferUsers} />
        </Card> */}
      </div>
    </div>
  );
}
