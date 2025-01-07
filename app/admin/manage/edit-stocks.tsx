"use client";

import {useEffect, useState} from "react";
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
import { useProfile } from "@/app/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import ENV from "@/constants/env";
import {databases, ID} from "@/lib/appwrite";

interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  isMinus: boolean;
}


export default function AdminStocks() {
  const [stocks, setStocks] = useState<any>();
  const [editingStock, setEditingStock] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const { profile } = useProfile();
  const { toast } = useToast();

  const databaseId = ENV.databaseId;
  const collectionId = ENV.collections.stockOptions;

  // Fetch traders from Appwrite on component mount
  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        const response = await databases.listDocuments(
            databaseId,
            collectionId
        );
        setStocks(
            response.documents.map((doc) => ({ id: doc.$id, ...doc }))
        );
      } catch (error) {
        console.error("Failed to fetch traders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, [collectionId, databaseId]);

  const handleAddStock = async (newStock: Omit<Stock, "id">) => {
    setIsLoading(true);
    try {
      const response = await databases.createDocument(
          databaseId,
          collectionId,
          ID.unique(),
          {
            name: newStock?.name,
            price: newStock?.price,
            symbol: newStock?.symbol,
            change: newStock?.change,
            isMinus: false,
            user_id: profile?.user_id,
            user_name: profile?.user_name,
          }
      );
      setStocks([...stocks, { ...newStock, id: response.$id }]);
      toast({
        title: "New Stock Added",
        description: `Added ${newStock?.name}`,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error Adding New Stock",
        description: `Error: ${error.message}`,
        variant: "destructive"
      })
      console.error("Failed to add stock:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStock = (updatedStock: Stock) => {
    setStocks(
      stocks?.map((stock) =>
        stock.id === updatedStock.id ? updatedStock : stock
      )
    );
    setIsEditDialogOpen(false);
    setEditingStock(null);
  };

  const handleDeleteStock = async (id: string) => {
    setIsLoading(true);
    try {
      await databases.deleteDocument(
          databaseId,
          collectionId,
          id
      );
      setStocks(stocks.filter((stock) => stock.id !== id));
      toast({
        title: "Delete Stock",
        description: "Deleted Stock Successfully!",
      })
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error deleting Stock",
        description: `Error: ${error.message}`,
      })
      console.error("Failed to delete stock:", error);
    } finally {
      setIsLoading(false);
    }
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
              <StockForm isLoading={isLoading} onSubmit={handleAddStock} />
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
            {stocks?.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>${stock.price.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    stock.isMinus ? "text-green-600" : "text-red-600"
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
                            isLoading={isLoading}
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
  isLoading: boolean;
  onSubmit: (stock: Omit<Stock, "id">) => void;
}

function StockForm({ initialData, onSubmit, isLoading }: StockFormProps) {
  const [formData, setFormData] = useState<any>(
    initialData || {
      symbol: "",
      name: "",
      price: 0,
      change: 0,
      isMinus: false,
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
      <Button disabled={isLoading} type="submit" className="bg-appCardGold text-appDarkCard">
        {initialData ? "Update Stock" : "Add Stock"}
      </Button>
    </form>
  );
}
