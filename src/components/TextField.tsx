'use client';

import * as React from 'react';
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export type TextFieldProps = MuiTextFieldProps;

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(function TextField(props, ref) {
  return <MuiTextField ref={ref} fullWidth {...props} />;
});
