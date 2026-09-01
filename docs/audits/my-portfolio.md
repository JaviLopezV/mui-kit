# UI Component Audit

> Auditoría estática realizada el 1 de septiembre de 2026. Alcance: `src/`, `utils/`, configuración y dependencias del proyecto. No se ha modificado comportamiento de la aplicación. Las categorías usadas son **A. GENERIC**, **B. GENERIC-WITH-REFACTOR** y **C. PROJECT-SPECIFIC**.

## Current component inventory

### Contexto y estructura

El proyecto es una aplicación Next.js 15 con App Router, React 18, Material UI 5, Emotion, `next-intl`, Swiper y `react-intersection-observer`.

- `src/components/`: componentes compartidos por la aplicación (`Header`, `Footer`, `Section`, `QuoteModal`, etc.).
- `src/app/[locale]/`: layouts y páginas localizadas.
- `src/app/[locale]/*/components/`: bloques visuales ligados a una página o dominio.
- `src/hooks/useQuoteLogic.js`: estado y envío del formulario de presupuesto.
- `src/config/company.js`: datos de empresa usados por componentes visuales.
- `src/app/[locale]/globals.css`: reset y colores globales mínimos.
- `src/app/[locale]/page.module.css`: estilos del starter de Next.js; no se ha encontrado ningún import, por lo que parecen código muerto.
- `utils/createEmotionCache.js`: caché de Emotion; tampoco se ha encontrado consumo.

No existen actualmente directorios de primitives/design-system, barrel exports, Storybook, tests de componentes ni un theme MUI creado con `createTheme`.

### Inventario de componentes React relacionados con UI

| Componente actual                                        | Archivo                                                               | Tipo / responsabilidad                                        | Props públicas                         | Categoría                  | Observaciones                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `AppAppBar` (`Header`)                                   | `src/components/Header.js`                                            | Header, navegación desktop/mobile, selector de idioma y menús | `currentLocale`                        | B                          | Mezcla shell visual, routing Next, i18n, configuración de navegación, iconos y estado de menús       |
| `FooterInfo` (`Footer`)                                  | `src/components/Footer.js`                                            | Footer responsive con contacto, redes y enlaces legales       | `currentLocale`                        | B                          | Contenido, datos de empresa, routing e i18n específicos                                              |
| `Copyright`                                              | `src/components/Footer.js`                                            | Línea de copyright                                            | ninguna                                | B                          | Visualmente genérico, pero texto/autor hardcoded                                                     |
| `QuoteModal`                                             | `src/components/QuoteModal.js`                                        | Modal animado que contiene el formulario de presupuesto       | `open`, `setOpen`, `title`             | B                          | El contenedor dialog es reusable; formulario, hook e i18n son específicos                            |
| `Section`                                                | `src/components/Section.js`                                           | Sección centrada, responsive y animada al entrar en viewport  | `id`, `isLeft`, `children`, `onInView` | B                          | La superficie visual es genérica; fuerza scroll al montar y exige callback                           |
| `Spacer`                                                 | `src/components/Spacer.js`                                            | Espaciado vertical mediante múltiples `<br>`                  | `size=2`                               | A, pero no migrar tal cual | Debe reemplazarse por un primitive de espacio basado en tokens/CSS                                   |
| `Loader`                                                 | `src/components/Loading.js`                                           | Estado de carga con imagen y texto                            | ninguna                                | B                          | Imagen, traducción y estilos inline específicos                                                      |
| `InstallPrompt`                                          | `src/components/InstallPrompt.js`                                     | Banner flotante de instalación PWA                            | ninguna                                | B                          | Banner genérico acoplado a API PWA, detección de dispositivo e i18n                                  |
| `WhatsAppButton`                                         | `src/components/Whatsapp.js`                                          | Icon button que abre WhatsApp                                 | ninguna                                | B                          | URL, teléfono, mensaje y aria-label están acoplados al proyecto                                      |
| `StructuredData`                                         | `src/components/StructuredData.js`                                    | Inyección de datos estructurados SEO                          | ninguna                                | C                          | No es un componente UI reutilizable                                                                  |
| `LocaleProvider`                                         | `src/app/[locale]/LocaleProvider.js`                                  | Provider de internacionalización                              | `children`, `locale`, `messages`       | C                          | Infraestructura de aplicación, no UI                                                                 |
| `HomePage`                                               | `src/app/[locale]/HomePage.js`                                        | Shell de landing con fondo cambiante y secciones              | ninguna                                | B                          | Repite el mismo patrón que el resto de páginas                                                       |
| `LandingPage` / `Products` / `PrivacyPolicy` / `Contact` | `src/app/[locale]/*Page.js`                                           | Shells de página con fondo fijo, fade y secciones observadas  | ninguna                                | B                          | Nueve implementaciones conceptualmente equivalentes; contenido y estado varían                       |
| `AboutPage` (`MainContent`)                              | `src/app/[locale]/about/components/MainContent.js`                    | Panel editorial “sobre nosotros”                              | ninguna                                | C                          | El patrón de panel y tipografía sí es extraíble                                                      |
| `AboutSection`                                           | `src/app/[locale]/home/components/AboutSection.js`                    | Bloque media + texto                                          | ninguna                                | B                          | Layout reusable; contenido, imagen e i18n específicos                                                |
| `ImageCarouselSwiper`                                    | `src/app/[locale]/home/components/ImageCarousel.js`                   | Carrusel con autoplay, fade, caption y controles              | `slides`                               | B                          | Buen candidato tras desacoplar traducción y parametrizar comportamiento/a11y                         |
| `ProductSections`                                        | `src/app/[locale]/products/components/MainContent.js`                 | Navegación responsive de categorías y grid de productos       | ninguna                                | C                          | Datos, claves i18n y estado son de producto; deja candidatos `ResponsiveCategoryNav` y `ProductCard` |
| `FireMaintenanceInstallations`                           | `src/app/[locale]/maintenance-fire-systems/components/MainContent.js` | Página de servicio con cards, listas y CTA                    | `setOpen`                              | C                          | Contenido de dominio; sus `FeatureCard`, `ContentPanel` y CTA son extraíbles                         |
| `InspectionLowVoltageSection`                            | `src/app/[locale]/low-voltage/components/MainContent.js`              | Página editorial con listas iconadas y CTA                    | `setOpen`                              | C                          | Contenido de dominio; repite heading, panel, lista y botón                                           |
| `Quote MainContent`                                      | `src/app/[locale]/quote/components/MainContent.js`                    | Campos, alerts, consentimiento y submit del formulario        | 10 props de estado/handlers            | B                          | Presentacional pero ligado al shape del formulario, router e i18n                                    |
| `ContactForm`                                            | `src/app/[locale]/contact/components/ContactForm.js`                  | Orquestador del formulario de contacto                        | ninguna                                | C                          | Reutiliza el formulario de quote y el hook del proyecto                                              |
| `ContactUs`                                              | `src/app/[locale]/contact/components/ContactUs.js`                    | Bloque contacto con carrusel y datos                          | ninguna                                | C                          | Composición de negocio; layout media/text extraíble                                                  |
| `WhereAreWe`                                             | `src/app/[locale]/contact/components/WhereAreWe.js`                   | Panel de mapa embebido                                        | ninguna                                | B                          | El panel/map frame es genérico; URL, textos y tamaño son específicos                                 |
| `PrivacyPolicy MainContent`                              | `src/app/[locale]/privacy-policy/components/MainContent.js`           | Documento legal dentro de `Paper`                             | ninguna                                | C                          | Contenido específico; `DocumentPanel`/`Prose` extraíbles                                             |
| `Terms MainContent`                                      | `src/app/[locale]/terms/components/MainContent.js`                    | Documento de términos dentro de `Paper`                       | ninguna                                | C                          | Misma conclusión que Privacy Policy                                                                  |

