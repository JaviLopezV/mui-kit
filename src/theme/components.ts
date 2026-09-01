import type { Components, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { controlSizes, shape } from "./tokens";

export const componentDefaults: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": { boxSizing: "border-box" },
      html: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      body: { margin: 0 },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      variant: "contained",
      size: "medium",
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        borderRadius: shape.radii.medium,
        minHeight: controlSizes[ownerState.size ?? "medium"].minHeight,
        paddingInline: controlSizes[ownerState.size ?? "medium"].paddingInline,
        "&:focus-visible": {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.4)}`,
          outlineOffset: 2,
        },
      }),
    },
  },
  MuiIconButton: {
    defaultProps: { size: "medium" },
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: 44,
        minHeight: 44,
        borderRadius: shape.radii.medium,
        "&:focus-visible": {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.4)}`,
          outlineOffset: 2,
        },
      }),
    },
  },
  MuiLink: {
    defaultProps: { underline: "hover" },
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 600,
        textUnderlineOffset: "0.18em",
        "&:focus-visible": {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.4)}`,
          outlineOffset: 2,
          borderRadius: 2,
        },
      }),
    },
  },
  MuiTextField: {
    defaultProps: { fullWidth: true, size: "medium", variant: "outlined" },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 44,
        borderRadius: shape.radii.medium,
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderWidth: 2,
          borderColor: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiCheckbox: { defaultProps: { color: "primary" } },
  MuiRadio: { defaultProps: { color: "primary" } },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: { root: { backgroundImage: "none" } },
  },
  MuiAlert: {
    styleOverrides: {
      root: { borderRadius: shape.radii.medium },
      action: { alignItems: "center" },
    },
  },
  MuiDialog: {
    defaultProps: { fullWidth: true },
    styleOverrides: { paper: { borderRadius: shape.radii.large } },
  },
  MuiContainer: { defaultProps: { maxWidth: "lg" } },
};
