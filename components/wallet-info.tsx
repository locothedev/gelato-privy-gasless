"use client";

import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WalletInfo() {
  const {
    gelato: { client },
    logout,
  } = useGelatoSmartWalletPrivyContext();

  if (!client) return null;

  return (
    <Card className="p-6 md:p-8 shadow-lg rounded-2xl">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">Wallet</h2>
        <Button onClick={() => logout()} variant="outline" size="sm">
          Logout
        </Button>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Address</p>
        <p className="font-mono text-xs md:text-sm break-all">
          {client.account.address}
        </p>
      </div>
    </Card>
  );
}