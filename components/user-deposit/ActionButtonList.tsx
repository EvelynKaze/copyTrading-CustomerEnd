"use client";
import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useDisconnect, useAppKit, useAppKitNetwork } from "@reown/appkit/react";
// import { networks } from "@/config";
import { Ellipsis, LogOut, ArrowDownUp, ExternalLink} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


const ConnectActionButtons = ({ isConnected }: { isConnected: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  // const { disconnect } = useDisconnect();
  // const { open } = useAppKit();
  // const { switchNetwork } = useAppKitNetwork();

  // const handleDisconnect = async () => {
  //   try {
  //     await disconnect();
  //   } catch (error) {
  //     console.error("Failed to disconnect:", error);
  //   }
  // };

  return (
    <div className="flex gap-4">
      <ConnectButton />
      {/* {isConnected ? 
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-fit">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger> 
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem onClick={() => open()}>
            <div className="flex items-center">
              Open
            </div>
            <ExternalLink />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchNetwork(networks[1])}>
            <div className="flex items-center">
              Switch 
            </div>
            <ArrowDownUp />
          </DropdownMenuItem>
          <DropdownMenuItem className='bg-red-200 hover:bg-red-400 text-red-700' onClick={handleDisconnect}>
            <div className="flex items-center">
              Disconnect
            </div>
            <LogOut /> 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      : ""} */}
    </div>
  );
};

export default ConnectActionButtons;
