"use client";

import { MyUiProvider } from "@jlopvil/mui-kit";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MyUiProvider>{children}</MyUiProvider>;
}
