"use client";
import { GelatoSmartWalletPrivyContextProvider as GelatoSmartWalletContextProvider } from "@gelatonetwork/smartwallet-react-privy";
import { http } from "viem";
import { baseSepolia } from "viem/chains";

export const GelatoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GelatoSmartWalletContextProvider
      settings={{
        apiKey: process.env.NEXT_PUBLIC_GELATO_API_KEY,
        scw: {
          type: "gelato",
        },
        waas: {
          type: "privy",
          appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
          customChains: {
            supportedChains: [
              {
                id: baseSepolia.id,
                name: baseSepolia.name,
                nativeCurrency: baseSepolia.nativeCurrency,
                rpcUrls: {
                  default: {
                    http: [process.env.NEXT_PUBLIC_RPC_URL],
                    webSocket: [process.env.NEXT_PUBLIC_WS_RPC_URL],
                  },
                },
                blockExplorers: baseSepolia.blockExplorers,
                testnet: baseSepolia.testnet,
              },
            ],
          },
        },
        defaultChain: {
          id: baseSepolia.id,
          name: baseSepolia.name,
          nativeCurrency: baseSepolia.nativeCurrency,
          rpcUrls: {
            default: {
              http: [process.env.NEXT_PUBLIC_RPC_URL],
              webSocket: [process.env.NEXT_PUBLIC_WS_RPC_URL],
            },
          },
          blockExplorers: baseSepolia.blockExplorers,
          testnet: baseSepolia.testnet,
        },
        wagmi: {
          config: {
            chains: [baseSepolia],
            transports: {
              [baseSepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
            },
            ssr: false,
          },
        },
      }}
    >
      {children}
    </GelatoSmartWalletContextProvider>
  );
};
