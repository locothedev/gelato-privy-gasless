import { INK_SEPOLIA_EXPLORER_URL } from "@/constants/explorer";
import { ExternalLink } from "lucide-react";

interface ToastTransactionLinkProps {
  message: string;
  hash: string;
}

export function ToastTransactionLink({
  message,
  hash,
}: ToastTransactionLinkProps) {
  return (
    <div className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
      {message}{" "}
      <a
        href={`${INK_SEPOLIA_EXPLORER_URL}/tx/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 underline font-medium transition-colors"
        style={{ color: "var(--brand-primary)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--brand-secondary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--brand-primary)")
        }
      >
        View transaction
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