### Cobertura por familia solicitada

- **Buttons:** MUI `Button` directo en Header, InstallPrompt, formulario, low voltage y fire maintenance; `IconButton` en Header, Footer, WhatsApp, modal y carrusel. Solo `NavButton` es wrapper con `styled()`.
- **Inputs / TextFields / Forms:** seis `TextField`, un `Checkbox` y `FormControlLabel` en Quote MainContent. No hay wrappers de campo ni validación visual reusable.
- **Selects:** un `Select` responsive de categorías de producto; no existe wrapper genérico.
- **Cards:** cuatro `Card`, tres `CardContent` y un `CardMedia`, además de ocho superficies `Paper` que actúan conceptualmente como cards/panels.
- **Modals / Dialogs:** un `Modal` + `Slide` en `QuoteModal`; no se usa `Dialog` de MUI.
- **Tables / Pagination / Tabs / Accordions / Tooltips / Chips / Badges / Empty states:** no encontrados.
- **Layouts:** `Section`, los shells `*Page`, numerosos `Container`/`Grid`/`Box` y paneles `Paper`.
- **Headers / Navigation:** `Header`, `NavButton`, `AppBar`, `Drawer`, `Menu`, `Popper`, `ListItemButton` y el selector de categorías.
- **Typography:** 95 usos directos de MUI `Typography`; no hay wrappers semánticos ni escala propia centralizada.
- **Loaders:** `Loader` es la única implementación.
- **Alerts:** tres instancias MUI `Alert` dentro del formulario.
- **Otros visuales reutilizables:** carrusel, banner PWA, botón social, mapa embebido, media/text section, icon list, background de landing y legal/prose panel.

## Generic components

### `Spacer`

- **Archivo:** `src/components/Spacer.js`
- **Responsabilidad actual:** insertar `size` saltos de línea.
- **Dependencias:** React; sin MUI.
- **Props:** `size` (number, default `2`).
- **Lógica específica:** ninguna.
- **Nivel de reutilización:** alto en intención, bajo en implementación. Se usa 17 veces, pero mezcla espaciado visual con semántica HTML.
- **Refactor necesario:** representar el espacio con `Box`, CSS logical properties o Stack; mapear `size` a `theme.spacing`; permitir eje y responsive values; marcarlo decorativo.
- **Nombre propuesto:** `Space` (P1), aunque la primera opción debería ser `Stack`/`gap` y no un nodo adicional.

### Primitives MUI actualmente consumidos de forma directa

