'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Surface } from './Surface';

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
  render: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  rows: T[];
  columns: DataTableColumn<T>[];
  getRowKey?: (row: T, index: number) => React.Key;
  emptyMessage?: React.ReactNode;
}

export function DataTable<T>({ rows, columns, getRowKey, emptyMessage = 'Sin datos disponibles.' }: DataTableProps<T>) {
  if (!rows.length) {
    return (
      <Surface sx={{ p: 3 }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Surface>
    );
  }

  return (
    <TableContainer component={Surface}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                sx={{ fontWeight: 800, width: column.width }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={getRowKey ? getRowKey(row, index) : index} hover>
              {columns.map((column) => (
                <TableCell key={column.key} align={column.align}>
                  {column.render(row, index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
