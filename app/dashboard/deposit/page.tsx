"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

// Define the cryptocurrencies and their wallet addresses
const cryptocurrencies = [
  {
    name: "Bitcoin (BTC)",
    value: "btc",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
  {
    name: "Ethereum (ETH)",
    value: "eth",
    address: "0x32Be343B94f860124dC4fEe278FDCBD38C102D88",
  },
  {
    name: "Tether (USDT)",
    value: "usdt",
    address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
  },
];

const depositSchema = z.object({
  currency: z.string().nonempty("Please select a cryptocurrency."),
  amount: z.string().nonempty("Please enter an amount."),
});

type DepositFormValues = z.infer<typeof depositSchema>;

const Deposit = () => {
  const { toast } = useToast();
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      currency: "",
      amount: "",
    },
  });

  const onSubmit = (data: DepositFormValues) => {
    toast({
      title: "Deposit Successful",
      description: `You have successfully deposited ${data.amount} to ${selectedAddress}.`,
    });
  };

  const handleCurrencyChange = (currency: string) => {
    const selectedCrypto = cryptocurrencies.find(
      (crypto) => crypto.value === currency
    );
    setSelectedAddress(selectedCrypto?.address || "");
    console.log(selectedCrypto, selectedAddress);
  };

  return (
    <div className="flex h-full justify-center items-center w-full gap-6">
      <div className="p-8 grid justify-items-center">
        <h1 className="text-4xl font-bold">Deposit Funds</h1>
        <p className="mb-10 text-base">via Crypto Wallet</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-[300px] sm:w-[350px]">
            <CardHeader>
              <CardDescription>
                Select your cryptocurrency and deposit amount.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCurrencyChange(value);
                            }}
                          >
                            <SelectTrigger className="w-full text-start text-xs p-2 border border-appGold20">
                              <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                            <SelectContent className="bg-appDark grid gap-2 p-2 rounded text-sm">
                              {cryptocurrencies.map((crypto) => (
                                <SelectItem
                                  className="hover:bg-appGold20 outline-none hover:border-none p-1 rounded"
                                  key={crypto.value}
                                  value={crypto.value}
                                >
                                  {crypto.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Wallet Address Display */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      Wallet Address:{" "}
                      <span className="font-medium">{selectedAddress}</span>
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedAddress);
                        toast({
                          title: "Copied!",
                          description:
                            "Wallet address has been copied to clipboard.",
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter deposit amount (e.g., 0.01)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-appCardGold">
                    Deposit
                  </Button>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Deposit;
