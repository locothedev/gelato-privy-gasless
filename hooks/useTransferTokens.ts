import { erc20Abi } from "@/constants/abis";
import { sponsored } from "@gelatonetwork/smartwallet";
import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import {
  Address,
  encodeFunctionData,
  parseUnits,
  UserRejectedRequestError,
} from "viem";
import { useMutation } from "wagmi/query";
import { toast } from "sonner";

interface TransferParams {
  recipient: Address;
  amount: string;
}

export function useTransferTokens() {
  const {
    gelato: { client },
  } = useGelatoSmartWalletPrivyContext();

  return useMutation<Address, Error, TransferParams>({
    mutationFn: async ({ recipient, amount }) => {
      if (!client) {
        throw new Error("Wallet not connected");
      }

      if (!process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS) {
        throw new Error("Token address not configured");
      }

      // Parse amount to wei (18 decimals)
      const amountInWei = parseUnits(amount, 18);

      // Toast for waiting for user confirmation
      toast.info("Waiting for user confirmation...", {
        description: "Please confirm the transfer transaction",
      });

      // Execute the transfer
      const result = await client.execute({
        payment: sponsored(),
        calls: [
          {
            to: process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "transfer",
              args: [recipient, amountInWei],
            }),
          },
        ],
      });

      toast.dismiss();

      toast.info("Waiting for Submission", {
        description: "Your transaction is being submitted to the network.",
      });

      // Wait for transaction hash
      const transactionHash = await new Promise<Address>((resolve, reject) => {
        result.on("submitted", (tx) => {
          toast.dismiss();
          if (!tx.transactionHash) {
            reject(new Error("No transaction hash found"));
            return;
          }
          resolve(tx.transactionHash as Address);
        });

        result.on("error", (error) => {
          reject(error);
        });
      });

      // Wait for confirmation
      await client.waitForTransactionReceipt({
        hash: transactionHash,
        confirmations: 2,
      });

      return transactionHash;
    },
    onError: (error) => {
      toast.dismiss();
      
      if (error instanceof UserRejectedRequestError) {
        return toast.error("Transaction rejected", {
          description: "You have rejected the transfer",
        });
      }
      
      if (error.message?.includes("insufficient funds")) {
        return toast.error("Insufficient funds", {
          description: "Not enough tokens or gas to complete the transfer",
        });
      }
      
      toast.error("Transfer failed", {
        description: error.message || "Please try again",
      });
    },
  });
}