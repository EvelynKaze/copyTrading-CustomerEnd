"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Trash2, Plus } from "lucide-react";
import { databases, ID } from "@/lib/appwrite";
import { useProfile } from "@/app/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import { Trader } from "@/types/dashboard";
import ENV from "@/constants/env";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton } from "../admin-dashboard";

export default function AdminCopyTrading() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { profile } = useProfile();
  const { toast } = useToast();

  const databaseId = ENV.databaseId;
  const collectionId = ENV.collections.copyTrading;

  // Fetch traders from Appwrite on component mount
  useEffect(() => {
    const fetchTraders = async () => {
      setIsLoading(true);
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setTraders(
          response.documents.map((doc) => ({
            id: doc.$id,
            trade_title: doc.trade_title,
            trade_max: doc.trade_max,
            trade_min: doc.trade_min,
            trade_roi_min: doc.trade_roi_min,
            trade_roi_max: doc.trade_roi_max,
            trade_description: doc.trade_description,
            trade_risk: doc.trade_risk,
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

    fetchTraders();
  }, [collectionId, databaseId]);

  const handleAddTrader = async (
    newTrader: Omit<Trader, "id" | "user_id" | "user_name">
  ) => {
    setIsLoading(true);
    console.log("checking trade_risk", newTrader?.trade_risk);
    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          trade_title: newTrader.trade_title,
          trade_max: newTrader.trade_max,
          trade_min: newTrader.trade_min,
          trade_description: newTrader.trade_description,
          trade_roi_min: newTrader?.trade_roi_min,
          trade_roi_max: newTrader?.trade_roi_max,
          trade_risk: newTrader.trade_risk,
          user_id: profile?.user_id,
          user_name: profile?.user_name,
        }
      );
      setTraders([...traders, { ...newTrader, id: response.$id }]);
      toast({
        title: "New Trade Added",
        description: `Added ${newTrader?.trade_title}`,
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

  const handleDeleteTrader = async (id: string) => {
    setIsLoading(true);
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
      setTraders(traders.filter((trader) => trader.id !== id));
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
                <Plus className="mr-2 h-4 w-4" /> Add Trader
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Trader</DialogTitle>
              </DialogHeader>
              <TraderForm isLoading={isLoading} onSubmit={handleAddTrader} />
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {traders?.map((trader) => (
                <TableRow key={trader?.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {trader?.trade_title}
                    </div>
                  </TableCell>
                  <TableCell>{trader?.trade_description}</TableCell>
                  <TableCell>{trader?.trade_risk}</TableCell>
                  <TableCell>${trader?.trade_min}</TableCell>
                  <TableCell>${trader?.trade_max}</TableCell>
                  <TableCell>{trader?.trade_roi_min}%</TableCell>
                  <TableCell>{trader?.trade_roi_max}%</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
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
                              This action cannot be undone. This will
                              permanently delete the trader from the copy
                              trading options.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTrader(trader.id)}
                            >
                              {isLoading ? "Deleting..." : "Delete"}
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
        )}
      </CardContent>
    </Card>
  );
}

interface TraderFormProps {
  isLoading: boolean;
  onSubmit: (trader: Omit<Trader, "id" | "user_id" | "user_name">) => void;
}

function TraderForm({ onSubmit, isLoading }: TraderFormProps) {
  const [formData, setFormData] = useState<
    Omit<Trader, "id" | "user_id" | "user_name">
  >({
    trade_title: "",
    trade_description: "",
    trade_risk: "",
    trade_min: 0,
    trade_max: 0,
    trade_roi_min: 0,
    trade_roi_max: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "trade_title" ||
        name === "trade_description" ||
        name === "trade_risk"
          ? value
          : parseFloat(value) || 0, // Default to 0 if parsing fails for numeric fields
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      trade_risk: value, // Set the trade_risk field based on the selected value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="trade_title">Trade Title</Label>
        <Input
          type="text"
          id="trade_title"
          name="trade_title"
          value={formData.trade_title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="trade_description">Trade Description</Label>
        <Input
          type="text"
          id="trade_description"
          name="trade_description"
          value={formData.trade_description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="trade_risk">Trade Risk</Label>
        <Select
          onValueChange={handleSelectChange}
          defaultValue={formData.trade_risk} // Default to medium if trade_risk is empty
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select trade risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">
              <div className="flex items-center">
                {/*<TrendingUp className="mr-2 h-4 w-4 text-green-500" />*/}
                Low
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center">
                {/*<TrendingDown className="mr-2 h-4 w-4 text-yellow-500" />*/}
                Medium
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center">
                {/*<TrendingDown className="mr-2 h-4 w-4 text-red-500" />*/}
                High
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="trade_min">Trade Min</Label>
        <Input
          type="number"
          id="trade_min"
          name="trade_min"
          value={formData.trade_min}
          onChange={handleChange}
          min="0"
          max="100000000000000"
          step="0.1"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="trade_max">Trade Max</Label>
        <Input
          type="number"
          id="trade_max"
          name="trade_max"
          value={formData.trade_max}
          onChange={handleChange}
          min="0"
          max="100000000000000"
          step="0.1"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="trade_roi_min">Trade ROI Min(%)</Label>
        <Input
          type="number"
          id="trade_roi_min"
          name="trade_roi_min"
          value={formData.trade_roi_min}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="trade_roi_max">Trade ROI Max(%)</Label>
        <Input
          type="number"
          id="trade_roi_max"
          name="trade_roi_max"
          value={formData.trade_roi_max}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <Button
        disabled={isLoading}
        type="submit"
        className="bg-appCardGold text-appDarkCard"
      >
        {isLoading ? "Adding Trade.." : "Add Trade"}
      </Button>
    </form>
  );
}
