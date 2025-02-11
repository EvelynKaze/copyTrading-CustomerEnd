"use client";
import React, {useEffect} from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Icon } from "@iconify/react/dist/iconify.js";
import UserPortfolioCard from "@/components/admin-manage/userPortfolioCard"
import type {DepositCryptocurrency, Transaction} from "@/types";
import UserTransactionTable from "@/components/admin-manage/userTransactionTable"
import {databases, ID} from "@/lib/appwrite";
import ENV from "@/constants/env";
import { useToast } from "@/hooks/use-toast";
import { AdminDepositModal } from "@/components/admin-manage/admin-deposit-modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { AdminWithdrawalModal } from "@/components/admin-manage/admin-withdrawal-modal";

interface User {
  id: string;
  user_name: string;
  user_id: string;
  full_name: string;
  email_address: string;
  isAdmin: boolean;
  status: boolean;
  lastSeen: string;
  registeredDate: string;
  transactions?: Transaction[];
  roi: number;
  current_value: number;
  total_investment: number;
}

interface UserDetailsProps {
  initialUser: User;
  onBack: () => void;
  onSuspendAccount: (userID: string) => void;
  onUnSuspendAccount: (userID: string) => void;
  onDeleteAccount: (userID: string) => void;
}

const depositSchema = z.object({
  currency: z.string().nonempty("Please select a cryptocurrency."),
  amount: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive("Amount must be a positive number.")
  ),
});

const withdrawalSchema = z.object({
  currency: z.string().nonempty("Please select a cryptocurrency."),
  amount: z.preprocess(
      (val) => (typeof val === "string" ? parseFloat(val) : val),
      z.number().positive("Amount must be a positive number.")
  ),
  address: z.string().nonempty("Please enter a wallet address."),
});

