"use client"
import { useState } from "react"
// import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function ConnectWalletButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWalletClick = (walletType: string) => {
    console.log(`Connecting to ${walletType}`)
    // Implement your wallet connection logic here
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-48">
          Connect Wallet
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => handleWalletClick("MCN")}>
          <div className="flex items-center">
            Multichain
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleWalletClick("Tron")}>
          <div className="flex items-center">
            Tron
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

