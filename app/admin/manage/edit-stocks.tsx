"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const initialStocks: Stock[] = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
  {
    id: 2,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2750.8,
    change: -0.8,
  },
  {
    id: 3,
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 305.5,
    change: 1.2,
  },
  {
    id: 4,
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 3380.75,
    change: -1.5,
  },
  { id: 5, symbol: "TSLA", name: "Tesla Inc.", price: 725.6, change: 3.7 },
];

export default function AdminStocks() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingStockId, setDeletingStockId] = useState<number | null>(null);

  const handleAddStock = (newStock: Omit<Stock, "id">) => {
    const id = Math.max(...stocks.map((s) => s.id), 0) + 1;
    setStocks([...stocks, { ...newStock, id }]);
    setIsAddDialogOpen(false);
  };

  const handleEditStock = (updatedStock: Stock) => {
    setStocks(
      stocks.map((stock) =>
        stock.id === updatedStock.id ? updatedStock : stock
      )
    );
    setIsEditDialogOpen(false);
    setEditingStock(null);
  };

  const handleDeleteStock = (id: number) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
    setDeletingStockId(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Stocks</CardTitle>
        <CardDescription>
          Add, edit, or remove stocks from the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-appCardGold text-appDarkCard">
                <Plus className="mr-2 h-4 w-4" /> Add Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Stock</DialogTitle>
              </DialogHeader>
              <StockForm onSubmit={handleAddStock} />
            </DialogContent>
          </Dialog>
        </div>
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
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>${stock.price.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {stock.change.toFixed(2)}%
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                    >
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
                          <StockForm
                            initialData={editingStock}
                            onSubmit={() => handleEditStock(editingStock)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the stock from the system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteStock(stock.id)}
                          >
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
      </CardContent>
    </Card>
  );
}

interface StockFormProps {
  initialData?: Stock;
  onSubmit: (stock: Omit<Stock, "id">) => void;
}

function StockForm({ initialData, onSubmit }: StockFormProps) {
  const [formData, setFormData] = useState<Omit<Stock, "id">>(
    initialData || {
      symbol: "",
      name: "",
      price: 0,
      change: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "change" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="symbol">Symbol</Label>
        <Input
          type="text"
          id="symbol"
          name="symbol"
          value={formData.symbol}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="change">Change (%)</Label>
        <Input
          type="number"
          id="change"
          name="change"
          value={formData.change}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>
      <Button type="submit" className="bg-appCardGold text-appDarkCard">
        {initialData ? "Update Stock" : "Add Stock"}
      </Button>
    </form>
  );
}
