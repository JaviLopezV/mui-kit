# Arquitectura definitiva de `my-ui-library`

## 1. Decisión arquitectónica

`my-ui-library` será la capa de producto visual común sobre Material UI (MUI), no un reemplazo de MUI ni un catálogo de pantallas de negocio.

La librería tendrá tres responsabilidades:

1. **Foundation:** tokens, tema, provider, estilos globales mínimos y contratos responsive.
2. **Primitives:** una API estable para los elementos MUI que los consumidores usan de forma recurrente.
3. **Compositions:** patrones genéricos demostrados en más de un flujo o con una duplicación local clara, construidos con primitives.

Los consumidores deberán importar desde `my-ui-library` cuando exista una abstracción equivalente. Podrán importar MUI directamente cuando:

- la librería aún no exponga ese primitive;
- sea una pieza estructural de bajo nivel usada dentro de una composición local (`Box`, por ejemplo);
- la necesidad sea excepcional y no justifique ampliar la API pública.

Una importación directa no debe servir para recrear localmente estilos, variantes o comportamientos que ya pertenezcan al sistema. ESLint puede aplicar esta política mediante `no-restricted-imports`, con una allowlist explícita y adopción gradual.

## 2. Evidencia y límites del análisis

Se revisaron todos los Markdown de `docs/audits/`, la estructura de `src/`, los exports, el tema, `package.json`, TypeScript y el README.

Hay una incidencia de trazabilidad en las auditorías:

- `next-cv-builder.md` describe `next-cv-builder`.
- `my-portfolio.md` describe una aplicación AJ de mantenimiento/servicios (Next 15, `next-intl`, presupuesto, productos y mantenimiento).
- `ui-library-audit.md` es idéntico byte a byte a `my-portfolio.md`; no es una tercera auditoría independiente.
- No hay un informe único identificable de `my-portfolio` en el contenido disponible.

Por ello, esta propuesta combina exhaustivamente **dos conjuntos de evidencia independientes** más el estado actual de la librería. No atribuye componentes inventados a `my-portfolio`. Cuando se recupere la auditoría correcta, deberá ejecutarse el criterio de admisión definido en este documento y ajustar el roadmap si aporta conceptos nuevos.

## 3. Diagnóstico del paquete actual

El paquete actual exporta 17 componentes y un tema desde un único barrel. Tiene una base útil, pero aún no constituye un sistema estable:

- `Button`, `IconButton`, `Chip`, `TextField` y `Surface` son wrappers casi transparentes.
- `Card` mezcla primitive y composición al añadir `title`, `subtitle` y `action` sobre `MuiCard`.
- `InfoAlert` fija `variant="filled"` y tiene un nombre específico sin necesidad.
- `SearchField` contiene copy en español (`Buscar...`).
- `AppShell`, `HeroBanner`, `FeatureCard` y `StatCard` codifican una dirección visual concreta antes de demostrar uso transversal.
- `DataTable` usa el índice como fallback de key y fusiona tabla, superficie y empty state.
- todos los módulos llevan `"use client"`, incluso wrappers sin estado; esto amplía innecesariamente la frontera cliente en Next.js.
- `theme.tsx` reúne tokens, augmentations, creación del tema y provider; no admite extensión del consumidor ni modo de color.
- la paleta usa nombres de marca/estilo (`dystopia`, `surface`) como colores MUI; esto mezcla intención semántica, rol de superficie y una identidad concreta.
- el provider siempre inyecta `CssBaseline` y un fondo global, sin configuración.
- solo existe el export raíz; no hay entrypoints para theme, componentes o tipos.
- no hay infraestructura de tests, ejemplos aislados, pruebas de accesibilidad ni regresión visual.
- `sideEffects: false` contradice conceptualmente el entrypoint CSS exportado y debe verificarse al formalizar exports.

No se propone eliminar ni modificar esos componentes ahora. El roadmap decide su destino antes de cualquier cambio.

## 4. Principios de diseño

### 4.1 Composición antes que especialización

`SubmitButton`, `SaveButton`, `DownloadButton`, `ResetButton` y `PrimaryButton` son un solo `Button` con `variant`, `tone`, iconos, `loading` y props nativas. La intención de negocio vive en el texto y el handler del consumidor.

`UserProfileCard`, `CVExperienceSection`, `MaintenanceRequestCard`, `QuoteForm`, `ProductCard` o `WizardHeader` no pertenecen al core. Se componen localmente con `Card`, `Surface`, `Stack`, `Typography`, `Button`, `Chip`, etc.

Un componente entra en la librería si cumple al menos una condición:

- aparece en dos proyectos con el mismo contrato conceptual;
- elimina duplicación relevante dentro de un proyecto y su API es independiente del dominio;
- centraliza accesibilidad o interacción difícil de implementar bien;
- representa una decisión visual global que debe ser consistente.

