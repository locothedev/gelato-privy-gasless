"use client";

import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { formatUnits } from "viem";
import { toast } from "sonner";
import useTokenBalance from "@/hooks/useTokenBalance";
import useMintTokens from "@/hooks/useMintTokens";
import { ToastTransactionLink } from "@/components/toast-transaction-link";
import { AuthCard } from "@/components/auth/auth-card";
import { WalletCard } from "@/components/wallet/wallet-card";
import { BalanceCard } from "@/components/token/balance-card";
import { MintCard } from "@/components/token/mint-card";
import { usePrivy } from "@privy-io/react-auth";
import LoadingSplash from "@/components/ui/loading-splash";

export default function Home() {
  const {
    gelato: { client },
  } = useGelatoSmartWalletPrivyContext();
  const { ready, authenticated } = usePrivy();
  const {
    data: tokenBalance,
    isPending: tokenBalanceIsPending,
    isRefetching: tokenBalanceIsRefetching,
    refetch,
  } = useTokenBalance(client?.account.address);

  const { mutate, isPending: mintIsPending } = useMintTokens();

  const handleMint = () => {
    mutate(undefined, {
      onSuccess: async (hash) => {
        const explorerUrl = "https://explorer-sepolia.inkonchain.com";
        refetch();
        toast.success("Tokens minted!", {
          description: (
            <ToastTransactionLink
              message="Your balance has been updated"
              hash={hash}
              explorerUrl={explorerUrl}
            />
          ),
        });
      },
    });
  };

  if (!ready || (!client && authenticated)) {
    return <LoadingSplash />;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <AuthCard />
      </div>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Token Faucet</h1>
          <p className="text-muted-foreground">
            Get tokens for free on Ink Sepolia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WalletCard address={client.account.address} />
          <BalanceCard
            balance={formatUnits(tokenBalance || BigInt(0), 18)}
            isPending={tokenBalanceIsPending}
            isRefetching={tokenBalanceIsRefetching}
          />
          <div className="md:col-span-2">
            <MintCard onMint={handleMint} isPending={mintIsPending} />
          </div>
        </div>
      </div>
    </div>
  );
}
