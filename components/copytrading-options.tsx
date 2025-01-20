"use client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trader } from "@/types/dashboard"
import { useState, useEffect } from "react";
import { databases } from "@/lib/appwrite";
import ENV from "@/constants/env"
import { setCopyTrade } from "@/store/copyTradeSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import {useToast} from "@/hooks/use-toast";

export function CopyTradingOptions() {
  const [trades, setTrades] = useState<Trader[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast()

  // Fetch traders from Appwrite on component mount
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await databases.listDocuments(
            ENV.databaseId,
            ENV.collections.copyTrading
        );
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
            }))
        );
      } catch (error) {
        console.error("Failed to fetch traders:", error);
      }
    };

    fetchTrades();
  }, []);

    const handlePurchase = (trade: any) => {
        try{
            dispatch(
                setCopyTrade({
                    title: trade.trade_title,
                    trade_min: trade.trade_min,
                    trade_max: trade.trade_max,
                    trade_roi_min: trade.trade_roi_min,
                    trade_roi_max: trade.trade_roi_max,
                    trade_risk: trade.trade_risk,
                })
            );

            toast({
                title: "Purchase initiated!",
                description: `Deposit an amount within the range to complete the transaction.`,
            });

            router.push("/dashboard/deposit");
        } catch(err){
            const error = err as Error
            console.error("Error in handlePurchase:", error);
        }
    };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex text-sm items-center gap-2">
            {/* <Copy className="w-4 h-4" /> */}
            CopyTrading Options
          </div>
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
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold">${trade?.trade_min} - ${trade?.trade_max}</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Daily ROI: {trade?.trade_roi_min}%{" - "}{trade?.trade_roi_max}%</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Risk: <b className="capitalize">{trade?.trade_risk}</b></span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                      onClick={() => handlePurchase(trade)}
                      className="w-full hover:bg-appGold200"
                      variant="outline"
                  >
                    Copy
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
