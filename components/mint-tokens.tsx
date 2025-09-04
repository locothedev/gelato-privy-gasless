"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface IMintTokens {
  onMint: () => void;
  isPending: boolean;
}

export default function MintTokens(props: IMintTokens) {
  const { onMint, isPending } = props;
  return (
    <Card className="p-6 md:p-8 shadow-lg rounded-2xl">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Mint Tokens</h2>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Mint 1000 tokens to your wallet
        </p>
        <Button
          onClick={onMint}
          disabled={isPending}
          className="w-full text-white border-0 shadow-md hover:opacity-90 transition-all"
          style={{ background: "var(--brand-gradient)" }}
          size="lg"
        >
          {isPending ? "Minting..." : "Mint 1000 Tokens"}
        </Button>
      </div>
    </Card>
  );
}
