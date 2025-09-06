"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Address, isAddress } from "viem";
import { ArrowUpRight, Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@gelato-ui/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@gelato-ui/components/ui/drawer";
import { Button } from "@gelato-ui/components/ui/button";
import { Input } from "@gelato-ui/components/ui/input";
import { Label } from "@gelato-ui/components/ui/label";
import { cn } from "@/lib/utils";

interface TransferModalProps {
  balance: string;
  onTransfer: (recipient: Address, amount: string) => Promise<void>;
  isTransferring?: boolean;
  tokenSymbol?: string;
}

export function TransferModal({
  balance,
  onTransfer,
  isTransferring = false,
  tokenSymbol = "GEL",
}: TransferModalProps) {
  const [open, setOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");
  const [recipientError, setRecipientError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const validateRecipient = (address: string) => {
    if (!address) {
      setRecipientError("Address is required");
      return false;
    }
    if (!isAddress(address)) {
      setRecipientError("Invalid Ethereum address");
      return false;
    }
    setRecipientError("");
    return true;
  };

  const validateAmount = (value: string) => {
    if (!value || parseFloat(value) <= 0) {
      setAmountError("Amount must be greater than 0");
      return false;
    }
    if (parseFloat(value) > parseFloat(balance)) {
      setAmountError("Insufficient balance");
      return false;
    }
    setAmountError("");
    return true;
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipient(value);
    if (value) validateRecipient(value);
  };

  const formatNumber = (value: string): string => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Split into integer and decimal parts
    const parts = numericValue.split('.');
    
    // Format integer part with commas
    if (parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // Rejoin with decimal part if exists
    return parts.join('.');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Remove commas for validation
    const rawValue = value.replace(/,/g, '');
    
    // Only allow numbers and one decimal point
    if (rawValue && !/^\d*\.?\d*$/.test(rawValue)) return;
    
    // Store raw value for calculations
    setAmount(rawValue);
    
    // Store formatted value for display
    setDisplayAmount(formatNumber(rawValue));
    
    if (rawValue) validateAmount(rawValue);
  };

  const handleMaxClick = () => {
    setAmount(balance);
    setDisplayAmount(formatNumber(balance));
    validateAmount(balance);
  };

  const handleSubmit = async () => {
    const isValidRecipient = validateRecipient(recipient);
    const isValidAmount = validateAmount(amount);

    if (!isValidRecipient || !isValidAmount) return;

    await onTransfer(recipient as Address, amount);
    // Reset form on success
    setRecipient("");
    setAmount("");
    setDisplayAmount("");
    setOpen(false);
  };

  const renderTransferForm = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          placeholder="0x..."
          value={recipient}
          onChange={handleRecipientChange}
          className={cn(
            "font-mono text-sm",
            recipientError &&
              "border-destructive focus-visible:ring-destructive",
          )}
        />
        {recipientError && (
          <p className="text-sm text-destructive">{recipientError}</p>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="amount">Amount</Label>
          <span className="text-xs text-muted-foreground">
            Balance: {parseFloat(balance).toFixed(2)} {tokenSymbol}
          </span>
        </div>
        <div className="relative">
          <Input
            id="amount"
            type="text"
            placeholder="0.00"
            value={displayAmount}
            onChange={handleAmountChange}
            className={cn(
              "pr-20",
              amountError &&
                "border-destructive focus-visible:ring-destructive",
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-7 px-2"
            onClick={handleMaxClick}
          >
            MAX
          </Button>
        </div>
        {amountError && (
          <p className="text-sm text-destructive">{amountError}</p>
        )}
      </div>

      {recipient && amount && !recipientError && !amountError && (
        <div className="rounded-lg bg-muted p-3 space-y-1">
          <p className="text-xs text-muted-foreground">Transfer Summary</p>
          <p className="text-sm">
            Send <span className="font-semibold">{displayAmount || amount} {tokenSymbol}</span>
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            To: {recipient.slice(0, 6)}...{recipient.slice(-4)}
          </p>
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isTransferring}
          >
            {isTransferring ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send {tokenSymbol}
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer {tokenSymbol}</DialogTitle>
            <DialogDescription>
              Send tokens to another address on Ink Sepolia
            </DialogDescription>
          </DialogHeader>
          {renderTransferForm()}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
              disabled={isTransferring}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={handleSubmit}
              disabled={isTransferring ||
                !recipient ||
                !amount ||
                !!recipientError ||
                !!amountError}
            >
              {isTransferring
                ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                )
                : (
                  <>
                    <ArrowUpRight className="h-4 w-4" />
                    Send
                  </>
                )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isTransferring}
        >
          {isTransferring ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send {tokenSymbol}
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Transfer {tokenSymbol}</DrawerTitle>
          <DrawerDescription>
            Send tokens to another address on Ink Sepolia
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          {renderTransferForm()}
        </div>
        <DrawerFooter className="pt-2">
          <Button
            onClick={handleSubmit}
            disabled={isTransferring ||
              !recipient ||
              !amount ||
              !!recipientError ||
              !!amountError}
            className="gap-2"
          >
            {isTransferring
              ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              )
              : (
                <>
                  <ArrowUpRight className="h-4 w-4" />
                  Send
                </>
              )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" disabled={isTransferring}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
