"use client";

import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { WalletPill as WalletPillUI } from "@gelato-ui/components/wallet/wallet-pill";
import { Address } from "viem";

interface CopyableAddressPillProps {
  address: Address;
  className?: string;
}

export const WalletPill = ({
  address,
  className,
}: CopyableAddressPillProps) => {
  const { logout } = useGelatoSmartWalletPrivyContext();

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
  };

  return (
    <WalletPillUI
      address={address}
      className={className}
      onLogoutClick={handleLogout}
    />
  );
};
