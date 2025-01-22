"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, RefreshCw } from "lucide-react";
import { databases, Query } from "@/lib/appwrite"; // Import your database client
import ENV from "@/constants/env";
import { useProfile } from "@/app/context/ProfileContext"; // Import environment variables
import { TableSkeleton } from "@/app/admin/admin-dashboard";

interface Stock {
  $id: string;
  stock_symbol: string;
  stock_name: string;
  stock_quantity: number;
  stock_initial_value: number;
  stock_initial_value_pu: number;
  stock_current_value: number;
  stock_status: string;
  isProfit: boolean;
  stock_profit_loss: number;
  stock_change: number;
  isMinus: boolean;
  isTrading: boolean;
}

const PortfolioPage = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const { profile } = useProfile();
  const user_id = profile?.user_id || "";
  const [sortConfig, setSortConfig] = useState({
    key: "symbol",
    direction: "asc",
  });
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        const response = await databases.listDocuments(
          ENV.databaseId,
          ENV.collections.stockOptionsPurchases,
          [Query.equal("user_id", user_id)]
        );
        const stocksData = response.documents.map((doc) => ({
          $id: doc.$id,
          stock_symbol: doc.stock_symbol,
          stock_name: doc.stock_name,
          stock_quantity: doc.stock_quantity,
          stock_initial_value: doc.stock_initial_value,
          stock_initial_value_pu: doc.stock_initial_value_pu,
          stock_current_value: doc.stock_current_value,
          stock_status: doc.stock_status,
          isProfit: doc.isProfit,
          stock_profit_loss: doc.stock_profit_loss,
          stock_change: doc.stock_change,
          isMinus: doc.isMinus,
          isTrading: doc.isTrading,
        }));
        setStocks(stocksData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, [user_id]);

  //   type StockKey = {
  //     [key: string]: string | number; // Adjust based on the actual properties and types of your stock data
  // };

  const handleSort = (key: keyof Stock) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setStocks((prevStocks) =>
      [...prevStocks].sort((a: Stock, b: Stock) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const filteredStocks =
    filter === "all"
      ? stocks
      : stocks.filter((stock: Stock) => {
          const totalValue = stock.stock_current_value * stock.stock_quantity;
          const purchaseValue = stock.stock_initial_value;
          const percentageChange =
            ((totalValue - purchaseValue) / purchaseValue) * 100;

          if (filter === "gainers") return percentageChange > 0;
          if (filter === "losers") return percentageChange < 0;
          return true;
        });

  const calculateTotalValue = (stock: Stock) => {
    return (stock.stock_quantity * stock.stock_current_value).toFixed(2);
  };

  // const calculateProfitLoss = (stock: any) => {
  //   const totalValue = stock.stock_quantity * stock.stock_current_values;
  //   const purchaseValue = stock.stock_quantity * stock.stock_initial_value;
  //   return (totalValue - purchaseValue).toFixed(2);
  // };
  //
  // const calculatePercentageChange = (stock: any) => {
  //   const totalValue = stock.stock_quantity * stock.stock_current_values;
  //   const purchaseValue = stock.stock_quantity * stock.stock_initial_value;
  //   return (((totalValue - purchaseValue) / purchaseValue) * 100).toFixed(2);
  // };

  return (
    <div className="flex h-full justify-center items-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card>
          <CardHeader className="flex w-full flex-col sm:flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Your Portfolio</CardTitle>
            <div className="flex w-full flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:space-x-4">
              <Select className="w-full sm:w-max" onValueChange={handleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter stocks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stocks</SelectItem>
                  <SelectItem value="gainers">Gainers</SelectItem>
                  <SelectItem value="losers">Losers</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="bg-appCardGold w-full sm:w-max"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Prices
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("stock_symbol")}
                      className="cursor-pointer"
                    >
                      Symbol{" "}
                      {sortConfig.key === "stock_symbol" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("stock_name")}
                      className="cursor-pointer"
                    >
                      Name{" "}
                      {sortConfig.key === "stock_name" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("stock_quantity")}
                      className="cursor-pointer"
                    >
                      Quantity{" "}
                      {sortConfig.key === "stock_quantity" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("stock_initial_value")}
                      className="cursor-pointer"
                    >
                      Ini. Total Value{" "}
                      {sortConfig.key === "stock_initial_value" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("stock_current_value")}
                      className="cursor-pointer"
                    >
                      Initial Value(pu){" "}
                      {sortConfig.key === "stock_current_values" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("stock_current_value")}
                      className="cursor-pointer"
                    >
                      Current Value(pu){" "}
                      {sortConfig.key === "stock_current_values" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Profit/Loss</TableHead>
                    <TableHead>% Change</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStocks.map((stock: Stock) => (
                    <TableRow key={stock?.$id}>
                      <TableCell className="font-medium">
                        {stock?.stock_symbol}
                      </TableCell>
                      <TableCell>{stock?.stock_name}</TableCell>
                      <TableCell>{stock?.stock_quantity}</TableCell>
                      <TableCell>
                        ${Number(stock?.stock_initial_value || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        ${Number(stock?.stock_initial_value_pu || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {stock?.stock_status == "pending" ? (
                          <span className="bg-yellow-400 rounded-xl animate-pulse p-2 text-white">
                            Processing
                          </span>
                        ) : stock?.stock_status == "rejected" ? (
                          <span className="bg-red-400 rounded-xl animate-pulse p-2 text-white">
                            Rejected
                          </span>
                        ) : (
                          `$${stock?.stock_current_value.toFixed(2)}`
                        )}
                      </TableCell>
                      <TableCell>
                        {stock?.stock_status == "pending" ? (
                          <span className="bg-yellow-400 rounded-xl animate-pulse p-2 text-white">
                            Processing
                          </span>
                        ) : stock?.stock_status == "rejected" ? (
                          <span className="bg-red-400 rounded-xl animate-pulse p-2 text-white">
                            Rejected
                          </span>
                        ) : (
                          `$${calculateTotalValue(stock)}`
                        )}
                      </TableCell>
                      <TableCell>
                        {stock?.stock_status == "pending" ? (
                          <span className="bg-yellow-400 rounded-xl animate-pulse p-2 text-white">
                            Processing
                          </span>
                        ) : stock?.stock_status == "rejected" ? (
                          <span className="bg-red-400 rounded-xl animate-pulse p-2 text-white">
                            Rejected
                          </span>
                        ) : (
                          <span
                            className={
                              stock?.isProfit
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            ${stock?.stock_profit_loss.toFixed(2)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {stock?.stock_status == "pending" ? (
                          <span className="bg-yellow-400 rounded-xl animate-pulse p-2 text-white">
                            Processing
                          </span>
                        ) : stock?.stock_status == "rejected" ? (
                          <span className="bg-red-400 rounded-xl animate-pulse p-2 text-white">
                            Rejected
                          </span>
                        ) : (
                          <span
                            className={
                              stock?.isMinus ? "text-green-600" : "text-red-600"
                            }
                          >
                            {stock?.stock_change.toFixed(2)}%
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {stock?.stock_status == "approved" && (
                          <Button className="bg-appCardGold w-full sm:w-max">
                            {stock?.isTrading ? "View Trade" : "Copy Trade"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PortfolioPage;
