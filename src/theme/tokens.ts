import type {
  BreakpointsOptions,
  PaletteOptions,
  Shadows,
  TypographyVariantsOptions,
} from "@mui/material/styles";

export const spacingUnit = 8;

export const breakpoints: NonNullable<BreakpointsOptions["values"]> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const shape = {
  borderRadius: 12,
  radii: {
    small: 8,
    medium: 12,
    large: 20,
    pill: 999,
  },
} as const;

export const controlSizes = {
  small: { minHeight: 44, paddingInline: 12, iconSize: 18 },
  medium: { minHeight: 44, paddingInline: 16, iconSize: 20 },
  large: { minHeight: 48, paddingInline: 20, iconSize: 22 },
} as const;

export const motion = {
  duration: { short: 150, standard: 250, complex: 350 },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1.2)",
  },
} as const;

export const zIndex = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#1769aa",
    light: "#4f98d1",
    dark: "#0d4778",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#5b6472",
    light: "#858e9c",
    dark: "#343c48",
    contrastText: "#ffffff",
  },
  success: { main: "#2e7d32" },
  warning: { main: "#a15c00" },
  error: { main: "#c62828" },
  info: { main: "#0277bd" },
  background: { default: "#f6f8fb", paper: "#ffffff" },
  text: { primary: "#17212b", secondary: "#52606d" },
  divider: "rgba(23, 33, 43, 0.14)",
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#75b9eb",
    light: "#a8dcff",
    dark: "#438abb",
    contrastText: "#071b2a",
  },
  secondary: {
    main: "#aeb8c5",
    light: "#dde6f3",
    dark: "#7f8996",
    contrastText: "#111820",
  },
  success: { main: "#66bb6a" },
  warning: { main: "#ffb74d" },
  error: { main: "#ef6c6c" },
  info: { main: "#4fc3f7" },
  background: { default: "#101419", paper: "#181e25" },
  text: { primary: "#f2f5f8", secondary: "#b5c0cb" },
  divider: "rgba(242, 245, 248, 0.16)",
};

export const typography: TypographyVariantsOptions = {
  fontFamily: "Inter, Roboto, Arial, sans-serif",
  h1: {
    fontWeight: 800,
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.035em",
  },
  h2: {
    fontWeight: 800,
    fontSize: "clamp(1.9rem, 4vw, 3rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.03em",
  },
  h3: {
    fontWeight: 750,
    fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
    lineHeight: 1.18,
    letterSpacing: "-0.02em",
  },
  h4: { fontWeight: 750 },
  h5: { fontWeight: 700 },
  h6: { fontWeight: 700 },
  button: { textTransform: "none", fontWeight: 700 },
};

const baseShadows = [
  "none",
  "0 1px 2px rgba(15, 23, 42, 0.08)",
  "0 2px 6px rgba(15, 23, 42, 0.10)",
  "0 4px 12px rgba(15, 23, 42, 0.10)",
  "0 8px 20px rgba(15, 23, 42, 0.12)",
  "0 12px 28px rgba(15, 23, 42, 0.14)",
] as const;

export const shadows = Array.from(
  { length: 25 },
  (_, index) => baseShadows[index] ?? baseShadows[5],
) as Shadows;

export const publicTokens = {
  spacingUnit,
  breakpoints,
  shape,
  controlSizes,
  motion,
  zIndex,
} as const;

declare module "@mui/material/styles" {
  interface CssThemeVariables {
    enabled: true;
  }

  interface Theme {
    myUi: typeof publicTokens;
  }

  interface ThemeOptions {
    myUi?: typeof publicTokens;
  }
}
