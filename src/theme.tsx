'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';

export const kitTokens = {
  primary: '#67c4ff',
  primaryDark: '#2196d9',
  primaryLight: '#c8eeff',
  primaryBorder: '#9ddcff',
  secondary: '#ffffff',
  secondaryText: '#1a4d6b',
  dystopia: '#171c28',
  dystopiaSoft: '#222838',
  dystopiaBorder: '#39445c',
  dystopiaText: '#e6f4ff',
  background: '#f5fbff',
  surface: '#ffffff',
  text: '#163247',
  textMuted: '#5f7890',
} as const;

declare module '@mui/material/styles' {
  interface Palette {
    dystopia: Palette['primary'];
    surface: Palette['primary'];
  }

  interface PaletteOptions {
    dystopia?: PaletteOptions['primary'];
    surface?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dystopia: true;
    surface: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    dystopia: true;
    surface: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    dystopia: true;
    surface: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    dystopia: true;
    surface: true;
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsColorOverrides {
    dystopia: true;
    surface: true;
  }
}

export const baseTheme = createTheme({
  shape: { borderRadius: 16 },
  palette: {
    mode: 'light',
    primary: {
      main: kitTokens.primary,
      light: kitTokens.primaryLight,
      dark: kitTokens.primaryDark,
      contrastText: '#0f3552',
    },
    secondary: {
      main: kitTokens.secondary,
      light: '#ffffff',
      dark: '#e8f7ff',
      contrastText: kitTokens.secondaryText,
    },
    dystopia: {
      main: kitTokens.dystopia,
      light: kitTokens.dystopiaSoft,
      dark: '#0f1320',
      contrastText: kitTokens.dystopiaText,
    },
    surface: {
      main: kitTokens.surface,
      light: '#ffffff',
      dark: '#edf7fd',
      contrastText: kitTokens.text,
    },
    background: {
      default: kitTokens.background,
      paper: kitTokens.surface,
    },
    text: {
      primary: kitTokens.text,
      secondary: kitTokens.textMuted,
    },
    divider: alpha(kitTokens.primaryDark, 0.16),
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: { fontWeight: 900, letterSpacing: '-0.04em' },
    h2: { fontWeight: 800, letterSpacing: '-0.03em' },
    h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: '-0.01em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(180deg, #f9fdff 0%, #f5fbff 100%)',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        color: 'primary',
        variant: 'contained',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 14,
          paddingInline: 16,
          minHeight: 42,
          ...(ownerState.color === 'secondary' && {
            border: `1px solid ${kitTokens.primaryBorder}`,
            background: theme.palette.secondary.main,
            color: kitTokens.secondaryText,
            '&:hover': {
              background: '#f7fdff',
              borderColor: theme.palette.primary.main,
            },
          }),
          ...(ownerState.color === 'dystopia' && {
            background: `linear-gradient(135deg, ${kitTokens.dystopia} 0%, ${kitTokens.dystopiaSoft} 100%)`,
            color: kitTokens.dystopiaText,
            border: `1px solid ${kitTokens.dystopiaBorder}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${kitTokens.dystopiaSoft} 0%, ${kitTokens.dystopia} 100%)`,
            },
          }),
        }),
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 14,
          ...(ownerState.color === 'secondary' && {
            backgroundColor: theme.palette.secondary.main,
            border: `1px solid ${kitTokens.primaryBorder}`,
            color: kitTokens.secondaryText,
          }),
          ...(ownerState.color === 'dystopia' && {
            backgroundColor: alpha(kitTokens.dystopia, 0.94),
            border: `1px solid ${kitTokens.dystopiaBorder}`,
            color: kitTokens.dystopiaText,
          }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 999,
          fontWeight: 700,
          ...(ownerState.color === 'secondary' && {
            backgroundColor: theme.palette.common.white,
            border: `1px solid ${kitTokens.primaryBorder}`,
            color: kitTokens.secondaryText,
          }),
          ...(ownerState.color === 'dystopia' && {
            backgroundColor: alpha(kitTokens.dystopia, 0.96),
            border: `1px solid ${kitTokens.dystopiaBorder}`,
            color: kitTokens.dystopiaText,
          }),
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 20,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: `1px solid ${alpha(kitTokens.primaryDark, 0.12)}`,
          boxShadow: '0 14px 40px rgba(24, 83, 120, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: alpha('#ffffff', 0.78),
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${alpha(kitTokens.primaryDark, 0.08)}`,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        color: 'primary',
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          backgroundColor: alpha(theme.palette.common.white, 0.92),
        }),
        notchedOutline: {
          borderColor: alpha(kitTokens.primaryDark, 0.16),
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 16,
          ...(ownerState.color === 'dystopia' && {
            backgroundColor: alpha(kitTokens.dystopia, 0.96),
            color: kitTokens.dystopiaText,
            border: `1px solid ${kitTokens.dystopiaBorder}`,
            '& .MuiAlert-icon': {
              color: kitTokens.dystopiaText,
            },
          }),
          ...(ownerState.color === 'secondary' && {
            backgroundColor: theme.palette.common.white,
            color: kitTokens.secondaryText,
            border: `1px solid ${kitTokens.primaryBorder}`,
          }),
        }),
      },
    },
  },
});

export interface MuiKitProviderProps {
  children: React.ReactNode;
}

export function MuiKitProvider({ children }: MuiKitProviderProps) {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
