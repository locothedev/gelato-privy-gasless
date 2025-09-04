import { erc20Abi } from "@/constants/abis";
import { sponsored } from "@gelatonetwork/smartwallet";
import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { Address, encodeFunctionData, parseUnits, UserRejectedRequestError } from "viem";
import { useMutation } from "wagmi/query";
import { toast } from "sonner";

export default function useMintTokens() {
  const {
    gelato: { client },
  } = useGelatoSmartWalletPrivyContext();

  return useMutation<Address>({
    mutationFn: async () => {
      if (!client) {
        throw new Error("Client not connected");
      }

      // toast for waiting for user confirmation
      toast.info("Waiting for user confirmation...", {
        description: "Please confirm the transaction",
      });

      const result = await client.execute({
        payment: sponsored(),
        calls: [
          {
            to: process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "mint",
              args: [client.account.address, parseUnits("1000", 18)],
            }),
          },
        ],
      });

      toast.dismiss();

      toast.info("Waiting for Submission", {
        description: "Your transaction is being submitted to the network.",
      });

      const promiseAddress = await new Promise<Address>((resolve) => {
        result.on("submitted", (tx) => {
          toast.dismiss();
          if (!tx.transactionHash) {
            throw new Error("No transaction hash found");
          }
          resolve(tx.transactionHash as Address);
        });
      });

      await client.waitForTransactionReceipt({
        hash: promiseAddress,
      });

      return promiseAddress;
    },
    onError: (error) => {
      if (error instanceof UserRejectedRequestError) {
        return toast.error("Transaction rejected", {
          description: "You have rejected the transaction",
        });
      }
      toast.error("Failed to mint tokens", {
        description: error.message || "Please try again",
      });
    },
  });
}
