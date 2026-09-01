import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  IconButton,
  Link,
  Surface,
  Typography,
} from "../src/components";
import { MyUiProvider } from "../src/theme";

function renderWithTheme(node: React.ReactNode) {
  return render(<MyUiProvider>{node}</MyUiProvider>);
}

describe("foundation components", () => {
  it("maps semantic button tone and supports accessible loading state", async () => {
    const onClick = vi.fn();
    renderWithTheme(
      <Button
        tone="danger"
        loading
        loadingLabel="Guardando cambios"
        onClick={onClick}
      >
        Guardar
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Guardando cambios" });
    expect(button).toHaveClass("MuiButton-colorError");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards an icon button ref and exposes its accessible name", () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderWithTheme(
      <IconButton ref={ref} aria-label="Cerrar">
        <span aria-hidden="true">×</span>
      </IconButton>,
    );

    expect(screen.getByRole("button", { name: "Cerrar" })).toBe(ref.current);
  });

  it("renders composable, tokenized surfaces", () => {
    renderWithTheme(
      <Surface variant="glass" padding="spacious" data-testid="surface">
        Content
      </Surface>,
    );
    expect(screen.getByTestId("surface")).toHaveTextContent("Content");
  });

  it("keeps direct MUI primitives interoperable through public exports", async () => {
    const { container } = renderWithTheme(
      <main>
        <Typography component="h1" variant="h3">
          Title
        </Typography>
        <Link href="#content">Skip</Link>
        <div id="content">Content</div>
      </main>,
    );
    expect(
      (
        await axe(container, {
          rules: { "color-contrast": { enabled: false } },
        })
      ).violations,
    ).toEqual([]);
  });
});