No son componentes locales, pero la librería debería exponer o tematizar una capa estable para `Button`, `IconButton`, `TextField`, `Select`, `Checkbox`, `Alert`, `Typography`, `Card`, `Paper`, `Container`, `Stack`, `Divider` y `Link`. Son candidatos **A** como API de la librería; no implica copiar MUI, sino encapsular defaults, tokens y variantes de marca.

## Components requiring refactor

### `AppAppBar` → `AppHeader` + `NavigationMenu` + `LocaleMenu`

- **Dependencias:** 11 primitives MUI, 10 iconos MUI, Emotion `styled`, `next/navigation`, `next-intl`, React state/ref.
- **Props actuales:** `currentLocale`.
- **Dependencias MUI:** `AppBar`, `Toolbar`, `Button`, `IconButton`, `MenuItem`, `Drawer`, `Menu`, `Divider`, `Popper`, `Paper`, `Box`.
- **Lógica específica:** rutas localizadas, claves de traducción, lista de locales, icon map, detección de ruta activa y navegación Next.
- **Reutilización:** media-alta para el patrón visual; baja como componente monolítico.
- **Cambios:** API data-driven (`items`, `activeHref`, `onNavigate`), slots `brand`, `actions`, `mobileMenu`; extraer `LocaleMenu`; sustituir colores y media queries hardcoded por tokens; gestionar accesibilidad de submenu/focus; no depender de Next ni `next-intl` en el core.
- **Nombre propuesto:** `AppHeader` (P1), compuesto con `NavigationMenu` (P1) y `LocaleMenu` (P2).

### `QuoteModal` → `Dialog` / `DialogShell`

- **Dependencias:** MUI `Modal`, `Box`, `Typography`, `IconButton`, `Slide`; `CloseIcon`; `next-intl`; `useQuoteLogic`; Quote MainContent.
- **Props actuales:** `open`, `setOpen`, `title`.
- **Lógica específica:** crea y controla el formulario de presupuesto, traduce `title` y conoce el hook de envío.
- **Reutilización:** alta para el contenedor, baja para la composición actual.
- **Cambios:** `onClose` en vez de setter; `children`; `title` como ReactNode; slots `DialogHeader`, `DialogContent`, `DialogActions`; `maxWidth`, `fullScreenBelow`, `transition`; usar MUI `Dialog` para aria/focus trap/escape; IDs accesibles.
- **Nombre propuesto:** `Dialog` (P0) o `DialogShell` si se reexporta MUI.

### `Section` → `RevealSection`

- **Dependencias:** MUI `Box`, `react-intersection-observer`, effects del browser.
- **Props actuales:** `id`, `isLeft`, `children`, `onInView`.
- **Lógica específica:** hace `window.scrollTo` al montar, aplica medidas fijas y comunica visibilidad al shell.
- **Reutilización:** alta tras separar layout, reveal y navegación de página.
- **Cambios:** eliminar scroll lateral; `direction="left|right|none"`; `threshold`, `duration`, `distance`, `once`, `onVisibilityChange`; respetar `prefers-reduced-motion`; exponer `Section` base y `Reveal` por composición.
- **Nombre propuesto:** `Section` (P0) + `Reveal` (P2), en lugar de un único componente acoplado.

### `Loader` → `LoadingState`

- **Dependencias:** Next `Image`, `next-intl`; no MUI.
- **Props actuales:** ninguna.
- **Lógica específica:** imagen de extintor, clave `loading`, tamaños y fuente Roboto inline.
- **Reutilización:** alta tras parametrizar.
- **Cambios:** `label`, `visual`, `size`, `minHeight`; variante `spinner|image|skeleton`; usar tokens de tipografía/spacing; `role="status"`, `aria-live`; evitar `<br>`.
- **Nombre propuesto:** `LoadingState` (P1).

### `InstallPrompt` → `ActionBanner`

- **Dependencias:** MUI `Button`, `Slide`, `Paper`, `Stack`; browser PWA API; `next-intl`.
- **Props actuales:** ninguna.
- **Lógica específica:** user-agent detection, evento `beforeinstallprompt`, traducciones y logs.
- **Reutilización:** media. La presentación sí es genérica; la lógica PWA debería permanecer en un hook/adaptador del proyecto.
- **Cambios:** separar `useInstallPrompt`; banner controlado con `open`, `primaryAction`, `secondaryAction`, `placement`, `children`.
- **Nombre propuesto:** `ActionBanner` (P2). El hook PWA no debe pertenecer al UI core.

### `WhatsAppButton` → `SocialIconButton`

- **Dependencias:** MUI `IconButton`, icono WhatsApp, `company` config.
- **Props actuales:** ninguna.
- **Lógica específica:** teléfono, mensaje en español, URL y aria-label.
- **Reutilización:** media-alta como botón de enlace externo.
- **Cambios:** aceptar `href`, `icon`, `label`, `size`, `color`; construir la URL en una utilidad/adaptador del proyecto. Opcionalmente ofrecer una integración secundaria `WhatsAppLink` fuera del core.
- **Nombre propuesto:** `SocialIconButton` o `ExternalIconButton` (P2).

### `ImageCarouselSwiper` → `Carousel`

