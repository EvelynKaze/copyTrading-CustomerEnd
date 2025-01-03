"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, TrendingUp, Star, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Trader {
  id: string;
  name: string;
  avatar: string;
  successRate: number;
  monthlyReturn: number;
  followers: number;
  trades: number;
}

const traders: Trader[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "/placeholder.svg",
    successRate: 92,
    monthlyReturn: 15.4,
    followers: 1240,
    trades: 156,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "/placeholder.svg",
    successRate: 88,
    monthlyReturn: 12.7,
    followers: 890,
    trades: 134,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg",
    successRate: 86,
    monthlyReturn: 11.2,
    followers: 756,
    trades: 98,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "/placeholder.svg",
    successRate: 85,
    monthlyReturn: 10.8,
    followers: 654,
    trades: 112,
  },
];

export function CopyTradingOptions() {
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
            {traders.map((trader) => (
              <Card key={trader.id} className="p-4">
                <div className="">
                  <div className="flex gap-2">
                    <Avatar className="w-8 h-8 text-sm">
                      <AvatarImage src={trader.avatar} />
                      <AvatarFallback>{trader.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-base">{trader.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
                        <span>{trader.successRate}% Success Rate</span>
                      </div>
                      <span className="text-green-500 text-xs">
                        +{trader.monthlyReturn}% Monthly
                      </span>
                      <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{trader.followers} followers</span>
                        <span>{trader.trades} trades</span>
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
