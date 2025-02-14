"use client";
import { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { databases, ID } from "@/lib/appwrite";
import { useProfile } from "@/app/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import { Trade } from "@/types/dashboard";
import ENV from "@/constants/env";
import { TableSkeleton } from "../admin-dashboard";
import { TraderForm } from "@/components/admin-manage/admin-copytrades-form";
import { DeleteTradeDialog, EditTradeDialog } from "@/components/admin-manage/admin-editcopytrades-form";
import { truncateText, formatCurrency } from "@/utils";

export default function AdminCopyTrading() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTrades, setEditingTrades] = useState<Trade | null>(null);
  const { profile } = useProfile();
  const { toast } = useToast();

  const databaseId = ENV.databaseId;
  const collectionId = ENV.collections.copyTrading;

  // Fetch traders from Appwrite on component mount
  const fetchTraders = async () => {
    setIsLoading(true);
    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId
      );
      setTrades(
        response.documents.map((doc) => ({
          id: doc.$id,
          trade_title: doc.trade_title,
          trade_max: doc.trade_max,
          trade_min: doc.trade_min,
          trade_roi_min: doc.trade_roi_min,
          trade_roi_max: doc.trade_roi_max,
          trade_description: doc.trade_description,
          trade_risk: doc.trade_risk,
          trade_duration: doc.trade_duration,
          user_id: doc.user_id,
          user_name: doc.user_name,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch traders:", error);
    } finally {
      setIsLoading(false);
    }
  };

    

  console.log("Trades", trades)

  const refreshTrades = async () => {
      try {
        await fetchTraders();
      } catch (err) {
        const error = err as Error;
        console.error("Error refreshing tokens", error);
        toast({
          description: error.message,
        });
      }
    };

  const handleAddTrade = async (
    newTrade: Omit<Trade, "id" | "user_id" | "user_name">
  ) => {
    setIsLoading(true);
    console.log("checking trade_risk", newTrade?.trade_risk);
    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          trade_title: newTrade.trade_title,
          trade_max: newTrade.trade_max,
          trade_min: newTrade.trade_min,
          trade_description: newTrade.trade_description,
          trade_roi_min: newTrade?.trade_roi_min,
          trade_roi_max: newTrade?.trade_roi_max,
          trade_risk: newTrade?.trade_risk,
          trade_duration: newTrade?.trade_duration,
          user_id: profile?.user_id,
          user_name: profile?.user_name,
        }
      );
      setTrades([...trades, { ...newTrade, id: response.$id }]);
      toast({
        title: "New Trade Added",
        description: `Added ${newTrade?.trade_title}`,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error Adding New Trade",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
      console.error("Failed to add trade:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTrades = async (
    updatedTrade: Omit<Trade, "user_id" | "user_name">
  ) => {
    setIsLoading(true);
    console.log("checking trade_risk", updatedTrade?.trade_risk);
    
    try {
      await databases.updateDocument(
        databaseId,
        collectionId,
        updatedTrade?.id,
        {
          trade_title: updatedTrade.trade_title,
          trade_max: updatedTrade.trade_max,
          trade_min: updatedTrade.trade_min,
          trade_description: updatedTrade.trade_description,
          trade_roi_min: updatedTrade?.trade_roi_min,
          trade_roi_max: updatedTrade?.trade_roi_max,
          trade_risk: updatedTrade?.trade_risk,
          trade_duration: updatedTrade?.trade_duration,
        }
      );
  
      // Correctly updating the trades state instead of appending
      setTrades((prevTrades) =>
        prevTrades.map((trade) =>
          trade.id === updatedTrade.id ? { ...trade, ...updatedTrade } : trade
        )
      );
  
      toast({
        title: "Trade Updated",
        description: `Successfully updated ${updatedTrade?.trade_title}`,
      });
      setEditingTrades(null);
      setIsEditDialogOpen(false);
      await refreshTrades();
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error Updating Trade",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
      console.error("Failed to update trade:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDeleteTrade = async (id: string) => {
    setIsLoading(true);
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
      setTrades(trades.filter((trade) => trade.id !== id));
      toast({
        title: "Delete Trade",
        description: "Deleted Trade Successfully!",
      });
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error deleting Trade",
        description: `Error: ${error.message}`,
      });
      console.error("Failed to delete trade:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-2xl font-bold">
          Manage Copy Trading Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-appCardGold text-appDarkCard">
                <Plus className="mr-2 h-4 w-4" /> Add Trade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Trader</DialogTitle>
              </DialogHeader>
              <TraderForm isLoading={isLoading} onSubmit={handleAddTrade} />
            </DialogContent>
          </Dialog>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trade</TableHead>
                <TableHead>Trade Desc.</TableHead>
                <TableHead>Trade Risk</TableHead>
                <TableHead>Trade Min</TableHead>
                <TableHead>Trade Max</TableHead>
                <TableHead>Trade ROI Min(%)</TableHead>
                <TableHead>Trade ROI Min(%)</TableHead>
                <TableHead>Trade Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades?.map((trade) => (
                <TableRow key={trade?.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {truncateText(trade?.trade_title, 10)}
                    </div>
                  </TableCell>
                  <TableCell>{truncateText(trade?.trade_description, 10)}</TableCell>
                  <TableCell>{trade?.trade_risk}</TableCell>
                  <TableCell>{formatCurrency(trade?.trade_min)}</TableCell>
                  <TableCell>{formatCurrency(trade?.trade_max)}</TableCell>
                  <TableCell>{trade?.trade_roi_min}%</TableCell>
                  <TableCell>{trade?.trade_roi_max}%</TableCell>
                  <TableCell>{trade?.trade_duration}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditTradeDialog
                        isLoading={isLoading}
                        trades={trade}
                        isEditDialogOpen={isEditDialogOpen}
                        setIsEditDialogOpen={setIsEditDialogOpen}
                        editingTrades={editingTrades}
                        setEditingTrades={setEditingTrades}
                        handleEditTrades={handleEditTrades}
                      />
                      <DeleteTradeDialog
                        tradeId={trade?.id}
                        isLoading={isLoading}
                        handleDeleteTrade={handleDeleteTrade}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

