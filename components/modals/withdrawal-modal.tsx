import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store"

const WithdrawalModal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  if (!isOpen || modalType !== "withdrawal") return null;

  const { currency, amount, address } = modalProps;

  const handleConfirm = () => {
    // Here you would typically call an API to process the withdrawal
    console.log("Processing withdrawal:", { currency, amount, address });
    dispatch(closeModal());
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeModal())}>
      <DialogContent className="max-w-[300px] sm:max-w-sm text-xs">
        <DialogHeader>
          <DialogTitle>Confirm Withdrawal</DialogTitle>
          <DialogDescription>
            Please review your withdrawal details:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>Currency: {currency}</div>
          <div>Amount: {amount}</div>
          <div>Destination Address: {address}</div>
        </div>
        <DialogFooter>
          <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
          <Button onClick={handleConfirm} className="bg-appCardGold mb-1">
            Confirm Withdrawal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawalModal;
