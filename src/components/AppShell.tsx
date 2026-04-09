'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import type { SxProps, Theme } from '@mui/material/styles';
import { IconButton } from './IconButton';

export interface AppShellProps {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  onMenuClick?: () => void;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  showMenuButton?: boolean;
}

export function AppShell({
  title,
  actions,
  children,
  onMenuClick,
  maxWidth = 'lg',
  sx,
  showMenuButton = true,
}: AppShellProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', ...sx }}>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar sx={{ gap: 1.5 }}>
          {showMenuButton ? (
            <IconButton edge="start" onClick={onMenuClick} color="secondary" aria-label="Abrir menú">
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
            {title}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {actions}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth={maxWidth} sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
