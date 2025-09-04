import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface ITokenBalance {
  balance: string;
  isPending: boolean;
  isRefetching: boolean;
}

export default function TokenBalance(props: ITokenBalance) {
  const { balance, isPending, isRefetching } = props;

  return (
    <Card className="p-6 md:p-8 relative shadow-lg rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">Balance</h2>
        {isRefetching && (
          <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Token Balance</p>
        <p className="text-3xl md:text-4xl font-bold transition-all duration-300">
          {isPending ? "..." : balance}
        </p>
        <p className="text-xs text-muted-foreground">TOKENS</p>
      </div>
    </Card>
  );
}
