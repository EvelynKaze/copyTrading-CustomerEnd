import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Trade } from "@/types/dashboard";
// EditCryptoDialog.tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeleteTradeDialogProps {
    tradeId: string;
    isLoading: boolean;
    handleDeleteTrade: (id: string) => void;
}



interface EditCryptoDialogProps {
    trades: Trade
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (open: boolean) => void
    editingTrades: Trade | null
    setEditingTrades: (crypto: Trade) => void
    isLoading: boolean
    handleEditTrades: (updatedTrade: Trade) => Promise<void>;
}

export function DeleteTradeDialog({ tradeId, isLoading, handleDeleteTrade }: DeleteTradeDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will
                    permanently delete the trader from the copy
                    trading options.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => handleDeleteTrade(tradeId)}
                >
                    {isLoading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export function EditTradeDialog({ 
    trades, 
    isEditDialogOpen, 
    setIsEditDialogOpen, 
    editingTrades, 
    setEditingTrades, 
    isLoading, 
    handleEditTrades
 }: EditCryptoDialogProps) {
    console.log("EditingTrades", editingTrades)
    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setEditingTrades(trades)} // Ensure `trades` is not undefined 
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Trade</DialogTitle>
                </DialogHeader>
                {editingTrades && (
                    <div className="grid gap-4 py-4">
                        {/* Trade Title */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trade_title" className="text-right">Trade Title</Label>
                            <Input
                                id="trade_title"
                                value={editingTrades.trade_title || ""}
                                onChange={(e) => setEditingTrades({ 
                                    ...editingTrades, 
                                    trade_title: e.target.value 
                                })}
                                className="col-span-3"
                            />
                        </div>

                        {/* Trade Description */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trade_description" className="text-right">Trade Description</Label>
                            <Input
                                id="trade_description"
                                name="trade_description"
                                value={editingTrades.trade_description || ""}
                                onChange={(e) => setEditingTrades({ 
                                    ...editingTrades, 
                                    trade_description: e.target.value 
                                })}
                                className="col-span-3"
                            />
                        </div>

                        {/* Trade Risk - Using Select Component */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trade_risk" className="text-right">Trade Risk</Label>
                            <Select
                                value={editingTrades.trade_risk || ""}
                                onValueChange={(value) => setEditingTrades({ 
                                    ...editingTrades, 
                                    trade_risk: value 
                                })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select Risk Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Trade Duration */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trade_duration" className="text-right">Trade Duration (Days)</Label>
                            <Input
                                id="trade_duration"
                                type="number"
                                name="trade_duration"
                                value={editingTrades.trade_duration || ""}
                                onChange={(e) => setEditingTrades({ 
                                    ...editingTrades, 
                                    trade_duration: Number(e.target.value) 
                                })}
                                className="col-span-3"
                            />
                        </div>

                        {/* Trade Min */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trade_min">Trade Min</Label>
                            <Input
                                id="trade_min"
                                type="number"
                                name="trade_min"
                                min="0"
                                value={editingTrades.trade_min || ""}
                                onChange={(e) => setEditingTrades({ 
                                    ...editingTrades, 
                                    trade_min: Number(e.target.value) 
                                })}
                                className="col-span-3"
                            />
                        </div>

                        {/* Trade Max */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trade_max">Trade Max</Label>
                            <Input
                                id="trade_max"
                                type="number"
                                name="trade_max"
                                min="0"
                                value={editingTrades.trade_max || ""}
                                onChange={(e) => setEditingTrades({ 
                                    ...editingTrades, 
                                    trade_max: Number(e.target.value) 
                                })}
                                className="col-span-3"
                            />
                        </div>

                        {/* Trade ROI Min */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trade_roi_min">Trade ROI Min(%)</Label>
                            <Input
                                id="trade_roi_min"
                                type="number"
                                name="trade_roi_min"
                                min="0"
                                value={editingTrades.trade_roi_min || ""}
                                onChange={(e) => setEditingTrades({ 
                                    ...editingTrades, 
                                    trade_roi_min: Number(e.target.value) 
                                })}
                                className="col-span-3"
                            />
                        </div>

                        {/* Trade ROI Max */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trade_roi_max">Trade ROI Max(%)</Label>
                            <Input
                                id="trade_roi_max"
                                type="number"
                                name="trade_roi_max"
                                min="0"
                                value={editingTrades.trade_roi_max || ""}
                                onChange={(e) => setEditingTrades({ 
                                    ...editingTrades, 
                                    trade_roi_max: Number(e.target.value) 
                                })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                )}
                <Button 
                    disabled={isLoading} 
                    onClick={() => editingTrades && handleEditTrades(editingTrades)} // Pass correct function argument
                >
                    {isLoading ? "Saving Changes..." : "Save Changes"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

