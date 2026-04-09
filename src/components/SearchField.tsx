'use client';

import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, type TextFieldProps } from './TextField';

export type SearchFieldProps = TextFieldProps;

export const SearchField = React.forwardRef<HTMLDivElement, SearchFieldProps>(function SearchField(
  props,
  ref,
) {
  return (
    <TextField
      ref={ref}
      placeholder="Buscar..."
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  );
});
