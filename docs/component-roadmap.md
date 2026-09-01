# Roadmap consolidado de componentes

## 1. Criterios

Este roadmap combina los conceptos observados en las auditorías disponibles y en la librería actual. Elimina duplicados conceptuales y evita trasladar componentes de negocio.

Prioridades:

- **P0:** contrato base necesario antes de migrar cualquier consumidor.
- **P1:** reutilización alta o duplicación clara; siguiente ola.
- **P2:** útil, pero depende de validar la API o de un segundo uso.
- **P3:** opcional/especulativo; no implementar sin nueva evidencia.

Estados recomendados para el trabajo futuro: `adopt` (conservar/consolidar), `replace` (absorber en otro concepto), `defer` (posponer), `local` (mantener en el proyecto).

> Limitación: `docs/audits/my-portfolio.md` y `docs/audits/ui-library-audit.md` son idénticos y describen AJ. No hay evidencia independiente de `my-portfolio`; sus necesidades deberán incorporarse cuando exista la auditoría correcta.

## 2. Mapa conceptual de duplicados

| Componentes/patrones encontrados                                                                         | Concepto definitivo                     | Decisión                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Botones submit, add, delete, reset, download, print, install, dismiss, CTA, `NavButton`; actual `Button` | `Button`                                | Un solo primitive; iconos, `loading`, `tone`, `variant`, `size` y `fullWidth` son props                   |
| `IconButton` de header/modal/carousel/WhatsApp y deletes con tooltip                                     | `IconButton` + `IconAction`             | Primitive general + composition accesible para acción etiquetada/tooltip; URL social queda local          |
| `Paper`, panels glass, superficies `#fafafa`, actual `Surface`, paneles legal/setup/editor/export        | `Surface`                               | Variants y padding; sticky/layout se compone fuera                                                        |
| Actual `Card`, `FeatureCard`, `StatCard`, product/service/setup cards                                    | `Card` compound + `SelectableCardGroup` | `Card` aporta estructura; cards de producto/feature/stat se componen localmente salvo evidencia adicional |
| Seis campos quote, editores CV, actual `TextField`, `SearchField`                                        | `TextField`                             | Defaults y contrato común; búsqueda es composition opcional sin copy embebido                             |
| Select de categorías, theme/page/column, actual `SelectField`                                            | `SelectField<T>`                        | Un control tipado y data-driven                                                                           |
| Checkbox de consentimiento, radio cards, switches                                                        | `Checkbox`, `RadioGroup`, `Switch`      | Primitives temáticos; `ConsentField` no es necesario si label/helper composition basta                    |
| Language toggle y edit/preview toggle                                                                    | `SegmentedControl<T>`                   | Un control exclusivo genérico                                                                             |
| Cuatro repeatable editors                                                                                | `FieldArray<T>`                         | Shell compound; fields, factories y dominio siguen locales                                                |
| Chips editables y actual `Chip`                                                                          | `Chip` + `TagInput`                     | Display primitive + entrada controlada; print tags CV permanecen locales                                  |
| `QuoteModal`, confirmación LegalFooter                                                                   | `Dialog` + `ConfirmDialog`              | Foundation accesible compound + preset de confirmación                                                    |
| Alerts quote/setup/export y actual `InfoAlert`                                                           | `Alert`                                 | Severity/tone; copy y reglas quedan locales                                                               |
| Loader AJ, hydration spinner y actual empty state                                                        | `LoadingState`, `EmptyState`            | Estados genéricos separados                                                                               |
| Wizard stepper responsive                                                                                | `ResponsiveStepper`                     | Items y labels resueltos por consumidor                                                                   |
| Acciones responsive setup/editor/export/footer                                                           | `ActionBar`                             | Layout de acciones, opcionalmente sticky/safe-area                                                        |
| `Section`, page headings y actual `PageHeader`                                                           | `Section`, `PageHeader`, `Typography`   | Separar layout, encabezado y semántica tipográfica                                                        |
| `Spacer` con `<br>`                                                                                      | `Stack`/spacing tokens                  | No crear `Space` inicialmente                                                                             |
| App headers, locale menu, footer AJ                                                                      | Composición local con primitives        | No publicar shell de producto hasta tener dos consumidores                                                |
| Carousel AJ                                                                                              | `Carousel` candidato                    | P2 condicionado por dependencia, a11y y segundo consumidor                                                |
| Backdrop pages AJ                                                                                        | Composición local / recipe              | No centralizar todavía                                                                                    |
| Legal prose AJ/CV                                                                                        | `Prose`/`ArticleSection` candidato      | P3; contenido siempre local                                                                               |
| Actual `DataTable`; ningún uso auditado de table/pagination                                              | `Table` primitives                      | Posponer `DataTable` de alto nivel; API actual no está validada por consumidores                          |

