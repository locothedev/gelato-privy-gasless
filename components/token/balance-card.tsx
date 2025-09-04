"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BalanceCardProps {
  balance: string;
  isPending: boolean;
  isRefetching: boolean;
}

export function BalanceCard({ 
  balance, 
  isPending, 
  isRefetching, 
}: BalanceCardProps) {
  const formatBalance = (bal: string) => {
    const num = parseFloat(bal);
    if (num === 0) return "0";
    if (num < 0.01) return "< 0.01";
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 4 
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Balance</h3>
        {isRefetching && (
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        )}
      </div>
      
      {isPending ? (
        <Skeleton className="h-7 w-24" />
      ) : (
        <p className="text-2xl font-bold">
          {formatBalance(balance)} <span className="text-sm text-muted-foreground">TEST</span>
        </p>
      )}
    </Card>
  );
}