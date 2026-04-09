'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { Surface } from './Surface';

export interface StatCardProps {
  label: string;
  value: string | number;
  helperText?: string;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function StatCard({ label, value, helperText, icon, sx }: StatCardProps) {
  return (
    <Surface sx={{ p: 2.5, minWidth: 180, ...sx }}>
      <Stack spacing={0.75}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          {icon}
        </Stack>
        <Typography variant="h4" fontWeight={800}>
          {value}
        </Typography>
        {helperText ? (
          <Typography variant="caption" color="text.secondary">
            {helperText}
          </Typography>
        ) : null}
      </Stack>
    </Surface>
  );
}
