/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
import { databases, ID } from "@/lib/appwrite"; // Appwrite database instance
import { useProfile } from "@/app/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import { TableSkeleton } from "../admin-dashboard";
import { DeleteCryptoDialog, EditCryptoDialog } from "@/components/admin-manage/CryptoDialogs";
import type { Cryptocurrency } from "@/types";



export default function CryptocurrenciesAdmin() {
  const { profile } = useProfile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>(
    []
  );
  const [newCrypto, setNewCrypto] = useState<Partial<Cryptocurrency>>({});
  const [editingCrypto, setEditingCrypto] =
    useState<Cryptocurrency | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchCryptocurrencies = async () => {
    setIsLoading(true);
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_CRYPTO_OPTIONS_COLLECTION_ID!
      );
      const fetchedCryptocurrencies = response.documents.map((doc) => ({
        $id: doc.$id,
        token_name: doc.token_name,
        token_symbol: doc.token_symbol,
        token_address: doc.token_address,
        user_id: doc.user_id,
        user_name: doc.user_name,
      }));
      setCryptocurrencies(fetchedCryptocurrencies);
      return fetchedCryptocurrencies;
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
      toast({
        title: "Error",
        description: "Failed to fetch cryptocurrencies.",
      });
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
    if (
      newCrypto.token_name &&
      newCrypto.token_symbol &&
      newCrypto.token_address
    ) {
      try {
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_CRYPTO_OPTIONS_COLLECTION_ID!,
          ID.unique(),
          {
            user_id: profile?.user_id, // Replace with actual user ID logic
            token_name: newCrypto.token_name,
            token_address: newCrypto.token_address,
            token_symbol: newCrypto.token_symbol,
            user_name: profile?.user_name, // Replace with actual username logic
          }
        );
        const newestCrypto: Cryptocurrency = {
          $id: response.$id,
          token_name: response.token_name,
          token_symbol: response.token_symbol,
          token_address: response.token_address,
          user_id: response.user_id,
          user_name: response.user_name,
        };
        setCryptocurrencies((prev: Cryptocurrency[]) => [
          ...prev,
          newestCrypto,
        ]);
        setNewCrypto({});
        setIsAddDialogOpen(false);
        await refreshTokens();
        toast({
          title: "Created Successfully",
          description: "Added successfully!",
        });
      } catch (err) {
        const error = err as Error;
        console.error("Error adding cryptocurrency:", error);
        toast({
          title: "Error Adding Token",
          description: `${error.message}`,
        });
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
          editingCrypto.$id!,
          {
            token_name: editingCrypto.token_name,
            token_address: editingCrypto.token_address,
            token_symbol: editingCrypto.token_symbol,
            user_id: profile?.user_id,
            user_name: profile?.user_name,
          }
        );
        setCryptocurrencies((prev: Cryptocurrency[]) =>
          prev.map((crypto: Cryptocurrency) =>
            crypto.$id === editingCrypto.$id
              ? { ...crypto, ...response }
              : crypto
          )
        );
        setEditingCrypto(null);
        setIsEditDialogOpen(false);
        await refreshTokens();
        toast({
          title: "Updated",
          description: "Updated successfully!",
        });
      } catch (err) {
        const error = err as Error;
        console.error("Error updating cryptocurrency:", error);
        toast({
          title: "Error updating",
          description: `Error updating token: ${error.message}`,
        });
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
        prev.filter((crypto: Cryptocurrency) => crypto.$id !== id)
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
    fetchCryptocurrencies();
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
                  value={newCrypto.token_name || ""}
                  onChange={(e) =>
                    setNewCrypto({
                      ...newCrypto,
                      token_name: e.target.value as string,
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
                  value={newCrypto.token_symbol || ""}
                  onChange={(e) =>
                    setNewCrypto({
                      ...newCrypto,
                      token_symbol: e.target.value as string,
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
                  value={newCrypto.token_address || ""}
                  onChange={(e) =>
                    setNewCrypto({
                      ...newCrypto,
                      token_address: e.target.value as string,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button disabled={isLoading} onClick={handleAddCrypto}>
              {isLoading ? "Adding Cryptocurrency..." : "Add Cryptocurrency"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
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
            {cryptocurrencies?.map((crypto: Cryptocurrency) => (
              <TableRow key={crypto?.$id}>
                <TableCell>{crypto?.token_name}</TableCell>
                <TableCell>{crypto?.token_symbol}</TableCell>
                <TableCell className="font-mono max-w-44 truncate">
                  {crypto?.token_address}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditCryptoDialog
                        crypto={crypto}
                        isEditDialogOpen={isEditDialogOpen}
                        setIsEditDialogOpen={setIsEditDialogOpen}
                        editingCrypto={editingCrypto}
                        setEditingCrypto={setEditingCrypto}
                        isLoading={isLoading}
                        handleEditCrypto={handleEditCrypto}
                    />
                    <DeleteCryptoDialog
                        cryptoId={crypto.$id}
                        isLoading={isLoading}
                        handleRemoveCrypto={handleRemoveCrypto}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

