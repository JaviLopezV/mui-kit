'use client';

import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Card } from './Card';
import { Chip } from './Chip';

export interface FeatureCardProps {
  title: string;
  description: string;
  badge?: string;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
}

export function FeatureCard({ title, description, badge, footer, icon }: FeatureCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            {icon}
            {badge ? <Chip label={badge} size="small" color="secondary" sx={{ width: 'fit-content' }} /> : null}
          </Stack>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <Typography color="text.secondary">{description}</Typography>
        </Stack>
      </CardContent>
      {footer ? <CardActions>{footer}</CardActions> : null}
    </Card>
  );
}
