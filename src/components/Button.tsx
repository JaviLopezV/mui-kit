'use client';

import * as React from 'react';
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonProps = MuiButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  return <MuiButton ref={ref} {...props} />;
});
