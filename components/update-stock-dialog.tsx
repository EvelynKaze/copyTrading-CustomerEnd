import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";

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

interface UpdateStockDialogProps {
    stock: Stock;
    selectedStock: Stock | null;
    loading: boolean;
    setSelectedStock: React.Dispatch<React.SetStateAction<Stock | null>>;
    handleUpdateStock: (stock: Stock) => void;
}

export default function UpdateStockDialog({stock, selectedStock, loading, setSelectedStock, handleUpdateStock}: UpdateStockDialogProps) {
    const isDisabled = selectedStock?.stock_status === "pending" || selectedStock?.stock_status === "rejected";

    console.log("Selected Stock", selectedStock);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setSelectedStock(stock)}
                >
                    View Details
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Stock</DialogTitle>
                    <DialogDescription>
                        Update the stock details below.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (selectedStock) {
                            handleUpdateStock(selectedStock);
                        }
                    }}
                    className="grid gap-4 py-4"
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="full-name" className="text-right">
                            Full Name
                        </Label>
                        <Input
                            value={selectedStock?.full_name || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    full_name: e.target.value,
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-symbol" className="text-right">
                            Stock Symbol
                        </Label>
                        <Input
                            value={selectedStock?.stock_symbol || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_symbol: e.target.value,
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-name" className="text-right">
                            Stock Name
                        </Label>
                        <Input
                            value={selectedStock?.stock_name || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_name: e.target.value,
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-quantity" className="text-right">
                            Stock Quantity
                        </Label>
                        <Input
                            value={selectedStock?.stock_quantity || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_quantity: parseFloat(e.target.value),
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-token" className="text-right">
                            Token
                        </Label>
                        <Input
                            value={selectedStock?.stock_token || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_token: e.target.value,
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-name" className="text-right">
                            Ini. Total Value
                        </Label>
                        <Input
                            value={selectedStock?.stock_initial_value || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_initial_value: parseFloat(e.target.value),
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-name" className="text-right">
                            Ini. Value(pu)
                        </Label>
                        <Input
                            value={selectedStock?.stock_initial_value_pu || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_initial_value_pu: parseFloat(e.target.value),
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-value-entered" className="text-right">
                            Amount Paid
                        </Label>
                        <Input
                            value={selectedStock?.stock_value_entered || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_value_entered: parseFloat(e.target.value),
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-token-address" className="text-right">
                            Token Address
                        </Label>
                        <Input
                            value={selectedStock?.stock_token_address || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_token_address: e.target.value,
                                } : null)
                            }
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-current-values" className="text-right">
                            Current Value(pu)
                        </Label>
                        <Input
                            value={selectedStock?.stock_current_value || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_current_value: parseFloat(e.target.value),
                                } : null)
                            }
                            className="col-span-3"
                            type="number"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-name" className="text-right">
                            Stock Change
                        </Label>
                        <Input
                            value={selectedStock?.stock_change || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_change: parseFloat(e.target.value),
                                } : null)
                            }
                            className="col-span-3"
                            type="number"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-name" className="text-right">
                            Profit/Loss
                        </Label>
                        <Input
                            value={selectedStock?.stock_profit_loss || ""}
                            onChange={(e) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    stock_profit_loss: parseFloat(e.target.value),
                                } : null)
                            }
                            className="col-span-3"
                            type="number"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-is-minus" className="text-right">
                            Market Trend
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    isMinus: value === "bearish" ? false : true,
                                } : null)
                            }
                            value={selectedStock?.isMinus ? "bullish" : "bearish"}
                            className="col-span-3"
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select market trend"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bullish">Bullish</SelectItem>
                                <SelectItem value="bearish">Bearish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-is-profit" className="text-right">
                            Profit/Loss
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setSelectedStock(selectedStock ? {
                                    ...selectedStock,
                                    isProfit: value === "profit" ? true : false,
                                } : null)
                            }
                            value={selectedStock?.isProfit ? "profit" : "loss"}
                            className="col-span-3"
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select profit/loss"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="profit">Profit</SelectItem>
                                <SelectItem value="loss">Loss</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isDisabled || loading}
                        >
                            {loading ? "Saving Changes..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
