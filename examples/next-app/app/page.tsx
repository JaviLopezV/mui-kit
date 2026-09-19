"use client";

import * as React from "react";
import {
  Alert,
  LanguageSelector,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Section,
  SelectField,
  Stack,
  Surface,
  TextField,
  Typography,
} from "@jlopvil/mui-kit";

export default function Page() {
  const [language, setLanguage] = React.useState<"es" | "en">("es");

  const [columns, setColumns] = React.useState(1);

  return (
    <Section aria-labelledby="demo-title" maxWidth="md">
      <Surface variant="glass" padding="spacious">
        <Stack spacing={2}>
          <Typography id="demo-title" component="h1" variant="h2">
            My UI Library — P0
          </Typography>
          <Typography color="text.secondary">
            Foundation, formularios, feedback y layout sobre Material UI.
          </Typography>
          <TextField
            label="Nombre"
            required
            helperText="Introduce un nombre visible."
          />
          <LanguageSelector
            label="Idioma"
            value={language}
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "English" },
            ]}
            onChange={setLanguage}
          />
          <SelectField
            native
            label="Columnas"
            value={columns}
            options={[
              { value: 1, label: "Una" },
              { value: 2, label: "Dos" },
            ]}
            onChange={setColumns}
            helperText="El valor recibido conserva su tipo numérico."
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Formato</FormLabel>
            <RadioGroup
              aria-label="Formato"
              aria-describedby="format-help"
              defaultValue="pdf"
            >
              <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
              <FormControlLabel
                value="text"
                control={<Radio />}
                label="Texto"
              />
            </RadioGroup>
            <FormHelperText id="format-help">
              Elige el formato del documento.
            </FormHelperText>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Mostrar detalles adicionales"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Opción no disponible"
              disabled
            />
          </FormGroup>
          <Alert severity="info">
            No hay lógica de aplicación dentro de estos componentes.
          </Alert>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button tone="primary">Guardar</Button>
            <Button tone="neutral" variant="outlined">
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Surface>
    </Section>
  );
}
