import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { databases } from "@/lib/appwrite";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ENV from "@/constants/env"; // Appwrite database instance
import type { User } from "@/types";

// interface User {
//     id: string;
//     roi: number;
//     current_value: number;
//     total_investment: number;
// }

interface UserPortfolioCardProps {
    user: User;
    handleFieldChange: (field: keyof User, value: number) => void;
}


interface UpdatedFields {
    roi: number;
    current_value: number;
    total_investment: number;
}

const UserPortfolioCard = ({ user, handleFieldChange }: UserPortfolioCardProps) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    console.log("user portfolio", user)
    const { toast } = useToast();

    const formatCurrency = (value: number): string => {
        if (typeof value !== 'number' || isNaN(value)) return "$0.00";
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };


    const updateUserPortfolio = async (updatedFields: UpdatedFields): Promise<void> => {
        console.log("updatedFields", updatedFields);
        try {
            await databases.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                ENV.collections.profile,
                user?.id,
                updatedFields
            );
            setIsEditDialogOpen(false);
            toast({
                title: "Updated",
                description: "Updated successfully!",
            });
        } catch (err) {
            const error = err as Error;
            console.error("Error updating cryptocurrency:", error);
            toast({
                title: "Error updating",
                description: `Error updating token: ${error.message}`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>User Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">ROI:</p>
                        <p>{user?.roi}%</p>
                    </div>
                    <div>
                        <p className="font-semibold">Current Value:</p>
                        <p>{formatCurrency(user?.current_value)}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Total Investment:</p>
                        <p>{formatCurrency(user?.total_investment)}</p>
                    </div>

                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-fit">
                                <CardHeader>
                                    <CardTitle>Edit Portfolio <Pencil className="h-4 w-4"/></CardTitle>
                                </CardHeader>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Edit User Portfolio
                                </DialogTitle>
                            </DialogHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold">ROI:</p>
                                        <input
                                            type="number"
                                            value={user?.roi}
                                            onChange={(e) => handleFieldChange("roi", Number.parseFloat(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Current Value:</p>
                                        <input
                                            type="number"
                                            value={user?.current_value}
                                            onChange={(e) => handleFieldChange("current_value", Number.parseFloat(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Total Investment:</p>
                                        <input
                                            type="number"
                                            value={user?.total_investment}
                                            onChange={(e) => handleFieldChange("total_investment", Number.parseFloat(e.target.value))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="mt-4"
                                    onClick={() => updateUserPortfolio({
                                        roi: user.roi,
                                        current_value: user.current_value,
                                        total_investment: user.total_investment
                                    })}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Saving Changes..." : "Save Changes"}
                                </Button>
                            </CardContent>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserPortfolioCard;
