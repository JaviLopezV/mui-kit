'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Surface } from './Surface';

export interface HeroBannerProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function HeroBanner({ eyebrow, title, description, actions }: HeroBannerProps) {
  return (
    <Surface
      sx={(theme) => ({
        p: { xs: 3, md: 5 },
        overflow: 'hidden',
        background: `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.35)}, transparent 35%), linear-gradient(180deg, #ffffff 0%, #f6fbff 100%)`,
      })}
    >
      <Stack spacing={1.25} maxWidth={720}>
        {eyebrow ? (
          <Typography variant="overline" sx={{ color: 'primary.dark', fontWeight: 800 }}>
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h2">{title}</Typography>
        {description ? <Typography color="text.secondary">{description}</Typography> : null}
        {actions ? <Stack direction="row" spacing={1.5} flexWrap="wrap">{actions}</Stack> : null}
      </Stack>
    </Surface>
  );
}
