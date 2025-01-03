"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  walletAddress: string;
  showForDeposit: boolean;
  showForWithdrawal: boolean;
}

const initialCryptocurrencies: Cryptocurrency[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    walletAddress: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    showForDeposit: true,
    showForWithdrawal: true,
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    showForDeposit: true,
    showForWithdrawal: true,
  },
  {
    id: "3",
    name: "Litecoin",
    symbol: "LTC",
    walletAddress: "LQ8s4CUhUPjLHFiQrY7SiakYkV4AhwRNBZ",
    showForDeposit: false,
    showForWithdrawal: true,
  },
];

export default function CryptocurrenciesAdminPage() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>(
    initialCryptocurrencies
  );
  const [newCrypto, setNewCrypto] = useState<Partial<Cryptocurrency>>({});
  const [editingCrypto, setEditingCrypto] = useState<Cryptocurrency | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleToggle = (
    id: string,
    field: "showForDeposit" | "showForWithdrawal"
  ) => {
    setCryptocurrencies((cryptos) =>
      cryptos.map((crypto) =>
        crypto.id === id ? { ...crypto, [field]: !crypto[field] } : crypto
      )
    );
  };

  const handleAddCrypto = () => {
    if (newCrypto.name && newCrypto.symbol && newCrypto.walletAddress) {
      setCryptocurrencies((cryptos) => [
        ...cryptos,
        {
          id: Date.now().toString(),
          name: newCrypto.name,
          symbol: newCrypto.symbol,
          walletAddress: newCrypto.walletAddress,
          showForDeposit: true,
          showForWithdrawal: true,
        } as Cryptocurrency,
      ]);
      setNewCrypto({});
      setIsAddDialogOpen(false);
    }
  };

  const handleEditCrypto = () => {
    if (editingCrypto) {
      setCryptocurrencies((cryptos) =>
        cryptos.map((crypto) =>
          crypto.id === editingCrypto.id ? editingCrypto : crypto
        )
      );
      setEditingCrypto(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleRemoveCrypto = (id: string) => {
    setCryptocurrencies((cryptos) =>
      cryptos.filter((crypto) => crypto.id !== id)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-lg md:text-2xl font-bold mb-5">
        Manage Cryptocurrencies
      </h1>
      <div className="mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-appCardGold text-appDarkCard">
              <Plus className="mr-2 h-4 w-4" /> Add Cryptocurrency
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Cryptocurrency</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCrypto.name || ""}
                  onChange={(e) =>
                    setNewCrypto({
                      ...newCrypto,
                      name: e.target.value as string,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="symbol" className="text-right">
                  Symbol
                </Label>
                <Input
                  id="symbol"
                  value={newCrypto.symbol || ""}
                  onChange={(e) =>
                    setNewCrypto({
                      ...newCrypto,
                      symbol: e.target.value as string,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="walletAddress" className="text-right">
                  Wallet Address
                </Label>
                <Input
                  id="walletAddress"
                  value={newCrypto.walletAddress || ""}
                  onChange={(e) =>
                    setNewCrypto({
                      ...newCrypto,
                      walletAddress: e.target.value as string,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddCrypto}>Add Cryptocurrency</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Wallet Address</TableHead>
            <TableHead>Show</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptocurrencies.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell>{crypto.name}</TableCell>
              <TableCell>{crypto.symbol}</TableCell>
              <TableCell className="font-mono max-w-44 truncate">
                {crypto.walletAddress}
              </TableCell>
              <TableCell className="w-max">
                <Switch
                  checked={crypto.showForDeposit}
                  onCheckedChange={() =>
                    handleToggle(crypto.id, "showForDeposit")
                  }
                />
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
                        onClick={() => setEditingCrypto(crypto)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Cryptocurrency</DialogTitle>
                      </DialogHeader>
                      {editingCrypto && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={editingCrypto.name}
                              onChange={(e) =>
                                setEditingCrypto({
                                  ...editingCrypto,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-symbol" className="text-right">
                              Symbol
                            </Label>
                            <Input
                              id="edit-symbol"
                              value={editingCrypto.symbol}
                              onChange={(e) =>
                                setEditingCrypto({
                                  ...editingCrypto,
                                  symbol: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-walletAddress"
                              className="text-right"
                            >
                              Wallet Address
                            </Label>
                            <Input
                              id="edit-walletAddress"
                              value={editingCrypto.walletAddress}
                              onChange={(e) =>
                                setEditingCrypto({
                                  ...editingCrypto,
                                  walletAddress: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                      )}
                      <Button onClick={handleEditCrypto}>Save Changes</Button>
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
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the cryptocurrency from the system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemoveCrypto(crypto.id)}
                        >
                          Remove
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
    </div>
  );
}
