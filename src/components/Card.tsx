"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface CardProps extends Omit<MuiCardProps, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  headerSx?: MuiCardProps["sx"];
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, subtitle, action, children, headerSx, ...props },
  ref,
) {
  return (
    <MuiCard ref={ref} {...props}>
      {title || subtitle || action ? (
        <Box sx={{ p: 2.5, pb: children ? 0 : 2.5, ...headerSx }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Stack spacing={0.5}>
              {title ? <Typography variant="h6">{title}</Typography> : null}
              {subtitle ? (
                <Typography color="text.secondary">{subtitle}</Typography>
              ) : null}
            </Stack>
            {action}
          </Stack>
        </Box>
      ) : null}
      {children}
    </MuiCard>
  );
});
