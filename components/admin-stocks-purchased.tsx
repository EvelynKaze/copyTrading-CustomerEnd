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
import { databases } from "@/lib/appwrite"; // Import your database client
import ENV from "@/constants/env";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UpdateStockDialog from "@/components/update-stock-dialog";

const AdminPortfolioPage = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await databases.listDocuments(
                    ENV.databaseId,
                    ENV.collections.stockOptionsPurchases
                );
                setStocks(response.documents);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStocks();
    }, []);

    const updateStockStatus = async (stockId, status) => {
        try {
            await databases.updateDocument(
                ENV.databaseId,
                ENV.collections.stockOptionsPurchases,
                stockId,
                { stock_status: status }
            );
            setStocks((prevStocks: any) =>
                prevStocks.map((stock: any) =>
                    stock.$id === stockId ? { ...stock, stock_status: status } : stock
                )
            );
            toast({
                title: "Success",
                description: `Stock status updated to ${status}.`,
            });
        } catch (error) {
            console.error("Error updating stock status:", error);
            toast({
                title: "Error",
                description: "Failed to update stock status. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleUpdateStock = async (updatedStock: any) => {
        setIsLoading(true);
        console.log("Updated Stock Payload:", updatedStock);

        // Extract values and ensure stock_current_value is a float
        const {
            stock_change,
            stock_current_value,
            isProfit,
            stock_profit_loss,
            isMinus,
        } = updatedStock;

        // Convert stock_current_value to a float if it's not already
        const validStockCurrentValue = parseFloat(stock_current_value);
        const validStockProfitLoss = parseFloat(stock_profit_loss);
        const validStockChange = parseFloat(stock_change);


        if (isNaN(validStockCurrentValue)) {
            console.error("Invalid stock_current_value:", stock_current_value);
            toast({
                title: "Error",
                description: "Stock current value must be a valid number.",
                variant: "destructive",
            });
            return;
        }

        if (isNaN(validStockProfitLoss)) {
            console.error("Invalid stock_current_value:", stock_profit_loss);
            toast({
                title: "Error",
                description: "Stock profit/loss must be a valid number.",
                variant: "destructive",
            });
            return;
        }

        if (isNaN(validStockChange)) {
            console.error("Invalid stock_current_value:", stock_change);
            toast({
                title: "Error",
                description: "Stock change must be a valid number.",
                variant: "destructive",
            });
            return;
        }

        try {
            await databases.updateDocument(
                ENV.databaseId,
                ENV.collections.stockOptionsPurchases,
                updatedStock.$id,
                {
                    stock_profit_loss: validStockProfitLoss,
                    stock_current_value: validStockCurrentValue,
                    stock_change: validStockChange,
                    isProfit,
                    isMinus,
                }
            );
            setStocks((prevStocks: any) =>
                prevStocks.map((stock: any) =>
                    stock.$id === updatedStock.$id ? updatedStock : stock
                )
            );
            toast({
                title: "Success",
                description: "Stock updated successfully.",
            });
        } catch (error) {
            console.error("Error updating stock:", error);
            toast({
                title: "Error",
                description: "Failed to update stock. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
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
                        <CardTitle className="text-2xl font-bold">User Stocks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Ini. Val.(pu)</TableHead>
                                    <TableHead>Cur. Val.(pu)</TableHead>
                                    <TableHead>Total Val.</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stocks.map((stock: any) => (
                                    <TableRow key={stock.$id}>
                                        <TableCell>{stock.full_name}</TableCell>
                                        <TableCell>{stock.stock_symbol}</TableCell>
                                        <TableCell>{stock.stock_quantity}</TableCell>
                                        <TableCell>${Number(stock?.stock_initial_value_pu || 0).toFixed(2)}</TableCell>
                                        <TableCell>${Number(stock?.stock_current_value || 0).toFixed(2)}</TableCell>
                                        <TableCell>
                                            ${(Number(stock?.stock_quantity || 0) * Number(stock?.stock_current_value || 0)).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {stock.stock_status === "rejected" ? (
                                                <span className="badge bg-red-500 rounded-xl p-2 text-white">Rejected</span>
                                            ) : stock.stock_status === "pending" ? (
                                                <span className="badge bg-yellow-500 rounded-xl p-2 text-white">Pending</span>
                                            ) : (
                                                <span className="badge bg-green-500 rounded-xl p-2 text-white">Approved</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="flex items-center space-x-2">
                                            {stock.stock_status === "pending" && (
                                                <>
                                                    <Button
                                                        onClick={() => updateStockStatus(stock.$id, "approved")}
                                                        className="text-white bg-green-500 hover:bg-green-800"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            if (confirm("Are you sure you want to reject this stock?")) {
                                                                updateStockStatus(stock.$id, "rejected");
                                                            }
                                                        }}
                                                        className="text-white bg-red-500 hover:bg-red-800"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                            {/*{stock?.stock_status === "pending" ? null : stock?.stock_status === "approved" ? (*/}
                                                <UpdateStockDialog
                                                    stock={stock}
                                                    selectedStock={selectedStock}
                                                    loading={isLoading}
                                                    setSelectedStock={setSelectedStock}
                                                    handleUpdateStock={handleUpdateStock}
                                                />
                                            {/*// ) : (*/}
                                            {/*//     <span className="badge bg-red-500 text-white">Rejected</span>*/}
                                            {/*// )}*/}
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
