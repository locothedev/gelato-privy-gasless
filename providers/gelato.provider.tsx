"use client";
import { GelatoSmartWalletPrivyContextProvider as GelatoSmartWalletContextProvider } from "@gelatonetwork/smartwallet-react-privy";
import { http } from "viem";
import { inkSepolia } from "viem/chains";

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
                id: inkSepolia.id,
                name: inkSepolia.name,
                nativeCurrency: inkSepolia.nativeCurrency,
                rpcUrls: {
                  default: {
                    http: [process.env.NEXT_PUBLIC_RPC_URL],
                    webSocket: [process.env.NEXT_PUBLIC_WS_RPC_URL],
                  },
                  public: inkSepolia.rpcUrls.default,
                },
                blockExplorers: inkSepolia.blockExplorers,
                testnet: inkSepolia.testnet,
              },
            ],
          },
        },
        defaultChain: {
          id: inkSepolia.id,
          name: inkSepolia.name,
          nativeCurrency: inkSepolia.nativeCurrency,
          rpcUrls: {
            default: {
              http: process.env.NEXT_PUBLIC_RPC_URL
                ? [process.env.NEXT_PUBLIC_RPC_URL]
                : inkSepolia.rpcUrls.default.http,
              webSocket: [process.env.NEXT_PUBLIC_WS_RPC_URL],
            },
            public: inkSepolia.rpcUrls.default,
          },
          blockExplorers: inkSepolia.blockExplorers,
          testnet: inkSepolia.testnet,
        },
        wagmi: {
          config: {
            chains: [inkSepolia],
            transports: {
              [inkSepolia.id]: http(
                process.env.NEXT_PUBLIC_RPC_URL ||
                  inkSepolia.rpcUrls.default.http[0]
              ),
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
