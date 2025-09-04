import { erc20Abi } from "@/constants/abis";
import { sponsored } from "@gelatonetwork/smartwallet";
import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { encodeFunctionData } from "viem";
import { useMutation } from "wagmi/query";

export default function useMintTokens() {
  const {
    gelato: { client },
  } = useGelatoSmartWalletPrivyContext();

  return useMutation({
    mutationFn: async () => {
      if (!client) {
        throw new Error("Client not connected");
      }
      const preparedCalls = await client.prepareCalls({
        payment: sponsored(),
        nonce: BigInt(0),
        calls: [
          {
            to: process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "mint",
              args: [client.account.address, BigInt(1000 * 10 ** 18)],
            }),
          },
        ],
      });

      const result = await client.sendPreparedCalls({
        preparedCalls,
      });
      return result.wait();
    },
  });
}