## 3. FOUNDATION

| Prioridad | Concepto                          | Fuentes                                                                  | API/alcance definitivo                                                                                | Estado |
| --------- | --------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------ |
| P0        | `MyUiProvider`, `createMyUiTheme` | Tema actual; tema mezclado con i18n en CV; ausencia de theme AJ          | Provider configurable, CssBaseline opcional, color schemes, extensión por consumidor, SSR documentado | adopt  |
| P0        | Design tokens                     | Hex/spacing/radii/shadows/motion repetidos en ambos audits y tema actual | Palette semántica, typography, spacing, breakpoints, shape, shadows, motion, z-index, control sizes   | adopt  |
| P0        | MUI component defaults            | Botones 44px, fields, Papers, headings y estilos repetidos               | `defaultProps`, `styleOverrides`, variants tipadas; coherencia sin wrappers inútiles                  | adopt  |
| P0        | `Button`                          | Acciones de AJ/CV; actual `Button`                                       | Props MUI compatibles + `tone`, `loading`; `contained/outlined/text`; ref                             | adopt  |
| P0        | `IconButton`                      | Header, dialogs, carousel, editors; actual `IconButton`                  | Primitive temático; exige accessible name en documentación/tests                                      | adopt  |
| P0        | `Typography`                      | 95 usos AJ; headings/weights CV                                          | Primitive MUI expuesto y escala central; semántica (`component`) separada de apariencia               | adopt  |
| P0        | `Surface`                         | Papers/Box AJ y glass panels CV; actual `Surface`                        | `plain/outlined/elevated/glass`, padding/density, ref; sin layout de negocio                          | adopt  |
| P0        | `Link`                            | Legal/nav/form consent                                                   | Estilo y foco coherentes, polimórfico; sin dependencia de Next                                        | adopt  |
| P1        | `IconAction`                      | Deletes CV, close dialog, carousel actions                               | `label`, `icon`, `tone`, tooltip opcional, target 44px                                                | adopt  |
| P1        | `Divider`                         | Legal, service cards, editors                                            | Re-export temático solo si la política de imports MUI lo requiere                                     | adopt  |
| P1        | `Card` compound                   | Actual `Card`; cards de AJ/CV                                            | `Card`, `CardHeader`, `CardMedia`, `CardContent`, `CardActions`; sin `product`/`profile`              | adopt  |
| P1        | `Chip`                            | CV editor/status; actual `Chip`                                          | Display/status/removable, tones semánticos                                                            | adopt  |
| P2        | `Heading`                         | Headings responsive AJ/CV                                                | Solo si `Typography component + variant` no cubre ergonomía/a11y                                      | defer  |

## 4. FORM

