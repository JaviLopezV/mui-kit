"use client";

import * as React from "react";
import {
  Alert,
  Button,
  Section,
  SelectField,
  Stack,
  Surface,
  TextField,
  Typography,
} from "@jlopvil/mui-kit";

export default function Page() {
  const [language, setLanguage] = React.useState<"es" | "en">("es");

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
          <SelectField
            label="Idioma"
            value={language}
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "English" },
            ]}
            onChange={setLanguage}
          />
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
