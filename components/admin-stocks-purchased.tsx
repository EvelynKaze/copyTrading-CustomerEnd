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
import { ArrowUpDown, Check, X } from "lucide-react";
import { databases } from "@/lib/appwrite"; // Import your database client
import ENV from "@/constants/env";
// import {useProfile} from "@/app/context/ProfileContext"; // Import environment variables

const AdminPortfolioPage = () => {
    const [stocks, setStocks] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: "symbol",
        direction: "asc",
    });
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await databases.listDocuments(
                    ENV.databaseId,
                    ENV.collections.stockOptionsPurchases,
                );
                setStocks(response.documents);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStocks();
    }, []);

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        setStocks((prevStocks) =>
            [...prevStocks].sort((a: any, b: any) => {
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
            : stocks.filter((stock: any) => {
                const totalValue = stock?.stock_quantity * stock?.stock_current_values;
                const purchaseValue = stock.stock_initial_value;
                const percentageChange =
                    ((totalValue - purchaseValue) / purchaseValue) * 100;

                if (filter === "gainers") return percentageChange > 0;
                if (filter === "losers") return percentageChange < 0;
                return true;
            });

    const calculateTotalValue = (stock: any) => {
        return (stock.stock_quantity * stock.stock_current_values).toFixed(2);
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
                        <CardTitle className="text-2xl font-bold">User Stocks</CardTitle>
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
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        onClick={() => handleSort("full_name")}
                                        className="cursor-pointer"
                                    >
                                        Name{" "}
                                        {sortConfig.key === "full_name" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                        )}
                                    </TableHead>
                                    <TableHead
                                        onClick={() => handleSort("stock_symbol")}
                                        className="cursor-pointer"
                                    >
                                        Stock{" "}
                                        {sortConfig.key === "stock_symbol" && (
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
                                        Ini. Val.{" "}
                                        {sortConfig.key === "stock_initial_value" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                        )}
                                    </TableHead>
                                    <TableHead
                                        onClick={() => handleSort("stock_current_values")}
                                        className="cursor-pointer"
                                    >
                                        Cur. Val.(pu){" "}
                                        {sortConfig.key === "stock_current_values" && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                                        )}
                                    </TableHead>
                                    <TableHead>Total Val.</TableHead>
                                    <TableHead>ATBP</TableHead>
                                    <TableHead>Token</TableHead>
                                    <TableHead>Token Add.</TableHead>
                                    <TableHead>Profit/Loss</TableHead>
                                    <TableHead>% Change</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStocks.map((stock: any) => (
                                    <TableRow key={stock?.$id}>
                                        <TableCell className="font-medium">
                                            {stock?.full_name}
                                        </TableCell>
                                        <TableCell className="text-center">{stock?.stock_symbol}</TableCell>
                                        <TableCell className="text-center">{stock?.stock_quantity}</TableCell>
                                        <TableCell className="text-center">
                                            ${stock?.stock_initial_value.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            ${stock?.stock_current_values.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-center">${calculateTotalValue(stock)}</TableCell>
                                        <TableCell className="text-center">
                                            ${stock?.stock_value_entered.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {stock?.stock_token}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {stock?.stock_token_address}
                                        </TableCell>
                                        <TableCell
                                            className={
                                                `${stock?.isProfit
                                                    ? "text-green-600"
                                                    : "text-red-600"} text-center`
                                            }
                                        >
                                            %{stock?.stock_profit_loss}
                                        </TableCell>
                                        <TableCell
                                            className={
                                                `${stock?.isMinus
                                                    ? "text-green-600"
                                                    : "text-red-600"} text-center`
                                            }
                                        >
                                            {stock?.stock_change}%
                                        </TableCell>
                                        <TableCell className="flex items-center space-x-2">
                                            <Button className="text-white bg-green-500 hover:bg-green-800">
                                                <Check className="h-2 w-2" />
                                            </Button>
                                            <Button className="text-white bg-red-500 hover:bg-red-800">
                                                <X className="h-2 w-2" />
                                            </Button>
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

export default AdminPortfolioPage;
