import type { Breakpoint } from "@mui/material/styles";

/** Semantic intent shared by controls and feedback components. */
export type SemanticTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger";

/** Supported control scale. Every size preserves a 44px minimum touch target. */
export type ControlSize = "small" | "medium" | "large";

/** A value that can change at MUI breakpoints. */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
