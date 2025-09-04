import { erc20Abi } from "@/constants/abis";
import { Address } from "viem";
import { useReadContract } from "wagmi";

export default function useTokenBalance(address: Address | undefined) {
  return useReadContract({
    abi: erc20Abi,
    address: process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });
}
