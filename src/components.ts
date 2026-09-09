// Components with a library-owned API.
export { Button } from "./components/foundation/Button";
export type { ButtonProps } from "./components/foundation/Button";
export { IconButton } from "./components/foundation/IconButton";
export type { IconButtonProps } from "./components/foundation/IconButton";
export { Surface } from "./components/foundation/Surface";
export type {
  SurfacePadding,
  SurfaceProps,
  SurfaceVariant,
} from "./components/foundation/Surface";
export { SelectField } from "./components/form/SelectField";
export type {
  SelectFieldProps,
  SelectOption,
  SelectValue,
} from "./components/form/SelectField";
export {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "./components/feedback/Dialog";
export type { DialogProps } from "./components/feedback/Dialog";
export { Section } from "./components/layout/Section";
export type { SectionProps } from "./components/layout/Section";

// MUI primitives intentionally re-exported without transparent wrappers.
// Their system value is supplied by createMyUiTheme component defaults.
export { default as Alert } from "@mui/material/Alert";
export type { AlertProps } from "@mui/material/Alert";
export { default as Box } from "@mui/material/Box";
export type { BoxProps } from "@mui/material/Box";
export { default as Checkbox } from "@mui/material/Checkbox";
export type { CheckboxProps } from "@mui/material/Checkbox";
export { default as Container } from "@mui/material/Container";
export type { ContainerProps } from "@mui/material/Container";
export { default as Grid } from "@mui/material/Grid";
export type { GridProps } from "@mui/material/Grid";
export { default as Link } from "@mui/material/Link";
export type { LinkProps } from "@mui/material/Link";
export { default as RadioGroup } from "@mui/material/RadioGroup";
export type { RadioGroupProps } from "@mui/material/RadioGroup";
export { default as Stack } from "@mui/material/Stack";
export type { StackProps } from "@mui/material/Stack";
export { default as TextField } from "@mui/material/TextField";
export type { TextFieldProps } from "@mui/material/TextField";
export { default as Typography } from "@mui/material/Typography";
export type { TypographyProps } from "@mui/material/Typography";
export { default as FormControl } from "@mui/material/FormControl";
export type { FormControlProps } from "@mui/material/FormControl";
export { default as FormControlLabel } from "@mui/material/FormControlLabel";
export type { FormControlLabelProps } from "@mui/material/FormControlLabel";
export { default as FormGroup } from "@mui/material/FormGroup";
export type { FormGroupProps } from "@mui/material/FormGroup";
export { default as FormHelperText } from "@mui/material/FormHelperText";
export type { FormHelperTextProps } from "@mui/material/FormHelperText";
export { default as FormLabel } from "@mui/material/FormLabel";
export type { FormLabelProps } from "@mui/material/FormLabel";
export { default as Radio } from "@mui/material/Radio";
export type { RadioProps } from "@mui/material/Radio";
