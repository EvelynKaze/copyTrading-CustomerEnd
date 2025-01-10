"use client";

import {useEffect, useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import ENV from "@/constants/env";
import {databases} from "@/lib/appwrite";


export function StockOptions() {
  interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    isMinus: boolean;
  }

  const [stocks, setStocks] = useState<Stock[]>();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const databaseId = ENV.databaseId;
  const collectionId = ENV.collections.stockOptions;

  // Fetch traders from Appwrite on component mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await databases.listDocuments(
            databaseId,
            collectionId
        );
        setStocks(
            response.documents.map((doc) => ({
              id: doc.$id,
              symbol: doc.symbol,
              name: doc.name,
              price: doc.price,
              change: doc.change,
              isMinus: doc.isMinus,
            }))
        );
      } catch (error) {
        console.error("Failed to fetch traders:", error);
      }
    };

    fetchStocks();
  }, [collectionId, databaseId]);


  const handleQuantityChange = (id: string, quantity: string) => {
    setQuantities({ ...quantities, [id]: parseInt(quantity) || 0 });
  };

  const handlePurchase = (id: string) => {
    // Here you would typically send a request to your backend to process the purchase
    console.log(`Purchasing ${quantities[id]} shares of stock ${id}`);
    // Reset the quantity after purchase
    setQuantities({ ...quantities, [id]: 0 });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stock Options</CardTitle>
        <CardDescription>View and purchase available stocks</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
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
                  {stock.change >= 0 ? (
                    <TrendingUp className="inline mr-1" />
                  ) : (
                    <TrendingDown className="inline mr-1" />
                  )}
                  {stock.change.toFixed(2)}%
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    value={quantities[stock.id] || ""}
                    onChange={(e) =>
                      handleQuantityChange(stock.id, e.target.value)
                    }
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handlePurchase(stock.id)}
                    disabled={!quantities[stock.id]}
                    className="bg-appCardGold disabled:bg-gray-500"
                  >
                    <DollarSign className="mr-1 h-4 w-4" />
                    Buy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Stock prices are delayed by 15 minutes and are for informational
          purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
