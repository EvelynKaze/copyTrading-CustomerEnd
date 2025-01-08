"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, XIcon } from "lucide-react";
import { databases } from "@/lib/appwrite";
import ENV from "@/constants/env";
import { useToast } from "@/hooks/use-toast";

export default function TransactionsPage() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<any>([]);

  // Fetch transactions from Appwrite database
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await databases.listDocuments(
            ENV.databaseId,
            ENV.collections.transactions
        );

        // Sort transactions by date (newest first)
        const sortedTransactions = response.documents.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(sortedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast({
          title: "Error",
          description: "Failed to fetch transactions.",
          variant: "destructive",
        });
      }
    };

    fetchTransactions();
  }, [toast]);

  const handleApprove = async (id: string) => {
    try {
      await databases.updateDocument(
          ENV.databaseId,
          ENV.collections.transactions,
          id,
          { status: true }
      );
      setTransactions((prev) =>
          prev.map((t) => (t.$id === id ? { ...t, status: true } : t))
      );
      toast({
        title: "Success",
        description: "Transaction approved successfully.",
      });
    } catch (error) {
      console.error("Error approving transaction:", error);
      toast({
        title: "Error",
        description: "Failed to approve transaction.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await databases.updateDocument(
          ENV.databaseId,
          ENV.collections.transactions,
          id,
          { status: null }
      );
      setTransactions((prev) =>
          prev.map((t) => (t.$id === id ? { ...t, status: null } : t))
      );
      toast({
        title: "Success",
        description: "Transaction rejected successfully.",
      });
    } catch (error) {
      console.error("Error rejecting transaction:", error);
      toast({
        title: "Error",
        description: "Failed to reject transaction.",
        variant: "destructive",
      });
    }
  };

  return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            View and manage recent withdrawal and deposit requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Withdraw Address</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                  <TableRow key={transaction.$id}>
                    <TableCell>
                      <Badge
                          variant={
                            transaction.isWithdraw ? "destructive" : "default"
                          }
                      >
                        {transaction.isWithdraw ? (
                            <ArrowUpIcon className="mr-1 h-4 w-4" />
                        ) : (
                            <ArrowDownIcon className="mr-1 h-4 w-4" />
                        )}
                        {transaction.isWithdraw ? "withdrawal" : "deposit"}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.token_name}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      {transaction.isWithdraw
                          ? transaction.token_withdraw_address
                          : "(empty)"}
                    </TableCell>
                    <TableCell>{transaction.full_name}</TableCell>
                    <TableCell>{new Date(transaction.$createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                          className={
                            transaction.status === false
                                ? "bg-yellow-400"
                                : transaction.status === true
                                    ? "bg-green-500"
                                    : "bg-red-600"
                          }
                      >
                        {transaction.status === false ? "Pending" :
                        transaction.status === true ? "Completed" : "Rejected"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.status === false && (
                          <div className="flex space-x-2">
                            <Button
                                size="sm"
                                onClick={() => handleApprove(transaction.$id)}
                            >
                              <CheckIcon className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(transaction.$id)}
                            >
                              <XIcon className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                      )}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}