### 4.2 API estrecha, MUI interoperable

Los primitives extienden o adaptan props MUI y hacen `forwardRef`. Las compositions exponen una API de dominio UI, no todas las props internas de cada MUI usado. `sx` se mantiene como escape hatch, pero no sustituye variantes recurrentes.

### 4.3 Control en el consumidor

Los componentes interactivos son controlados (`open`/`onClose`, `value`/`onChange`). La librería no navega, traduce, persiste, imprime, descarga, llama APIs ni conoce schemas de negocio.

### 4.4 Semántica primero

Props como `tone="danger"`, `variant="glass"` o `density="compact"` expresan intención. Los hex, sombras, blur y medidas concretas pertenecen al tema.

## 5. Estructura objetivo

```text
src/
├── components/
│   ├── foundation/
│   │   ├── Button/
│   │   ├── IconButton/
│   │   ├── Link/
│   │   ├── Typography/
│   │   ├── Surface/
│   │   └── Divider/
│   ├── form/
│   │   ├── TextField/
│   │   ├── SelectField/
│   │   ├── Checkbox/
│   │   ├── RadioGroup/
│   │   ├── SegmentedControl/
│   │   ├── TagInput/
│   │   └── FieldArray/
│   ├── data-display/
│   │   ├── Card/
│   │   ├── Chip/
│   │   ├── Accordion/
│   │   ├── Table/
│   │   └── IconList/
│   ├── feedback/
│   │   ├── Alert/
│   │   ├── Dialog/
│   │   ├── LoadingState/
│   │   ├── EmptyState/
│   │   └── Tooltip/
│   ├── navigation/
│   │   ├── Stepper/
│   │   └── SelectionNav/
│   └── layout/
│       ├── Container/
│       ├── Stack/
│       ├── Grid/
│       ├── Section/
│       ├── PageHeader/
│       └── ActionBar/
├── theme/
│   ├── augmentation.d.ts
│   ├── palette.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── breakpoints.ts
│   ├── shape.ts
│   ├── shadows.ts
│   ├── motion.ts
│   ├── components.ts
│   ├── createMyUiTheme.ts
│   └── MyUiProvider.tsx
├── hooks/
│   ├── useControllableState.ts
│   └── useReducedMotion.ts
├── internal/
│   ├── composeSx.ts
│   ├── mergeSlotProps.ts
│   └── visuallyHidden.ts
├── types/
│   ├── polymorphic.ts
│   └── responsive.ts
├── index.ts
├── components.ts
├── theme.ts
└── types.ts
```

Los directorios se crean solo al implementar componentes aprobados. No se añade un directorio por anticipación. `Carousel`, `AppHeader`, `BackdropPage`, `MediaSection`, `Prose` o `EmbedFrame` quedan fuera de la estructura inicial: tienen evidencia en una sola aplicación y se reevaluarán en P2/P3.

## 6. Convenciones

### Naming

- Componentes y tipos: `PascalCase`; hooks: `useCamelCase`; tokens/funciones: `camelCase`.
- Archivo público principal: `ComponentName.tsx`; tipos cercanos al componente.
- Props: `ComponentNameProps`; subcomponentes: `Dialog.Header` o exports nombrados `DialogHeader`, nunca nombres de negocio.
- `onX` para callbacks; `defaultX` para estado no controlado cuando esté justificado; nunca setters como `setOpen`.
- `children`, `startIcon`, `endIcon`, `action`, `header`, `footer` o `slots` para composición. No usar nombres visuales como `leftThing`.
- `variant` modifica estructura/apariencia; `tone` comunica intención semántica; `size` controla escala; `color` queda para compatibilidad MUI en primitives.
- Componentes que solo fijan una variante no reciben un nombre nuevo (`InfoAlert` → `Alert`; `SubmitButton` → `Button`).

### Component API y TypeScript

- TypeScript estricto y tipos públicos explícitos.
- Extender props MUI con `Omit` solo cuando exista una colisión deliberada; evitar volver a declarar contratos ya resueltos por MUI.
- Refs al elemento raíz real y soporte de `component`/polimorfismo donde MUI ya lo ofrece.
- Genéricos para valores data-driven (`SelectField<T>`, `SegmentedControl<T>`, `FieldArray<T>`), con claves estables.
- `ReactNode` para copy ya traducido; la librería no acepta claves i18n.
- Callbacks entregan el valor útil y, cuando sea importante interoperar, el evento original.
- No usar `any`; no exponer tipos de `internal/`.
- Props booleanas describen capacidad/estado (`loading`, `fullWidth`, `disabled`), no estilos arbitrarios.
- `className` y `sx` se admiten en roots públicos; `slotProps` en compositions que necesiten personalización profunda.

