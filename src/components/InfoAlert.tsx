'use client';

import * as React from 'react';
import MuiAlert, { type AlertProps as MuiAlertProps } from '@mui/material/Alert';

export type InfoAlertProps = MuiAlertProps;

export const InfoAlert = React.forwardRef<HTMLDivElement, InfoAlertProps>(function InfoAlert(props, ref) {
  return <MuiAlert ref={ref} variant="filled" {...props} />;
});
