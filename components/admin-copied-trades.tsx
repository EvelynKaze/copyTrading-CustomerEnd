"use client";
import React, { useEffect, useState } from "react";
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
import {ArrowUpDown, RefreshCw, TrendingUp, TrendingDown, Check, X} from "lucide-react";
import { databases } from "@/lib/appwrite"; // Ensure the Appwrite client is configured
import ENV from "@/constants/env"
import AdminManageCopyTradingModal from "@/components/modals/admin-manage-copy-trading";
import { useToast } from "@/hooks/use-toast";

const AdminCopyTradingPage = () => {
    interface CopyTradingOption {
        $id: string;
        trade_title: string;
        trade_token: string;
        initial_investment: number;
        trade_current_value: number;
        isProfit: boolean;
        trade_profit_loss: number;
        trade_win_rate: number;
        trade_risk: string;
        copiedSince: string;
        $createdAt: string;
        trade_status: string;
    }

    // type CopyTradingOptionKey = {
    //     [key: string]: string | number; // Adjust the value types based on your data structure
    // };

    const [copyTradingOptions, setCopyTradingOptions] = useState<CopyTradingOption[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const [sortConfig, setSortConfig] = useState({
        key: "profitLoss",
        direction: "desc",
    });
    const [filter, setFilter] = useState("all");
    const [selectedOption, setSelectedOption] = useState<CopyTradingOption | null>(null);  
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);

    // Fetch data from Appwrite
    const fetchCopyTradingData = async () => {
        try {
            const response = await databases.listDocuments(
                ENV.databaseId,
                ENV.collections.copyTradingPurchases
            );
            const formattedData = response.documents.map((doc) => ({
                $id: doc.$id,
                trade_title: doc.trade_title,
                trade_token: doc.trade_token,
                initial_investment: doc.initial_investment,
                trade_current_value: doc.trade_current_value,
                isProfit: doc.isProfit,
                trade_profit_loss: doc.trade_profit_loss,
                trade_win_rate: doc.trade_win_rate,
                trade_risk: doc.trade_risk,
                copiedSince: new Date(doc.$createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
                $createdAt: doc.$createdAt,
                trade_status: doc.trade_status,
            }));
            setCopyTradingOptions(formattedData);
        } catch (error) {
            console.error("Failed to fetch copy trading data:", error);
        }
    };

    useEffect(() => {
        fetchCopyTradingData();
    }, []);

    const handleSort = (key: keyof CopyTradingOption) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        setCopyTradingOptions(
            [...copyTradingOptions].sort((a: CopyTradingOption, b: CopyTradingOption) => {
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
                (option) => option.trade_risk.toLowerCase() === filter
            );

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

    const handleManage = (option: CopyTradingOption) => {
        setSelectedOption(option);
        setIsManageModalOpen(true);
    };

    const updateTradeStatus = async (tradeId: string, status: string) => {
        try {
            await databases.updateDocument(
                ENV.databaseId,
                ENV.collections.copyTradingPurchases,
                tradeId,
                { trade_status: status }
            );
            setCopyTradingOptions((prevTrade: CopyTradingOption[]) =>
                prevTrade.map((trade: CopyTradingOption) =>
                    trade.$id === tradeId ? { ...trade, trade_status: status } : trade
                )
            );
            toast({
                title: "Success",
                description: `Trade status updated to ${status}.`,
            });
        } catch (error) {
            console.error("Error updating trade status:", error);
            toast({
                title: "Error",
                description: "Failed to update trade status. Please try again.",
                variant: "destructive",
            });
        }
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
                            Admin Copy Trading Options
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 w-full space-x-4">
                            <Select className="w-full sm:w-max" onValueChange={handleFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by risk" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All </SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                className="bg-appCardGold sm:w-max w-full"
                                onClick={fetchCopyTradingData}
                                disabled={isLoading} // Optional: Disable button while loading
                            >
                                <RefreshCw
                                    className={`mr-2 h-4 w-4 transition-transform duration-500 ${
                                        isLoading ? "animate-spin" : ""
                                    }`}
                                />
                                {isLoading ? "Refreshing..." : "Refresh Data"}
                            </Button>

                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {[
                                        { label: "Trade", key: "trade_title" },
                                        { label: "Initial Investment", key: "initial_investment" },
                                        { label: "Current Value", key: "trade_current_value" },
                                        { label: "Profit/Loss %", key: "trade_profit_loss" },
                                        { label: "Win Rate %", key: "trade_win_rate" },
                                        { label: "Risk Level", key: "trade_risk" },
                                        { label: "Copied Since", key: "copiedSince" },
                                        { label: "Status", key: "trade_status" },
                                    ].map((column) => (
                                        <TableHead
                                            key={column.key}
                                            onClick={() => handleSort(column.key as keyof CopyTradingOption)}
                                            className="cursor-pointer"
                                        >
                                            {column.label}{" "}
                                            {sortConfig.key === column.key && (
                                                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                            )}
                                        </TableHead>
                                    ))}
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOptions.map((option) => (
                                    <TableRow key={option?.$id}>
                                        <TableCell className="font-medium">{option?.trade_title}</TableCell>
                                        <TableCell>{option.trade_token === "USDT" ? formatCurrency(option?.initial_investment) : option?.initial_investment}</TableCell>
                                        <TableCell>{formatCurrency(option?.trade_current_value)}</TableCell>
                                        <TableCell
                                            className={
                                                option?.isProfit ? "text-green-600" : "text-red-600"
                                            }
                                        >
                                            {option?.isProfit ? (
                                                <TrendingUp className="inline mr-1" />
                                            ) : (
                                                <TrendingDown className="inline mr-1" />
                                            )}
                                            {option?.trade_profit_loss}%
                                        </TableCell>
                                        <TableCell>{option?.trade_win_rate}%</TableCell>
                                        <TableCell>
                                          <span
                                              className={`px-2 py-1 capitalize rounded-full text-xs ${
                                                  option?.trade_risk === "low"
                                                      ? "bg-green-200 text-green-800"
                                                      : option.trade_risk === "medium"
                                                          ? "bg-yellow-200 text-yellow-800"
                                                          : "bg-red-200 text-red-800"
                                              }`}
                                          >
                                            {option?.trade_risk}
                                          </span>
                                        </TableCell>
                                        <TableCell>{option.copiedSince}</TableCell>
                                        <TableCell>
                                            {option.trade_status === "rejected" ? (
                                                <span className="badge bg-red-500 rounded-xl p-2 text-white">Rejected</span>
                                            ) : option.trade_status === "pending" ? (
                                                <span className="badge bg-yellow-500 rounded-xl p-2 text-white">Pending</span>
                                            ) : (
                                                <span className="badge bg-green-500 rounded-xl p-2 text-white">Approved</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="flex items-center space-x-2">
                                            {option.trade_status === "pending" && (
                                                <>
                                                    <Button
                                                        onClick={() => {
                                                            if (confirm("Are you sure you want to approve this Trade?")) {
                                                                updateTradeStatus(option.$id, "approved")
                                                            }
                                                        }}
                                                        className="text-white bg-green-500 hover:bg-green-800"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            if (confirm("Are you sure you want to reject this trade?")) {
                                                                updateTradeStatus(option.$id, "rejected");
                                                            }
                                                        }}
                                                        className="text-white bg-red-500 hover:bg-red-800"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleManage(option)}
                                            >
                                                {
                                                    option.trade_status === "pending" ? "View Details"
                                                        : option?.trade_status === "rejected" ? "View Details"
                                                            : "Manage Trade"
                                                }
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>
            {selectedOption !== null && (
                <AdminManageCopyTradingModal
                    isOpen={isManageModalOpen}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    onClose={() => setIsManageModalOpen(false)}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            )}
        </div>
    );
};

export default AdminCopyTradingPage;
