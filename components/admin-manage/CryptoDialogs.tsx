import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
// EditCryptoDialog.tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Cryptocurrency } from "@/types"

interface DeleteCryptoDialogProps {
    cryptoId: string;
    isLoading: boolean;
    handleRemoveCrypto: (id: string) => void;
}


interface EditCryptoDialogProps {
    crypto: Cryptocurrency
    isEditDialogOpen: boolean
    setIsEditDialogOpen: (open: boolean) => void
    editingCrypto: Cryptocurrency | null
    setEditingCrypto: (crypto: Cryptocurrency) => void
    isLoading: boolean
    handleEditCrypto: () => void
}


export function DeleteCryptoDialog({ cryptoId, isLoading, handleRemoveCrypto }: DeleteCryptoDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the cryptocurrency from the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleRemoveCrypto(cryptoId)}>
                        {isLoading ? "Removing token..." : "Remove Token"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}



export function EditCryptoDialog({ 
    crypto, 
    isEditDialogOpen, 
    setIsEditDialogOpen, 
    editingCrypto, 
    setEditingCrypto, 
    isLoading, 
    handleEditCrypto 
}: EditCryptoDialogProps) {
    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setEditingCrypto(crypto)}>
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Cryptocurrency</DialogTitle>
                </DialogHeader>
                {editingCrypto && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">Token Name</Label>
                            <Input
                                id="edit-name"
                                value={editingCrypto.token_name || ""}
                                onChange={(e) => setEditingCrypto({ ...editingCrypto, token_name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-symbol" className="text-right">Token Symbol</Label>
                            <Input
                                id="edit-symbol"
                                value={editingCrypto.token_symbol}
                                onChange={(e) => setEditingCrypto({ ...editingCrypto, token_symbol: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-walletAddress" className="text-right">Wallet Address</Label>
                            <Input
                                id="edit-walletAddress"
                                value={editingCrypto.token_address}
                                onChange={(e) => setEditingCrypto({ ...editingCrypto, token_address: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                )}
                <Button disabled={isLoading} onClick={handleEditCrypto}>
                    {isLoading ? "Saving Changes..." : "Save Changes"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}