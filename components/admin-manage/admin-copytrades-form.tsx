import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trade } from "@/types/dashboard";

interface TradeFormProps {
    isLoading: boolean;
    onSubmit: (trader: Omit<Trade, "id" | "user_id" | "user_name">) => void;
  }
  
export function TraderForm({ onSubmit, isLoading }: TradeFormProps) {
    const [formData, setFormData] = useState<
      Omit<Trade, "id" | "user_id" | "user_name">
    >({
      trade_title: "",
      trade_description: "",
      trade_risk: "",
      trade_min: 0,
      trade_max: 0,
      trade_duration: 1,
      trade_roi_min: 0,
      trade_roi_max: 0,
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
  
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "trade_title" ||
          name === "trade_description" ||
          name === "trade_risk"
            ? value
            : parseFloat(value) || 0, // Default to 0 if parsing fails for numeric fields
      }));
    };
  
    const handleSelectChange = (value: string) => {
      setFormData((prev) => ({
        ...prev,
        trade_risk: value, // Set the trade_risk field based on the selected value
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trade_title">Trade Title</Label>
          <Input
            type="text"
            id="trade_title"
            name="trade_title"
            value={formData.trade_title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trade_description">Trade Description</Label>
          <Input
            type="text"
            id="trade_description"
            name="trade_description"
            value={formData.trade_description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trade_risk">Trade Risk</Label>
          <Select
            onValueChange={handleSelectChange}
            defaultValue={formData.trade_risk} // Default to medium if trade_risk is empty
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select trade risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <div className="flex items-center">
                  {/*<TrendingUp className="mr-2 h-4 w-4 text-green-500" />*/}
                  Low
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center">
                  {/*<TrendingDown className="mr-2 h-4 w-4 text-yellow-500" />*/}
                  Medium
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="flex items-center">
                  {/*<TrendingDown className="mr-2 h-4 w-4 text-red-500" />*/}
                  High
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trade_min">Trade Min</Label>
          <Input
            type="number"
            id="trade_min"
            name="trade_min"
            value={formData.trade_min}
            onChange={handleChange}
            min="0"
            max="100000000000000"
            step="0.1"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trade_max">Trade Max</Label>
          <Input
            type="number"
            id="trade_max"
            name="trade_max"
            value={formData.trade_max}
            onChange={handleChange}
            min="0"
            max="100000000000000"
            step="0.1"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trade_roi_min">Trade ROI Min(%)</Label>
          <Input
            type="number"
            id="trade_roi_min"
            name="trade_roi_min"
            value={formData.trade_roi_min}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trade_roi_max">Trade ROI Max(%)</Label>
          <Input
            type="number"
            id="trade_roi_max"
            name="trade_roi_max"
            value={formData.trade_roi_max}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="trade_duration">Trade Duration</Label>
          <Input
            type="number"
            id="trade_duration"
            name="trade_duration"
            value={formData.trade_duration}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-appCardGold text-appDarkCard"
        >
          {isLoading ? "Adding Trade.." : "Add Trade"}
        </Button>
      </form>
    );
  }