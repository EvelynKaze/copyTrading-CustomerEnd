// This file handles the Admin page for managing cryptocurrencies using Appwrite backend.

"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
import { databases, ID } from "@/lib/appwrite"; // Appwrite database instance
import { useProfile } from "@/app/context/ProfileContext"
import { useToast } from "@/hooks/use-toast";

interface Cryptocurrency {
  $id: string;
  token_name: string;
  token_symbol: string;
  token_address: string;
  user_id: string;
  user_name: string;
}

export default function CryptocurrenciesAdminPage() {
  const { profile } = useProfile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [cryptocurrencies, setCryptocurrencies] = useState<any>(
      []
  );
  const [newCrypto, setNewCrypto] = useState<Partial<any>>({});
  const [editingCrypto, setEditingCrypto] = useState<any>(
      null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchCryptocurrencies = async () => {
    setIsLoading(true);
    try {
      const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_CRYPTO_OPTIONS_COLLECTION_ID!
      );
      setCryptocurrencies(response.documents);
      return response.documents; // Return the fetched documents
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  const refreshTokens = async () => {
    try {
      const response = await fetchCryptocurrencies();
      setCryptocurrencies(response); // Update the state with the fetched data
    } catch (err) {
      const error = err as Error;
      console.error("Error refreshing tokens", error);
      toast({
        description: error.message,
      });
    }
  };

  const handleAddCrypto = async () => {
    setIsLoading(true);
    if (newCrypto.name && newCrypto.symbol && newCrypto.walletAddress) {
      try {
        const response = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_CRYPTO_OPTIONS_COLLECTION_ID!,
            ID.unique(),
            {
              user_id: profile?.user_id, // Replace with actual user ID logic
              token_name: newCrypto.name,
              token_address: newCrypto.walletAddress,
              token_symbol: newCrypto.symbol,
              user_name: profile?.user_name, // Replace with actual username logic
            }
        );
        setCryptocurrencies((prev: any) => [...prev, response]);
        setNewCrypto({});
        setIsAddDialogOpen(false);
        await refreshTokens();
        toast({
          title: "Created Successfully",
          description: "Added successfully!",
        })
      } catch (err) {
        const error = err as Error;
        console.error("Error adding cryptocurrency:", error);
        toast({
          title: "Error Adding Token",
          description: `${error.message}`
        })
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditCrypto = async () => {
    setIsLoading(true);
    if (editingCrypto) {
      try {
        const response = await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_CRYPTO_OPTIONS_COLLECTION_ID!,
            editingCrypto.$id,
            {
              token_name: editingCrypto.name,
              token_address: editingCrypto.walletAddress,
              token_symbol: editingCrypto.symbol,
              user_id: profile?.user_id,
              user_name: profile?.user_name,
            }
        );
        setCryptocurrencies((prev: any) =>
            prev.map((crypto: any) =>
                crypto.id === editingCrypto.id ? { ...crypto, ...response } : crypto
            )
        );
        setEditingCrypto(null);
        setIsEditDialogOpen(false);
        await refreshTokens();
        toast({
          title: "Updated",
          description: "Updated successfully!",
        })
      } catch (err) {
        const error = err as Error;
        console.error("Error updating cryptocurrency:", error);
        toast({
          title: "Error updating",
          description: `Error updating token: ${error.message}`,
        })
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveCrypto = async (id: string) => {
    setIsLoading(true);
    try {
      await databases.deleteDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_CRYPTO_OPTIONS_COLLECTION_ID!,
          id
      );

      // Optimistically update the UI
      setCryptocurrencies((prev) =>
          prev.filter((crypto: any) => crypto.$id !== id)
      );

      toast({
        description: "Token Deleted Successfully",
      });
    } catch (err) {
      const error = err as Error;
      console.error("Error deleting cryptocurrency:", error);
      toast({
        description: `Error Deleting token: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchCryptocurrencies()
  }, []);

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
              <Button disabled={isLoading} onClick={handleAddCrypto}>{isLoading ? "Adding Cryptocurrency..." : "Add Cryptocurrency"}</Button>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cryptocurrencies?.map((crypto: any) => (
                <TableRow key={crypto?.$id}>
                  <TableCell>{crypto?.token_name}</TableCell>
                  <TableCell>{crypto?.token_symbol}</TableCell>
                  <TableCell className="font-mono max-w-44 truncate">
                    {crypto?.token_address}
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
                                    Token Name
                                  </Label>
                                  <Input
                                      id="edit-name"
                                      value={editingCrypto?.token_name || ""}
                                      onChange={(e) =>
                                          setEditingCrypto({
                                            ...editingCrypto,
                                            token_name: e.target.value,
                                          })
                                      }
                                      className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                      htmlFor="edit-symbol"
                                      className="text-right"
                                  >
                                    Token Symbol
                                  </Label>
                                  <Input
                                      id="edit-symbol"
                                      value={editingCrypto.token_symbol}
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
                                      value={editingCrypto.token_address}
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
                          <Button disabled={isLoading} onClick={handleEditCrypto}>{isLoading ? "Saving Changes..." : "Save Changes"}</Button>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                              variant="destructive"
                              size="sm"
                              // onClick={() => handleRemoveCrypto(crypto.id)}
                          >
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
                                onClick={() => handleRemoveCrypto(crypto.$id)}
                            >
                              {isLoading ? "Removing token..." : "Remove Token"}
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
