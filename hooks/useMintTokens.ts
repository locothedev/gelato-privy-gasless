import { erc20Abi } from "@/constants/abis";
import { sponsored } from "@gelatonetwork/smartwallet";
import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { Address, encodeFunctionData, parseUnits } from "viem";
import { useMutation } from "wagmi/query";

export default function useMintTokens() {
  const {
    gelato: { client },
  } = useGelatoSmartWalletPrivyContext();

  return useMutation<Address>({
    mutationFn: async () => {
      if (!client) {
        throw new Error("Client not connected");
      }

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

      return result.wait();
    },
  });
}
