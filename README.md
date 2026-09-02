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
- Form: `TextField`, `SelectField<T>`, `Checkbox`, `RadioGroup`.
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
