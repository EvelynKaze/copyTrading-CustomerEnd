"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProfile } from "@/app/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import ENV from "@/constants/env";
import { databases, ID } from "@/lib/appwrite";
import { TableSkeleton } from "../admin-dashboard";
import { StockTable } from "@/components/admin-manage/StocksTable";
import { StockForm } from "@/components/admin-manage/StockForm";
import type { Stocks } from "@/types/";


export default function AdminStocks() {
  const [stocks, setStocks] = useState<Stocks[]>([]);
  // const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
          response.documents.map((doc) => ({
            $id: doc.$id,
            symbol: doc.symbol,
            name: doc.name,
            price: doc.price,
            change: doc.change,
            isMinus: doc.isMinus,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch traders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, [collectionId, databaseId]);

  const handleAddStock = async (newStock: Omit<Stocks, "id">) => {
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
          isMinus: newStock?.isMinus,
          user_id: profile?.user_id,
          user_name: profile?.user_name,
        }
      );
      setStocks([...stocks, { ...newStock, $id: response.$id }]);
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
        variant: "destructive",
      });
      console.error("Failed to add stock:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStock = async (updatedStock: Stocks) => {
    setIsLoading(true);
    console.log("updatedStock", updatedStock);
    try{
      await databases.updateDocument(databaseId, collectionId, updatedStock?.$id, updatedStock);
      setStocks(
          stocks?.map((stock) =>
              stock.$id === updatedStock?.$id ? updatedStock : stock
          )
      );
      toast({
        title: "Stock Updated",
        description: `Stock updated Successfully`,
      });
    }catch(err){
      const error = err as Error;
      toast({
        title: "Error deleting Stock",
        description: `Error: ${error.message}`,
      });
      console.error("Failed to delete stock:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleDeleteStock = async (id: string) => {
    setIsLoading(true);
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
      setStocks(stocks.filter((stock) => stock?.$id !== id));
      toast({
        title: "Delete Stock",
        description: "Deleted Stock Successfully!",
      });
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error deleting Stock",
        description: `Error: ${error.message}`,
      });
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
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <StockTable
              stocks={stocks}
              isLoading={isLoading}
              handleDeleteStock={handleDeleteStock}
              handleEditStock={handleEditStock}
          />
        )}
      </CardContent>
    </Card>
  );
}



