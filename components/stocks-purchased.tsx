"use client";

import React, { useState } from "react";
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

// Mock data for purchased stocks
const mockStocks = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 10,
    averagePrice: 150.75,
    currentPrice: 155.5,
  },
  {
    id: 2,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 5,
    averagePrice: 2750.0,
    currentPrice: 2800.25,
  },
  {
    id: 3,
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quantity: 15,
    averagePrice: 305.25,
    currentPrice: 310.75,
  },
  {
    id: 4,
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    quantity: 8,
    averagePrice: 3300.5,
    currentPrice: 3275.0,
  },
  {
    id: 5,
    symbol: "TSLA",
    name: "Tesla Inc.",
    quantity: 20,
    averagePrice: 700.0,
    currentPrice: 725.5,
  },
];

const PortfolioPage = () => {
  const [stocks, setStocks] = useState(mockStocks);
  const [sortConfig, setSortConfig] = useState({
    key: "symbol",
    direction: "asc",
  });
  const [filter, setFilter] = useState("all");

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setStocks(
      stocks.sort((a: any, b: any) => {
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
      : stocks.filter((stock) => {
          const totalValue = stock.quantity * stock.currentPrice;
          const purchaseValue = stock.quantity * stock.averagePrice;
          const percentageChange =
            ((totalValue - purchaseValue) / purchaseValue) * 100;

          if (filter === "gainers") return percentageChange > 0;
          if (filter === "losers") return percentageChange < 0;
          return true;
        });

  const calculateTotalValue = (stock: any) => {
    return (stock.quantity * stock.currentPrice).toFixed(2);
  };

  const calculateProfitLoss = (stock: any) => {
    const totalValue = stock.quantity * stock.currentPrice;
    const purchaseValue = stock.quantity * stock.averagePrice;
    return (totalValue - purchaseValue).toFixed(2);
  };

  const calculatePercentageChange = (stock: any) => {
    const totalValue = stock.quantity * stock.currentPrice;
    const purchaseValue = stock.quantity * stock.averagePrice;
    return (((totalValue - purchaseValue) / purchaseValue) * 100).toFixed(2);
  };

  return (
    <div className="flex h-full justify-center items-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between">
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
              <Button className="bg-appCardGold w-full sm:w-max">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Prices
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSort("symbol")}
                    className="cursor-pointer"
                  >
                    Symbol{" "}
                    {sortConfig.key === "symbol" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("name")}
                    className="cursor-pointer"
                  >
                    Name{" "}
                    {sortConfig.key === "name" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("quantity")}
                    className="cursor-pointer"
                  >
                    Quantity{" "}
                    {sortConfig.key === "quantity" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("averagePrice")}
                    className="cursor-pointer"
                  >
                    Avg. Price{" "}
                    {sortConfig.key === "averagePrice" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("currentPrice")}
                    className="cursor-pointer"
                  >
                    Current Price{" "}
                    {sortConfig.key === "currentPrice" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Profit/Loss</TableHead>
                  <TableHead>% Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell className="font-medium">
                      {stock.symbol}
                    </TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                    <TableCell>${stock.averagePrice.toFixed(2)}</TableCell>
                    <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
                    <TableCell>${calculateTotalValue(stock)}</TableCell>
                    <TableCell
                      className={
                        calculateProfitLoss(stock) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      ${calculateProfitLoss(stock)}
                    </TableCell>
                    <TableCell
                      className={
                        calculatePercentageChange(stock) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {calculatePercentageChange(stock)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PortfolioPage;
