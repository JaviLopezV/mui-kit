import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {
  Checkbox,
  RadioGroup,
  SelectField,
  TextField,
} from "../src/components";
import { MyUiProvider } from "../src/theme";

describe("P0 form controls", () => {
  it("returns a typed select value and original event", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MyUiProvider>
        <SelectField
          label="Idioma"
          value="es"
          options={
            [
              { value: "es", label: "Español" },
              { value: "en", label: "English" },
            ] as const
          }
          onChange={onChange}
        />
      </MyUiProvider>,
    );

    await user.click(screen.getByRole("combobox", { name: "Idioma" }));
    await user.click(screen.getByRole("option", { name: "English" }));
    expect(onChange.mock.calls[0]?.[0]).toBe("en");
    expect(onChange.mock.calls[0]?.[1]).toBeInstanceOf(Object);
  });

  it("provides accessible MUI form primitives with common defaults", async () => {
    const { container } = render(
      <MyUiProvider>
        <TextField
          label="Email"
          type="email"
          required
          helperText="Usaremos este email para responder"
        />
        <FormControlLabel control={<Checkbox />} label="Acepto" />
        <RadioGroup aria-label="Formato" defaultValue="pdf">
          <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
          <FormControlLabel value="json" control={<Radio />} label="JSON" />
        </RadioGroup>
      </MyUiProvider>,
    );

    expect(screen.getByLabelText(/Email/)).toHaveAttribute("aria-describedby");
    expect(
      (
        await axe(container, {
          rules: { "color-contrast": { enabled: false } },
        })
      ).violations,
    ).toEqual([]);
  });
});