| Prioridad | Concepto                  | Fuentes                                             | API/alcance definitivo                                                                 | Estado  |
| --------- | ------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- | ------- |
| P0        | `TextField`               | Quote AJ, cinco editores CV; actual wrapper         | MUI compatible, fullWidth default decidido por theme, error/helper/required accesibles | adopt   |
| P0        | `SelectField<T>`          | Categorías AJ; theme/page/column CV; actual wrapper | Label integrado, options tipadas, `value/onChange`, empty/disabled                     | adopt   |
| P0        | `Checkbox`                | Consentimiento AJ                                   | Primitive temático; labels mediante composition estándar                               | adopt   |
| P0        | `RadioGroup`              | Selectable setup cards CV                           | Primitive accesible para selección exclusiva                                           | adopt   |
| P1        | `Switch`                  | Enable section CV                                   | Primitive temático con label/description asociados                                     | adopt   |
| P1        | `SegmentedControl<T>`     | Idioma y edit/preview CV                            | Controlado, options genéricas, label accesible, responsive sin i18n interna            | adopt   |
| P1        | `FieldArray<T>`           | Body/Cards/Items/ChipGroups editors CV              | Compound/render props, IDs estables, add/remove; no schemas ni validación propia       | adopt   |
| P1        | `FormLayout` / `FormGrid` | Quote AJ y grids CV                                 | Solo layout; compatible con cualquier form library                                     | adopt   |
| P2        | `TagInput`                | Inner control de ChipGroups CV                      | Controlado, normalización/duplicados/max opcionales                                    | adopt   |
| P2        | `SearchField`             | Componente actual                                   | Composition de `TextField`; placeholder obligatorio o resuelto por consumidor          | defer   |
| P2        | `FormActions`             | Quote y wizard flows                                | Alias/uso de `ActionBar`; no crear concepto duplicado                                  | replace |
| P3        | `ConsentField`            | Quote AJ                                            | Componer `Checkbox` + `Link` + helper; no publicar salvo segunda necesidad compleja    | defer   |

## 5. DATA DISPLAY

| Prioridad | Concepto                   | Fuentes                                      | API/alcance definitivo                                                                | Estado  |
| --------- | -------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------- | ------- |
| P1        | `Accordion`                | Personal/sections CV                         | Compound MUI tematizado; summary/actions/content, teclado nativo                      | adopt   |
| P1        | `SelectableCardGroup<T>`   | Setup start options CV                       | Radio semantics, options data-driven y slots; import/download quedan locales          | adopt   |
| P2        | `IconList`                 | Listas de low voltage AJ                     | Lista semántica con caller-supplied icon; validar segunda composición                 | defer   |
| P2        | `Table` primitives         | `DataTable` actual                           | Exponer/tematizar primitives solo cuando un consumidor los necesite                   | defer   |
| P3        | `DataTable<T>`             | Solo librería actual, sin evidencia auditada | No estabilizar hasta definir sorting, selection, pagination, loading, a11y y row keys | defer   |
| P3        | `MediaCard`                | Product cards AJ                             | Componer con `Card`; publicar solo si otro proyecto comparte exactamente el contrato  | defer   |
| P3        | `FeatureCard`              | Services AJ; componente actual               | Absorber en `Card` composition; mantener negocio/iconografía fuera                    | replace |
| P3        | `StatCard`                 | Solo componente actual                       | Composition local con `Surface` y `Typography` hasta demostrar reutilización          | replace |
| P3        | `Prose` / `ArticleSection` | Terms/privacy AJ; privacy CV                 | Semántica long-form; aprobar solo con API común demostrada                            | defer   |

## 6. FEEDBACK

| Prioridad | Concepto          | Fuentes                                              | API/alcance definitivo                                                    | Estado |
| --------- | ----------------- | ---------------------------------------------------- | ------------------------------------------------------------------------- | ------ |
| P0        | `Alert`           | Quote AJ, setup/editor/export CV; actual `InfoAlert` | MUI severity, dismiss controlado, title/actions; sin copy fija            | adopt  |
| P0        | `Dialog` compound | Quote modal AJ, delete-data CV                       | `Dialog`, header/content/actions; focus, Escape, labels y responsive      | adopt  |
| P1        | `ConfirmDialog`   | LegalFooter CV y confirms browser                    | Preset controlado, danger tone, busy/async; no ejecuta efectos            | adopt  |
| P1        | `LoadingState`    | Loader AJ e hidratación CV                           | `label`, visual/size/minHeight; status accesible                          | adopt  |
| P1        | `Tooltip`         | Delete editors CV                                    | Primitive temático; no reemplaza accessible name                          | adopt  |
| P1        | `EmptyState`      | Componente actual y necesidad transversal previsible | Icon/title/description/action, composition; validar con primer consumidor | adopt  |
| P2        | `ActionBanner`    | InstallPrompt AJ                                     | Presentación controlada; hook PWA permanece local                         | defer  |
| P2        | `Skeleton`        | Variante sugerida por loaders                        | Primitive MUI temático cuando aparezca un caso real                       | defer  |

