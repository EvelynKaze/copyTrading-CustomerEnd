"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface ManageCopyTradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: {
    id: number;
    traderName: string;
    initialInvestment: number;
    currentValue: number;
    profitLoss: number;
    winRate: number;
    risk: string;
    copiedSince: string;
    recentTrades: { date: string; profit: number }[];
  };
}

const ManageCopyTradingModal: React.FC<ManageCopyTradingModalProps> = ({
  isOpen,
  onClose,
  option,
}) => {
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAddFunds = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const amount = formData.get("amount") as string;
    // Here you would typically call an API to add funds
    toast({
      title: "Funds Added",
      description: `$${amount} has been added to your copy trading investment with ${option.traderName}.`,
    });
    onClose();
  };

  const handleStopCopying = () => {
    // Here you would typically call an API to stop copying
    toast({
      title: "Copy Trading Stopped",
      description: `You have stopped copying trades from ${option.traderName}. Your funds will be returned to your account.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Copy Trading - {option.traderName}</DialogTitle>
          <DialogDescription>
            View details and manage your copy trading investment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Initial Investment</Label>
            <span>{formatCurrency(option.initialInvestment)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Current Value</Label>
            <span>{formatCurrency(option.currentValue)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Profit/Loss</Label>
            <span
              className={
                option.profitLoss >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              {option.profitLoss >= 0 ? (
                <TrendingUp className="inline mr-1" />
              ) : (
                <TrendingDown className="inline mr-1" />
              )}
              {option.profitLoss}%
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Win Rate</Label>
            <span>{option.winRate}%</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Risk Level</Label>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                option.risk === "Low"
                  ? "bg-green-200 text-green-800"
                  : option.risk === "Medium"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {option.risk}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Copied Since</Label>
            <span>{formatDate(option.copiedSince)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Recent Trades</Label>
            <div className="flex items-center space-x-1">
              {option.recentTrades.map((trade, index) => (
                <div
                  key={index}
                  className={`w-4 h-8 ${
                    trade.profit > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ height: `${Math.abs(trade.profit / 10)}px` }}
                  title={`${formatDate(trade.date)}: ${formatCurrency(
                    trade.profit
                  )}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleAddFunds}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="col-span-4">
              Add Funds
            </Label>
            <Input
              id="amount"
              name="amount"
              placeholder="Enter amount"
              type="number"
              min="1"
              step="0.01"
              required
              className="col-span-3"
            />
            <Button type="submit" className="col-span-1">
              Add
            </Button>
          </div>
        </form>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={handleStopCopying}
            className="w-full sm:w-auto"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Stop Copying
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCopyTradingModal;
