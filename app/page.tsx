"use client";

import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import WalletConnect from "@/components/wallet-connect";
import WalletInfo from "@/components/wallet-info";
import TokenBalance from "@/components/token-balance";
import MintTokens from "@/components/mint-tokens";
import useTokenBalance from "@/hooks/useTokenBalance";
import { formatUnits } from "viem";
import useMintTokens from "@/hooks/useMintTokens";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

export default function Home() {
  const {
    gelato: { client },
  } = useGelatoSmartWalletPrivyContext();
  const {
    data: tokenBalance,
    isPending: tokenBalanceIsPending,
    isRefetching: tokenBalanceIsRefetching,
    refetch,
  } = useTokenBalance(client?.account.address);

  const { mutate, isPending: mintIsPending } = useMintTokens();

  const handleMint = () => {
    mutate(undefined, {
      onSuccess: async (txHash) => {
        refetch();
        const explorerUrl = "https://sepolia.basescan.org/";
        toast.success("Successfully minted 1000 tokens!", {
          description: (
            <div className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
              Your balance has been updated.{" "}
              <a
                href={`${explorerUrl}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline font-medium transition-colors"
                style={{ color: "var(--brand-primary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--brand-secondary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--brand-primary)")
                }
              >
                View transaction
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ),
        });
      },
      onError: (error) => {
        toast.error("Failed to mint tokens", {
          description: error.message || "Please try again",
        });
      },
    });
  };

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <WalletConnect />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-3">
            <WalletInfo />
          </div>
          <div className="md:col-span-1">
            <TokenBalance
              balance={formatUnits(tokenBalance || BigInt(0), 18)}
              isPending={tokenBalanceIsPending}
              isRefetching={tokenBalanceIsRefetching}
            />
          </div>
          <div className="md:col-span-1 lg:col-span-2">
            <MintTokens onMint={handleMint} isPending={mintIsPending} />
          </div>
        </div>
      </div>
    </div>
  );
}
