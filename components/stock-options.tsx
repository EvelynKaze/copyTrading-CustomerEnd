"use client";

import { useEffect, useState } from "react";
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
import { databases, ID } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { setStockOption } from "@/store/stockOptionsSlice";
import { useToast } from "@/hooks/use-toast";
import { TableSkeleton } from "@/app/admin/admin-dashboard";
import { StockModal } from "./user-deposit/stock-modal";
import { Stock, Profile } from "@/types";


export function StockOptions({ portfolio, profile, fetchPortfolio }:
  { 
    portfolio: { total_investment: number, current_value: number, roi: number }, 
    profile: Profile | null,
    fetchPortfolio: () => void
  }
) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const databaseId = ENV.databaseId;
  const collectionId = ENV.collections.stockOptions;

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
            id: doc.$id,
            symbol: doc.symbol,
            name: doc.name,
            price: doc.price,
            change: doc.change,
            isMinus: doc.isMinus,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, [collectionId, databaseId]);

  const handleQuantityChange = (id: string, quantity: string) => {
    setQuantities({ ...quantities, [id]: parseInt(quantity) || 0 });
  };

  const handlePurchase = (stock: Stock) => {
    const quantity = quantities[stock.id] || 0;
    const total = quantity * stock.price;
    const total_investment = portfolio?.total_investment ?? 0;
    // const realTotal = portfolio.total_investment - total;
    try {
      if (quantity > 0 && total_investment < total) {
        const difference = total - total_investment;
        dispatch(
          setStockOption({
            name: stock.name,
            symbol: stock.symbol,
            price: stock.price,
            change: stock.change,
            isMinus: stock.isMinus,
            quantity,
            total: difference,
          })
        );

        toast({
          title: "Purchase initiated!",
          description: `Deposit $${total.toFixed(2)} to complete the transaction.`,
        });

        router.push("/dashboard/deposit");
      } else{
        setSelectedStock(stock)
        setShowAlertDialog(true)
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error in handlePurchase:", error);
    }
  };

  const handleStockModalPurchase = async () => {
    if (!selectedStock) return; // Ensure selectedStock is not null before proceeding

    const quantity = quantities[selectedStock.id] || 0;
    const total = quantity * (selectedStock.price ?? 0);
    const total_investment = portfolio?.total_investment ?? 0;
    if (!selectedStock || total > total_investment) return;
    try {
      const stockPurchasePayload = {
        stock_symbol: selectedStock.symbol,
        stock_name: selectedStock.name,
        stock_quantity: quantities[selectedStock.id] || 1,
        stock_initial_value: total,
        stock_initial_value_pu: selectedStock.price,
        stock_change: selectedStock.change,
        stock_current_value: 0.0,
        stock_total_value: 0.0,
        stock_profit_loss: 0.0,
        isProfit: false,
        isMinus: selectedStock.isMinus,
        stock_value_entered: 0.0,
        stock_token: "fromBalance",
        stock_token_address: "fromBalance",
        stock_status: "approved",
        isTrading: false,
        full_name: profile?.full_name,
        user_id: profile?.user_id,
      };

      await databases.createDocument(
        ENV.databaseId,
        ENV.collections.stockOptionsPurchases,
        ID.unique(),
        stockPurchasePayload
      );

      const newTotalInvestment = portfolio.total_investment - total;
      console.log("New total investment:", newTotalInvestment);
      await databases.updateDocument(
        ENV.databaseId,
        ENV.collections.profile,
        profile?.id || "",
        { total_investment: newTotalInvestment }
      );
      setShowAlertDialog(false);
      setSelectedStock(null);
      setShowSuccessMessage(true)
      await fetchPortfolio();
      toast({ title: "Stock Purchased!", description: "Thank you for your purchase!" });
    } catch (error) {
      console.error("Error purchasing stock:", error);
      toast({ title: "Error purchasing stock!", description: "Please try again later." });
    }
  };


  return (
  <>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stock Options</CardTitle>
        <CardDescription>View and purchase available stocks</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TableSkeleton />
        ) : (
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
                      onClick={() => handlePurchase(stock)}
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
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Stock prices are delayed by 15 minutes and are for trading
          informational purposes only.
        </p>
      </CardFooter>
    </Card>

    {selectedStock && 
      <StockModal
        selectedStock={selectedStock}
        showAlertDialog={showAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        handleStockModalPurchase={handleStockModalPurchase}
        quantity={quantities[selectedStock.id] || 0}
      />
    }
  </>
  );
}