Ejemplos orientativos:

```ts
type SemanticTone = "neutral" | "primary" | "success" | "warning" | "danger";
type ControlSize = "small" | "medium" | "large";

interface ButtonProps extends Omit<MuiButtonProps, "color"> {
  tone?: SemanticTone;
  loading?: boolean;
  loadingLabel?: React.ReactNode;
}

interface SurfaceProps extends PaperProps {
  variant?: "plain" | "outlined" | "elevated" | "glass";
  padding?: "none" | "compact" | "comfortable" | "spacious";
}

interface SelectOption<T extends string | number> {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
}

interface SelectFieldProps<T extends string | number> extends Omit<
  MuiTextFieldProps,
  "select" | "value" | "onChange" | "children"
> {
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T, event: React.ChangeEvent<HTMLInputElement>) => void;
}
```

## 7. Estrategia de variantes, tamaños y color

### Variantes

- Conservar variants MUI conocidas cuando expresan bien el contrato: `contained`, `outlined`, `text` en `Button`; severities de `Alert`.
- Añadir variants solo con evidencia repetida: `Surface` (`plain`, `outlined`, `elevated`, `glass`) y densidades de layout.
- No introducir `variant="primary"`: primary es tono/color, no estructura.
- Las compositions usan subcomponentes/slots antes que props combinatorias. `Dialog` se compone de header, content y actions; `FieldArray` usa render props/compound API.

### Tamaños

- Controles: `small`, `medium`, `large`, mapeados a tokens de altura, padding, icono y tipografía.
- Objetivo táctil mínimo: 44×44 CSS px para acciones, aunque el glyph visual sea menor.
- Layout no usa `size`; usa `density`, `padding`, `maxWidth` y valores responsive.
- Evitar píxeles sueltos en consumidores; spacing usa la escala del tema.

### Color

- Paleta base MUI: `primary`, `secondary`, `error`, `warning`, `info`, `success`, `background`, `text`, `divider`.
- Tokens semánticos adicionales: `surface`, `surfaceSubtle`, `surfaceGlass`, `textMuted`, `focusRing`, overlays y estados interactivos.
- `tone` se traduce a roles de paleta. `danger` mapea a `error`; no se añaden nombres de campaña o estética como colores públicos.
- El tema puede aceptar una marca por proyecto mediante opciones, conservando contratos y contraste.
- Light/dark se resuelven en `colorSchemes`; ningún componente decide el modo ni usa hex directo.

## 8. Responsive

- Breakpoints iniciales MUI (`xs`, `sm`, `md`, `lg`, `xl`) para evitar migraciones innecesarias; se exporta el contrato, no números duplicados.
- Mobile-first y CSS responsive (`sx`/container queries cuando proceda). `useMediaQuery` solo cuando cambia comportamiento o estructura, no para ocultar estilos.
- Toda composition debe funcionar a 320 px, con zoom 200 %, textos largos y localización.
- Props espaciales aceptan `ResponsiveStyleValue` cuando hay un caso demostrado.
- `ActionBar` soporta columna móvil/fila desktop y safe-area; `ResponsiveStepper` ofrece representación compacta, no simplemente `display: none`.
- Los layouts de impresión A4 de CV siguen en `next-cv-builder`; no pertenecen al responsive general.

## 9. Accesibilidad

Requisito de publicación: WCAG 2.2 AA en estados soportados.

- HTML semántico y jerarquía de headings controlada por el consumidor (`level` separado de apariencia).
- Navegación completa por teclado, foco visible por token y orden de foco predecible.
- Contraste AA para texto, iconos informativos, bordes de control y estados focus/disabled.
- Acciones solo con icono requieren nombre accesible; `Tooltip` no sustituye `aria-label`.
- Touch target mínimo de 44×44.
- `Dialog` usa focus trap, devuelve foco, soporta Escape y enlaza title/description mediante IDs.
- `LoadingState` usa `role="status"`/`aria-live="polite"`; `Alert` usa la live region adecuada sin anunciar al montar contenido irrelevante.
- Errores de formulario se asocian con `aria-describedby`; required, invalid y helper text no dependen solo del color.
- Selectable cards conservan semántica de radio; segmented controls indican selección.
- Motion respeta `prefers-reduced-motion`; carousel, si se aprueba, debe poder pausarse y tener controles etiquetados.
- Tests de axe no sustituyen pruebas manuales con teclado y lector de pantalla.

## 10. Arquitectura de tema

`createMyUiTheme(options)` será la única factoría. Orden de composición:

```text
tokens base
  → color scheme / brand overrides del consumidor
  → typography, spacing, breakpoints, shape, shadows, motion
  → MUI component defaultProps / styleOverrides / variants
  → overrides finales explícitos del consumidor
```

