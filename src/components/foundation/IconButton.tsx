import * as React from "react";
import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

type AccessibleName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: never; "aria-labelledby": string };

/** MUI icon button props with an accessible name required at compile time. */
export type IconButtonProps = MuiIconButtonProps & AccessibleName;

/** A 44px minimum-target icon button that cannot be used without an accessible name. */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    return <MuiIconButton ref={ref} {...props} />;
  },
);
