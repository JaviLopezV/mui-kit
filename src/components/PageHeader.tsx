'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface PageHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function PageHeader({ eyebrow, title, subtitle, actions, sx }: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', md: 'center' }}
      spacing={2}
      sx={sx}
    >
      <Stack spacing={0.75}>
        {eyebrow ? (
          <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800 }}>
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h3">{title}</Typography>
        {subtitle ? <Typography color="text.secondary">{subtitle}</Typography> : null}
      </Stack>
      {actions}
    </Stack>
  );
}
