import { INK_SEPOLIA_EXPLORER_URL } from "@/constants/explorer";
import { ToastTransactionLink as ToastTransactionLinkUI } from "@gelato-ui/components/toast-transaction-link";

interface ToastTransactionLinkProps {
  message: string;
  hash: string;
}

export function ToastTransactionLink({
  message,
  hash,
}: ToastTransactionLinkProps) {
  return (
    <ToastTransactionLinkUI
      message={message}
      hash={hash}
      explorerUrl={INK_SEPOLIA_EXPLORER_URL}
    />
  );
}
