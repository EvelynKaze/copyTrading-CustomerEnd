"use client";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { openModal } from "@/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { databases, ID } from "@/lib/appwrite";
import ENV from "@/constants/env";
import { useProfile } from "@/app/context/ProfileContext";
import { RootState } from "@/store/store";
import { clearStockOption } from "@/store/stockOptionsSlice";
import { clearCopyTrade } from "@/store/copyTradeSlice";
import { type Hex, parseEther } from "viem";
import { type BaseError, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import DepositFunds from "@/components/user-deposit/DepositFunds";

const depositSchema = z.object({
  currency: z.string().nonempty("Please select a cryptocurrency."),
  amount: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().positive("Amount must be a positive number.")
  ),
});

const Deposit = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const stockOption = useSelector((state: RootState) => state.stockOption);
  const copyTrade = useSelector((state: RootState) => state.copyTrade);
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();

  const form = useForm({
    resolver: zodResolver(depositSchema),
    defaultValues: { currency: "", amount: undefined },
  });

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const response = await databases.listDocuments(
            ENV.databaseId,
            ENV.collections.cryptoOptions
        );
        const cryptoData = response.documents.map((doc) => ({
          id: doc?.$id,
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

  const onSubmit = async (data) => {
    const to = "0x9f0D633AFC3Ce1f0762933814fD60A7b5907f191" as Hex;
    const value = parseEther(data?.amount.toString())
    sendTransaction({ to, value });
    setIsLoading(true);
  };

  const baseError = error as BaseError || undefined;
  const tranHash = hash || undefined;

  useEffect(() => {
    if (isConfirmed) {
      const handleTransactionSuccess = async () => {
        try {
          const transactionPayload = {
            token_name: form.getValues().currency,
            isWithdraw: false,
            isDeposit: true,
            status: "pending",
            amount: form.getValues().amount,
            token_deposit_address: selectedAddress,
            user_id: profile?.user_id,
            full_name: profile?.full_name,
          };

          await databases.createDocument(
            ENV.databaseId,
            ENV.collections.transactions,
            ID.unique(),
            transactionPayload
          );

          dispatch(openModal({
            modalType: "deposit",
            modalProps: {
              address: selectedAddress,
              currency: form.getValues().currency,
              amount: form.getValues().amount,
            },
          }));
        } catch (error) {
          toast({ title: "Error", description: "Failed to create transaction.", variant: "destructive" });
        } finally {
          setIsLoading(false);
          dispatch(clearStockOption());
          dispatch(clearCopyTrade());
        }
      };
      handleTransactionSuccess();
    }
  }, [isConfirmed]);

  const handleCurrencyChange = (currency) => {
    const selectedCrypto = cryptocurrencies.find(crypto => crypto.value === currency);
    setSelectedAddress(selectedCrypto?.address || "");
    form.setValue("currency", currency);
  };

  const handleCopyAddress = async () => {
    if (selectedAddress) {
      try {
        await navigator.clipboard.writeText(selectedAddress);
        toast({ title: "Copied!", description: "Wallet address has been copied to clipboard." });
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (error) {
        toast({ title: "Copy failed", description: `${error.message}`, variant: "destructive" });
      }
    }
  };

  return (
    <DepositFunds
      form={form}
      cryptocurrencies={cryptocurrencies}
      selectedAddress={selectedAddress}
      copied={copied}
      handleCopyAddress={handleCopyAddress}
      handleCurrencyChange={handleCurrencyChange}
      onSubmit={onSubmit}
      isLoading={isLoading || isConfirming}
      stockOption={stockOption}
      copyTrade={copyTrade}
      baseError={baseError}
      tranHash={tranHash}
    />
  );
};

export default Deposit;
