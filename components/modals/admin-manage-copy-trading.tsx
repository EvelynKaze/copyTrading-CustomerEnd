/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { databases } from "@/lib/appwrite"; // Ensure appwriteConfig is correctly configured and imported
import ENV from "@/constants/env"
import { useToast } from "@/hooks/use-toast";

interface AdminManageCopyTradingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedOption: any; // Replace 'any' with a more specific type if possible
    setSelectedOption: (option: any) => void; // Replace 'any' with a more specific type if possible
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const AdminManageCopyTradingModal: React.FC<AdminManageCopyTradingModalProps> = ({ isOpen, onClose, selectedOption, setSelectedOption, isLoading, setIsLoading }) => {
    const isDisabled = selectedOption?.trade_status === "pending" || selectedOption?.trade_status === "rejected";
    console.log("Selected Trade Option", selectedOption);
    const { toast } = useToast();

    const handleSave = async () => {
        setIsLoading(true);

        const validTradeCurrentValue = parseFloat(selectedOption?.trade_current_value);
        const validTradeProfitLoss = parseFloat(selectedOption?.trade_profit_loss);
        const validTradeWinRate = parseFloat(selectedOption?.trade_win_rate);

        if (isNaN(validTradeCurrentValue)) {
            console.error("Invalid trade_current_value:", selectedOption?.trade_current_value);
            toast({
                title: "Error",
                description: "Trade current value must be a valid number.",
                variant: "destructive",
            });
            return;
        }
        if (isNaN(validTradeProfitLoss)) {
            console.error("Invalid trade_profit_loss:", selectedOption?.trade_profit_loss);
            toast({
                title: "Error",
                description: "Trade profit/loss must be a valid number.",
                variant: "destructive",
            });
            return;
        }
        if (isNaN(validTradeWinRate)) {
            console.error("Invalid trade_win_rate:", selectedOption?.trade_win_rate);
            toast({
                title: "Error",
                description: "Trade win rate must be a valid number.",
                variant: "destructive",
            });
            return;
        }

        try {
            const updatedFields = {
                trade_current_value: validTradeCurrentValue,
                trade_profit_loss: validTradeProfitLoss,
                isProfit: selectedOption.isProfit,
                trade_win_rate: validTradeWinRate,
            };

            await databases.updateDocument(
                ENV.databaseId, // Replace with your Appwrite database ID
                ENV.collections.copyTradingPurchases, // Replace with your Appwrite collection ID
                selectedOption.$id, // Document ID
                updatedFields
            );
            toast({
                title: "Success",
                description: "Trade Updated successfully",
            });
            console.log("Trade updated successfully:", updatedFields);
            onClose();
        } catch (error) {
            console.error("Error updating trade:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {
                            selectedOption?.trade_status === "pending" ? "View Details"
                                : selectedOption?.trade_status === "rejected" ? "View Details"
                                    : "Manage Trade"
                        }
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    This user, <b>{selectedOption?.full_name}</b> has <b>{selectedOption?.trade_status === "pending" ? "claimed to have deposited"
                    : selectedOption?.trade_status === "rejected" ? "not deposited" : "deposited"} {selectedOption?.initial_investment}</b> in this token, {selectedOption?.trade_token}
                    {" "}to this address, <b>{selectedOption?.trade_token_address}</b>. Please confirm and approve or reject to edit trade information.
                </DialogDescription>
                <div className="space-y-4">
                    <div>
                        <Label>Trade Title</Label>
                        <Input value={selectedOption?.trade_title} readOnly className="bg-gray-100" />
                    </div>
                    <div>
                        <Label>Trade</Label>
                        <Input value={selectedOption?.full_name} readOnly className="bg-gray-100" />
                    </div>
                    <div>
                        <Label>Initial Investment</Label>
                        <Input
                            value={`$${selectedOption?.initial_investment.toFixed(2)}`}
                            readOnly
                            className="bg-gray-100"
                        />
                    </div>
                    <div>
                        <Label>Current Value</Label>
                        <Input
                            value={selectedOption?.trade_current_value || ""}
                            onChange={(e) =>
                                setSelectedOption({
                                    ...selectedOption,
                                    trade_current_value: e.target.value,
                                })
                            }
                            type="number"
                        />
                    </div>
                    <div>
                        <Label>Profit/Loss</Label>
                        <Input
                            value={selectedOption?.trade_profit_loss || ""}
                            onChange={(e) =>
                                setSelectedOption({
                                    ...selectedOption,
                                    trade_profit_loss: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label>Profit Status (isProfit)</Label>
                        <Select
                            onValueChange={(value) =>
                                setSelectedOption({
                                    ...selectedOption,
                                    isProfit: value === "true",
                                })
                            }
                            value={selectedOption?.isProfit ? "true" : "false"}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Bullish</SelectItem>
                                <SelectItem value="false">Bearish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Risk Level</Label>
                        <Input
                            value={selectedOption?.trade_risk}
                            readOnly
                            className="bg-gray-100"
                        />
                    </div>
                    <div>
                        <Label>Win Rate</Label>
                        <Input
                            value={selectedOption?.trade_win_rate || ""}
                            onChange={(e) =>
                                setSelectedOption({
                                    ...selectedOption,
                                    trade_win_rate: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Input
                            value={selectedOption?.trade_status}
                            readOnly
                            className="bg-gray-100"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button disabled={isDisabled || isLoading} onClick={handleSave}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AdminManageCopyTradingModal;
