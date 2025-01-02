"use client";

import React from "react";
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

interface Transaction {
  id: number;
  type: string;
  amount: number;
  currency: string;
  date: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  status: "online" | "offline";
  lastSeen: string;
  registeredDate: string;
  transactions: Transaction[];
}

interface UserDetailsProps {
  user: User;
  onBack: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onBack }) => {
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

  const handleSuspendAccount = () => {
    console.log("Account suspended");
    // Implement account suspension logic here
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    // Implement account deletion logic here
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
              <p>{user.username}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <Badge
                variant={user.status === "online" ? "secondary" : "default"}
                className={
                  user.status === "online"
                    ? "bg-green-500 hover:bg-green-600"
                    : ""
                }
              >
                {user.status}
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
                {user.transactions.map((transaction) => (
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
            <Button variant="destructive">Suspend Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will temporarily suspend the user&#39;s account. They will not
                be able to log in or access any services until the suspension is
                lifted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-appCardGold text-appDarkCard"
                onClick={handleSuspendAccount}
              >
                Suspend Account
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
                onClick={handleDeleteAccount}
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
};

export default UserDetails;
