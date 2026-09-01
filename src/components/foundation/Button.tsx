import * as React from "react";
import MuiButton, {
  type ButtonProps as MuiButtonProps,
} from "@mui/material/Button";
import type { SemanticTone } from "../../types/public";

const toneColor: Record<SemanticTone, NonNullable<MuiButtonProps["color"]>> = {
  neutral: "secondary",
  primary: "primary",
  success: "success",
  warning: "warning",
  danger: "error",
};

/** Props for the system button. It preserves MUI behavior and adds semantic tone. */
export interface ButtonProps extends Omit<MuiButtonProps, "color"> {
  /** Semantic intent mapped to the MUI palette. @default 'primary' */
  tone?: SemanticTone;
  /** MUI color escape hatch. Prefer `tone` in shared product UI. */
  color?: MuiButtonProps["color"];
  /** Accessible text announced while `loading` is true. */
  loadingLabel?: string;
}

/** A consistently sized MUI button with semantic tone and native MUI loading behavior. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { tone = "primary", color, loading, loadingLabel, children, ...props },
    ref,
  ) {
    return (
      <MuiButton
        ref={ref}
        color={color ?? toneColor[tone]}
        loading={loading}
        aria-busy={loading || undefined}
        aria-label={
          loading && loadingLabel ? loadingLabel : props["aria-label"]
        }
        {...props}
      >
        {children}
      </MuiButton>
    );
  },
);
