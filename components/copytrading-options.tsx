"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trader } from "@/types/dashboard"
import { useState, useEffect } from "react";
import { databases } from "@/lib/appwrite";
import ENV from "@/constants/env"

export function CopyTradingOptions() {
  const [traders, setTraders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch traders from Appwrite on component mount
  useEffect(() => {
    const fetchTraders = async () => {
      setIsLoading(true);
      try {
        const response = await databases.listDocuments(
            ENV.databaseId,
            ENV.collections.copyTrading
        );
        setTraders(
            response.documents.map((doc) => ({ id: doc.$id, ...doc }))
        );
      } catch (error) {
        console.error("Failed to fetch traders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraders();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex text-sm items-center gap-2">
            <Copy className="w-4 h-4" />
            CopyTrading Options
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid gap-4">
            {traders?.map((trader) => (
              <Card key={trader.id} className="p-4">
                <div className="">
                  <div className="flex gap-2">
                    <div>
                      <h3 className="font-semibold text-base">{trader.trader_name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
                        <span>{trader?.success_rate}% Success Rate</span>
                      </div>
                      <span className="text-green-500 text-xs">
                        +{trader?.monthly_return}% Monthly
                      </span>
                      <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{trader?.trader_followers} followers</span>
                        <span>{trader?.successful_trades} trades</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    <Button
                      size="sm"
                      className="w-full bg-appCardGold text-appDarkCard "
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy Trades
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