- **Dependencias:** MUI `Box`, `IconButton`, `Typography`; iconos MUI; Swiper y CSS de Swiper; `next-intl`.
- **Props actuales:** `slides` con `{ img, text, isPortrait?, exception? }`; las dos últimas propiedades no se usan.
- **Lógica específica:** traduce `slide.text`, altura `80vh`, autoplay/fade/loop fijos y selectores globales `.custom-prev/.custom-next`.
- **Reutilización:** alta tras refactor.
- **Cambios:** `slides` con `src`, `alt`, `caption`; captions ya resueltos; `height`, `fit`, `autoplay`, `interval`, `effect`, `loop`; controles mediante refs/slots para evitar colisiones entre instancias; pausa y etiquetas accesibles; soporte de imagen inyectable.
- **Nombre propuesto:** `Carousel` (P1), compuesto con `CarouselSlide`, `CarouselControls` y `CarouselCaption`.

### Quote `MainContent` → `Form`, `FormField`, `FormAlert`, `SubmitButton`

- **Dependencias:** nueve primitives MUI, `Spacer`, `next-intl`, `next/navigation`.
- **Props actuales:** `contactForm`, `acceptedTerms`, tres flags de alert, `isSubmitting`, `closeAlert`, `handleCheckboxChange`, `handleChange`.
- **Lógica específica:** shape exacto del formulario, claves i18n, ruta de privacidad y semántica de alertas.
- **Reutilización:** alta para los primitives; media para el formulario completo.
- **Cambios:** mantener el schema/orquestación en el proyecto; extraer `FormLayout`, `FormField`, `ConsentField`, `FormAlert` y botón con estado loading; aceptar `error`/`helperText`; no navegar desde el componente de campo.
- **Nombre propuesto:** `Form`, `FormGrid`, `TextField`, `ConsentField`, `FormAlert`, `Button` con `loading` (P0/P1). El formulario `QuoteForm` permanece en el proyecto.

### Shells `*Page` → `BackdropPage` / `SectionedPage`

- **Archivos:** `HomePage.js` y ocho `*Page.js` bajo rutas localizadas.
- **Dependencias:** MUI `Box`/`Fade`, React state, `Section` y contenido de cada página.
- **Props actuales:** ninguna; toda configuración está embebida.
- **Lógica específica:** arrays de imágenes, IDs de secciones, contenido y modales.
- **Reutilización:** muy alta como patrón, pero es tanto layout de producto como primitive visual.
- **Cambios:** componente data-driven con `backgrounds`, `activeKey`, `overlay`, `children`; separar `FixedBackdrop`, `BackdropLayer` y tracking de secciones. No incluir rutas o contenido de dominio.
- **Nombre propuesto:** `BackdropPage` (P1) + `SectionSpy` (P2). Si solo AJ usa este lenguaje visual, mantener la composición en el proyecto usando primitives de la librería.

### Patrones sin componente explícito

| Patrón actual                                                                   | Localizaciones                                       | Extracción propuesta          | Prioridad |
| ------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------- | --------- |
| `Paper` centrado `maxWidth: 1200`, `margin: 0 auto`, padding responsive, radius | About, Terms, Privacy, Low Voltage, Fire Maintenance | `ContentPanel`                | P1        |
| Heading con wrapping y `fontSize` `{ xs: 1.8rem, md: 2.4rem }`                  | Low Voltage (3), Fire Maintenance                    | `Heading` variant/size `page` | P0        |
| Fondo `#fafafa`, `py: 3`, `borderRadius: 2`                                     | ContactUs, ContactForm, WhereAreWe, QuotePage        | `Surface` variant `subtle`    | P0        |
| Icono + título + divider + body/list dentro de card                             | Fire Maintenance                                     | `FeatureCard` compuesto       | P2        |
| Lista con `CheckCircleIcon`                                                     | Low Voltage                                          | `IconList` / `IconListItem`   | P2        |
| Imagen + texto responsive                                                       | AboutSection, ContactUs                              | `MediaSection`                | P2        |
| Documento de secciones `h6` + body + espaciado                                  | Terms, Privacy                                       | `Prose` / `DocumentSection`   | P2        |
| Mapa/iframe dentro de Paper recortado                                           | WhereAreWe                                           | `EmbedFrame`                  | P3        |
| Navegación list en desktop / select en mobile                                   | Products                                             | `ResponsiveSelectionNav`      | P2        |
| Card con media, título y descripción                                            | Products                                             | `MediaCard`                   | P1        |

## Project-specific components

Los siguientes componentes deben permanecer en el proyecto, aunque deberían recomponerse usando piezas de la librería:

- `StructuredData`: SEO y datos de empresa, no UI.
- `LocaleProvider`: integración de `next-intl`.
- `FooterInfo`: la composición final y su contenido AJ; solo primitives y subpatrones visuales se centralizan.
- `ContactForm` y `QuoteForm`: schema, envío EmailJS, traducciones y routing de privacidad.
- `ContactUs`: contenido, datos de empresa y selección de slides.
- `ProductSections`: catálogo y traducciones; puede consumir `ResponsiveSelectionNav` y `MediaCard`.
- `FireMaintenanceInstallations` e `InspectionLowVoltageSection`: contenido y CTA de servicios.
- `AboutPage`, `PrivacyPolicy MainContent` y `Terms MainContent`: contenido editorial/legal.
- Configuración concreta de `Header`, navegación, locales, iconos y rutas.
- `useQuoteLogic`: lógica de dominio/integración; no debe migrarse a una librería UI.

