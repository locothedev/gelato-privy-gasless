"use client";

import { Card } from "@gelato-ui/components/ui/card";
import { Skeleton } from "@gelato-ui/components/ui/skeleton";
import { RefreshCcw, Wallet } from "lucide-react";
import Image from "next/image";
import { TransferModal } from "./transfer-modal";
import { Address } from "viem";

interface BalanceCardProps {
  balance: string;
  isPending: boolean;
  isRefetching: boolean;
  refetch: () => void;
  onTransfer: (recipient: Address, amount: string) => Promise<void>;
  isTransferring?: boolean;
}

export function BalanceCard({
  balance,
  isPending,
  isRefetching,
  refetch,
  onTransfer,
  isTransferring,
}: BalanceCardProps) {
  const formatBalance = (bal: string) => {
    const num = parseFloat(bal);
    if (num === 0) return "0";
    if (num < 0.01) return "< 0.01";
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background border-border shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wallet className="rounded-2xl h-12 w-12 p-2 bg-card/20 text-foreground" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Portfolio
              </h3>
              <p className="text-sm text-muted-foreground">ERC20 Tokens</p>
            </div>
          </div>
          <RefreshCcw
            className={`h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-transform ${
              isRefetching ? "animate-spin" : ""
            }`}
            onClick={!isRefetching ? refetch : undefined}
          />
        </div>
        {isPending
          ? <Skeleton className="h-20 w-full" />
          : (
            <>
              <div className="flex justify-between items-center gap-4 p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Image
                    className="rounded-full"
                    src="/gelato.png"
                    alt="GEL"
                    height={32}
                    width={32}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-muted-foreground">GEL</p>
                    <p className="text-xl font-bold">
                      {formatBalance(balance)}
                    </p>
                  </div>
                </div>
              </div>
              <TransferModal
                balance={balance}
                onTransfer={onTransfer}
                isTransferring={isTransferring}
                tokenSymbol="GEL"
              />
            </>
          )}
      </div>
    </Card>
  );
}
