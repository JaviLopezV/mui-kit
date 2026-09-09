# @jlopvil/mui-kit

Librería UI central para aplicaciones React y Next.js, construida sobre Material UI 7. La versión actual implementa exclusivamente el alcance P0 de `docs/component-roadmap.md`.

## Instalación

```bash
npm install @jlopvil/mui-kit @mui/material @emotion/react @emotion/styled
```

React, React DOM, Material UI y Emotion son peer dependencies.

## Provider

```tsx
import { MyUiProvider } from "@jlopvil/mui-kit";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MyUiProvider>{children}</MyUiProvider>;
}
```

El provider instala `CssBaseline` por defecto y soporta esquemas light/dark/system. Admite marca y overrides sin acoplarse a router, i18n o persistencia:

```tsx
<MyUiProvider
  defaultMode="system"
  themeOptions={{ brand: { primary: { main: "#0057b8" } } }}
>
  {children}
</MyUiProvider>
```

En aplicaciones con SSR, renderiza el bootstrap de color antes del contenido para evitar cambios visuales durante la hidratación:

```tsx
import { MyUiInitColorSchemeScript } from "@jlopvil/mui-kit/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <MyUiInitColorSchemeScript />
        {children}
      </body>
    </html>
  );
}
```

## API pública P0

- Theme: `MyUiProvider`, `MyUiInitColorSchemeScript`, `createMyUiTheme` y tokens públicos.
- Foundation: `Button`, `IconButton`, `Surface`, `Typography`, `Link`.
- Form: `TextField`, `SelectField<T>`, `Checkbox`, `RadioGroup`, `Radio`, `FormControl`, `FormControlLabel`, `FormGroup`, `FormLabel`, `FormHelperText`.
- Feedback: `Alert`, `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`.
- Layout: `Box`, `Container`, `Stack`, `Grid`, `Section`.
- Types: `SemanticTone`, `ControlSize`, `ResponsiveValue`.

Los primitives MUI sin una abstracción propia se reexportan directamente y obtienen su consistencia del tema. No se mantienen wrappers transparentes.

Los bundles JavaScript conservan la directiva `"use client"` para que los providers y componentes MUI respeten correctamente la frontera cliente en Next.js App Router.

## Ejemplo

```tsx
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

export function Settings() {
  return (
    <Section aria-labelledby="settings-title" maxWidth="md">
      <Surface variant="outlined" padding="comfortable">
        <Stack spacing={2}>
          <Typography id="settings-title" component="h1" variant="h3">
            Preferencias
          </Typography>
          <TextField label="Nombre" />
          <SelectField
            label="Idioma"
            value="es"
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "English" },
            ]}
            onChange={(value) => console.log(value)}
          />
          <Alert severity="info">Los cambios se guardan localmente.</Alert>
          <Button tone="primary">Guardar</Button>
        </Stack>
      </Surface>
    </Section>
  );
}
```

## Entrypoints

- `@jlopvil/mui-kit`
- `@jlopvil/mui-kit/components`
- `@jlopvil/mui-kit/theme`
- `@jlopvil/mui-kit/types`
- `@jlopvil/mui-kit/styles.css`

## Validación

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Los componentes P1, P2 y P3 no forman parte todavía de la API pública.

## Composición de formularios

Los controles de selección y sus piezas de etiquetado se importan desde el mismo paquete. Son primitives MUI con sus props, polimorfismo y refs originales. `Checkbox` y `Radio` incorporan un objetivo mínimo de 44 × 44 px y un contorno visible al recibir foco por teclado bajo `MyUiProvider`.

```tsx
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@jlopvil/mui-kit";

<FormControl component="fieldset" error>
  <FormLabel component="legend">Formato</FormLabel>
  <RadioGroup
    aria-label="Formato"
    aria-describedby="format-help"
    defaultValue="pdf"
  >
    <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
    <FormControlLabel value="text" control={<Radio />} label="Texto" />
  </RadioGroup>
  <FormHelperText id="format-help">Revisa el formato elegido.</FormHelperText>
</FormControl>;
```

Usa IDs únicos por instancia para asociar ayudas y errores. Para checkboxes, combina `FormGroup` y `FormControlLabel`; el consumidor controla el valor, la validación y los textos.

### Select nativo y valores numéricos

`SelectField` admite `native` para usar el selector de la plataforma. Conserva el tipo del valor de la opción al llamar a `onChange`, aunque el navegador lo serialice como texto. El segundo argumento sigue siendo el evento original. `ref` apunta al contenedor y `inputRef` al elemento select nativo.

```tsx
<SelectField
  native
  label="Columnas"
  value={columns}
  options={[
    { value: 1, label: "Una" },
    { value: 2, label: "Dos" },
  ]}
  onChange={setColumns}
/>
```

Configura el modo mediante la prop `native` del componente; `slotProps.select` permite personalizar el resto de props. En modo nativo, utiliza texto en las etiquetas de opciones. Los valores deben ser únicos también al convertirse a texto (no mezcles `1` y `"1"`). Para una selección inicial vacía, incluye `""` en el tipo del valor y proporciona `emptyOption`.
