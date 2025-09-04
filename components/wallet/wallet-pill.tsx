"use client";
import { truncateAddress } from "@/lib/truncate";
import { cn } from "@/lib/utils";
import { useGelatoSmartWalletPrivyContext } from "@gelatonetwork/smartwallet-react-privy";
import { Check, Copy, LogOut } from "lucide-react";
import { useState } from "react";
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
  const [isCopied, setIsCopied] = useState(false);
  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 h-7 rounded-full w-fit leading-none",
        "bg-background border border-border",
        "text-xs font-mono text-foreground",
        "shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      {/* Address with copy functionality */}
      <button
        onClick={copyAddress}
        className={cn(
          "flex items-center gap-1.5 px-1.5 py-0 h-full rounded-full leading-none",
          "transition-colors duration-200 ease-in-out",
          "hover:bg-secondary/50",
          isCopied ? "text-green-600" : "text-foreground hover:text-primary"
        )}
      >
        <span className="text-[11px] leading-none">
          {truncateAddress(address)}
        </span>
        <div className="transition-transform duration-200 ease-in-out">
          {isCopied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </div>
      </button>

      {/* Separator */}
      <div className="w-px h-3 bg-border" />

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className={cn(
          "flex items-center gap-1 px-1.5 py-0 h-full rounded-full leading-none",
          "text-xs font-medium",
          "text-muted-foreground hover:text-destructive",
          "hover:bg-destructive/10",
          "transition-colors duration-200"
        )}
      >
        <LogOut className="h-3 w-3" />
        <span className="hidden sm:block">Logout</span>
      </button>
    </div>
  );
};
