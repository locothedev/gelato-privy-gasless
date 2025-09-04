import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, CheckCircle, Loader2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { truncateAddress } from "@/lib/truncate";
import { INK_SEPOLIA_EXPLORER_URL } from "@/constants/explorer";

interface MintTokenCardProps {
  isPending: boolean;
  onMint: () => void;
}

const tokenName = "Gelato Ink Token";
const tokenSymbol = "GEL";
const tokenAddress = process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS;

const MintTokenCard: React.FC<MintTokenCardProps> = ({
  isPending = false,
  onMint,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-background border-border shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              className="rounded-2xl"
              src="/gelato.png"
              alt="GEL"
              height={48}
              width={48}
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {tokenName}
              </h3>
              <p className="text-sm text-muted-foreground">{tokenSymbol}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            ERC-20
          </Badge>
        </div>

        {/* Token Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Fixed Amount</span>
            <span className="text-lg font-bold text-foreground">
              {Number(1000).toLocaleString()} {tokenSymbol}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Contract</span>
            <a
              href={`${INK_SEPOLIA_EXPLORER_URL}/address/${tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors flex items-center gap-1"
            >
              {truncateAddress(tokenAddress)}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Mint Button */}
        <div className="pt-2">
          {
            <Button
              onClick={onMint}
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Minting...
                </>
              ) : (
                <>
                  <Coins className="w-4 h-4 mr-2" />
                  Mint Tokens
                </>
              )}
            </Button>
          }
        </div>

        {/* Additional Info */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
          Enjoy gas fee free transaction
        </div>
      </div>
    </Card>
  );
};

export default MintTokenCard;
