"use client";

import React, { useState } from "react";
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

// Mock data for transactions
const mockTransactions = [
  {
    id: 1,
    type: "Deposit",
    amount: 0.5,
    currency: "BTC",
    status: "Completed",
    date: "2023-06-01T10:00:00Z",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: 1.2,
    currency: "ETH",
    status: "Pending",
    date: "2023-06-02T14:30:00Z",
  },
  {
    id: 3,
    type: "Deposit",
    amount: 100,
    currency: "USDT",
    status: "Completed",
    date: "2023-06-03T09:15:00Z",
  },
  {
    id: 4,
    type: "Withdrawal",
    amount: 0.1,
    currency: "BTC",
    status: "Completed",
    date: "2023-06-04T16:45:00Z",
  },
  {
    id: 5,
    type: "Deposit",
    amount: 2.5,
    currency: "ETH",
    status: "Completed",
    date: "2023-06-05T11:20:00Z",
  },
];

const TransactionHistory = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState(mockTransactions);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [filter, setFilter] = useState({
    type: "all",
    currency: "all",
    status: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setTransactions(
      transactions.sort((a: any, b: any) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const handleFilter = (key: string, value: string) => {
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
    <div className="flex h-full justify-center w-full sm:px-4 sm:px-0">
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
              className="w-full sm:w-auto bg-appCardGold"
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
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="USDT">Tether (USDT)</SelectItem>
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
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("type")}
                      className="cursor-pointer"
                    >
                      Type{" "}
                      {sortConfig.key === "type" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("amount")}
                      className="cursor-pointer"
                    >
                      Amount{" "}
                      {sortConfig.key === "amount" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("currency")}
                      className="cursor-pointer"
                    >
                      Currency{" "}
                      {sortConfig.key === "currency" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("status")}
                      className="cursor-pointer"
                    >
                      Status{" "}
                      {sortConfig.key === "status" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("date")}
                      className="cursor-pointer"
                    >
                      Date{" "}
                      {sortConfig.key === "date" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.type}
                      </TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.currency}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "Completed"
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(transaction.date)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
