import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import { LanguageSelector } from "../src/index";
import * as components from "../src/components";
const options = [
  { value: "es", label: "Español" },
  { value: "ca", label: "Català" },
  { value: "en", label: "English", disabled: true },
] as const;

describe("LanguageSelector", () => {
  it("exports the component, forwards the trigger ref and meets touch targets", () => {
    expect(components.LanguageSelector).toBe(LanguageSelector);
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <LanguageSelector
        ref={ref}
        value="es"
        options={options}
        label="Idioma"
        onChange={vi.fn()}
      />,
    );
    expect(ref.current).toBe(screen.getByRole("button", { name: "Idioma" }));
    expect(ref.current).toHaveStyle({ minHeight: "44px", minWidth: "44px" });
  });
  it("supports keyboard selection, selected semantics, disabled options and focus restoration", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onOpen = vi.fn();
    render(
      <LanguageSelector
        value="es"
        options={options}
        label="Idioma"
        onChange={onChange}
        onOpen={onOpen}
      />,
    );
    await user.tab();
    await user.keyboard("{Enter}");
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("menuitemradio", { name: "Español" }),
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("menuitemradio", { name: "English" }),
    ).toHaveAttribute("aria-disabled", "true");
    expect(
      (
        await axe(screen.getByRole("menu"), {
          rules: { "color-contrast": { enabled: false } },
        })
      ).violations,
    ).toEqual([]);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledExactlyOnceWith("ca");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Idioma" })).toHaveFocus(),
    );
    await user.keyboard("{Enter}{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });
  it("keeps value controlled, ignores reselection and supports disabled triggers", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <LanguageSelector
        value="es"
        options={options}
        label="Idioma"
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("menuitemradio", { name: "Español" }));
    expect(onChange).not.toHaveBeenCalled();
    rerender(
      <LanguageSelector
        value="ca"
        options={options}
        label="Idioma"
        onChange={onChange}
        disabled
      />,
    );
    expect(screen.getByRole("button")).toHaveTextContent("CA");
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("uses distinct IDs for multiple instances and accepts long labels", async () => {
    const user = userEvent.setup();
    render(
      <>
        {[1, 2].map((key) => (
          <LanguageSelector
            key={key}
            value="es"
            options={[
              {
                value: "es",
                label:
                  "Una etiqueta de idioma muy larga que puede ocupar varias líneas",
              },
            ]}
            label={`Idioma ${key}`}
            onChange={vi.fn()}
          />
        ))}
      </>,
    );
    const triggers = screen.getAllByRole("button");
    expect(triggers[0].id).not.toBe(triggers[1].id);
    await user.click(triggers[0]);
    expect(screen.getByRole("menuitemradio")).toHaveStyle({
      whiteSpace: "normal",
    });
  });
});
