import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import LoadingSplash from "@/components/ui/loading-splash";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ink Sepolia Smart Wallet",
  description:
    "Manage your tokens on Ink Sepolia testnet with Gelato Smart Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Suspense fallback={<LoadingSplash />}>
          <Providers>{children}</Providers>
        </Suspense>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