## 7. NAVIGATION

| Prioridad | Concepto                       | Fuentes                   | API/alcance definitivo                                                                              | Estado |
| --------- | ------------------------------ | ------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| P1        | `ResponsiveStepper`            | WizardStepper CV          | Steps data-driven, active step, compact renderer, aria label                                        | adopt  |
| P2        | `SelectionNav`                 | Categorías list/select AJ | Controlado, items y active value; validar si `SegmentedControl`/`SelectField` por composition basta | defer  |
| P2        | `Tabs`                         | Sin uso auditado          | No implementar hasta tener un consumidor                                                            | defer  |
| P3        | `AppHeader` / `NavigationMenu` | Header AJ                 | Mantener composición y router/i18n locales; revaluar con segundo header                             | local  |
| P3        | `LocaleMenu`                   | Header AJ                 | Adaptador local sobre primitives; `SegmentedControl` ya cubre CV                                    | local  |
| P3        | `Pagination`                   | Sin uso auditado          | No implementar                                                                                      | defer  |

## 8. LAYOUT

| Prioridad | Concepto                      | Fuentes                                | API/alcance definitivo                                                                | Estado  |
| --------- | ----------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- | ------- |
| P0        | `Container`                   | Shells AJ/CV                           | Re-export temático con max widths/tokens de gutter                                    | adopt   |
| P0        | `Stack`                       | Uso intensivo AJ/CV                    | Re-export MUI para política de imports y spacing consistente                          | adopt   |
| P0        | `Grid`                        | Forms/cards/editor CV y AJ             | Re-export compatible con la versión MUI elegida; no ocultar diferencias de Grid major | adopt   |
| P0        | `Section`                     | Section AJ; actual `Section`           | Contenedor semántico/composable; sin scroll, observer ni animación                    | adopt   |
| P1        | `PageHeader`                  | Headings/actions AJ; actual component  | Eyebrow/title/subtitle/actions; heading level configurable                            | adopt   |
| P1        | `ActionBar`                   | Editor/export/footer CV; CTAs/forms AJ | Responsive, align, sticky opcional, safe-area; children composition                   | adopt   |
| P2        | `Reveal`                      | Section observer/animation AJ          | Separado de `Section`, reduced motion; aprobar solo si el patrón sigue compartible    | defer   |
| P2        | `MediaSection`                | About/contact AJ                       | Layout de media/text; necesita segunda evidencia                                      | defer   |
| P3        | `ResponsiveSplitView`         | Editor/preview CV                      | Mantener local hasta segundo consumidor                                               | local   |
| P3        | `BackdropPage` / `SectionSpy` | Nueve shells AJ                        | Lenguaje visual/app behavior específico; recipe local, no core                        | local   |
| P3        | `EmbedFrame`                  | Mapa AJ                                | Composition local de `Surface`; no publicar aún                                       | local   |
| P3        | `AppShell`                    | Componente actual                      | Demasiado opinado; recomponer localmente con layout/navigation primitives             | replace |
| P3        | `HeroBanner`                  | Componente actual                      | Recipe local con `Surface`, `Stack`, `Typography`, `Button`                           | replace |

## 9. UTILITY