## Duplicate patterns

### Duplicados de alta relevancia

1. **Shell de landing duplicado:** `Box` raíz + fondo fijo + `Object.entries(backgroundImages)` + `Fade` + overlay se repite casi literalmente en Home, About, Contact, Products, Quote, Low Voltage, Fire Maintenance, Privacy Policy y Terms. Es el mayor duplicado del proyecto.
2. **Low Voltage y Fire Maintenance Page:** son prácticamente el mismo shell y modal; solo cambian MainContent y la clave del título. Deben ser instancias configuradas, no copias.
3. **Panel centrado:** `Paper elevation={3}`, `maxWidth: 1200`, auto margins, radius y padding responsive se repite en cuatro bloques.
4. **Superficie clara:** `#fafafa` + `py: 3` + radius `2` aparece en ContactUs, ContactForm, WhereAreWe y QuotePage.
5. **Page headings responsive:** wrapping y escala `1.8rem → 2.4rem` se repite al menos cinco veces.
6. **Cards de servicio:** dos cards de Fire Maintenance tienen la misma estructura y deberían renderizarse desde datos con `FeatureCard`.
7. **Secciones de Low Voltage:** tres bloques repiten heading, divider/list/body y deberían usar `DocumentSection`/`IconList`.
8. **Controles del carrusel:** botones anterior/siguiente duplican todas las reglas salvo `left/right` y el icono.
9. **Alerts del formulario:** tres bloques idénticos salvo flag, severity, clave y argumento de cierre; deben modelarse como datos o un `FormAlert`.
10. **Campos del formulario:** seis `TextField` con defaults repetidos (`fullWidth`, `required`, `size="small"`, value/change).
11. **CTA contained:** los botones de solicitar inspección y enviar comparten intención primaria, pero difieren accidentalmente en size/spacing.
12. **Legal prose:** Terms y Privacy repiten `Typography h6`, body y separación; `Spacer` oculta parte de esta duplicación.

### Componentes resolubles mediante variantes

- Un único `Button` con variantes semánticas `primary`, `secondary`, `danger`, `ghost` y `navigation`; `NavButton`, submit, install/dismiss y CTAs no justifican componentes totalmente independientes. `loading`, `fullWidth` y `external` deben ser estados/capacidades, no nuevas clases de botón.
- `Surface`/`ContentPanel` con variantes `plain`, `subtle`, `elevated`, `dark` cubre Paper de documentos, bloques `#fafafa`, cards de servicios y footer surfaces.
- `Heading` con variantes `display`, `page`, `section`, `card` cubre las escalas actualmente hardcoded.
- `IconButton` con variantes `plain`, `overlay`, `social` cubre Header, modal, carrusel y WhatsApp.
- `Alert` con `severity` ya representa correctamente error/success/warning; solo falta un wrapper de espaciado/dismiss controlado.
- `MediaCard` con variantes `product`, `feature`, `horizontal` evita cards específicas.
- `LoadingState` con variantes `spinner`, `image`, `skeleton` cubre futuros estados sin duplicar componentes.

### Componentes que deben construirse mediante composición

```text
Dialog
├── DialogHeader (title + CloseButton)
├── DialogContent
└── DialogActions

Card / Surface
├── CardMedia (optional)
├── CardHeader (icon/title/subtitle)
├── CardContent
└── CardActions

AppHeader
├── Brand
├── NavigationMenu
├── LocaleMenu
└── MobileNavigationDrawer

Carousel
├── CarouselViewport
├── CarouselSlide
├── CarouselCaption
└── CarouselControls

Form
├── FormGrid
├── FormField / ConsentField
├── FormAlert
└── FormActions

SectionedPage
├── FixedBackdrop
├── BackdropLayer
└── RevealSection
```

## Material UI usage

### Consumo directo

MUI se importa directamente en 22 componentes visuales. Las piezas más frecuentes por render estático son `Typography` (95), `Box` (91), `Grid` (21), `Paper` (8), `Divider` (8), `Container` (8), `Button` (7), `TextField` (6), `Card` (4), `Alert` (3), más navegación, modal, inputs y transiciones. Esto significa que la aplicación depende de los defaults de MUI y de `sx` local, no de una API visual propia.

Los únicos wrappers/estilos explícitos alrededor de MUI son:

- `StyledAppBar = styled(AppBar)` en Header.
- `NavButton = styled(Button)` en Header.
- `StyledPaper = styled(Paper)` en About.
- `QuoteModal`, `Section` y los restantes componentes compartidos son composiciones, pero no wrappers de primitive con una API estable.

### `sx`, `styled()` y estilos repetidos

- Se usan `sx` extensivamente en 22 archivos; hay solo tres `styled()` definitions.
- Coexisten `sx`, system props (`mt`, `mb`, `display`, etc.), `style` inline y CSS global/module. Conviene elegir `sx`/styled tokens como estrategia de la librería y reservar inline styles para APIs externas.
- Repeticiones dominantes: `borderRadius: 2/4`, fondos `#fafafa/#f9f9f9/#f5f5f5`, `maxWidth: 1200`, `text.secondary`, elevaciones 3/4, headings responsive, layouts column→row, center→left y `xs/md`.
- `StyledPaper` no evita duplicación: el wrapper exterior vuelve a establecer Paper/radius/padding y en mobile se omite el styled surface, produciendo comportamiento divergente.

