import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {Pencil, Trash2 } from "lucide-react";
import {Label} from "@/components/ui/label";
import type { Stocks } from "@/types";

interface StockTableProps {
    stocks: Stocks[];
    handleDeleteStock: (id: string) => void;
    handleEditStock: (stock: Stocks) => void;
    isLoading: boolean;
}


export const StockTable = ({ stocks, handleDeleteStock, handleEditStock, isLoading }: StockTableProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingStock, setEditingStock] = useState<Stocks | null>(null);

    interface EditStockProps {
        stocks: Stocks;
    }

    const editStock = async ({ stocks }: EditStockProps): Promise<void> => {
        handleEditStock(stocks);
        setIsEditDialogOpen(false);
        setEditingStock(null);
    };

    interface SelectChangeEvent {
        target: {
            value: string;
        };
    }

    const handleSelectChange = (e: SelectChangeEvent): void => {
        const selectedValue = e.target.value;
        setEditingStock({
            ...editingStock,
            isMinus: selectedValue === "Bullish" ? true : false,
            $id: editingStock?.$id || '',
            symbol: editingStock?.symbol || '',
            name: editingStock?.name || '',
            price: editingStock?.price || 0,
            change: editingStock?.change || 0,
        });
    };

    console.log("editingStock", editingStock);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {stocks?.map((stock) => (
                    <TableRow key={stock.$id}>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>${stock.price.toFixed(2)}</TableCell>
                        <TableCell className={stock.isMinus ? "text-green-600" : "text-red-600"}>
                            {stock.change.toFixed(2)}%
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingStock(stock)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Stock</DialogTitle>
                                        </DialogHeader>
                                        {editingStock && (
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="edit-symbol" className="text-right">
                                                        Symbol
                                                    </Label>
                                                    <input
                                                        id="edit-symbol"
                                                        value={editingStock.symbol}
                                                        onChange={(e) =>
                                                            setEditingStock({
                                                                ...editingStock,
                                                                symbol: e.target.value,
                                                            })
                                                        }
                                                        className="col-span-3 border p-2 rounded"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="edit-name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <input
                                                        id="edit-name"
                                                        value={editingStock.name}
                                                        onChange={(e) =>
                                                            setEditingStock({
                                                                ...editingStock,
                                                                name: e.target.value,
                                                            })
                                                        }
                                                        className="col-span-3 border p-2 rounded"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="edit-price" className="text-right">
                                                        Price
                                                    </Label>
                                                    <input
                                                        id="edit-price"
                                                        type="number"
                                                        value={editingStock?.price}
                                                        onChange={(e) =>
                                                            setEditingStock({
                                                                ...editingStock,
                                                                price: parseFloat(e.target.value),
                                                            })
                                                        }
                                                        className="col-span-3 border p-2 rounded"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="edit-price" className="text-right">
                                                        Change
                                                    </Label>
                                                    <input
                                                        id="edit-price"
                                                        type="number"
                                                        value={editingStock?.change}
                                                        onChange={(e) =>
                                                            setEditingStock({
                                                                ...editingStock,
                                                                change: parseFloat(e.target.value),
                                                            })
                                                        }
                                                        className="col-span-3 border p-2 rounded"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="edit-isMinus" className="text-right">Trend</Label>
                                                    <select
                                                        id="edit-isMinus"
                                                        value={editingStock.isMinus ? "Bullish" : "Bearish"}
                                                        onChange={handleSelectChange}
                                                        className="col-span-3 border p-2 rounded"
                                                    >
                                                        <option value="Bullish">Bullish</option>
                                                        <option value="Bearish">Bearish</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        <Button disabled={isLoading} onClick={() => editingStock && editStock({ stocks: editingStock })}>
                                            {isLoading ? "Saving Changes..." : "Save Changes"}
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the stock
                                                from the system.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteStock(stock.$id)}>
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
