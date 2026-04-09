'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Surface } from './Surface';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Surface sx={{ p: 4, textAlign: 'center' }}>
      <Stack spacing={1.5} alignItems="center">
        {icon}
        <Typography variant="h6">{title}</Typography>
        {description ? <Typography color="text.secondary">{description}</Typography> : null}
        {action}
      </Stack>
    </Surface>
  );
}
