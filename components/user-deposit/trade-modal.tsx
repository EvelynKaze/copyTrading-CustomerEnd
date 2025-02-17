"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface TradeFormProps {
    trade: {
        trade_title: string;
        trade_min: number;
        trade_max: number;
    };
    portfolio: number;
    onTradePurchase?: (amount: number) => void;
}

interface TradeFormModalProps {
    open?: boolean;
    setOpen?: (value: boolean) => void;
    trade: TradeFormProps["trade"];
    portfolio: TradeFormProps["portfolio"];
    onTradePurchase?: (amount: number) => void;
}

const TradeForm: React.FC<TradeFormProps> = ({ trade, portfolio, onTradePurchase }) => {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        
        const numericValue = parseFloat(value);
        if (isNaN(numericValue) || numericValue > portfolio) {
            setError("Amount cannot exceed total investment.");
        } else if(isNaN(numericValue) || numericValue < trade.trade_min){
            setError("Amount cannot be less than minimum trade");
        } else {
            setError("");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!error && amount && onTradePurchase) {
            onTradePurchase(parseFloat(amount));
            console.log("Purchasing copy trade with:", { trade, amount });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div>
                <Label htmlFor="trade_title">Trade Title</Label>
                <Input id="trade_title" value={trade.trade_title} disabled />
            </div>
            <div>
                <Label htmlFor="trade_min">Minimum Investment</Label>
                <Input id="trade_min" value={`$${trade.trade_min}`} disabled />
            </div>
            <div>
                <Label htmlFor="trade_max">Maximum Investment</Label>
                <Input id="trade_max" value={`$${trade.trade_max}`} disabled />
            </div>
            <div>
                <Label htmlFor="amount">Investment Amount</Label>
                <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full hover:bg-appGold200"  disabled={!!error || !amount}>Purchase</Button>
        </form>
    );
};

export function TradeFormModal({ open, setOpen, trade, portfolio, onTradePurchase }: TradeFormModalProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={(value) => setOpen?.(value)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Purchase Copy Trade</DialogTitle>
                    </DialogHeader>
                    <TradeForm trade={trade} portfolio={portfolio} onTradePurchase={onTradePurchase} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={(value) => setOpen?.(value)}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Purchase Copy Trade</DrawerTitle>
                </DrawerHeader>
                <div className="px-4">
                    <TradeForm trade={trade} portfolio={portfolio} onTradePurchase={onTradePurchase} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

