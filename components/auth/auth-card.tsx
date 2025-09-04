"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLogin } from "@privy-io/react-auth";

export function AuthCard() {
  const { login } = useLogin();

  return (
    <Card className="p-8 w-full max-w-md">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Token Faucet</h1>
          <p className="text-muted-foreground">
            Get free test tokens on Ink Sepolia
          </p>
        </div>

        <Button
          onClick={login}
          className="[background:var(--brand-gradient)] text-primary-foreground shadow-xs h-10 rounded-md px-6 has-[>svg]:px-4"
        >
          Sign In
        </Button>
      </div>
    </Card>
  );
}
