'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface SectionProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function Section({ title, subtitle, actions, children, sx }: SectionProps) {
  return (
    <Stack spacing={2.5} sx={sx}>
      {title || subtitle || actions ? (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
        >
          <Box>
            {title ? <Typography variant="h5">{title}</Typography> : null}
            {subtitle ? <Typography color="text.secondary">{subtitle}</Typography> : null}
          </Box>
          {actions}
        </Stack>
      ) : null}
      {children}
    </Stack>
  );
}
