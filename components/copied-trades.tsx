/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ArrowUpDown, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import ManageCopyTradingModal from "./modals/manage-copy-trading";
// Mock data for user's copy trading options
const mockCopyTradingOptions = [
  {
    id: 1,
    traderName: "John Doe",
    initialInvestment: 1000,
    currentValue: 1155,
    profitLoss: 15.5,
    winRate: 68,
    risk: "Medium",
    copiedSince: "2023-05-15",
    recentTrades: [
      { date: "2023-06-01", profit: 50 },
      { date: "2023-06-03", profit: -20 },
      { date: "2023-06-05", profit: 75 },
      { date: "2023-06-07", profit: 30 },
      { date: "2023-06-09", profit: 20 },
    ],
  },
  {
    id: 2,
    traderName: "Jane Smith",
    initialInvestment: 2000,
    currentValue: 2446,
    profitLoss: 22.3,
    winRate: 72,
    risk: "Low",
    copiedSince: "2023-04-20",
    recentTrades: [
      { date: "2023-06-02", profit: 100 },
      { date: "2023-06-04", profit: 150 },
      { date: "2023-06-06", profit: 80 },
      { date: "2023-06-08", profit: -30 },
      { date: "2023-06-10", profit: 180 },
    ],
  },
  {
    id: 3,
    traderName: "Mike Johnson",
    initialInvestment: 1500,
    currentValue: 1422,
    profitLoss: -5.2,
    winRate: 45,
    risk: "High",
    copiedSince: "2023-05-30",
    recentTrades: [
      { date: "2023-06-01", profit: -80 },
      { date: "2023-06-03", profit: 150 },
      { date: "2023-06-05", profit: -100 },
      { date: "2023-06-07", profit: 50 },
      { date: "2023-06-09", profit: -20 },
    ],
  },
];

const CopyTradingPage = () => {
  const [copyTradingOptions, setCopyTradingOptions] = useState(
    mockCopyTradingOptions
  );
  const [sortConfig, setSortConfig] = useState({
    key: "profitLoss",
    direction: "desc",
  });
  const [filter, setFilter] = useState("all");
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setCopyTradingOptions(
      copyTradingOptions.sort((a: any, b: any) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const filteredOptions =
    filter === "all"
      ? copyTradingOptions
      : copyTradingOptions.filter(
          (option) => option.risk.toLowerCase() === filter
        );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleManage = (option: any) => {
    setSelectedOption(option);
    setIsManageModalOpen(true);
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
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Your Copy Trading Options
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 w-full space-x-4">
              <Select className="w-full sm:w-max" onValueChange={handleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risks</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-appCardGold sm:w-max w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSort("traderName")}
                    className="cursor-pointer"
                  >
                    Trader{" "}
                    {sortConfig.key === "traderName" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("initialInvestment")}
                    className="cursor-pointer"
                  >
                    Initial Investment{" "}
                    {sortConfig.key === "initialInvestment" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("currentValue")}
                    className="cursor-pointer"
                  >
                    Current Value{" "}
                    {sortConfig.key === "currentValue" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("profitLoss")}
                    className="cursor-pointer"
                  >
                    Profit/Loss %{" "}
                    {sortConfig.key === "profitLoss" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("winRate")}
                    className="cursor-pointer"
                  >
                    Win Rate %{" "}
                    {sortConfig.key === "winRate" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("risk")}
                    className="cursor-pointer"
                  >
                    Risk Level{" "}
                    {sortConfig.key === "risk" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("copiedSince")}
                    className="cursor-pointer"
                  >
                    Copied Since{" "}
                    {sortConfig.key === "copiedSince" && (
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    )}
                  </TableHead>
                  <TableHead>Recent Performance</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOptions.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell className="font-medium">
                      {option.traderName}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(option.initialInvestment)}
                    </TableCell>
                    <TableCell>{formatCurrency(option.currentValue)}</TableCell>
                    <TableCell
                      className={
                        option.profitLoss >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {option.profitLoss >= 0 ? (
                        <TrendingUp className="inline mr-1" />
                      ) : (
                        <TrendingDown className="inline mr-1" />
                      )}
                      {option.profitLoss}%
                    </TableCell>
                    <TableCell>{option.winRate}%</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          option.risk === "Low"
                            ? "bg-green-200 text-green-800"
                            : option.risk === "Medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {option.risk}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(option.copiedSince)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {option.recentTrades.map((trade, index) => (
                          <div
                            key={index}
                            className={`w-4 h-8 ${
                              trade.profit > 0 ? "bg-green-500" : "bg-red-500"
                            }`}
                            style={{
                              height: `${Math.abs(trade.profit / 10)}px`,
                            }}
                            title={`${formatDate(trade.date)}: ${formatCurrency(
                              trade.profit
                            )}`}
                          ></div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManage(option)}
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      {selectedOption && (
        <ManageCopyTradingModal
          isOpen={isManageModalOpen}
          onClose={() => setIsManageModalOpen(false)}
          option={selectedOption}
        />
      )}
    </div>
  );
};

export default CopyTradingPage;
