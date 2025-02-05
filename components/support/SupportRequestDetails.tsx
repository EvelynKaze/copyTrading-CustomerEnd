import type { SupportRequest } from "./SampleSupportRequests"
import { PriorityBadge } from "./PriorityBadge"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

interface SupportRequestDetailsProps {
    request: SupportRequest | null
    isOpen: boolean
    onClose: () => void
    isMobile: boolean
}

export function SupportRequestDetails({ request, isOpen, onClose, isMobile }: SupportRequestDetailsProps) {
    if (!request) return null

    const Content = (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Badge
                    variant={request.status === "open" ? "default" : request.status === "in-progress" ? "secondary" : "outline"}
                >
                    {request.status}
                </Badge>
                <PriorityBadge priority={request.priority} />
            </div>
            <p className="text-sm text-muted-foreground">Created: {new Date(request.$createdAt).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Updated: {new Date(request.$updatedAt).toLocaleString()}</p>
            <div className="space-y-2">
                <h3 className="font-semibold">Message:</h3>
                <p>{request.message}</p>
            </div>
        </div>
    )

    if (isMobile) {
        return (
            <Drawer open={isOpen} onClose={onClose}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{request.title}</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4">{Content}</div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{request.title}</DialogTitle>
                </DialogHeader>
                {Content}
            </DialogContent>
        </Dialog>
    )
}

