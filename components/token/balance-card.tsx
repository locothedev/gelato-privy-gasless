"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw, Wallet } from "lucide-react";
import Image from "next/image";

interface BalanceCardProps {
  balance: string;
  isPending: boolean;
  isRefetching: boolean;
  refetch: () => void;
}

export function BalanceCard({
  balance,
  isPending,
  isRefetching,
  refetch,
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
      <div className="p-3 space-y-6">
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
          {isRefetching ? (
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          ) : (
            <RefreshCcw
              className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground"
              onClick={refetch}
            />
          )}
        </div>
        {isPending ? (
          <Skeleton className="h-10 w-3/4" />
        ) : (
          <div className="space-y-1 flex justify-between items-center gap-4 p-4 bg-accent/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Image
                className="rounded-3xl"
                src="/gelato.png"
                alt="GEL"
                height={24}
                width={24}
              />
              <div className="flex flex-col">
                <p className="text-md font-bold text-white">GEL</p>
                <p className="hidden md:block text-xs text-muted-foreground">
                  Gelato Ink
                </p>
              </div>
            </div>
            <p className="text-md md:text-lg font-bold transition-all duration-300">
              {formatBalance(balance)}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
