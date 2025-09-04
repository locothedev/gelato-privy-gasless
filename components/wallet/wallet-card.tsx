"use client";

import { useState } from "react";
import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, LogOut } from "lucide-react";

interface WalletCardProps {
  address: string;
}

export function WalletCard({ address }: WalletCardProps) {
  const { logout } = useGelatoSmartWalletPrivyContext();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Your Wallet</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-muted-foreground hover:text-foreground -mr-2"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <code className="text-lg font-mono">{formatAddress(address)}</code>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyAddress}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}