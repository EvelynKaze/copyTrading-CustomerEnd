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
import { Trader } from "@/types/dashboard"
import ENV from "@/constants/env"

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
              trader_name: doc.trader_name,
              success_rate: doc.success_rate,
              monthly_return: doc.monthly_return,
              trader_followers: doc.trader_followers,
              successful_trades: doc.successful_trades,
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

  const handleAddTrader = async (newTrader: Omit<Trader, "id" | "user_id" | "user_name">) => {
    setIsLoading(true);
    try {
      const response = await databases.createDocument(
          databaseId,
          collectionId,
          ID.unique(),
          {
            trader_name: newTrader.trader_name,
            success_rate: newTrader.success_rate,
            monthly_return: newTrader.monthly_return,
            trader_followers: newTrader.trader_followers,
            successful_trades: newTrader.successful_trades,
            user_id: profile?.user_id,
            user_name: profile?.user_name,
          }
      );
      setTraders([...traders, { ...newTrader, id: response.$id }]);
      toast({
        title: "New Trader Added",
        description: `Added ${newTrader?.trader_name}`,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error Adding New Trader",
        description: `Error: ${error.message}`,
        variant: "destructive"
      })
      console.error("Failed to add trader:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDeleteTrader = async (id: string) => {
    setIsLoading(true);
    try {
      await databases.deleteDocument(
          databaseId,
          collectionId,
          id
      );
      setTraders(traders.filter((trader) => trader.id !== id));
      toast({
        title: "Delete Trader",
        description: "Deleted Trader Successfully!",
      })
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error deleting Trader",
        description: `Error: ${error.message}`,
      })
      console.error("Failed to delete trader:", error);
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trader</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Monthly Return</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Trades</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {traders?.map((trader) => (
                  <TableRow key={trader?.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {trader?.trader_name}
                      </div>
                    </TableCell>
                    <TableCell>{trader?.success_rate}%</TableCell>
                    <TableCell>{trader?.monthly_return}%</TableCell>
                    <TableCell>{trader?.trader_followers}</TableCell>
                    <TableCell>{trader?.successful_trades}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently
                                delete the trader from the copy trading options.
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
        </CardContent>
      </Card>
  );
}

interface TraderFormProps {
  isLoading: boolean;
  onSubmit: (trader: Omit<Trader, "id" | "user_id" | "user_name">) => void;
}

function TraderForm({ onSubmit, isLoading }: TraderFormProps) {
  const [formData, setFormData] = useState<Omit<Trader, "id" | "user_id" | "user_name">>(
      {
        trader_name: "",
        success_rate: 0,
        monthly_return: 0,
        trader_followers: 0,
        successful_trades: 0,
      }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "trader_name" ? value : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trader_name">Trader Name</Label>
          <Input
              type="text"
              id="trader_name"
              name="trader_name"
              value={formData.trader_name}
              onChange={handleChange}
              required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="success_rate">Success Rate (%)</Label>
          <Input
              type="number"
              id="success_rate"
              name="success_rate"
              value={formData.success_rate}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.1"
              required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="monthly_return">Monthly Return (%)</Label>
          <Input
              type="number"
              id="monthly_return"
              name="monthly_return"
              value={formData.monthly_return}
              onChange={handleChange}
              step="0.1"
              required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trader_followers">Followers</Label>
          <Input
              type="number"
              id="trader_followers"
              name="trader_followers"
              value={formData.trader_followers}
              onChange={handleChange}
              min="0"
              required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="successful_trades">Successful Trades</Label>
          <Input
              type="number"
              id="successful_trades"
              name="successful_trades"
              value={formData.successful_trades}
              onChange={handleChange}
              min="0"
              required
          />
        </div>
        <Button disabled={isLoading} type="submit" className="bg-appCardGold text-appDarkCard">
          {isLoading ? "Adding Trader.." : "Add Trader"}
        </Button>
      </form>
  );
}