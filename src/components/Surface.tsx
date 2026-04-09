'use client';

import * as React from 'react';
import Paper, { type PaperProps } from '@mui/material/Paper';

export type SurfaceProps = PaperProps;

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(function Surface(props, ref) {
  return <Paper ref={ref} variant="outlined" {...props} />;
});
