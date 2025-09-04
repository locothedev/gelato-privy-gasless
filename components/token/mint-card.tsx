"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface MintCardProps {
  onMint: () => void;
  isPending: boolean;
}

export function MintCard({ onMint, isPending }: MintCardProps) {
  return (
    <Card className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-2">Get Gelato Tokens</h2>
      <p className="text-muted-foreground mb-6">
        Mint 1,000 Gelato tokens to your wallet for free
      </p>

      <div className="bg-secondary/50 rounded-lg p-4 mb-6">
        <div className="text-3xl font-bold mb-1">1,000 GEL</div>
      </div>

      <Button
        onClick={onMint}
        disabled={isPending}
        size="lg"
        className="w-full"
        style={{
          background: isPending ? "#262626" : "var(--brand-gradient)",
        }}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Minting...
          </>
        ) : (
          "Mint Tokens"
        )}
      </Button>
    </Card>
  );
}
