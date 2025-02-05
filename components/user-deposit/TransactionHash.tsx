"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy } from "lucide-react"

export default function TransactionHash({ hash = "0x1234...5678" }) {
    const [showTooltip, setShowTooltip] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash)
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 2000) // Hide tooltip after 2 seconds
    }

    return (
        <div className="flex flex-col space-y-2 max-w-md">
            <label htmlFor="txHash" className="text-sm font-medium text-gray-700">
                Transaction Hash
            </label>
            <div className="relative">
                <Input id="txHash" type="text" value={hash} readOnly className="pr-10" />
                <TooltipProvider>
                    <Tooltip open={showTooltip}>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2"
                                onClick={copyToClipboard}
                            >
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copied!</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

