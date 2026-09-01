import { MyUiInitColorSchemeScript } from "@jlopvil/mui-kit/theme";
import "@jlopvil/mui-kit/styles.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <MyUiInitColorSchemeScript />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
