'use client';

import * as React from 'react';
import MuiIconButton, { type IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

export type IconButtonProps = MuiIconButtonProps;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(props, ref) {
  return <MuiIconButton ref={ref} {...props} />;
});
