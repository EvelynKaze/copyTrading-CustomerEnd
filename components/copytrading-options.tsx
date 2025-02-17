"use client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trade } from "@/types/dashboard";
import { useState, useEffect } from "react";
import { databases, ID } from "@/lib/appwrite";
import ENV from "@/constants/env";
import { setCopyTrade } from "@/store/copyTradeSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { useToast } from "@/hooks/use-toast";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
import { TradeFormModal } from "./user-deposit/trade-modal";
import { Profile } from "@/types";

export function CopyTradingOptions({ portfolio, profile, fetchPortfolio }: 
  { 
    portfolio: { total_investment: number, current_value: number, roi: number }, 
    profile: Profile | null,
    fetchPortfolio: () => void
  }) 
{
    const [trades, setTrades] = useState<Trade[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
      const fetchTrades = async () => {
        try {
          const response = await databases.listDocuments(ENV.databaseId, ENV.collections.copyTrading);
          setTrades(
            response.documents.map((doc) => ({
              id: doc.$id,
              trade_title: doc.trade_title,
              trade_max: doc.trade_max,
              trade_min: doc.trade_min,
              trade_roi_min: doc.trade_roi_min,
              trade_roi_max: doc.trade_roi_max,
              trade_description: doc.trade_description,
              trade_risk: doc.trade_risk,
              trade_duration: doc.trade_duration,
            }))
          );
        } catch (error) {
          console.error("Failed to fetch trades:", error);
        }
      };

      fetchTrades();
    }, []);

    const handlePurchase = (trade: Trade) => {
      try {
        const { trade_min, trade_max, trade_roi_min, trade_roi_max, trade_risk, trade_duration } = trade;
        const total_investment = portfolio?.total_investment || 0; 

        if (total_investment < trade_min) {
          const difference = trade_min - total_investment;
          dispatch( 
            setCopyTrade({
              title: trade.trade_title,
              trade_min: difference,
              trade_max,
              trade_roi_min,
              trade_roi_max,
              trade_risk,
              trade_duration,
            })
          );

          toast({
            title: "Insufficient funds!",
            description: `You need to deposit at least $${difference} to start this trade.`,
          });

          router.push("/dashboard/deposit");
        } else {
          setSelectedTrade(trade);
          setOpen(true);
        }
      } catch (err) {
        const error = err as Error;
        console.error("Error in handlePurchase:", error);
      }
    };

    const handleTradePurchase = async (amount: number) => {
      if (!selectedTrade || amount > portfolio.total_investment) return;
      try {
        const copyTradePayload = {
          trade_title: selectedTrade.trade_title,
          trade_min: selectedTrade.trade_min,
          trade_max: selectedTrade.trade_max,
          trade_roi_min: selectedTrade.trade_roi_min,
          trade_roi_max: selectedTrade.trade_roi_max,
          trade_win_rate: 0.0,
          trade_risk: selectedTrade.trade_risk,
          trade_current_value: 0.0,
          trade_profit_loss: 0.0,
          isProfit: false,
          initial_investment: amount,
          trade_token: "fromBalance",
          trade_token_address: "fromBalance",
          trade_status: "approved",
          full_name: profile?.full_name,
          user_id: profile?.user_id,
        };

        await databases.createDocument(
          ENV.databaseId,
          ENV.collections.copyTradingPurchases,
          ID.unique(),
          copyTradePayload
        );

        const newTotalInvestment = portfolio.total_investment - amount;
        console.log("New total investment:", newTotalInvestment);
        await databases.updateDocument(
          ENV.databaseId,
          ENV.collections.profile,
          profile?.id || "",
          { total_investment: newTotalInvestment }
        );
        setOpen(false);
        setSelectedTrade(null);
        await fetchPortfolio();
        toast({ title: "Trade Purchased!", description: "Thank you for your purchase!" });
      } catch (error) {
        console.error("Error creating trade:", error);
        toast({ title: "Error creating trade!", description: "Please try again later." });
      }
    };

    return (
      <>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <div className="flex text-sm items-center gap-2">CopyTrading Options</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-2">
              <div className="grid gap-4">
                {trades?.map((trade) => (
                  <Card key={trade.id} className="flex flex-col">
                    <CardHeader className="flex-1">
                      <h3 className="text-2xl font-bold text-center">{trade?.trade_title}</h3>
                      <p className="text-center text-muted-foreground">{trade?.trade_description}</p>
                      <p className="text-center text-muted-foreground">
                        {trade?.trade_duration} day{trade?.trade_duration >= 2 ? "s" : ""}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold">${trade?.trade_min} - ${trade?.trade_max}</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>
                            Daily ROI: {trade?.trade_roi_min}%{" - "}{trade?.trade_roi_max}%
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>
                            Risk: <b className="capitalize">{trade?.trade_risk}</b>
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handlePurchase(trade)} className="w-full hover:bg-appGold200" variant="outline">
                        Copy
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedTrade && (
          <TradeFormModal 
            open={open} 
            setOpen={setOpen} 
            portfolio={portfolio?.total_investment} 
            trade={selectedTrade} 
            onTradePurchase={handleTradePurchase}
          />
        )}
      </>
    );
}
