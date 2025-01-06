"use client";

import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Pencil, Trash2, Plus } from "lucide-react";

interface Trader {
  id: string;
  name: string;
  avatar: string;
  successRate: number;
  monthlyReturn: number;
  followers: number;
  trades: number;
}

const initialTraders: Trader[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "/placeholder.svg",
    successRate: 92,
    monthlyReturn: 15.4,
    followers: 1240,
    trades: 156,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "/placeholder.svg",
    successRate: 88,
    monthlyReturn: 12.7,
    followers: 890,
    trades: 134,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg",
    successRate: 86,
    monthlyReturn: 11.2,
    followers: 756,
    trades: 98,
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "/placeholder.svg",
    successRate: 85,
    monthlyReturn: 10.8,
    followers: 654,
    trades: 112,
  },
];

export default function AdminCopyTrading() {
  const [traders, setTraders] = useState<Trader[]>(initialTraders);
  const [editingTrader, setEditingTrader] = useState<Trader | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingTraderId, setDeletingTraderId] = useState<string | null>(null);

  const handleAddTrader = (newTrader: Omit<Trader, "id">) => {
    const id = Math.max(...traders.map((t) => parseInt(t.id)), 0) + 1;
    setTraders([...traders, { ...newTrader, id: id.toString() }]);
    setIsAddDialogOpen(false);
  };

  const handleEditTrader = (updatedTrader: Trader) => {
    setTraders(
      traders.map((trader) =>
        trader.id === updatedTrader.id ? updatedTrader : trader
      )
    );
    setIsEditDialogOpen(false);
    setEditingTrader(null);
  };

  const handleDeleteTrader = (id: string) => {
    setTraders(traders.filter((trader) => trader.id !== id));
    setDeletingTraderId(null);
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
              <TraderForm onSubmit={handleAddTrader} />
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
            {traders.map((trader) => (
              <TableRow key={trader.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={trader.avatar} alt={trader.name} />
                      <AvatarFallback>{trader.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {trader.name}
                  </div>
                </TableCell>
                <TableCell>{trader.successRate}%</TableCell>
                <TableCell>{trader.monthlyReturn}%</TableCell>
                <TableCell>{trader.followers}</TableCell>
                <TableCell>{trader.trades}</TableCell>
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
                          onClick={() => setEditingTrader(trader)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Trader</DialogTitle>
                        </DialogHeader>
                        {editingTrader && (
                          <TraderForm
                            initialData={editingTrader}
                            onSubmit={(updatedTrader) =>
                              handleEditTrader({
                                ...updatedTrader,
                                id: editingTrader.id,
                              })
                            }
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeletingTraderId(trader.id)}
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

interface TraderFormProps {
  initialData?: Trader;
  onSubmit: (trader: Omit<Trader, "id">) => void;
}

function TraderForm({ initialData, onSubmit }: TraderFormProps) {
  const [formData, setFormData] = useState<Omit<Trader, "id">>(
    initialData || {
      name: "",
      avatar: "/placeholder.svg",
      successRate: 0,
      monthlyReturn: 0,
      followers: 0,
      trades: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "name" || name === "avatar" ? value : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="avatar">Avatar URL</Label>
        <Input
          type="text"
          id="avatar"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="successRate">Success Rate (%)</Label>
        <Input
          type="number"
          id="successRate"
          name="successRate"
          value={formData.successRate}
          onChange={handleChange}
          min="0"
          max="100"
          step="0.1"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="monthlyReturn">Monthly Return (%)</Label>
        <Input
          type="number"
          id="monthlyReturn"
          name="monthlyReturn"
          value={formData.monthlyReturn}
          onChange={handleChange}
          step="0.1"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="followers">Followers</Label>
        <Input
          type="number"
          id="followers"
          name="followers"
          value={formData.followers}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="trades">Trades</Label>
        <Input
          type="number"
          id="trades"
          name="trades"
          value={formData.trades}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <Button type="submit" className="bg-appCardGold text-appDarkCard">
        {initialData ? "Update Trader" : "Add Trader"}
      </Button>
    </form>
  );
}
