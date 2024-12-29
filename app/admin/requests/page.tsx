"use client";

import { useState } from "react";
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

// Mock data for transactions
const initialTransactions = [
  {
    id: 1,
    type: "withdrawal",
    amount: 500,
    user: "john@example.com",
    status: "pending",
    date: "2023-06-01",
  },
  {
    id: 2,
    type: "deposit",
    amount: 1000,
    user: "sarah@example.com",
    status: "pending",
    date: "2023-06-02",
  },
  {
    id: 3,
    type: "withdrawal",
    amount: 250,
    user: "mike@example.com",
    status: "pending",
    date: "2023-06-03",
  },
  {
    id: 4,
    type: "deposit",
    amount: 750,
    user: "emma@example.com",
    status: "pending",
    date: "2023-06-04",
  },
  {
    id: 5,
    type: "withdrawal",
    amount: 300,
    user: "alex@example.com",
    status: "pending",
    date: "2023-06-05",
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const handleApprove = (id: number) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, status: "approved" } : t))
    );
  };

  const handleReject = (id: number) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, status: "rejected" } : t))
    );
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
              <TableHead>Amount</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Badge
                    variant={
                      transaction.type === "withdrawal"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {transaction.type === "withdrawal" ? (
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-4 w-4" />
                    )}
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      transaction.status === "pending"
                        ? "bg-yellow-400"
                        : transaction.status === "approved"
                        ? "bg-green-500"
                        : "bg-red-600"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {transaction.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(transaction.id)}
                      >
                        <CheckIcon className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(transaction.id)}
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
