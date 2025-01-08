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
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Copy } from "lucide-react";
import DepositModal from "@/components/modals/deposit-modal";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import { databases, ID } from "@/lib/appwrite"; // Update the import path to match your Appwrite SDK setup
import ENV from "@/constants/env";
import { useProfile } from "@/app/context/ProfileContext";

const depositSchema = z.object({
  currency: z.string().nonempty("Please select a cryptocurrency."),
  amount: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive("Amount must be a positive number.")
  ),
});

type DepositFormValues = z.infer<typeof depositSchema>;

const Deposit = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [cryptocurrencies, setCryptocurrencies] = useState<
      { name: string; value: string; address: string }[]
  >([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { profile } = useProfile();

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      currency: "",
      amount: undefined,
    },
  });

  // Fetch cryptocurrencies from Appwrite database
  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const response = await databases.listDocuments(
            ENV.databaseId,
            ENV.collections.cryptoOptions
        );
        const cryptoData = response.documents.map((doc) => ({
          name: doc?.token_symbol,
          value: doc?.token_name,
          address: doc?.token_address,
        }));
        setCryptocurrencies(cryptoData);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
        toast({
          title: "Error",
          description: "Failed to fetch cryptocurrency data.",
          variant: "destructive",
        });
      }
    };

    fetchCryptocurrencies();
  }, [toast]);

  const onSubmit = async (data: DepositFormValues) => {
    // Construct the transaction payload
    const transactionPayload = {
      token_name: data.currency,
      isWithdraw: false,
      isDeposit: true,
      status: "pending",
      amount: data.amount,
      token_withdraw_address: null,
      token_deposit_address: selectedAddress,
      user_id: profile?.user_id,
      full_name: profile?.full_name,
    };

    console.log("Payload being sent to Appwrite:", transactionPayload);

    try {
      // Create the transaction in Appwrite
      await databases.createDocument(
          ENV.databaseId,
          ENV.collections.transactions,
          ID.unique(),
          transactionPayload
      );

      // Open the deposit modal after successful transaction creation
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
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast({
        title: "Error",
        description: "Failed to create the transaction.",
        variant: "destructive",
      });
    }
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
      } catch (error) {
        toast({
          title: "Copy failed",
          description: `${(error as Error).message}`,
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
              transition={{ delay: 0.3 }}
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
                                    type="number"
                                    step="0.01" // Allow decimal inputs
                                    placeholder="Enter deposit amount (e.g., 0.01)"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))} // Convert input to float
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
