"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const GelatoProvider = dynamic(
  () => import("./gelato.provider").then((mod) => mod.GelatoProvider),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading Client...</div>}>
      <GelatoProvider>{children}</GelatoProvider>
    </Suspense>
  );
}
