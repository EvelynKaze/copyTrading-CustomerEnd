"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Copy, Wallet } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface PaymentModalProps {
    handlePaymentOption: (option: string) => void;
    open?: boolean;
    setOpen?: (value: boolean) => void;
    isLoading?: boolean;
    handleDepositClick?: () => void;
}

const PaymentOptions: React.FC<PaymentModalProps> = ({ handlePaymentOption }) => {
    return (
        <div className="grid gap-4 py-4">
            <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => handlePaymentOption('copy_wallet')}
            >
                <Copy className="h-4 w-4" />
                Copy Wallet Address
            </Button>
            <Button
                className="w-full justify-start gap-2"
                onClick={() => handlePaymentOption('connect_wallet')}
            >
                <Wallet className="h-4 w-4" />
                Connect Wallet
            </Button>
        </div>
    )
}

export function PaymentModal({ handlePaymentOption, open, setOpen, handleDepositClick, isLoading }: PaymentModalProps) {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        className="w-full text-appDarkCard bg-appCardGold"
                        onClick={handleDepositClick}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Deposit"}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Choose Payment Method</DialogTitle>
                    </DialogHeader>
                    <PaymentOptions handlePaymentOption={handlePaymentOption} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    type="button"
                    className="w-full text-appDarkCard bg-appCardGold"
                    onClick={handleDepositClick}
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Deposit"}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Choose Payment Method</DrawerTitle>
                </DrawerHeader>
                <div className="px-4">
                    <PaymentOptions handlePaymentOption={handlePaymentOption} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}
