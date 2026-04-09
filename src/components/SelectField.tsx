'use client';

import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { TextField, type TextFieldProps } from './TextField';

export interface SelectOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface SelectFieldProps extends Omit<TextFieldProps, 'select' | 'children'> {
  options: SelectOption[];
}

export const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(function SelectField(
  { options, ...props },
  ref,
) {
  return (
    <TextField ref={ref} select {...props}>
      {options.map((option) => (
        <MenuItem key={String(option.value)} value={option.value} disabled={option.disabled}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
});
