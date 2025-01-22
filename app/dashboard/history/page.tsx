"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, Download } from "lucide-react";
import { databases, Query } from "@/lib/appwrite";
import ENV from "@/constants/env";
import { useProfile } from "@/app/context/ProfileContext";
import { TableSkeleton } from "@/app/admin/admin-dashboard";

interface Transaction {
  $id: string;
  $createdAt: string;
  type: string;
  amount: number;
  token_name: string;
  currency: string;
  status: string;
  isDeposit?: boolean;
  date: string;
}

interface Token {
  $id: string;
  token_name: string;
  token_symbol: string;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

interface FilterConfig {
  type: string;
  currency: string;
  status: string;
}

const TransactionHistory = () => {
  const { toast } = useToast();
  const { profile } = useProfile();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "date",
    direction: "desc",
  });
  const [filter, setFilter] = useState<FilterConfig>({
    type: "all",
    currency: "all",
    status: "all",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch transactions from Appwrite
    const fetchTransactions = async () => {
      const user_id = profile?.user_id || "id";
      setIsLoading(true);
      try {
        const response = await databases.listDocuments(
          ENV.databaseId,
          ENV.collections.transactions,
          [Query.equal("user_id", user_id)]
        );
        const sortedTransactions = (
          response.documents as unknown as Transaction[]
        ).map((transaction) => ({
          ...transaction,
          type: transaction.isDeposit ? "Deposit" : "Withdrawal",
        }));
        setTransactions(sortedTransactions);
        console.log("Transactions", response.documents);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch tokens from Appwrite
    const fetchTokens = async () => {
      try {
        const response = await databases.listDocuments(
          ENV.databaseId,
          ENV.collections.cryptoOptions
        );
        setTokens(response.documents as unknown as Token[]);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTransactions();
    fetchTokens();
  }, [profile]);

  const handleSort = (key: keyof Transaction) => {
    if (!sortConfig || !transactions) {
      return;
    }

    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedTransactions = [...transactions].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setTransactions(sortedTransactions);
  };

  const handleFilter = (key: keyof FilterConfig, value: string) => {
    setFilter({ ...filter, [key]: value });
    setCurrentPage(1);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (filter.type === "all" || transaction.type === filter.type) &&
      (filter.currency === "all" || transaction.currency === filter.currency) &&
      (filter.status === "all" || transaction.status === filter.status)
    );
  });

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your transaction history is being downloaded.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-full justify-center w-full sm:px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <CardTitle className="text-2xl font-bold">
              Transaction History
            </CardTitle>
            <Button
              onClick={handleDownload}
              className="w-full text-appDarkCard sm:w-auto bg-appCardGold"
            >
              <Download className="h-4 w-4 mr-2" />
              <span>Download CSV</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Select
                onValueChange={(value) => handleFilter("type", value)}
                className="w-full sm:w-[180px]"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Deposit">Deposit</SelectItem>
                  <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => handleFilter("currency", value)}
                className="w-full sm:w-[180px]"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Currencies</SelectItem>
                  {tokens?.map((token) => (
                    <SelectItem key={token.$id} value={token.token_symbol}>
                      {token.token_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => handleFilter("status", value)}
                className="w-full sm:w-[180px]"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected/Failed</SelectItem>
                </SelectContent>
              </Select>
              <Input
                className="w-full sm:w-[200px]"
                type="text"
                placeholder="Search transactions..."
                onChange={(e) => {
                  console.log("Search:", e.target.value);
                }}
              />
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        onClick={() => handleSort("type")}
                        className="cursor-pointer"
                      >
                        Type
                        {sortConfig.key === "type" && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                      <TableHead
                        onClick={() => handleSort("amount")}
                        className="cursor-pointer"
                      >
                        Amount
                        {sortConfig.key === "amount" && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                      <TableHead
                        onClick={() => handleSort("currency")}
                        className="cursor-pointer"
                      >
                        Currency
                        {sortConfig.key === "currency" && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                      <TableHead
                        onClick={() => handleSort("status")}
                        className="cursor-pointer"
                      >
                        Status
                        {sortConfig.key === "status" && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                      <TableHead
                        onClick={() => handleSort("date")}
                        className="cursor-pointer"
                      >
                        Date
                        {sortConfig.key === "date" && (
                          <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        )}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTransactions?.map((transaction) => (
                      <TableRow key={transaction.$id}>
                        <TableCell className="font-medium">
                          {transaction.type}
                        </TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.token_name}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              transaction.status === "approved"
                                ? "bg-green-200 text-green-800"
                                : transaction.status === "pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-300 text-red-600"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(transaction?.$createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, pageCount))
                    }
                    className={
                      currentPage === pageCount
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TransactionHistory;
