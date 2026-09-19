"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button, { type ButtonProps } from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Translate from "@mui/icons-material/Translate";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { controlSizes, shape } from "../../theme/tokens";

export interface LanguageOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  shortLabel?: string;
  disabled?: boolean;
}

export interface LanguageSelectorProps<T extends string = string> extends Pick<
  ButtonProps,
  "disabled" | "className" | "sx" | "id"
> {
  value: T;
  options: readonly LanguageOption<T>[];
  /** Already translated accessible name. */
  label: string;
  onChange: (value: T) => void;
  onOpen?: () => void;
}

type LanguageSelectorComponent = <T extends string>(
  props: LanguageSelectorProps<T> & React.RefAttributes<HTMLButtonElement>,
) => React.ReactElement;

/** Presentation only: routing, translations and persistence belong to the consumer. */
export const LanguageSelector = React.forwardRef(function LanguageSelector<
  T extends string,
>(
  {
    value,
    options,
    label,
    onChange,
    onOpen,
    disabled,
    className,
    sx,
    id,
  }: LanguageSelectorProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const generatedId = React.useId();
  const buttonId = id ?? `language-${generatedId}`;
  const menuId = `${buttonId}-menu`;
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchor) && !disabled;
  const selected = options.find((option) => option.value === value);
  return (
    <>
      <Button
        ref={ref}
        id={buttonId}
        className={className}
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        onClick={(event) => {
          setAnchor(event.currentTarget);
          onOpen?.();
        }}
        startIcon={<Translate fontSize="small" />}
        endIcon={<KeyboardArrowDown fontSize="small" />}
        sx={[
          {
            minWidth: controlSizes.small.minHeight,
            minHeight: controlSizes.small.minHeight,
            flexShrink: 0,
            px: 1.5,
            color: "text.primary",
            border: 1,
            borderColor: "divider",
            borderRadius: `${shape.radii.pill}px`,
            typography: "caption",
            fontWeight: "fontWeightBold",
            textTransform: "none",
            "&:hover": { bgcolor: "action.hover", borderColor: "text.primary" },
            "&.Mui-focusVisible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 2,
            },
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {selected?.shortLabel ?? value.toUpperCase()}
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        slotProps={{
          list: { "aria-labelledby": buttonId },
          paper: {
            sx: {
              mt: 1,
              minWidth: 150,
              maxWidth: "calc(100vw - 32px)",
              borderRadius: `${shape.radii.medium}px`,
              boxShadow: 5,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            lang={option.value}
            role="menuitemradio"
            aria-checked={option.value === value}
            selected={option.value === value}
            disabled={option.disabled}
            onClick={() => {
              setAnchor(null);
              if (option.value !== value) onChange(option.value);
            }}
            sx={{
              gap: 1.5,
              minHeight: {
                xs: controlSizes.small.minHeight,
                sm: controlSizes.small.minHeight,
              },
              typography: "body2",
              whiteSpace: "normal",
            }}
          >
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                minWidth: "3ch",
                typography: "caption",
                fontWeight: "fontWeightBold",
              }}
            >
              {option.shortLabel ?? option.value.toUpperCase()}
            </Box>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}) as LanguageSelectorComponent;
