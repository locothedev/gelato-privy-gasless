"use client";

import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { WalletCard as WalletCardUI } from "@gelato-ui/components/wallet/wallet-card";

interface WalletCardProps {
  address: string;
}

export function WalletCard({ address }: WalletCardProps) {
  const { logout } = useGelatoSmartWalletPrivyContext();

  return (
    <WalletCardUI
      address={address}
      onLogoutClick={logout}
    />
  );
}
