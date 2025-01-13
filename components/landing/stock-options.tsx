"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 150.25,
    change: 2.5,
    quantity: "",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    price: 2750.8,
    change: 0.8,
    quantity: "",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 305.5,
    change: 1.2,
    quantity: "",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    price: 3380.75,
    change: 1.5,
    quantity: "",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 725.6,
    change: 3.7,
    quantity: "",
  },
];

export function StockOptionsTable() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Stock Options</CardTitle>
        <p className="text-sm text-muted-foreground">
          View and purchase available stocks
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
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
            {stocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>${stock.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    {stock.change}%
                  </div>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="0"
                    className="w-20"
                    min="0"
                  />
                </TableCell>
                <TableCell>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="secondary">Buy</Button>
                  </motion.div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <h2 className="text-2xl font-bold mb-2">Expert Guidance</h2>
          <p className="text-muted-foreground mb-4">
            Follow top-performing traders, access their performance metrics, and
            replicate proven strategies with real-time support.
          </p>
          <Button variant="secondary">Discover More</Button>
        </div>
      </CardContent>
    </Card>
  );
}
