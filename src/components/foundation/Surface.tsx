import * as React from "react";
import Paper, { type PaperProps } from "@mui/material/Paper";
import { alpha, type SxProps, type Theme } from "@mui/material/styles";
import { shape } from "../../theme/tokens";

export type SurfaceVariant = "plain" | "outlined" | "elevated" | "glass";
export type SurfacePadding = "none" | "compact" | "comfortable" | "spacious";

/** Props for a theme-aware visual surface. */
export interface SurfaceProps extends Omit<PaperProps, "variant"> {
  /** Visual treatment without imposing content structure. @default 'outlined' */
  variant?: SurfaceVariant;
  /** Tokenized inner spacing. @default 'comfortable' */
  padding?: SurfacePadding;
}

const paddingSx: Record<SurfacePadding, SxProps<Theme>> = {
  none: { p: 0 },
  compact: { p: { xs: 1.5, sm: 2 } },
  comfortable: { p: { xs: 2, sm: 3 } },
  spacious: { p: { xs: 3, sm: 4, md: 5 } },
};

/** A composable Paper surface with shared border, elevation, glass and padding recipes. */
export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface(
    { variant = "outlined", padding = "comfortable", sx, ...props },
    ref,
  ) {
    const variantSx: SxProps<Theme> = (theme) => ({
      borderRadius: `${shape.radii.large}px`,
      ...(variant === "plain" && { backgroundColor: "transparent" }),
      ...(variant === "outlined" && {
        border: `1px solid ${theme.palette.divider}`,
      }),
      ...(variant === "elevated" && { boxShadow: theme.shadows[4] }),
      ...(variant === "glass" && {
        backgroundColor: alpha(theme.palette.background.paper, 0.78),
        border: `1px solid ${alpha(theme.palette.divider, 0.72)}`,
        boxShadow: theme.shadows[3],
        backdropFilter: "blur(16px)",
      }),
    });

    return (
      <Paper
        ref={ref}
        elevation={0}
        sx={[
          variantSx,
          paddingSx[padding],
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...props}
      />
    );
  },
);
