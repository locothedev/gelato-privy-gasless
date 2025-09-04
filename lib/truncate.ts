import { Address } from "viem";

export const truncateAddress = (addr: Address) => {
  if (addr.length > 13) {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }
  return addr;
};
