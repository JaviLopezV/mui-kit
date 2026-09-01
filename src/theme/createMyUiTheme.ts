import {
  createTheme,
  type PaletteColorOptions,
  type Theme,
  type ThemeOptions,
} from "@mui/material/styles";
import { componentDefaults } from "./components";
import {
  breakpoints,
  darkPalette,
  lightPalette,
  publicTokens,
  shadows,
  shape,
  spacingUnit,
  typography,
  zIndex,
} from "./tokens";

export type MyUiColorScheme = "light" | "dark" | "system";

/** Options accepted by the central theme factory. */
export interface MyUiThemeOptions {
  /** Initial color preference. `system` follows the user's OS preference. @default 'system' */
  colorScheme?: MyUiColorScheme;
  /** Optional project brand colors. Semantic feedback colors remain system-owned. */
  brand?: { primary?: PaletteColorOptions; secondary?: PaletteColorOptions };
  /** Consumer typography overrides merged after library defaults. */
  typography?: ThemeOptions["typography"];
  /** Consumer component overrides merged after library defaults. */
  components?: ThemeOptions["components"];
}

/** Creates a MUI theme with both color schemes and the stable my-ui token contract. */
export function createMyUiTheme(options: MyUiThemeOptions = {}): Theme {
  const {
    brand,
    typography: typographyOverrides,
    components,
    colorScheme = "system",
  } = options;
  const defaultColorScheme = colorScheme === "dark" ? "dark" : "light";

  return createTheme(
    {
      cssVariables: { colorSchemeSelector: "class" },
      defaultColorScheme,
      colorSchemes: {
        light: {
          palette: {
            ...lightPalette,
            primary: brand?.primary ?? lightPalette.primary,
            secondary: brand?.secondary ?? lightPalette.secondary,
          },
        },
        dark: {
          palette: {
            ...darkPalette,
            primary: brand?.primary ?? darkPalette.primary,
            secondary: brand?.secondary ?? darkPalette.secondary,
          },
        },
      },
      spacing: spacingUnit,
      breakpoints: { values: breakpoints },
      shape: { borderRadius: shape.borderRadius },
      shadows,
      zIndex,
      typography,
      components: componentDefaults,
      myUi: publicTokens,
    },
    typographyOverrides ? { typography: typographyOverrides } : {},
    components ? { components } : {},
  );
}
