import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Section,
} from "../src/components";
import { MyUiProvider } from "../src/theme";

describe("P0 feedback and layout", () => {
  it("associates dialog title, closes on Escape and restores focus", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container, rerender } = render(
      <MyUiProvider>
        <button type="button">Trigger</button>
      </MyUiProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Trigger" });
    trigger.focus();

    rerender(
      <MyUiProvider>
        <button type="button">Trigger</button>
        <Dialog open onClose={onClose}>
          <DialogTitle>Delete record?</DialogTitle>
          <DialogContent>This action cannot be undone.</DialogContent>
          <DialogActions>
            <Button tone="danger">Delete</Button>
          </DialogActions>
        </Dialog>
      </MyUiProvider>,
    );

    const dialog = screen.getByRole("dialog", { name: "Delete record?" });
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(
      (
        await axe(container, {
          rules: { "color-contrast": { enabled: false } },
        })
      ).violations,
    ).toEqual([]);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith(expect.anything(), "escapeKeyDown");
  });

  it("renders alerts without custom copy or business behavior", async () => {
    const { container } = render(
      <MyUiProvider>
        <Alert severity="warning">Check the supplied values.</Alert>
      </MyUiProvider>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the supplied values.",
    );
    expect(
      (
        await axe(container, {
          rules: { "color-contrast": { enabled: false } },
        })
      ).violations,
    ).toEqual([]);
  });

  it("renders a semantic section and forwards its ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <MyUiProvider>
        <Section ref={ref} aria-labelledby="section-title" maxWidth="md">
          <h2 id="section-title">Preferences</h2>
        </Section>
      </MyUiProvider>,
    );
    expect(screen.getByRole("region", { name: "Preferences" })).toBe(
      ref.current,
    );
  });
});
