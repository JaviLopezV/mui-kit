import * as React from "react";
import MuiDialog, {
  type DialogProps as MuiDialogProps,
} from "@mui/material/Dialog";
import MuiDialogActions, {
  type DialogActionsProps,
} from "@mui/material/DialogActions";
import MuiDialogContent, {
  type DialogContentProps,
} from "@mui/material/DialogContent";
import MuiDialogTitle, {
  type DialogTitleProps,
} from "@mui/material/DialogTitle";

const DialogLabelContext = React.createContext<string | null>(null);

/** Props for the accessible dialog root. A `DialogTitle` child is required by contract. */
export type DialogProps = Omit<MuiDialogProps, "aria-labelledby"> & {
  /** Override for integration with an externally rendered title. */
  "aria-labelledby"?: string;
};

/** Accessible dialog with stable title association and MUI focus management. */
export function Dialog({
  children,
  "aria-labelledby": labelledBy,
  ...props
}: DialogProps) {
  const generatedTitleId = React.useId();
  const titleId = labelledBy ?? generatedTitleId;

  return (
    <DialogLabelContext.Provider value={titleId}>
      <MuiDialog aria-labelledby={titleId} {...props}>
        {children}
      </MuiDialog>
    </DialogLabelContext.Provider>
  );
}

/** Dialog heading automatically associated with its nearest `Dialog`. */
export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogTitleProps
>(function DialogTitle({ id, ...props }, ref) {
  const contextId = React.useContext(DialogLabelContext);
  return (
    <MuiDialogTitle ref={ref} id={id ?? contextId ?? undefined} {...props} />
  );
});

/** Scrollable dialog body. */
export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent(props, ref) {
  return <MuiDialogContent ref={ref} {...props} />;
});

/** Dialog action container. */
export const DialogActions = React.forwardRef<
  HTMLDivElement,
  DialogActionsProps
>(function DialogActions(props, ref) {
  return <MuiDialogActions ref={ref} {...props} />;
});
