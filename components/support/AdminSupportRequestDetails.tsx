import type { SupportRequest } from "./SampleSupportRequests"
import { PriorityBadge } from "./PriorityBadge"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdminSupportRequestDetailsProps {
    request: SupportRequest | null
    isOpen: boolean
    onClose: () => void
    isMobile: boolean
    onStatusUpdate: (id: string, newStatus: string) => void
}

export function AdminSupportRequestDetails({
                                               request,
                                               isOpen,
                                               onClose,
                                               isMobile,
                                               onStatusUpdate,
                                           }: AdminSupportRequestDetailsProps) {
    if (!request) return null
    console.log("REq", request)

    const Content = (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <Select value={request.status} onValueChange={(newStatus) => onStatusUpdate(request.$id, newStatus)}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="open">
                            <Badge variant="default">Open</Badge>
                        </SelectItem>
                        <SelectItem value="in-progress">
                            <Badge variant="secondary">In Progress</Badge>
                        </SelectItem>
                        <SelectItem value="resolved">
                            <Badge variant="outline">Resolved</Badge>
                        </SelectItem>
                    </SelectContent>
                </Select>
                <PriorityBadge priority={request.priority}/>
            </div>
            <p className="text-sm text-muted-foreground">Created: {new Date(request.$createdAt).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Updated: {new Date(request.$updatedAt).toLocaleString()}</p>
            <div className="space-y-2">
                <h3 className="font-semibold">Message:</h3>
                <p>{request.message}</p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold">Full Name:</h3>
                <p>{request?.full_name}</p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold">Email Address:</h3>
                <p>{request?.email}</p>
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

