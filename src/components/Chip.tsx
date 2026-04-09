'use client';

import * as React from 'react';
import MuiChip, { type ChipProps as MuiChipProps } from '@mui/material/Chip';

export type ChipProps = MuiChipProps;

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(function Chip(props, ref) {
  return <MuiChip ref={ref} {...props} />;
});
