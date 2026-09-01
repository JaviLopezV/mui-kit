import * as React from "react";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export const myUiModeStorageKey = "my-ui-mode";
export const myUiColorSchemeStorageKey = "my-ui-color-scheme";

/** Props for the SSR color-scheme bootstrap script. */
export type MyUiInitColorSchemeScriptProps = Omit<
  React.ComponentProps<typeof InitColorSchemeScript>,
  "attribute" | "defaultLightColorScheme" | "defaultDarkColorScheme"
>;

/**
 * Prevents a light/dark flash before hydration. Render once, as the first child
 * of `<body>`, in SSR applications. It has no Next.js dependency.
 */
export function MyUiInitColorSchemeScript({
  defaultMode = "system",
  modeStorageKey = myUiModeStorageKey,
  colorSchemeStorageKey = myUiColorSchemeStorageKey,
  ...props
}: MyUiInitColorSchemeScriptProps) {
  return (
    <InitColorSchemeScript
      attribute="class"
      defaultMode={defaultMode}
      defaultLightColorScheme="light"
      defaultDarkColorScheme="dark"
      modeStorageKey={modeStorageKey}
      colorSchemeStorageKey={colorSchemeStorageKey}
      {...props}
    />
  );
}
