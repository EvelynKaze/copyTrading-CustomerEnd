import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
// import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
// import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {FormProvider, UseFormReturn} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";

export function AdminWithdrawalModal({
  cryptocurrencies,
  setIsTransactionOpen,
  isTransaction,
  isLoading,
  onSubmit,
  form
}: {
    cryptocurrencies: { id: string; name: string; value: string; address: string }[], 
    setIsTransactionOpen: (value: boolean) => void, 
    isTransaction: boolean, 
    isLoading: boolean, 
    onSubmit: () => void, 
    form: UseFormReturn<{ currency: string; amount: number; address: string }>
}) {
    return (
        <Dialog open={isTransaction} onOpenChange={setIsTransactionOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Make Withdrawal as User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Make Withdrawal as User</DialogTitle>
                </DialogHeader>
                    <p className="text-xs sm:text-sm">
                        Select your cryptocurrency, enter the amount and destination
                        address.
                    </p>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Cryptocurrency Select */}
                            <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cryptocurrency</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full text-start text-xs p-2 border border-appGold20">
                                                    <SelectValue placeholder="Select a currency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="dark:bg-appDark rounded text-xs">
                                                {cryptocurrencies.map((crypto) => (
                                                    <SelectItem
                                                        className="hover:bg-appGold20 outline-none hover:border-none rounded"
                                                        key={crypto.value}
                                                        value={crypto.value}
                                                    >
                                                        {crypto.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Amount Input */}
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter withdrawal amount (e.g., 0.01)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Wallet Address Input */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter destination wallet address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full text-appDarkCard bg-appCardGold"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Withdraw"}
                            </Button>
                        </form>
                    </FormProvider>
            </DialogContent>
        </Dialog>
    )
}