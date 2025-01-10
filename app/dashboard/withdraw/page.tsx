"use client";
import { useState, useEffect } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import WithdrawalModal from "@/components/modals/withdrawal-modal";
// import { openModal } from "@/store/modalSlice";
// import { useDispatch } from "react-redux";
import ENV from "@/constants/env";
import { useProfile } from "@/app/context/ProfileContext";
import { databases, ID } from "@/lib/appwrite";
import { useToast } from "@/hooks/use-toast";

const withdrawalSchema = z.object({
    currency: z.string().nonempty("Please select a cryptocurrency."),
    amount: z.preprocess(
        (val) => (typeof val === "string" ? parseFloat(val) : val),
        z.number().positive("Amount must be a positive number.")
    ),
    address: z.string().nonempty("Please enter a wallet address."),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

const Withdrawal = () => {
    const { profile } = useProfile();
    const { toast } = useToast();
    // const dispatch = useDispatch();
    const [cryptocurrencies, setCryptocurrencies] = useState<
        { name: string; value: string; address: string }[]
    >([]);

    const form = useForm<WithdrawalFormValues>({
        resolver: zodResolver(withdrawalSchema),
        defaultValues: {
            currency: "",
            amount: undefined,
            address: "",
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

    const onSubmit = async (data: WithdrawalFormValues) => {
        // Construct the transaction payload
        const transactionPayload = {
            token_name: data.currency,
            isWithdraw: true,
            isDeposit: false,
            status: "pending",
            amount: data.amount,
            token_withdraw_address: data.address,
            token_deposit_address: null,
            user_id: profile?.user_id,
            full_name: profile?.full_name,
        };

        console.log("Payload being sent to Appwrite:", transactionPayload);

        try {
            await databases.createDocument(
                ENV.databaseId,
                ENV.collections.transactions,
                ID.unique(),
                transactionPayload
            );

            toast({
                title: "Success",
                description: "Withdrawal request created successfully.",
            });

            // dispatch(
            //     openModal({
            //         modalType: "withdrawal",
            //         modalProps: {
            //             address: data.address,
            //             currency: data.currency,
            //             amount: data.amount,
            //         },
            //     })
            // );
        } catch (error) {
            console.error("Error creating withdrawal transaction:", error);
            toast({
                title: "Error",
                description: "Failed to create withdrawal transaction.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex h-full justify-center items-center w-full">
            <div className="p-2 sm:p-4 md:p-8 grid justify-items-center">
                <h1 className="text-2xl md:text-4xl font-bold">Withdraw Funds</h1>
                <p className="mb-10 text-sm md:text-base">to Crypto Wallet</p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="w-[300px] sm:w-[350px]">
                        <CardHeader>
                            <CardDescription className="text-xs sm:text-sm">
                                Select your cryptocurrency, enter the amount and destination
                                address.
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
                                                        type="text"
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
                                    >
                                        Withdraw
                                    </Button>
                                </form>
                            </FormProvider>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            <WithdrawalModal />
        </div>
    );
};

export default Withdrawal;
