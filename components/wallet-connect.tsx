"use client";

import {
  GelatoSmartWalletPrivyConnectButton as GelatoSmartWalletConnectButton,
} from "@gelatonetwork/smartwallet-react-privy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WalletConnect() {
  return (
    <Card className="p-6 md:p-8 h-full flex flex-col justify-center shadow-lg rounded-2xl">
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Connect Wallet</h2>
        <p className="text-sm text-muted-foreground">
          Connect your wallet to access your tokens
        </p>
        <GelatoSmartWalletConnectButton>
          <Button 
            className="w-full text-white border-0 shadow-md hover:opacity-90 transition-all" 
            style={{ background: "var(--brand-gradient)" }}
            size="lg"
          >
            Connect
          </Button>
        </GelatoSmartWalletConnectButton>
      </div>
    </Card>
  );
}