### Iconos

Se usan 17 iconos de `@mui/icons-material`: navegación (`Home`, `Whatshot`, `FlashOn`, `Inventory2`, `Info`, `ContactMail`, `RequestQuote`, `Menu`, `CloseRounded`, `Language`), acciones (`Close`, flechas), contacto/social (`LocationOn`, `SupportAgent`, `AccessTime`, `Instagram`, `WhatsApp`) y contenido (`FireExtinguisher`, `Build`, `Security`, `CheckCircle`). Además hay emoji de teléfono/email.

Recomendación: centralizar tamaños, color semántico y el primitive `Icon`; mantener la elección concreta de icono cerca del dominio. No reexportar todo `@mui/icons-material`. Eliminar la mezcla de emoji e iconografía MUI o formalizarla como slot de icono.

### Patrones responsive

- Breakpoints usados: principalmente `xs`, `sm`, `md`, `lg`; no hay `xl` ni breakpoints custom.
- El Header usa desktop solo desde `lg`; móvil/tablet hasta `md`, con objetos redundantes como `{ xs: "none", md: "none", lg: "flex" }` y `{ xs: "white", sm: "white", md: "white" }`.
- El contenido cambia normalmente de column a row en `md`, centra texto en `xs` y alinea a izquierda en `md`.
- Headings cambian tamaño en `xs/md`; padding y grid también.
- `useMediaQuery` aparece en About (`down("sm")`) y Products (`down("md")`), mientras el resto usa CSS responsive. Debe preferirse CSS responsive cuando no cambia la estructura/comportamiento.
- El carrusel fija `80vh` sin variante responsive; el modal usa widths 400/550/700 con padding exterior, lo que puede desbordar en viewports menores de 432 px aunque exista `maxWidth` implícito en el overlay.

## Theme analysis

### Estado actual

No existe `createTheme` ni `ThemeProvider`; se usa el theme por defecto de MUI. `CssBaseline` se renderiza dentro de `Footer`, demasiado tarde y con alcance conceptual incorrecto. `createEmotionCache.js` existe pero no se utiliza. Por tanto:

| Área                | Estado actual                                                   | Riesgo / recomendación                                                               |
| ------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `palette`           | Defaults MUI + hex dispersos                                    | Centralizar brand, surfaces, overlay, footer, danger/accent y text-on-dark           |
| `typography`        | Defaults MUI + Arial global + Roboto inline + tamaños locales   | Definir font family única, escala, weights y variantes semánticas responsive         |
| `spacing`           | Default MUI (factor 8 inferido) + pixels/rem/`<br>`             | Adoptar escala documentada y prohibir `Spacer` basado en `<br>`                      |
| `breakpoints`       | Defaults MUI usados sin declaración                             | Mantener defaults inicialmente, nombrar política y centralizar helpers responsive    |
| `shape`             | Default radius inferido; multiplicadores `2`/`4` y pixels 12/16 | Definir radios semánticos `sm/md/lg/pill` y mapear MUI `shape.borderRadius`          |
| component overrides | Ninguno                                                         | Añadir overrides de Button, IconButton, Paper/Card, TextField, Link, Dialog, Alert   |
| `defaultProps`      | Ninguno                                                         | Definir coherentemente button casing, field size, elevation, disableRipple si aplica |
| `variants`          | Solo variants estándar MUI y styles locales                     | Crear variantes semánticas de Button, Surface, Heading, IconButton, Card             |

### Tokens visuales detectados

- **Colores:** `#1c1c1c`, `#191919`, `#2E2E2E` (dark/header/footer); `#FF5252` (active/brand danger); `#fafafa`, `#f9f9f9`, `#f5f5f5`, `#fff`; `#e0e0e0`; negro y overlays `rgba(0,0,0,0.4/0.5/0.8)`; CSS global `#171717`, `#0a0a0a`, `#ededed`, `#383838`, `#f2f2f2`, `#ccc`, `#1a1a1a`.
- **Spacing:** unidades MUI 0.5, 1, 1.2, 1.5, 2, 3, 4, 5, 6, 8; pixels 4, 8, 16, 20, 30; max widths 200/240/300/400/550/700/1200.
- **Border radius:** MUI units `2` y `4`; pixels 12 y 16; CSS starter `4px` y `128px`.
- **Elevation/shadow:** MUI elevations 1/2/3/4/6/24 y sombras manuales `0 4px 20px` / `0 10px 25px`.
- **Typography:** h1–h6/body1/body2/subtitle1; weights `medium`, 500, 600, bold; tamaños 10px, 0.95rem, 1rem, 1.3rem, 1.6rem, 1.8rem, 2rem, 2.4rem, 2.8rem y 24px; letter spacing 0.4/0.5px, 0.05em.
- **Motion:** 0.2s/0.3s/1s/1.2s/1.5s; slide enter/exit 700ms; hover translate -5px; reveal translate 120px.

### Qué centralizar en `my-ui-library`