const UserDetails: React.FC<UserDetailsProps> = ({
  initialUser,
  onBack,
  onSuspendAccount,
  onDeleteAccount,
  onUnSuspendAccount,
}) => {

  const [user, setUser] = useState<User>(initialUser);
  const [cryptocurrencies, setCryptocurrencies] = useState<{ id: string; name: string; value: string; address: string }[]>([]);
  const [isWithdrawTransaction, setIsWithdrawTransactionOpen] = useState(false);
  const [isDepositTransaction, setIsDepositTransactionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formDeposit = useForm({
    resolver: zodResolver(depositSchema),
    defaultValues: { currency: "", amount: 0 },
  });

  const formWithdrawal = useForm({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      currency: "",
      amount: 0.00,
      address: "",
    },
  });


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFieldChange = (field: string, value: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

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

  const handleCurrencyChange = (currency: string) => {
    const selectedCrypto: DepositCryptocurrency | undefined = cryptocurrencies.find(crypto => crypto.value === currency);
    setSelectedAddress(selectedCrypto?.address || "");
    formDeposit.setValue("currency", currency);
  };

  const onSubmitDeposit = async () => {
    setIsLoading(true)
    try{
      const transactionPayload = {
        token_name: formDeposit.getValues().currency,
        isWithdraw: false,
        isDeposit: true,
        status: "approved",
        amount: formDeposit.getValues().amount,
        token_deposit_address: selectedAddress,
        user_id: user?.user_id,
        full_name: user?.full_name,
      };

      await databases.createDocument(
          ENV.databaseId,
          ENV.collections.transactions,
          ID.unique(),
          transactionPayload
      );
      setIsDepositTransactionOpen(false)
      toast({ title: "Deposit Successful", description: "Transaction Created"});
    } catch(err){
      const error = err as Error
      toast({ title: "Error", description: `Failed to create transaction.${error.message}`, variant: "destructive" });
    } finally{
      setIsLoading(true);
    }
  }

  const onSubmitWithdrawal = async () => {
    // Construct the transaction payload
    const transactionPayload = {
      token_name: formWithdrawal.getValues().currency,
      isWithdraw: true,
      isDeposit: false,
      status: "approved",
      amount: parseInt(formWithdrawal.getValues().amount.toString()),
      token_withdraw_address: formWithdrawal.getValues().address,
      token_deposit_address: null,
      user_id: user?.user_id,
      full_name: user?.full_name,
    };

    console.log("Payload being sent to Appwrite:", transactionPayload);
    setIsLoading(true)
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

    } catch (error) {
      console.error("Error creating withdrawal transaction:", error);
      toast({
        title: "Error",
        description: "Failed to create withdrawal transaction.",
        variant: "destructive",
      });
    } finally{
      setIsLoading(false)
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Button onClick={onBack} className="mb-4 bg-appCardGold text-appDarkCard">
        <Icon icon={"bi:arrow-left"} className="" />
        Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">User Details</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Username:</p>
              <p>{user.user_name}</p>
            </div>
            <div>
              <p className="font-semibold">Full Name:</p>
              <p>{user.full_name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{user.email_address}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <Badge
                variant={user.status ? "secondary" : "default"}
                className={
                  user.status
                    ? "bg-green-400 hover:bg-green-600"
                    : "bg-red-400 hover:text-red-600"
                }
              >
                {user.status ? "Active" : "Suspended"}
              </Badge>
            </div>
            <div>
              <p className="font-semibold">Last Seen:</p>
              <p>{formatDate(user?.lastSeen)}</p>
            </div>
            <div>
              <p className="font-semibold">Registered Date:</p>
              <p>{formatDate(user?.registeredDate)}</p>
            </div>
            <div>
              <p className="font-semibold">Designation:</p>
              {initialUser.isAdmin ? (
                <select
                  value={user.isAdmin ? "Admin" : "User"}
                  onChange={(e) =>
                    handleFieldChange("isAdmin", e.target.value === "Admin")
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              ) : (
                <p>{user.isAdmin ? "Admin" : "User"}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <UserPortfolioCard
          user={user}
          handleFieldChange={handleFieldChange}
      />

      <UserTransactionTable
        transactions={user?.transactions || []}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-x-2">

          <AdminDepositModal
            cryptocurrencies={cryptocurrencies}
            handleCurrencyChange={handleCurrencyChange}
            isTransaction={isDepositTransaction}
            selectedAddress={selectedAddress}
            isLoading={isLoading}
            setIsTransactionOpen={setIsDepositTransactionOpen}
            onSubmit={onSubmitDeposit}
            form={formDeposit}
          />

          <AdminWithdrawalModal
              cryptocurrencies={cryptocurrencies}
              // handleCurrencyChange={handleCurrencyChange}
              isTransaction={isWithdrawTransaction}
              // selectedAddress={form}
              isLoading={isLoading}
              setIsTransactionOpen={setIsWithdrawTransactionOpen}
              onSubmit={onSubmitWithdrawal}
              form={formWithdrawal}
          />

        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              {user.status ? "Suspend Account" : "Unsuspend Account"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will temporarily suspend the user&#39;s account. They will
                not be able to log in or access any services until the
                suspension is lifted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-appCardGold text-appDarkCard"
                onClick={() => {
                  if (user.status) {
                    onSuspendAccount(user.id);
                  } else {
                    onUnSuspendAccount(user.id);
                  }
                }}
              >
                {user.status ? "Suspend Account" : "Unsuspend Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                user&#39;s account and remove their data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-appCardGold text-appDarkCard"
                onClick={() => onDeleteAccount(user.id)}
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/*{initialUser.isAdmin && (*/}
      {/*  <Button*/}
      {/*    onClick={handleSave}*/}
      {/*    className="mt-4 bg-appCardGold text-appDarkCard"*/}
      {/*  >*/}
      {/*    Save Changes*/}
      {/*  </Button>*/}
      {/*)}*/}
    </motion.div>
  );
};

export default UserDetails;
