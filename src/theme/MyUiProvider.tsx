"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import {
  createMyUiTheme,
  type MyUiColorScheme,
  type MyUiThemeOptions,
} from "./createMyUiTheme";
import {
  myUiColorSchemeStorageKey,
  myUiModeStorageKey,
} from "./MyUiInitColorSchemeScript";

/** Props for the central MUI provider. */
export interface MyUiProviderProps {
  children: React.ReactNode;
  /** A prebuilt theme. When present, `themeOptions` is ignored. */
  theme?: Theme;
  /** Options used to create the theme when `theme` is not supplied. */
  themeOptions?: MyUiThemeOptions;
  /** Whether to install MUI's global baseline. @default true */
  enableCssBaseline?: boolean;
  /** Initial scheme. Defaults to `themeOptions.colorScheme`, then `system`. */
  defaultMode?: MyUiColorScheme;
  /** Prevents transitions while the color scheme changes. @default true */
  disableTransitionOnChange?: boolean;
  /** Storage key shared with `MyUiInitColorSchemeScript`. */
  modeStorageKey?: string;
  /** Color-scheme storage key shared with `MyUiInitColorSchemeScript`. */
  colorSchemeStorageKey?: string;
}

/** Provides the my-ui theme without coupling consumers to routing, i18n or storage. */
export function MyUiProvider({
  children,
  theme,
  themeOptions,
  enableCssBaseline = true,
  defaultMode,
  disableTransitionOnChange = true,
  modeStorageKey = myUiModeStorageKey,
  colorSchemeStorageKey = myUiColorSchemeStorageKey,
}: MyUiProviderProps) {
  const resolvedTheme = React.useMemo(
    () => theme ?? createMyUiTheme(themeOptions),
    [theme, themeOptions],
  );
  const resolvedMode = defaultMode ?? themeOptions?.colorScheme ?? "system";

  return (
    <ThemeProvider
      theme={resolvedTheme}
      defaultMode={resolvedMode}
      disableTransitionOnChange={disableTransitionOnChange}
      modeStorageKey={modeStorageKey}
      colorSchemeStorageKey={colorSchemeStorageKey}
    >
      {enableCssBaseline ? <CssBaseline /> : null}
      {children}
    </ThemeProvider>
  );
}
