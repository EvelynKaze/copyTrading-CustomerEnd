"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CopyTradingCardProps {
  name: string;
  successRate: number;
  monthlyGain: number;
  followers: number;
  trades: number;
}

export function CopyTradingCard({
  name = "Dominika Vanya",
  successRate = 92,
  monthlyGain = 65,
  followers = 1200,
  trades = 79,
}: CopyTradingCardProps) {
  return (
    <Card className="w-full max-w-sm transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          CopyTrading Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-medium">{successRate}% Success Rate</span>
          </div>
          <div className="text-lg font-medium text-green-600 dark:text-green-400">
            +{monthlyGain}% Monthly
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{followers.toLocaleString()} followers</span>
            <span>{trades} trades</span>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary">
              Copy Trades
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
