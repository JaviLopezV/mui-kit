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
  /** Use the platform select control instead of the MUI popup. */
  native?: boolean;
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
  {
    options,
    onChange,
    emptyOption,
    value,
    native = false,
    slotProps,
    ...props
  }: SelectFieldProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // Native select events serialize numbers. Recover the original option value.
      const option = options.find(
        (item) => String(item.value) === String(event.target.value),
      );
      if (option && !option.disabled) onChange(option.value, event);
    },
    [onChange, options],
  );

  return (
    <MuiTextField
      ref={ref}
      select
      value={value}
      onChange={handleChange}
      {...props}
      slotProps={{
        ...slotProps,
        select: (ownerState) => ({
          ...(typeof slotProps?.select === "function"
            ? slotProps.select(ownerState)
            : slotProps?.select),
          native,
        }),
      }}
    >
      {emptyOption !== undefined ? (
        native ? (
          <option value="" disabled>
            {emptyOption}
          </option>
        ) : (
          <MenuItem value="" disabled>
            {emptyOption}
          </MenuItem>
        )
      ) : null}
      {options.map((option) =>
        native ? (
          <option
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ) : (
          <MenuItem
            key={String(option.value)}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ),
      )}
    </MuiTextField>
  );
}) as SelectFieldComponent;
