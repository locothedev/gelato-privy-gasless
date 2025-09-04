"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@privy-io/react-auth";
import { Wallet } from "lucide-react";

export function AuthCard() {
  const { login } = useLogin();

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6">
          <Wallet className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <h1 className="text-3xl font-bold">Gelato Ink Faucet</h1>
        <p className="text-muted-foreground">
          Mint GEL tokens for free on Ink Sepolia
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold">Connect to get started</h2>
          <p className="text-sm text-muted-foreground">
            Sign in with your email or social account to access the faucet
          </p>
        </div>

        <Button
          onClick={login}
          size="lg"
          className="w-full [background:var(--brand-gradient)] hover:opacity-90 text-white border-0 transition-opacity"
        >
          Sign In
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Powered by Gelato Network & Privy
        </p>
      </div>
    </div>
  );
}
