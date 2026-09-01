import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTheme } from "@mui/material/styles";
import {
  MyUiInitColorSchemeScript,
  MyUiProvider,
  createMyUiTheme,
} from "../src/theme";

function ThemeProbe() {
  const theme = useTheme();
  return (
    <output data-testid="theme">
      {theme.myUi.controlSizes.medium.minHeight}
    </output>
  );
}

describe("theme foundation", () => {
  it("creates both schemes and merges brand options", () => {
    const theme = createMyUiTheme({ brand: { primary: { main: "#0057b8" } } });

    expect(theme.colorSchemes.light?.palette.primary.main).toBe("#0057b8");
    expect(theme.colorSchemes.dark?.palette.primary.main).toBe("#0057b8");
    expect(theme.myUi.controlSizes.small.minHeight).toBe(44);
    expect(theme.breakpoints.values.md).toBe(900);
  });

  it("provides the token contract and can omit CssBaseline", () => {
    render(
      <MyUiProvider enableCssBaseline={false}>
        <ThemeProbe />
      </MyUiProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("44");
  });

  it("renders a framework-independent SSR bootstrap script", () => {
    const { container } = render(
      <MyUiInitColorSchemeScript nonce="test-nonce" />,
    );
    const script = container.querySelector("script");
    expect(script).toHaveAttribute("nonce");
    expect(script?.textContent).toContain("my-ui-mode");
    expect(script?.textContent).toContain("my-ui-color-scheme");
  });
});
