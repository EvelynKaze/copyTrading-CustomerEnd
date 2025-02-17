"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { CheckCircle } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Stock } from "@/types";


export function StockModal({ 
    selectedStock, 
    setShowAlertDialog, 
    showAlertDialog,
    showSuccessMessage,
    setShowSuccessMessage,
    handleStockModalPurchase,
    quantity
}: 
    { 
        selectedStock?: Stock, 
        setShowAlertDialog: (value: boolean) => void, 
        showAlertDialog: boolean 
        showSuccessMessage: boolean, 
        setShowSuccessMessage: (value: boolean) => void 
        handleStockModalPurchase: () => void 
        quantity: number
    }
) {
  const isMobile = useMediaQuery("(max-width: 640px)")

//   const handleConfirmPurchase = () => {
//     setShowAlertDialog(false)
//     setShowSuccessMessage(true)
//   }

  const SuccessContent = () => (
    <div className="flex flex-col items-center pt-4">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <p className="text-center">
        Your purchase of {quantity} shares of {selectedStock?.symbol} has been completed.
      </p>
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to purchase {quantity} shares of {selectedStock?.symbol} at $
              {selectedStock?.price.toFixed(2)} per share?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStockModalPurchase}>Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isMobile ? (
        <Drawer open={showSuccessMessage} onOpenChange={setShowSuccessMessage}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Purchase Completed Successfully</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <SuccessContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showSuccessMessage} onOpenChange={setShowSuccessMessage}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase Completed Successfully</DialogTitle>
            </DialogHeader>
            <SuccessContent />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

