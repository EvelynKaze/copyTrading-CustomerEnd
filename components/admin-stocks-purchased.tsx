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
    interface Stock {
        $id: string;
        stock_status: string;
        full_name: string;
        stock_symbol: string;
        stock_quantity: number;
        stock_initial_value_pu: number;
        stock_current_value: number;
        stock_change: number;
        isProfit: boolean;
        stock_profit_loss: number;
        isMinus: boolean;
        stock_token: string;
        stock_name: string;
        stock_initial_value: number;
        stock_value_entered: number;
        stock_token_address: string;
    }
    
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await databases.listDocuments(
                    ENV.databaseId,
                    ENV.collections.stockOptionsPurchases
                );
                const stocksData: Stock[] = response.documents.map((doc) => ({
                    $id: doc.$id,
                    stock_status: doc.stock_status,
                    full_name: doc.full_name,
                    stock_symbol: doc.stock_symbol,
                    stock_quantity: doc.stock_quantity,
                    stock_initial_value_pu: doc.stock_initial_value_pu,
                    stock_current_value: doc.stock_current_value,
                    stock_change: doc.stock_change,
                    stock_profit_loss: doc.stock_profit_loss,
                    isProfit: doc.isProfit,
                    isMinus: doc.isMinus,
                    stock_token: doc.stock_token,
                    stock_name: doc.stock_name,
                    stock_initial_value: doc.stock_initial_value,
                    stock_value_entered: doc.stock_value_entered,
                    stock_token_address: doc.stock_token_address,
                }));
                setStocks(stocksData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStocks();
    }, []);

    const updateStockStatus = async (stockId: string, status: string) => {
        try {
            await databases.updateDocument(
                ENV.databaseId,
                ENV.collections.stockOptionsPurchases,
                stockId,
                { stock_status: status }
            );
            setStocks((prevStocks: Stock[]) =>
                prevStocks.map((stock: Stock) =>
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

    const handleUpdateStock = async (updatedStock: Stock) => {
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
        const validStockCurrentValue = parseFloat(stock_current_value.toString());
        const validStockProfitLoss = parseFloat(stock_profit_loss.toString());
        const validStockChange = parseFloat(stock_change.toString());


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
            setStocks((prevStocks: Stock[]) =>
                prevStocks.map((stock: Stock) =>
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
                                {stocks.map((stock) => (
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
                                            <UpdateStockDialog
                                                stock={stock}
                                                selectedStock={selectedStock}
                                                loading={isLoading}
                                                setSelectedStock={setSelectedStock}
                                                handleUpdateStock={handleUpdateStock}
                                            />
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
