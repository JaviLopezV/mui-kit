"use client";

import { MuiKitProvider } from "@JaviLopezV/mui-kit";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MuiKitProvider>{children}</MuiKitProvider>;
}