1. **P0:** `createMyUiTheme(options)` con tokens base de palette, typography, spacing, breakpoints, shape, shadows, z-index y motion.
2. **P0:** `MyUiProvider` que combine `ThemeProvider`, `CssBaseline` y la configuración de Emotion/SSR necesaria para Next.
3. **P0:** overrides/defaultProps para `MuiButton`, `MuiIconButton`, `MuiTypography`, `MuiPaper`, `MuiCard`, `MuiTextField`, `MuiLink`, `MuiDialog`, `MuiAlert`.
4. **P1:** variantes tipadas/semánticas y tokens exportables (`surface`, `contentMaxWidth`, `overlay`, `motion`).
5. **P1:** helpers responsive y primitives de layout; evitar que consumers repliquen objetos `sx`.

La librería no debe centralizar rutas, claves de traducción, datos de AJ, teléfonos, imágenes concretas, contenido legal, EmailJS ni configuración del catálogo.

## Proposed library components

| Componente propuesto                              | Fuente actual               | Enfoque                         | Prioridad        |
| ------------------------------------------------- | --------------------------- | ------------------------------- | ---------------- |
| `MyUiProvider` / `createMyUiTheme`                | Ausente                     | Theme, baseline y setup         | P0               |
| `Button` / `IconButton`                           | Usos directos + `NavButton` | Defaults y variantes semánticas | P0               |
| `Typography` / `Heading`                          | 95 usos directos            | Escala y semántica consistentes | P0               |
| `Surface` / `ContentPanel`                        | Papers y Box claros         | Superficie con variantes        | P0/P1            |
| `TextField`, `Select`, `Checkbox`, `ConsentField` | Quote + Products            | Form controls consistentes      | P0/P1            |
| `Dialog` compuesto                                | `QuoteModal`                | Modal accesible y desacoplado   | P0               |
| `Section` + `Reveal`                              | `Section`                   | Layout y animación separados    | P0/P2            |
| `Form`, `FormGrid`, `FormAlert`                   | Quote MainContent           | Composición de formulario       | P1               |
| `LoadingState`                                    | `Loader`                    | Estados loading genéricos       | P1               |
| `Carousel` compuesto                              | `ImageCarouselSwiper`       | Carrusel configurable           | P1               |
| `MediaCard` / `FeatureCard`                       | Products + Fire             | Card por composición/variants   | P1/P2            |
| `AppHeader` / `NavigationMenu`                    | Header                      | Navegación data-driven          | P1               |
| `BackdropPage`                                    | nueve shells                | Fondo transicional reusable     | P1               |
| `MediaSection`                                    | AboutSection + ContactUs    | Layout media/text               | P2               |
| `ActionBanner`                                    | InstallPrompt               | Banner de acciones controlado   | P2               |
| `ExternalIconButton`                              | WhatsAppButton              | Enlace iconado accesible        | P2               |
| `IconList`                                        | Low Voltage                 | Lista visual configurable       | P2               |
| `ResponsiveSelectionNav`                          | Products                    | Select/list adaptativo          | P2               |
| `Prose` / `DocumentSection`                       | Terms + Privacy             | Contenido editorial             | P2               |
| `EmbedFrame`                                      | WhereAreWe                  | Iframe responsive               | P3               |
| `Space`                                           | Spacer                      | Escape hatch de espaciado       | P3; preferir gap |

## Proposed component API

La API debe permanecer independiente de Next.js, `next-intl`, EmailJS y contenido AJ. Ejemplos orientativos:

```tsx
<MyUiProvider themeOptions={{ brandColor: "#..." }}>
  <App />
</MyUiProvider>

<Button variant="primary" size="large" loading={isSubmitting}>
  Enviar
</Button>

<Surface variant="elevated" radius="lg" maxWidth="content" padding={{ xs: 3, md: 5 }}>
  {children}
</Surface>

<Heading level={1} size="page">
  Título semántico
</Heading>

<Dialog open={open} onClose={onClose} maxWidth="md" fullScreenBelow="sm">
  <DialogHeader>Solicitar presupuesto</DialogHeader>
  <DialogContent>{form}</DialogContent>
  <DialogActions>{actions}</DialogActions>
</Dialog>

<TextField
  name="email"
  label="Email"
  type="email"
  value={email}
  onChange={onChange}
  error={Boolean(errors.email)}
  helperText={errors.email}
/>

<Carousel autoplay interval={4000} effect="fade" height={{ xs: 320, md: "80vh" }}>
  <CarouselSlide src={src} alt={alt} caption={caption} />
</Carousel>

<AppHeader
  brand={<Logo />}
  items={items}
  activeHref={pathname}
  onNavigate={navigate}
  actions={<LocaleMenu locales={locales} value={locale} onChange={setLocale} />}
/>

<Reveal direction="left" once respectReducedMotion>
  <Section maxWidth="content">{children}</Section>
</Reveal>
```

Decisiones de API recomendadas:

- Callbacks estándar (`onClose`, `onChange`) en vez de setters (`setOpen`).
- Texto ya traducido como `ReactNode`; la librería no recibe translation keys.
- Slots/children para contenido; arrays de configuración solo en widgets naturalmente data-driven.
- Props semánticas (`tone="danger"`, `surface="subtle"`) en vez de colores hex o `sx` repetido.
- `sx` debe seguir disponible como escape hatch, pero los casos comunes deben estar cubiertos por variants/tokens.
- Componentes `forwardRef`, tipos TypeScript, aria defaults, tree-shakeable exports y peer dependencies de React/MUI.

