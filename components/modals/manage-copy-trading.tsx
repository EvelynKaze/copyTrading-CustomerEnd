/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ManageCopyTradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trade: {
    trade_title: string;
    trade_min: number;
    trade_max: number;
    trade_roi_min: number;
    trade_roi_max: number;
    trade_risk: string;
    trade_current_value: number;
    trade_profit_loss: number;
    trade_win_rate: number;
    isProfit: boolean;
    initial_investment: number;
    trade_token: string;
    trade_token_address: string;
    trade_status: string;
    full_name: string;
  };
}

const ManageCopyTradingModal: React.FC<ManageCopyTradingModalProps> = ({
                                                                         isOpen,
                                                                         onClose,
                                                                         trade,
                                                                       }) => {
  // const [tradeStatus, setTradeStatus] = useState(trade.trade_status);
  // const [tradeRisk, setTradeRisk] = useState(trade.trade_risk);

  const handleSave = () => {
    // Logic to save changes (e.g., API call to update the trade status and risk level)
    // console.log("Updated Trade Data:", { tradeStatus, tradeRisk });
    onClose();
  };

  if (!isOpen) return null;

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Trade</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Trade Title</Label>
              <Input value={trade.trade_title} readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label>Initial Investment</Label>
              <Input
                  value={`$${trade.initial_investment.toFixed(2)}`}
                  readOnly
                  className="bg-gray-100"
              />
            </div>
            <div>
              <Label>Current Value</Label>
              <Input
                  value={trade.trade_status === "pending" ? "Pending" : `$${trade.trade_current_value.toFixed(2)}`}
                  readOnly
                  className="bg-gray-100"
              />
            </div>
            <div>
              <Label>Risk Level</Label>
              <Input
                  value={trade.trade_risk}
                  readOnly
                  className="bg-gray-100"
              />
            </div>
            <div>
              <Label>Status</Label>
              <Input
                  value={trade.trade_status}
                  readOnly
                  className="bg-gray-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {/*<Button onClick={handleSave}>Save Changes</Button>*/}
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default ManageCopyTradingModal;
