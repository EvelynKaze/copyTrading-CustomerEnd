"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
}

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
  currentValue: number;
  totalInvestment: number;
}

interface UserDetailsProps {
  initialUser: User;
  onBack: () => void;
  onSuspendAccount: (userID: string) => void;
  onUnSuspendAccount: (userID: string) => void;
  onDeleteAccount: (userID: string) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  initialUser,
  onBack,
  onSuspendAccount,
  onDeleteAccount,
  onUnSuspendAccount,
}) => {
  const [user, setUser] = useState<User>(initialUser);

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

  const handleFieldChange = (field: string, value: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically call an API to save the changes
      // For now, we'll just log the updated user object
      console.log("Saving user changes:", user);
      // You can add a toast notification here to indicate successful save
    } catch (error) {
      console.error("Error saving user changes:", error);
      // You can add an error toast notification here
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
              <p>{formatDate(user.lastSeen)}</p>
            </div>
            <div>
              <p className="font-semibold">Registered Date:</p>
              <p>{formatDate(user.registeredDate)}</p>
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">ROI:</p>
              {initialUser.isAdmin ? (
                <input
                  type="number"
                  value={user.roi}
                  onChange={(e) =>
                    handleFieldChange("roi", Number.parseFloat(e.target.value))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              ) : (
                <p>{user.roi}%</p>
              )}
            </div>
            <div>
              <p className="font-semibold">Current Value:</p>
              {initialUser.isAdmin ? (
                <input
                  type="number"
                  value={user.currentValue}
                  onChange={(e) =>
                    handleFieldChange(
                      "currentValue",
                      Number.parseFloat(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              ) : (
                <p>${user.currentValue}</p>
              )}
            </div>
            <div>
              <p className="font-semibold">Total Investment:</p>
              {initialUser.isAdmin ? (
                <input
                  type="number"
                  value={user.totalInvestment}
                  onChange={(e) =>
                    handleFieldChange(
                      "totalInvestment",
                      Number.parseFloat(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              ) : (
                <p>${user.totalInvestment.toFixed(2)}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.transactions?.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.currency}</TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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

      {initialUser.isAdmin && (
        <Button
          onClick={handleSave}
          className="mt-4 bg-appCardGold text-appDarkCard"
        >
          Save Changes
        </Button>
      )}
    </motion.div>
  );
};

export default UserDetails;