## Migration priorities

### P0 — foundational

1. Crear theme/provider y tokens; validar SSR/Emotion con Next.js.
2. Estabilizar primitives: `Button`, `IconButton`, `Typography/Heading`, `Surface`, form controls y `Dialog`.
3. Definir política de accesibilidad, responsive, motion y API de `sx`.
4. Sustituir valores visuales hardcoded por tokens antes de extraer componentes complejos.

### P1 — highly reusable

1. Extraer `ContentPanel`, `FormGrid/FormAlert`, `LoadingState`, `Carousel`, `MediaCard` y navegación base.
2. Consolidar el shell repetido en `BackdropPage` + `Section`/`Reveal`.
3. Migrar primero Terms/Privacy y Low Voltage/Fire como consumidores piloto porque concentran duplicaciones claras.

### P2 — reusable

1. Extraer `MediaSection`, `FeatureCard`, `IconList`, `ActionBanner`, `ExternalIconButton`, `ResponsiveSelectionNav` y `Prose`.
2. Recomponer Header y formularios manteniendo routing, i18n y hooks en el proyecto.

### P3 — optional

1. `EmbedFrame` y `Space` solo si aparecen en más consumidores.
2. Retirar `page.module.css` y `createEmotionCache.js` únicamente después de confirmar que siguen sin uso; esta auditoría no los elimina.

### Riesgos y secuencia de validación

- Añadir primero tests visuales/a11y y casos responsive; hoy no existen salvaguardas.
- Evitar una migración “wrapper por cada MUI component” sin defaults diferenciados: aumentaría la API sin reducir duplicación.
- Mantener peer versions compatibles con MUI 5/Emotion actuales o planificar explícitamente una actualización aparte.
- Comprobar dark mode: CSS global activa colores oscuros por sistema, pero MUI sigue en mode light; actualmente pueden entrar en conflicto.
- Auditar foco, teclado y reduced motion en Header, Dialog y Carousel antes de publicarlos.

### Tabla resumen

| Current component                    | Proposed library component                  | Category | Priority | Complexity |
| ------------------------------------ | ------------------------------------------- | -------- | -------- | ---------- |
| Theme inexistente / MUI defaults     | `MyUiProvider`, `createMyUiTheme`           | A        | P0       | High       |
| MUI Button usages                    | `Button` variants                           | A        | P0       | Medium     |
| MUI Typography usages                | `Typography`, `Heading`                     | A        | P0       | Medium     |
| Repeated Paper/Box surfaces          | `Surface`, `ContentPanel`                   | A        | P0       | Medium     |
| MUI TextField/Select/Checkbox        | Form primitives                             | A        | P0       | Medium     |
| `QuoteModal`                         | `Dialog` composition                        | B        | P0       | Medium     |
| `Section`                            | `Section` + `Reveal`                        | B        | P0/P2    | Medium     |
| `Spacer`                             | `Space` / layout gap                        | A        | P3       | Low        |
| `Loader`                             | `LoadingState`                              | B        | P1       | Low        |
| `ImageCarouselSwiper`                | `Carousel` composition                      | B        | P1       | High       |
| Quote `MainContent` primitives       | `Form`, `FormGrid`, `FormAlert`, controls   | B        | P1       | High       |
| `AppAppBar`                          | `AppHeader`, `NavigationMenu`, `LocaleMenu` | B        | P1       | High       |
| Repeated `*Page` shell               | `BackdropPage`, `SectionSpy`                | B        | P1       | High       |
| Product card pattern                 | `MediaCard`                                 | B        | P1       | Medium     |
| `AboutSection`                       | `MediaSection`                              | B        | P2       | Low        |
| `InstallPrompt` presentation         | `ActionBanner`                              | B        | P2       | Medium     |
| `WhatsAppButton`                     | `ExternalIconButton`                        | B        | P2       | Low        |
| Fire service cards                   | `FeatureCard`                               | B        | P2       | Medium     |
| Low voltage lists                    | `IconList`                                  | B        | P2       | Low        |
| Products category navigation         | `ResponsiveSelectionNav`                    | B        | P2       | Medium     |
| Terms/Privacy layout                 | `Prose`, `DocumentSection`                  | B        | P2       | Low        |
| `WhereAreWe` frame                   | `EmbedFrame`                                | B        | P3       | Low        |
| `FooterInfo` composition             | Consume library primitives; keep locally    | C        | P2       | Medium     |
| `ContactForm` / `QuoteForm`          | Keep locally; consume form primitives       | C        | P1       | Medium     |
| `ContactUs`                          | Keep locally; consume `MediaSection`        | C        | P2       | Low        |
| `ProductSections` domain composition | Keep locally                                | C        | P2       | Medium     |
| `FireMaintenanceInstallations`       | Keep locally                                | C        | P2       | Medium     |
| `InspectionLowVoltageSection`        | Keep locally                                | C        | P2       | Medium     |
| Legal/About content components       | Keep locally                                | C        | P2       | Low        |
| `StructuredData` / `LocaleProvider`  | No library UI component                     | C        | P3       | Low        |