API prevista:

```ts
interface MyUiThemeOptions {
  colorScheme?: 'light' | 'dark' | 'system';
  brand?: {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
  };
  typography?: ThemeOptions['typography'];
  components?: ThemeOptions['components'];
}

createMyUiTheme(options?: MyUiThemeOptions): Theme;
```

`MyUiProvider` recibe `children`, tema u opciones, control de `CssBaseline` y configuración necesaria para SSR. No incluye i18n, router, storage ni caché específica de una app. La integración Next/Emotion se documenta como adaptador separado para no forzar Next a consumidores React.

Los tokens públicos son semánticos y estables. Los tokens de implementación pueden cambiar sin semver si no se exportan. Las augmentations MUI viven en un único archivo y cubren solo variantes/roles públicos.

## 11. Exports y fronteras

Entry points previstos:

```json
{
  ".": "API pública estable",
  "./components": "componentes públicos",
  "./theme": "provider, factoría y tokens públicos",
  "./types": "tipos compartidos sin runtime",
  "./styles.css": "CSS global opcional y explícito"
}
```

- El root exporta la ruta recomendada de uso común.
- No habrá deep imports a carpetas internas.
- Cada componente tendrá barrel local, pero el paquete controla qué llega a `components.ts`.
- `internal/`, hooks auxiliares, funciones de merge y subpiezas no soportadas no se exportan.
- Los componentes compound pueden exportar piezas necesarias para componer (`DialogHeader`) sin exponer wrappers internos.
- React, React DOM, MUI y Emotion permanecen como peer dependencies; se define una matriz de versiones y no se mezcla una actualización mayor de MUI con la migración visual.
- La build debe preservar tree-shaking. CSS con efectos laterales se declara explícitamente en `sideEffects`.

## 12. Público, privado y local al proyecto

### API pública central

Theme/provider; `Button`, `IconButton`/`IconAction`, `Link`, `Typography`, `Surface`, primitives de formulario, `Card`, `Chip`, `Alert`, `Dialog`, `Tooltip`, `LoadingState`, `EmptyState`, layouts básicos y las compositions aprobadas por prioridad.

### Interno de la librería

Merges de `sx`/slots, IDs accesibles, visually-hidden, adaptadores MUI, estilos de subcomponentes, hooks de control y reduced motion. No hay compatibilidad semver para estas piezas.

### Debe permanecer en los consumidores

- **AJ:** `QuoteForm`, formularios de contacto, `FooterInfo`, configuración final del header, rutas/locales, catálogo/productos, páginas de mantenimiento, datos de empresa, WhatsApp, PWA, EmailJS, contenido legal, fondos y selección de imágenes.
- **CV builder:** `CvWizard`, `CvEditor`, schema/editor de CV, preview A4, presets visuales de CV, impresión/exportación/importación, storage, copy legal, configuración final del wizard.
- **Cualquier proyecto:** providers de i18n/router/data, analytics, permisos, modelos de dominio y compositions que nombren entidades del producto.

## 13. Estrategia de testing y calidad

Pirámide mínima antes de migrar consumidores:

1. **Type tests:** props, genéricos, refs, module augmentation y exports; `tsc --noEmit` sobre fixtures React y Next.
2. **Unit/component:** React Testing Library + user-event para callbacks, estados, composición y fallbacks.
3. **Accesibilidad automática:** axe en cada estado/variant interactivo.
4. **Interacción:** teclado, focus trap/restore, selección, dismiss, loading y errores.
5. **Visual:** historias por variant, color scheme, viewport y estados; snapshots visuales en 320 px, `sm`, `md`, `lg` y dark mode.
6. **Integración:** apps fixture para React y Next App Router, incluyendo SSR/hidratación y ausencia de style flicker.
7. **Build/API:** ESM/CJS según soporte decidido, tree-shaking, exports map, tipos publicados y prueba de instalación desde tarball.

Cada componente público necesita estados default, hover, focus-visible, active, disabled, error/loading cuando apliquen; contenido corto/largo; RTL cuando la estructura sea direccional. Las recipes específicas de impresión se prueban en el proyecto CV, no en el core.

## 14. Gobierno y compatibilidad

- Añadir un componente exige evidencia, contrato de accesibilidad, historia/ejemplo, tests y propietario.
- Las variantes nuevas se añaden por intención recurrente, no por una pantalla aislada.
- SemVer: cambios de props/exports/tokens públicos son breaking; cambios visuales significativos se documentan y validan con consumidores piloto.
- Deprecaciones viven al menos un ciclo menor con warning de tipos/documentación antes de eliminarse.
- La migración será incremental: theme → primitives → compositions → enforcement de imports. Este documento no autoriza aún ninguna implementación o migración.
