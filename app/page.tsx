"use client";

import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { Address, formatUnits } from "viem";
import { toast } from "sonner";
import useTokenBalance from "@/hooks/useTokenBalance";
import useMintTokens from "@/hooks/useMintTokens";
import { useTransferTokens } from "@/hooks/useTransferTokens";
import { ToastTransactionLink } from "@/components/toast-transaction-link";
import { AuthCard } from "@/components/auth/auth-card";
import { BalanceCard } from "@/components/token/balance-card";
import MintCard from "@/components/token/mint-card";
import { usePrivy } from "@privy-io/react-auth";
import GelatoLoading from "@gelato-ui/components/ui/gelato-loading";
import { WalletPill } from "@/components/wallet/wallet-pill";

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
  const { mutate: transferTokens, isPending: isTransferring } =
    useTransferTokens();

  const handleMint = () => {
    mutate(undefined, {
      onSuccess: async (hash) => {
        refetch();
        toast.success("Tokens minted!", {
          description: (
            <ToastTransactionLink
              message="Your balance has been updated"
              hash={hash}
            />
          ),
        });
      },
    });
  };

  const handleTransfer = async (recipient: Address, amount: string) => {
    transferTokens(
      { recipient: recipient as Address, amount },
      {
        onSuccess: async (hash) => {
          refetch();
          toast.success("Transfer successful!", {
            description: (
              <ToastTransactionLink
                message={`Sent ${amount} GEL to ${recipient.slice(0, 6)}...${
                  recipient.slice(-4)
                }`}
                hash={hash}
              />
            ),
          });
        },
      },
    );
  };

  if (!ready || (!client && authenticated)) {
    return <GelatoLoading />;
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
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="flex justify-center">
          <WalletPill address={client.account.address} className="mx-auto" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Gelato Ink Faucet</h1>
          <p className="text-md text-muted-foreground">
            Mint GEL tokens for free on Ink Sepolia
          </p>
        </div>

        <BalanceCard
          balance={formatUnits(tokenBalance || BigInt(0), 18)}
          isPending={tokenBalanceIsPending}
          isRefetching={tokenBalanceIsRefetching}
          refetch={refetch}
          onTransfer={handleTransfer}
          isTransferring={isTransferring}
        />
        <MintCard onMint={handleMint} isPending={mintIsPending} />
      </div>
    </div>
  );
}
