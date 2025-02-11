import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
// import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
// import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {FormProvider, UseFormReturn} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";

export function AdminDepositModal({
    cryptocurrencies,
    setIsTransactionOpen,
    isTransaction,
    handleCurrencyChange,
    selectedAddress,
    isLoading,
    onSubmit,
    form
}: {
    cryptocurrencies: { id: string; name: string; value: string; address: string }[], 
    setIsTransactionOpen: (value: boolean) => void, 
    isTransaction: boolean, 
    isLoading: boolean, 
    onSubmit: () => void,
    handleCurrencyChange: (value: string) => void,
    selectedAddress: string,
    form: UseFormReturn<{ currency: string; amount: number }>
}) {
    return (
        <Dialog open={isTransaction} onOpenChange={setIsTransactionOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Make Deposit as User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Make Deposit as User</DialogTitle>
                </DialogHeader>
                <p>Select your cryptocurrency and deposit amount.</p>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cryptocurrency</FormLabel>
                                    <Select onValueChange={handleCurrencyChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full text-start text-xs p-2 border border-appGold20">
                                                <SelectValue placeholder="Select a currency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="dark:bg-appDark grid gap-2 p-2 rounded text-sm">
                                            {cryptocurrencies.map((crypto) => (
                                                <SelectItem key={crypto?.id} value={crypto?.value} className="hover:bg-appGold20 outline-none hover:border-none p-1 rounded">
                                                    {crypto?.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-end gap-2">
                            <p className="text-sm w-5/6 overflow-x-scroll text-muted-foreground">
                                Wallet Address: <span className="font-medium">{selectedAddress}</span>
                            </p>
                        </div>
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" placeholder="Enter deposit amount (e.g., 0.01)" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
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
                            {isLoading ? "Processing..." : "Deposit"}
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}