| Prioridad | Concepto                       | Fuentes                  | API/alcance definitivo                                                                 | Estado  |
| --------- | ------------------------------ | ------------------------ | -------------------------------------------------------------------------------------- | ------- |
| P0        | Tipos responsive y semánticos  | Todas las familias       | `ResponsiveValue`, `SemanticTone`, `ControlSize`; tipos públicos mínimos               | adopt   |
| P0        | Helpers SSR/theme              | React + Next consumers   | Integración documentada, sin acoplar el core a Next                                    | adopt   |
| P1        | `useReducedMotion`             | Reveal/carousel/motion   | Hook interno inicialmente; exportar solo si consumidores lo necesitan                  | adopt   |
| P1        | `visuallyHidden`               | Labels/status accesibles | Utilidad interna                                                                       | adopt   |
| P2        | Helpers controlled state/slots | Compositions             | Internos; no API pública                                                               | adopt   |
| P3        | `Space`                        | `Spacer` AJ              | No implementar; preferir `Stack gap`, padding o margin tokens                          | replace |
| P3        | `Carousel`                     | ImageCarouselSwiper AJ   | Evaluar dependencia opcional, SSR, pause, keyboard y slides API; no P1 sin segundo uso | defer   |

## 10. Componentes que permanecen fuera

### AJ / mantenimientos

`StructuredData`, `LocaleProvider`, `FooterInfo`, configuración final de header/navigation/locales, `QuoteForm`, `ContactForm`, `ContactUs`, `ProductSections`, páginas y cards con contenido de mantenimiento, Terms/Privacy/About, `useQuoteLogic`, integración EmailJS, URLs de WhatsApp/mapa, hook PWA, catálogo, fondos y slides concretos.

### `next-cv-builder`

`CvWizard`, `CvEditor`, `PersonalDataEditor`, `CvEditorToolbar`, dispatch de `CvSectionAccordion`, `CvSectionsEditor`, `CvPreview`, `SectionRenderer`, `SetupStep`, `WizardHeader`, `EditorStep`, `ExportStep`, import/export/print, storage, A4 CSS, modelos `CvData`, presets de CV, textos legales y mapping de iconos de inicialización.

Estos componentes pueden consumir la librería, pero sus nombres, datos, reglas y side effects no pasan al core.

## 11. Secuencia de entrega futura

### Fase P0 — contrato antes que catálogo

1. Congelar naming, matriz MUI/React y estrategia de exports.
2. Separar tokens, theme factory, provider y augmentations.
3. Consolidar primitives P0 y accesibilidad base.
4. Crear fixtures React/Next, tests de tipos, interacción, axe y visuales.
5. Validar un consumer piloto sin migración masiva.

### Fase P1 — patrones demostrados

1. `Card` compound, `IconAction`, `Chip`, `Accordion`.
2. `SegmentedControl`, `FieldArray`, `FormGrid`.
3. `ConfirmDialog`, `LoadingState`, `Tooltip`, `EmptyState`.
4. `ResponsiveStepper`, `PageHeader`, `ActionBar`.
5. Adoptar en un flujo AJ y uno CV, midiendo qué imports MUI siguen siendo legítimos.

### Fase P2 — validación cruzada

Implementar únicamente candidatos cuyo contrato sobreviva a los pilotos: `TagInput`, `SearchField`, `IconList`, `SelectionNav`, `Reveal`, `MediaSection`, `ActionBanner`. Si solo resuelven un producto, se mantienen como recipes locales.

### Fase P3 — no construir por anticipación

`DataTable`, `MediaCard`, `FeatureCard`, `StatCard`, `Prose`, `Tabs`, `Pagination`, `AppHeader`, `BackdropPage`, `ResponsiveSplitView`, `EmbedFrame`, `Carousel`, `Space`, `AppShell` y `HeroBanner` requieren nueva evidencia o deben absorberse por composición.

## 12. Definition of Done por componente

Un componente no pasa a público hasta cumplir:

- necesidad y no-negociables documentados;
- API TypeScript, ref y exports estables;
- ninguna dependencia de router, i18n, storage, red o modelo de negocio;
- estados y variants cubiertos con ejemplos aislados;
- tests de comportamiento, teclado y axe;
- visuales light/dark y viewports relevantes;
- copy inyectable y prueba con texto largo;
- tokens sin valores visuales hardcoded evitables;
- SSR/hidratación comprobados cuando aplique;
- changelog y guía breve de adopción.

Este roadmap es de diseño. No implica todavía implementar, retirar ni migrar ningún componente.
