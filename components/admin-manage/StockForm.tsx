import {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Stocks } from "@/types"

interface StockFormProps {
    initialData?: Stocks;
    isLoading: boolean;
    onSubmit: (stock: Omit<Stocks, "id">) => void;
}

export function StockForm({ initialData, onSubmit, isLoading }: StockFormProps) {
    const [formData, setFormData] = useState<{
        $id: string;
        symbol: string;
        name: string;
        price: number;
        change: number;
        isMinus: boolean;
    }>({
        $id: "",
        symbol: "",
        name: "",
        price: 0,
        change: 0,
        isMinus: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "change" ? parseFloat(value) : value,
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            isMinus: value === "bullish",
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
            $id: formData.$id,
            symbol: formData.symbol,
            name: formData.name,
            price: formData.price,
            change: formData.change,
            isMinus: formData.isMinus,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                    type="text"
                    id="symbol"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="change">Change (%)</Label>
                <Input
                    type="number"
                    id="change"
                    name="change"
                    value={formData.change}
                    onChange={handleChange}
                    step="0.01"
                    required
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="trend">Trend</Label>
                <Select
                    onValueChange={handleSelectChange}
                    defaultValue={formData.isMinus ? "bullish" : "bearish"}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select trend" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bullish">
                            <div className="flex items-center">
                                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                                Bullish
                            </div>
                        </SelectItem>
                        <SelectItem value="bearish">
                            <div className="flex items-center">
                                <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                                Bearish
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button
                disabled={isLoading}
                type="submit"
                className="bg-appCardGold text-appDarkCard"
            >
                {initialData ? "Update Stock" : "Add Stock"}
            </Button>
        </form>
    );
}
