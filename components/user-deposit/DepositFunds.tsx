import { motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Copy } from "lucide-react";
import DepositModal from "@/components/modals/deposit-modal";
import TransactionHash from "@/components/user-deposit/TransactionHash";
import { UseFormReturn } from "react-hook-form";
import { useAccount } from "wagmi";
import { PaymentModal } from "./payment-modal"
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface DepositFundsProps {
  form: UseFormReturn<{ currency: string; amount: number }>;
  cryptocurrencies: Array<{ id: string; value: string; name: string }>;
  selectedAddress: string;
  copied?: boolean;
  handleCopyAddress?: () => void;
  handleCurrencyChange: (value: string) => void;
  onSubmit: (data: { currency: string; amount: number }) => void;
  isLoading: boolean;
  stockOption: { stock: { total: number } };
  copyTrade: { copy: { title: string; trade_min: number; trade_max: number } };
  baseError: { shortMessage: string };
  tranHash: string;
}

const DepositFunds: React.FC<DepositFundsProps> = ({ 
  form, 
  cryptocurrencies, 
  selectedAddress, 
  // copied,
  // handleCopyAddress,
  handleCurrencyChange, 
  onSubmit, 
  isLoading, 
  stockOption, 
  copyTrade,
  baseError,
  tranHash
}) => {
  console.log("Tokens", cryptocurrencies)

  const { isConnected } = useAccount();
  const { toast } = useToast();
  const [ showPaymentModal, setShowPaymentModal ] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleDepositClick = () => {
    if(!isConnected){
      setShowPaymentModal(true)
    } else {
      form.handleSubmit(onSubmit)()
    }
  }

  const handlePaymentOption = (option: string) => {
    if (option === "copy_wallet"){
      dispatch(openModal({
        modalType: "deposit",
        modalProps: { address: selectedAddress, currency: form.getValues("currency"), amount: form.getValues("amount") },
      }));
      setShowPaymentModal(false)
      setOpen(false)
    } else if (option === "connect_wallet") {
      setOpen(false)
      toast({ title: "Wallet Not Connected!", description: "Please connect your wallet above."});
    }
  };

  // dispatch(
  //     openModal({
  //         modalType: "deposit",
  //         modalProps: {
  //             address: selectedAddress,
  //             currency: data.currency,
  //             amount: data.amount,
  //         },
  //     })
  // );
  console.log("show payment state", showPaymentModal)

  return (
    <div className="flex h-full justify-center items-center w-full gap-6">
      <div className="p-8 grid justify-items-center">
        <h1 className="text-2xl md:text-4xl font-bold">Deposit Funds</h1>
        <p className="mb-10 text-sm md:text-base">via Crypto Wallet</p>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card className="w-[300px] sm:w-[350px]">
            <CardHeader>
              <CardDescription>
                Select your cryptocurrency and deposit amount.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                  {/*<div className="flex items-end gap-2">*/}
                  {/*  <p className="text-sm w-5/6 overflow-x-scroll text-muted-foreground">*/}
                  {/*    Wallet Address: <span className="font-medium">{selectedAddress}</span>*/}
                  {/*  </p>*/}
                  {/*  <Button type="button" variant="ghost" size="sm" onClick={handleCopyAddress} disabled={!selectedAddress}>*/}
                  {/*    <Copy className="h-4 w-4" />*/}
                  {/*    {copied ? "Copied!" : "Copy"}*/}
                  {/*  </Button>*/}
                  {/*</div>*/}
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
                  {stockOption?.stock?.total !== 0 && Object.keys(stockOption?.stock).length > 0 && (
                    <div>
                      <FormLabel>Total Amount to Deposit</FormLabel>
                      <Input type="number" value={stockOption?.stock?.total} disabled className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Deposit the amount stated above in crypto to complete the stock purchase.
                      </p>
                    </div>
                  )}
                  {copyTrade?.copy?.title !== "" && Object.keys(copyTrade?.copy).length > 0 && (
                    <div>
                      <FormLabel>Plan</FormLabel>
                      <Input type="text" value={copyTrade?.copy?.title} disabled className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Deposit ${copyTrade?.copy?.trade_min} in crypto to complete the Plan purchase.
                      </p>
                    </div>
                  )}
                  <PaymentModal
                      handlePaymentOption={handlePaymentOption}
                      open={open}
                      setOpen={setOpen}
                      isLoading={isLoading}
                      handleDepositClick={handleDepositClick}
                  />
                  {/* {baseError?.shortMessage && (
                    <p className="text-sm text-red-500">{baseError?.shortMessage}</p>
                  )} */}
                    {tranHash && (
                        <TransactionHash hash={tranHash} />
                    )}
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <DepositModal />
      {/*{showPaymentModal && }*/}
    </div>
  );
};

export default DepositFunds;
