"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { CheckCircle } from "lucide-react"

export default function PaymentUI() {
  const [amount, setAmount] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = Number.parseFloat(amount)
    if (!isNaN(numAmount) && numAmount <= 100) {
      setShowSuccess(true)
    }
  }

  const SuccessContent = () => (
    <div className="flex flex-col items-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Payment Successful</h2>
      <p>Your payment of ${amount} has been processed.</p>
    </div>
  )

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Amount ($)
          </label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Submit Payment
        </Button>
      </form>

      {isMobile ? (
        <Drawer open={showSuccess} onOpenChange={setShowSuccess}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Payment Status</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <SuccessContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Status</DialogTitle>
            </DialogHeader>
            <SuccessContent />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

