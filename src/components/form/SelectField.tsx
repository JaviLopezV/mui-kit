import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import MuiTextField, {
  type TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

export type SelectValue = string | number;

/** One option rendered by `SelectField`. */
export interface SelectOption<T extends SelectValue> {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
}

/** Props for the controlled, typed select field. */
export interface SelectFieldProps<T extends SelectValue> extends Omit<
  MuiTextFieldProps,
  "select" | "value" | "defaultValue" | "onChange" | "children"
> {
  value: T;
  options: readonly SelectOption<T>[];
  /** Receives the typed value plus the original input event. */
  onChange: (value: T, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional unselectable first option. */
  emptyOption?: React.ReactNode;
}

type SelectFieldComponent = <T extends SelectValue>(
  props: SelectFieldProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement;

/** A labelled MUI select that removes repetitive MenuItem mapping and preserves value types. */
export const SelectField = React.forwardRef(function SelectField<
  T extends SelectValue,
>(
  { options, onChange, emptyOption, value, ...props }: SelectFieldProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.target.value as T, event),
    [onChange],
  );

  return (
    <MuiTextField
      ref={ref}
      select
      value={value}
      onChange={handleChange}
      {...props}
    >
      {emptyOption !== undefined ? (
        <MenuItem value="" disabled>
          {emptyOption}
        </MenuItem>
      ) : null}
      {options.map((option) => (
        <MenuItem
          key={String(option.value)}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </MenuItem>
      ))}
    </MuiTextField>
  );
}) as SelectFieldComponent;
