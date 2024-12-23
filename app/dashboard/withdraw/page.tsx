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
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";

// Define the cryptocurrencies
const cryptocurrencies = [
  { name: "Bitcoin (BTC)", value: "btc" },
  { name: "Ethereum (ETH)", value: "eth" },
  { name: "Tether (USDT)", value: "usdt" },
];

const withdrawalSchema = z.object({
  currency: z.string().nonempty("Please select a cryptocurrency."),
  amount: z.string().nonempty("Please enter an amount."),
  address: z.string().nonempty("Please enter a wallet address."),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

const Withdrawal = () => {
  const dispatch = useDispatch();
  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      currency: "",
      amount: "",
      address: "",
    },
  });

  const onSubmit = (data: WithdrawalFormValues) => {
    dispatch(
      openModal({
        modalType: "withdrawal",
        modalProps: {
          address: data.address,
          currency: data.currency,
          amount: data.amount,
        },
      })
    );
  };

  return (
    <div className="flex h-full justify-center items-center w-full">
      <div className="p-2 sm:p-4 md:p-8 grid justify-items-center">
        <h1 className="text-2xl md:text-4xl font-bold">Withdraw Funds</h1>
        <p className="mb-10 text-sm md:text-base">to Crypto Wallet</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
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
                          <SelectContent className="bg-appDark rounded text-xs">
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

                  <Button type="submit" className="w-full bg-appCardGold">
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
