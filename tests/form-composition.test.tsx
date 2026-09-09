import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";
import * as api from "../src/index";
import * as components from "../src/components";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  SelectField,
  MyUiProvider,
} from "../src/index";

describe("form composition", () => {
  it("publishes the same primitives through both entrypoints", () => {
    for (const name of [
      "FormControl",
      "FormControlLabel",
      "FormGroup",
      "FormHelperText",
      "FormLabel",
      "Radio",
    ] as const) {
      expect(api[name]).toBe(components[name]);
      expect(api[name]).toBeDefined();
    }
  });

  it("associates radio labels and errors, forwards refs and supports the keyboard", async () => {
    const user = userEvent.setup();
    const rootRef = React.createRef<HTMLFieldSetElement>();
    const labelRef = React.createRef<HTMLLegendElement>();
    const helperRef = React.createRef<HTMLParagraphElement>();
    const radioRef = React.createRef<HTMLButtonElement>();
    const { container } = render(
      <MyUiProvider>
        <FormControl component="fieldset" ref={rootRef} error>
          <FormLabel component="legend" ref={labelRef}>
            Formato del documento
          </FormLabel>
          <RadioGroup
            aria-label="Formato del documento"
            aria-describedby="format-help"
            defaultValue="pdf"
          >
            <FormControlLabel
              value="pdf"
              control={<Radio ref={radioRef} />}
              label="PDF"
            />
            <FormControlLabel value="text" control={<Radio />} label="Texto" />
            <FormControlLabel
              value="json"
              disabled
              control={<Radio />}
              label="JSON"
            />
          </RadioGroup>
          <FormHelperText ref={helperRef} id="format-help">
            Revisa el formato antes de continuar.
          </FormHelperText>
        </FormControl>
      </MyUiProvider>,
    );
    expect(rootRef.current?.tagName).toBe("FIELDSET");
    expect(labelRef.current?.tagName).toBe("LEGEND");
    expect(helperRef.current).toHaveClass("Mui-error");
    expect(radioRef.current).toContainElement(
      screen.getByRole("radio", { name: "PDF" }),
    );
    expect(screen.getByRole("radiogroup")).toHaveAccessibleDescription(
      "Revisa el formato antes de continuar.",
    );
    await user.tab();
    expect(screen.getByRole("radio", { name: "PDF" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "Texto" })).toBeChecked();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "PDF" })).toBeChecked();
    expect(
      (
        await axe(container, {
          rules: { "color-contrast": { enabled: false } },
        })
      ).violations,
    ).toEqual([]);
  });

  it("composes labelled checkboxes with disabled state and forwarded refs", async () => {
    const user = userEvent.setup();
    const groupRef = React.createRef<HTMLDivElement>();
    const labelRef = React.createRef<HTMLLabelElement>();
    const { container } = render(
      <MyUiProvider>
        <FormGroup ref={groupRef}>
          <FormControlLabel
            ref={labelRef}
            control={<Checkbox />}
            label="Una etiqueta larga que puede ocupar varias líneas en pantallas pequeñas"
          />
          <FormControlLabel
            disabled
            control={<Checkbox />}
            label="No disponible"
          />
        </FormGroup>
      </MyUiProvider>,
    );
    expect(groupRef.current).toContainElement(labelRef.current);
    await user.tab();
    await user.keyboard(" ");
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "No disponible" }),
    ).toBeDisabled();
    expect(
      (
        await axe(container, {
          rules: { "color-contrast": { enabled: false } },
        })
      ).violations,
    ).toEqual([]);
  });
});

describe("native SelectField", () => {
  it("preserves numeric values, root/input refs and select slot props", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLSelectElement>();
    const { container } = render(
      <MyUiProvider>
        <SelectField
          native
          ref={ref}
          inputRef={inputRef}
          label="Columnas"
          value={1}
          options={[
            { value: 1, label: "Una" },
            { value: 2, label: "Dos" },
            { value: 3, label: "Tres", disabled: true },
          ]}
          onChange={onChange}
          helperText="Selecciona el número de columnas"
          slotProps={{
            select: () => ({ inputProps: { "data-testid": "native-select" } }),
          }}
        />
      </MyUiProvider>,
    );
    const select = screen.getByRole("combobox", { name: "Columnas" });
    expect(select.tagName).toBe("SELECT");
    expect(inputRef.current).toBe(select);
    expect(ref.current).toContainElement(select);
    expect(select).toBe(screen.getByTestId("native-select"));
    expect(select).toHaveAccessibleDescription(
      "Selecciona el número de columnas",
    );
    await user.selectOptions(select, "2");
    expect(onChange.mock.calls[0]?.[0]).toBe(2);
    expect(onChange.mock.calls[0]?.[1].target).toBe(select);
    await user.selectOptions(select, "3");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(
      (
        await axe(container, {
          rules: { "color-contrast": { enabled: false } },
        })
      ).violations,
    ).toEqual([]);
  });

  it("renders an empty choice and supports a controlled disabled field", () => {
    render(
      <SelectField
        native
        label="Idioma"
        value=""
        emptyOption="Selecciona un idioma"
        options={[{ value: "es", label: "Español" }]}
        onChange={vi.fn()}
        disabled
      />,
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
    expect(
      screen.getByRole("option", { name: "Selecciona un idioma" }),
    ).toBeDisabled();
    expect(screen.getByRole("combobox")).toHaveValue("");
  });
});
