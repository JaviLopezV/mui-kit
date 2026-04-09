# @JaviLopezV/mui-kit

Librería de componentes reutilizables basada en Material UI para instalar en proyectos React y Next.js.

## Objetivo del sistema visual

Todos los componentes comparten una misma base:

- **Primario**: azul claro agradable.
- **Secundario**: blanco con borde azul claro.
- **Distópico**: oscuro, con personalidad fuerte para acciones destacadas.

Los componentes que lo necesitan aceptan props estándar de Material UI como `color`, `variant`, `size`, `sx`, `fullWidth`, `onClick`, etc.

Ejemplo con botones:

```tsx
import { Button } from "@JaviLopezV/mui-kit";

export function Actions() {
  return (
    <>
      <Button color="primary" variant="contained">
        Guardar
      </Button>
      <Button color="secondary" variant="contained">
        Cancelar
      </Button>
      <Button color="dystopia" variant="contained">
        Modo distópico
      </Button>
    </>
  );
}
```

## Componentes incluidos

- `MuiKitProvider`
- `AppShell`
- `Button`
- `IconButton`
- `TextField`
- `SearchField`
- `SelectField`
- `Chip`
- `Card`
- `Surface`
- `Section`
- `PageHeader`
- `HeroBanner`
- `FeatureCard`
- `StatCard`
- `InfoAlert`
- `EmptyState`
- `DataTable`

## Instalación

```bash
npm install @JaviLopezV/mui-kit @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Uso en Next.js

En App Router, crea un provider cliente:

```tsx
"use client";

import { MuiKitProvider } from "@JaviLopezV/mui-kit";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MuiKitProvider>{children}</MuiKitProvider>;
}
```

Y úsalo en `app/layout.tsx`:

```tsx
import { Providers } from "./providers";
import "@JaviLopezV/mui-kit/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Uso en React

```tsx
import "@JaviLopezV/mui-kit/styles.css";
import {
  Button,
  FeatureCard,
  MuiKitProvider,
  PageHeader,
  SearchField,
  StatCard,
} from "@JaviLopezV/mui-kit";

export default function App() {
  return (
    <MuiKitProvider>
      <PageHeader
        eyebrow="Ventas"
        title="Dashboard"
        subtitle="Sistema visual unificado sobre Material UI"
        actions={<Button color="secondary">Exportar</Button>}
      />

      <SearchField label="Buscar" sx={{ my: 2 }} />

      <div className="JaviLopezV-card-grid">
        <FeatureCard
          title="Ventas"
          description="Resumen del canal online"
          badge="Nuevo"
        />
        <StatCard
          label="MRR"
          value="€12.400"
          helperText="+8.4% vs mes anterior"
        />
      </div>
    </MuiKitProvider>
  );
}
```

## Colores disponibles

- `primary`
- `secondary`
- `dystopia`

## Scripts

```bash
npm run build
npm run typecheck
```

## Publicación

1. Cambia el `name` en `package.json` por tu scope real de npm.
2. Ejecuta `npm run build`.
3. Publica con `npm publish --access public`.

## Ejemplo de consumo

Revisa `examples/next-app`.
