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
} from "@/components/ui/select";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Copy } from "lucide-react";
import DepositModal from "@/components/modals/deposit-modal";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      currency: "",
      amount: "",
    },
  });

  const onSubmit = (data: DepositFormValues) => {
    dispatch(
      openModal({
        modalType: "deposit",
        modalProps: {
          address: selectedAddress,
          currency: data.currency,
          amount: data.amount,
        },
      })
    );
  };

  const handleCurrencyChange = (currency: string) => {
    const selectedCrypto = cryptocurrencies.find(
      (crypto) => crypto.value === currency
    );
    setSelectedAddress(selectedCrypto?.address || "");
    form.setValue("currency", currency);
  };

  const handleCopyAddress = async () => {
    if (selectedAddress) {
      try {
        await navigator.clipboard.writeText(selectedAddress);
        toast({
          title: "Copied!",
          description: "Wallet address has been copied to clipboard.",
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        // Cast err as an instance of Error
        const error = err as Error;
        toast({
          title: "Copy failed",
          description: `${error.message}`,
          variant: "destructive",
        });
      }
    }
  };


  return (
    <div className="flex h-full justify-center items-center w-full gap-6">
      <div className="p-8 grid justify-items-center">
        <h1 className="text-2xl md:text-4xl font-bold">Deposit Funds</h1>
        <p className="mb-10 text-sm md:text-base">via Crypto Wallet</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3}}
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
                        <Select
                          onValueChange={handleCurrencyChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-start text-xs p-2 border border-appGold20">
                              <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="dark:bg-appDark grid gap-2 p-2 rounded text-sm">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Wallet Address Display */}
                  <div className="flex items-end gap-2">
                    <p className="text-sm w-5/6 overflow-x-scroll text-muted-foreground">
                      Wallet Address:{" "}
                      <span className="font-medium">{selectedAddress}</span>
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyAddress}
                      disabled={!selectedAddress}
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied!" : "Copy"}
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

                  <Button
                    type="submit"
                    className="w-full text-appDarkCard bg-appCardGold"
                  >
                    Deposit
                  </Button>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <DepositModal />
    </div>
  );
};

export default Deposit;
