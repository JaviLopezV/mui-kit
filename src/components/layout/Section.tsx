import * as React from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import Container, { type ContainerProps } from "@mui/material/Container";
import type { ResponsiveValue } from "../../types/public";

/** Props for a semantic, responsive page section. */
export interface SectionProps extends Omit<BoxProps, "component" | "maxWidth"> {
  /** Vertical spacing expressed in theme spacing units. @default { xs: 4, md: 6 } */
  spacing?: ResponsiveValue<number>;
  /** Adds a standard responsive content container when set. */
  maxWidth?: ContainerProps["maxWidth"];
  /** Accessible label when the section has no visible heading. */
  "aria-label"?: string;
  /** Id of the visible heading that labels the section. */
  "aria-labelledby"?: string;
}

/** A semantic section with tokenized vertical rhythm and optional content containment. */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section(
    { children, spacing = { xs: 4, md: 6 }, maxWidth, sx, ...props },
    ref,
  ) {
    const content = maxWidth ? (
      <Container maxWidth={maxWidth}>{children}</Container>
    ) : (
      children
    );
    return (
      <Box
        ref={ref}
        component="section"
        sx={[{ py: spacing }, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...props}
      >
        {content}
      </Box>
    );
  },
);
