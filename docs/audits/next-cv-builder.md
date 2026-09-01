# UI Component Audit

## Scope and methodology

This is a static audit of the full source tree as of 2026-09-01. No application code was changed. The review covers the 24 TSX files in `app/`, `components/` and `lib/`, the global stylesheet, the MUI theme, the domain types and the visual theme presets.

Classification used throughout:

- **A — GENERIC:** reusable without knowing the CV domain and a clear candidate for `my-ui-library`.
- **B — GENERIC-WITH-REFACTOR:** contains a reusable visual/interaction pattern, but its current public API, copy, state or data model is project-specific.
- **C — PROJECT-SPECIFIC:** orchestration or rendering whose value depends on the CV model, browser persistence, export/print flow or product copy.

`P0` is foundational, `P1` highly reusable, `P2` reusable and `P3` optional. Complexity is estimated as Low, Medium or High for extraction, not for the current implementation.

## Current component inventory

### Application and global presentation

| Component             | File                                 | Responsibility                                                           | Main props/state                                             | UI dependencies                                                                                    | Category                               |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `AppLanguageSwitcher` | `components/AppLanguageSwitcher.tsx` | Labelled ES/EN segmented language control                                | No props; reads/writes `useI18n`                             | `Stack`, `ToggleButtonGroup`, `ToggleButton`, `Typography`                                         | B                                      |
| `LegalFooter`         | `components/LegalFooter.tsx`         | Legal navigation and local-data deletion confirmation                    | Internal `open`; i18n and storage deletion                   | `Box`, `Container`, `Stack`, `Link`, `Button`, complete `Dialog` family, `Typography`; Next `Link` | C, with generic dialog pattern         |
| `PrivacyPageContent`  | `components/PrivacyPageContent.tsx`  | Localized privacy document layout                                        | `contactEmail?`; privacy copy and language                   | `Box`, `Container`, `Paper`, `Stack`, `Typography`, `Divider`, `Alert`, `Link`                     | C, with generic article layout pattern |
| `PolicySection`       | Same file, private                   | Heading plus paragraphs for policy sections                              | `title`, `paragraphs`                                        | `Box`, `Typography`                                                                                | B                                      |
| `CvPreview`           | `components/CvPreview.tsx`           | Responsive, printable A4 CV renderer                                     | `data: CvData`, `theme: ThemePreset`; `ResizeObserver` scale | CSS/HTML; no MUI                                                                                   | C                                      |
| `SectionRenderer`     | Same file, private                   | Selects and renders the four CV section content shapes                   | `section: CvSection`                                         | CSS/HTML                                                                                           | C                                      |
| `CvEditor`            | `components/CvEditor.tsx`            | Coordinates immutable mutations for CV personal data, pages and sections | `data`, `themes`, `onChange`, `onReset`                      | `Stack`, `Divider`; editor children; i18n                                                          | C                                      |

### Editor

| Component            | File                                       | Responsibility                                           | Main props/state                                    | UI dependencies                                                                                         | Category               |
| -------------------- | ------------------------------------------ | -------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------- |
| `BodyItemsEditor`    | `components/editor/BodyItemsEditor.tsx`    | Repeatable multiline string editor                       | `items`, `onChange`                                 | `Paper`, `Stack`, `TextField`, `Tooltip`, `IconButton`, `Button`; Add/Delete icons; i18n                | B                      |
| `CardsEditor`        | `components/editor/CardsEditor.tsx`        | Repeatable title/text object editor                      | `cards: CvCard[]`, `onChange`                       | Same repeated editor primitives and icons                                                               | B                      |
| `ChipGroupsEditor`   | `components/editor/ChipGroupsEditor.tsx`   | Repeatable labelled tag groups with draft entry          | `groups`, `onChange`; draft state keyed by index    | `Box`, `Paper`, `Stack`, `TextField`, `Chip`, `Tooltip`, `IconButton`, `Button`; Add/Delete icons       | B                      |
| `ItemsEditor`        | `components/editor/ItemsEditor.tsx`        | Repeatable experience-like structured item editor        | `items: CvItem[]`, `onChange`; newline parser       | `Paper`, `Stack`, `Grid`, `TextField`, `Tooltip`, `IconButton`, `Button`; Add/Delete icons              | B                      |
| `PersonalDataEditor` | `components/editor/PersonalDataEditor.tsx` | Accordion form for the CV personal record                | `personal`, field-level `onChange`; tag draft state | `Accordion` family, `Grid`, `TextField`, `Typography`; Expand icon                                      | C                      |
| `CvEditorToolbar`    | `components/editor/CvEditorToolbar.tsx`    | Theme selection plus page/section/reset actions          | theme/page values and five callbacks                | `Alert`, `FormControl`, `InputLabel`, `Select`, `MenuItem`, `Stack`, `Button`; Add/Delete/Restore icons | C                      |
| `CvSectionAccordion` | `components/editor/CvSectionAccordion.tsx` | Section enablement, metadata and content-editor dispatch | `section`, `pageCount`, updater, remove callback    | `Accordion` family, `Chip`, `Switch`, `Grid`, form/select/text controls, icon button                    | C, with reusable shell |
| `CvSectionsEditor`   | `components/editor/CvSectionsEditor.tsx`   | Labelled list of CV section accordions                   | `sections`, `pageCount`, patch/remove callbacks     | `Box`, `Stack`, `Typography`                                                                            | C                      |

### Wizard and layouts

| Component           | File                                      | Responsibility                                                       | Main props/state                                         | UI dependencies                                                            | Category                        |
| ------------------- | ----------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------- |
| `CvWizard`          | `components/wizard/CvWizard.tsx`          | Entire setup/editor/export state machine and persistence             | Internal wizard/CV/import/hydration state                | `Box`, `Container`, `Stack`, `CircularProgress`; all wizard steps          | C                               |
| `WizardHeader`      | `components/wizard/WizardHeader.tsx`      | Branded top bar, language switch and step progress                   | `activeStep`                                             | `Paper`, `Box`, `Stack`, `Typography`; brand icon                          | C                               |
| `WizardStepper`     | `components/wizard/WizardStepper.tsx`     | Desktop stepper and compact mobile status                            | `activeStep`; translated labels                          | `Box`, `Stepper`, `Step`, `StepLabel`, `Typography`                        | B                               |
| `SetupStep`         | `components/wizard/SetupStep.tsx`         | Setup form, language, import and continuation                        | 11 domain props/callbacks; file ref and async handler    | `Paper`, `Alert`, `Link`, `ToggleButtonGroup`, `Button`, layout/typography | C                               |
| `SetupStartOptions` | `components/wizard/SetupStartOptions.tsx` | Selectable start-option cards, hidden file input and sample download | options, selected mode, language, ref and file callbacks | `Card` composition, `Grid`, `Radio`, `Button`, icons                       | B                               |
| `OptionIcon`        | Same file, private                        | Maps initialization mode to icon                                     | `mode`                                                   | Four MUI icons                                                             | C                               |
| `EditorStep`        | `components/wizard/EditorStep.tsx`        | Responsive editor/preview split and sticky navigation                | CV/editor callbacks; mobile view state                   | `Grid`, `Paper`, `ToggleButtonGroup`, `Button`, layout/typography          | C, with reusable layout recipes |
| `ExportStep`        | `components/wizard/ExportStep.tsx`        | Validation warnings, preview, JSON export and print actions          | CV, theme and callbacks                                  | `Alert`, `Box`, `Stack`, `Typography`, `Button`; Download/Print icons      | C                               |

### Coverage by requested UI family

- **Buttons:** MUI `Button` is used directly in 9 components; `IconButton` in 5. No local button wrapper exists.
- **Inputs/TextFields:** MUI `TextField` is used directly in all five editor forms. No separate input abstraction exists.
- **Selects:** two explicit `FormControl` + `InputLabel` + `Select` recipes (`CvEditorToolbar`, `CvSectionAccordion`).
- **Cards/Panels:** MUI `Card` appears only in `SetupStartOptions`; `Paper` is the more common panel primitive and has several duplicated visual recipes.
- **Modals/Dialogs:** one destructive confirmation dialog in `LegalFooter`; no reusable modal wrapper.
- **Tables/Pagination/Tabs/Empty states/Badges:** none implemented.
- **Layouts/Headers/Navigation:** `WizardHeader`, `EditorStep`, wizard `Container`/`Stack` shells, sticky mobile switcher and sticky bottom actions.
- **Typography:** MUI `Typography` plus raw CV HTML typography. Repeated `fontWeight` values are applied inline.
- **Loaders:** one bare `CircularProgress` centered in a viewport-height box.
- **Forms:** editor components are controlled field groups, but there is no `form` abstraction, validation layer or generic field schema.
- **Chips:** editable MUI chips in `ChipGroupsEditor`; CSS-only chips/tags in `CvPreview`; status chip in `CvSectionAccordion`.
- **Tooltips:** delete actions in four repeatable editors; the section delete action lacks a tooltip.
- **Alerts:** setup privacy/error, editor helper and export warnings use MUI `Alert` directly.
- **Accordions:** personal data and each CV section use MUI accordions directly.

## Generic components

There are no exported local components that are fully domain-free today. The clearest **A — GENERIC** assets are therefore the MUI theme layer and the following patterns currently embedded at call sites:

| Candidate                      | Current location(s)                              | Responsibility and current API                                        | Dependencies                                     | Reuse     | Required extraction                                                                                                          | Proposed name                     |
| ------------------------------ | ------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Theme factory/provider         | `lib/i18n.tsx`                                   | Supplies palette, shape, typography and overrides; currently no props | MUI styles; accidentally hosted by i18n provider | Very high | Move theme creation out of i18n; expose `createMyUiTheme(options?)` and `MyUiProvider`; keep persistence/language outside    | `MyUiProvider`, `createMyUiTheme` |
| Touch-friendly button defaults | 9 button call sites                              | MUI button with `minHeight: 44`, ordinary MUI button props            | MUI `Button`                                     | Very high | Put minimum target size, radii and text styling in theme defaults/variants; do not wrap unless additional behavior is needed | `Button` theme contract           |
| Icon action                    | four editors and section accordion               | Icon button, accessible label, optional tooltip, semantic color       | MUI `IconButton`, `Tooltip`; caller icon         | High      | Accept `label`, `icon`, `tone`, `onClick`; apply 44x44 target consistently                                                   | `IconAction`                      |
| Surface/panel                  | setup, privacy, editor, export, header/footer    | Bordered translucent `Paper`/`Box` with radius, blur and shadow       | MUI `Paper`/`Box` and theme                      | High      | Convert raw rgba/shadows/blur into tokens and expose `tone`/`elevation`/`padding`; keep sticky/layout behavior outside       | `Surface`                         |
| Responsive action bar          | `EditorStep`, `ExportStep`, partly `LegalFooter` | Responsive stack of actions, optional sticky placement                | MUI `Stack`, `Button` children                   | High      | Make it compositional: children/actions, alignment, `sticky`, safe-area support                                              | `ActionBar`                       |
| Centered loader                | hydration branch in `CvWizard`                   | Centered progress indicator with minimum viewport height              | MUI `Box`, `CircularProgress`                    | Medium    | Accept label, size and min-height; provide accessible status text                                                            | `LoadingState`                    |

## Components requiring refactor

These **B — GENERIC-WITH-REFACTOR** candidates contain a transferable interaction or composition, but should not be copied into the library as-is.

### `AppLanguageSwitcher` → `SegmentedControl`

- **File:** `components/AppLanguageSwitcher.tsx`
- **Responsibility:** exclusive two-option language selection with a responsive label.
- **Current props:** none; value, setter and all labels come from `useI18n`.
- **Dependencies:** MUI toggle controls and typography; project i18n context.
- **Project logic:** fixed `es`/`en`, hard-coded accessible names and hidden label below `sm`.
- **Reuse level:** high after inversion of control.
- **Required changes:** accept `value`, `options`, `onChange`, `label`, size/full-width and label visibility; use generic string values and caller-owned localization.
- **Proposed component:** `SegmentedControl<T>`; keep `AppLanguageSwitcher` locally as a thin adapter.

### Repeatable editors → `FieldArray` composition

- **Files/current names:** `BodyItemsEditor`, `CardsEditor`, `ItemsEditor`, `ChipGroupsEditor`.
- **Responsibility:** render an array of bordered editable rows, patch an item by index, add/remove rows and expose controlled changes.
- **Current props:** domain arrays plus `onChange`; `ChipGroupsEditor` additionally owns draft strings.
- **Dependencies:** MUI `Paper`, `Stack`, form controls, `Button`, `IconButton`, `Tooltip`; project types (`CvCard`, `CvItem`, `ChipGroup`) and i18n.
- **Project logic:** object shapes, labels, blank-item factories, bullet/tag parsing, duplicate-tag handling and index-based draft bookkeeping.
- **Reuse level:** high for the shell, low for each concrete field layout.
- **Required changes:** extract only a generic compound shell with stable item keys and render props; keep CV field definitions locally. Suggested composition:

```tsx
<FieldArray value={items} onChange={setItems} createItem={createItem}>
  <FieldArray.Items>
    {({ item, index, update, remove }) => (
      <FieldArray.Item>
        {/* project-owned fields */}
        <FieldArray.RemoveAction label={t.deleteItem} onClick={remove} />
      </FieldArray.Item>
    )}
  </FieldArray.Items>
  <FieldArray.AddAction>{t.addItem}</FieldArray.AddAction>
</FieldArray>
```

- **Proposed components:** `FieldArray`, `FieldArray.Item`, `FieldArray.AddAction`, `FieldArray.RemoveAction`; optionally a generic `TagInput` for the inner chip interaction.

### `ChipGroupsEditor` inner control → `TagInput`

- **Responsibility:** display removable tags and add a trimmed, case-insensitively unique tag on Enter or button click.
- **Current props:** embedded `group.chips`; draft is internal and keyed by array index.
- **Dependencies:** MUI `Chip`, `TextField`, `Button`, responsive layout; project translations.
- **Project logic:** labels and group nesting only.
- **Reuse level:** high.
- **Required changes:** accept `value`, `onChange`, `inputLabel`, `addLabel`, duplicate policy, normalization and optional max count; do not couple drafts to parent array indexes.
- **Proposed component:** `TagInput`.

### `WizardStepper` → `ResponsiveStepper`

- **File:** `components/wizard/WizardStepper.tsx`
- **Responsibility:** full horizontal stepper from `sm` and compact text status on `xs`.
- **Current props:** `activeStep`; labels are created from project translations and fixed to three CV steps.
- **Dependencies:** MUI stepper family, `Box`, `Typography`, i18n.
- **Project logic:** `STEPS`, label count/copy and berry rgba styling.
- **Reuse level:** high after accepting items.
- **Required changes:** accept `steps`, `activeStep`, `compactLabel` render function, breakpoint and aria label; move connector/icon colors to theme overrides.
- **Proposed component:** `ResponsiveStepper`.

### `SetupStartOptions` card → `SelectableCardGroup`

- **File:** `components/wizard/SetupStartOptions.tsx`
- **Responsibility:** grid of selectable, icon-led cards with radio affordance.
- **Current props:** domain `InitializationMode` options, file ref/change callback and language; also downloads sample CV data.
- **Dependencies:** MUI card composition, grid/radio, five icons; CV creation/export and i18n.
- **Project logic:** import mode triggers a hidden file input, mode-to-icon mapping, JSON sample callout.
- **Reuse level:** high for the card group, none for import/download behavior.
- **Required changes:** accept generic option values and caller-supplied icon/title/description/disabled state; provide controlled selection and keyboard/radio semantics. Keep file input and sample callout in the project.
- **Proposed components:** `SelectableCardGroup<T>`, `SelectableCard`.

### Additional B candidates

- `PolicySection` can become `ArticleSection` (`title`, `children`, heading level), but has only one current use: P3.
- The shell of `CvSectionAccordion` can become a composed `EditableAccordion` with `summary`, `status`, `enabled`, `actions` and `children`; the `CvSection` metadata and editor dispatch remain local: P2.
- The responsive edit/preview switch in `EditorStep` can become `ResponsiveSplitView` only if another product needs the same breakpoint-driven single-pane/dual-pane behavior. It is otherwise premature: P3.

## Project-specific components

The following should remain in this repository:

- `CvWizard`: product state machine, localStorage hydration, import parsing and navigation.
- `CvEditor`: immutable updates against `CvData`, page creation/removal confirmations and section IDs.
- `PersonalDataEditor`: fixed personal schema and comma-tag semantics. It should consume library fields/accordion, not move wholesale.
- `CvEditorToolbar`: page/theme/section/reset business actions. It should consume library select/button/action bar primitives.
- `CvSectionAccordion` and `CvSectionsEditor`: `CvSection` routing, page/column semantics and editor selection stay local even if their shells are extracted.
- `CvPreview` and `SectionRenderer`: A4 dimensions, CV schema, column assignment, print scaling and theme preset mapping are core product behavior.
- `SetupStep`: initialization modes, file parsing contract and continuation rules.
- `WizardHeader`: product brand and application-level composition; it can consume generic `Surface` and `ResponsiveStepper`.
- `EditorStep`: CV editor/preview orchestration and product navigation; only layout recipes may be extracted.
- `ExportStep`: CV completeness rules, JSON export and `window.print()`.
- `LegalFooter`: author/product/legal routes and destructive storage behavior. Extract `ConfirmDialog`, not the footer.
- `PrivacyPageContent`: legal copy and policy structure. Extract `ArticleSection`/`Surface` only if repeated.
- `OptionIcon`: a domain mapping and should remain beside setup configuration.

## Duplicate patterns

### Strong duplicates

1. **Repeatable editor row:** `BodyItemsEditor`, `CardsEditor`, `ItemsEditor` and `ChipGroupsEditor` all repeat `Stack spacing={1.25}` → outlined `Paper` with `p: 1.5`, `borderRadius: 1.5`, `backgroundColor: background.default` → fields → destructive 44x44 icon button/tooltip → outlined 44px add button. This should be one `FieldArray` composition, not four visual implementations.
2. **Minimum interactive height:** `minHeight: 44` is repeated across add, navigation, export, setup and icon actions. It belongs in design tokens/component defaults (`control.minTouchTarget`) and variants.
3. **Glass surface:** `rgba(255,253,253,...)`, `backdropFilter: blur(14px|16px)`, a divider border, radius `3` and berry-tinted box shadows recur in `LegalFooter`, `PrivacyPageContent`, `WizardHeader`, `SetupStep`, `EditorStep` and `ExportStep`.
4. **Responsive horizontal/vertical actions:** `{ xs: "column", sm: "row" }`, `spacing: 1.5`, full-width mobile buttons and auto/fixed desktop width recur in setup/export/chip/footer flows.
5. **Destructive icon action:** DeleteOutline + `color="error"` + accessible label + 44px hit target repeats in four editors; `CvSectionAccordion` repeats it without the tooltip.
6. **Section heading:** `Typography variant="h6" fontWeight={850|900}` and document `h2` with `variant="h5" fontWeight={900}` recur without a semantic typography abstraction.
7. **Select field recipe:** `FormControl fullWidth size="small"` + `InputLabel` + matching `Select label` repeats for theme, page and column.
8. **Responsive container padding:** `{ xs: 1.5, sm: 2.5, md: 3 }` occurs in the main container/footer; related `{ xs: 2, sm: 3.5, md: 5|4.5 }` panel padding is hand-tuned repeatedly.

### Conceptually similar components that should be variants

- All regular actions should remain one library `Button`, using MUI-compatible `variant="contained" | "outlined" | "text"` plus semantic `color="primary" | "error" | "warning"`. There is no need for `PrimaryButton`, `DownloadButton`, `ResetButton` or `DeleteButton` wrappers. Icons, size and loading state should be props.
- Translucent topbar, article panel, setup panel, editor panel and export panels should be `Surface` variants such as `variant="glass" | "outlined" | "plain"`, with `density`/`padding` props rather than separate card components.
- Language and edit/preview toggles should both consume `SegmentedControl`; `fullWidth`, `size` and responsive visibility are props/composition, not separate toggle components.
- Info, warning and error messages should stay one `Alert` family with severity variants. Project copy and warning construction remain in callers.
- Page, column and theme selects should use one `SelectField<T>` convenience composition if the library intentionally wraps MUI forms; otherwise centralize via theme defaults and keep MUI primitives.
- Compact CV tags and editor tags are visually related but serve different output targets. Do not force the print CSS chip into the MUI `Chip`; share semantic color/radius tokens only.

### Components that should use composition

```text
Surface
├── SurfaceHeader (optional)
├── SurfaceContent
└── SurfaceActions / ActionBar

FieldArray<T>
├── FieldArray.Items
│   └── FieldArray.Item
│       ├── project-owned fields
│       └── FieldArray.RemoveAction
└── FieldArray.AddAction

SelectableCardGroup<T>
└── SelectableCard
    ├── SelectableCard.Icon
    ├── SelectableCard.Content
    └── SelectableCard.Indicator

ConfirmDialog
├── DialogTitle
├── DialogContent
└── DialogActions

ArticleLayout
├── ArticleHeader
├── ArticleSection(s)
└── ArticleFooter (optional)
```

Composition is preferable to specific `SetupCard`, `EditorCard`, `ExportCard` or one component per repeatable CV record. Domain components should supply content and actions.

## Material UI usage

### Direct usage and wrappers

- 19 of the 20 files under `components/` import `@mui/material` directly. `CvPreview` is the only exception.
- `lib/i18n.tsx` also imports `createTheme` and `ThemeProvider` directly.
- There are **no true local wrappers** around MUI and no barrel/facade. Every screen determines its own `sx` recipes.
- There are 94 `sx` attributes in `components/`, `lib/` and `app/` TSX and **zero `styled()` calls**. The issue is distributed inline styling, not duplicate styled components.
- MUI components observed: `Accordion`, `Alert`, `Box`, `Button`, `Card`, `CardActionArea`, `CardContent`, `Chip`, `CircularProgress`, `Container`, `Dialog` family, `Divider`, `FormControl`, `Grid`, `IconButton`, `InputLabel`, `Link`, `MenuItem`, `Paper`, `Radio`, `Select`, `Stack`, `Step` family, `Switch`, `TextField`, `ToggleButton` family, `Tooltip`, `Typography`.

Recommended dependency boundary:

- `my-ui-library` may re-export or wrap only components where it adds a stable design-system contract (`Surface`, `IconAction`, `SegmentedControl`, `SelectField`, `ConfirmDialog`, `LoadingState`).
- Keep low-level MUI primitives available for composition; wrapping every `Box`, `Stack`, `Grid` or `Typography` would add indirection without reducing domain coupling.
- The library should declare compatible React, Emotion and MUI packages as peer dependencies to avoid duplicate theme/context instances.

### Icons

There are 22 icon imports representing 10 unique concepts: Add, Delete, Restore, Expand, Download, Print, History, Description, Upload and brand sparkle. Add/Delete/Download are repeated. Centralize sizing/color in `IconAction` and button defaults, but keep semantic icon choice with the project. Avoid a domain-specific icon registry in the library; an optional `icons` slot/default icon map is enough.

### Style and responsive observations

- Breakpoints used are default MUI `xs`, `sm`, `md`, `lg`; no custom breakpoint values are configured. CSS separately hard-codes `599.95px`, matching MUI's `sm` boundary.
- `xs → sm` commonly changes vertical stacks to horizontal rows and padding/width. `md` changes form columns. `lg` switches the editor from one active pane to a 4/8 split and enables sticky/scroll behavior.
- MUI Grid v5 negative margins are neutralized globally below 600px via `.MuiGrid-container`; this is an implementation-version workaround, not a reusable design token. Prefer migrating layout code/library primitives to a Grid version/API that does not require global class overrides before extraction.
- Print rules intentionally reach into MUI classes and product class names. They must remain project-specific because they enforce exact A4 geometry.
- Common constants include 44px touch targets; radii 1.5/2/2.5/3/4 theme units and 10/12/16px theme overrides; blur 14/16/18px; shadows tinted around `rgba(73,22,59,...)`; and repeated translucent `#fffdfd` surfaces.

## Theme analysis

### Current MUI application theme

Defined inline in `lib/i18n.tsx`:

- **Palette:** primary `#702457` with dark `#49163b` and light `#a85483`; secondary `#d43f78`; backgrounds `#f7f3f8`/`#fffdfd`; text `#2e2230`/`#716474`; divider `rgba(73,22,59,0.13)`. Standard MUI error/warning/info/success palettes are implicit defaults.
- **Typography:** `Inter, Arial, Helvetica, sans-serif`; only the `button` variant is customized (`textTransform: none`, weight 750, letter spacing 0). Screens repeatedly apply weights 700, 750, 800, 850, 900, 950, which are not declared as tokens and may not correspond to loaded font files.
- **Spacing:** no custom function; MUI's default 8px unit is used through fractional values (`0.5`, `0.75`, `1.25`, `1.5`, `2.5`, etc.).
- **Breakpoints:** default MUI breakpoints; none declared in the theme.
- **Shape:** global `borderRadius: 12`.
- **Overrides:** `MuiButton` radius 10px; `MuiCard` radius 16px; `MuiAccordion` 12px forced with `!important`, overflow hidden and no divider pseudo-element; `MuiToggleButton` weight 750.
- **defaultProps:** none.
- **variants:** none.

### Separate CV visual presets

`lib/sampleData.ts` defines four `ThemePreset` records (`berry`, `blue`, `green`, `mono`) with `primary`, `secondary`, `text`, `muted`, `soft`, `border` and `line`. `CvPreview` maps these to CSS custom properties. This is a second token system distinct from the MUI app theme. It is domain-facing (resume templates), but the token shape/factory can reuse library color types if the library is intended to theme printable artifacts.

### What belongs in `my-ui-library`

**P0:**

- Move `createTheme` configuration to a library theme factory and decouple it from `I18nProvider`.
- Define semantic tokens for glass surfaces, borders, focus/interactive states, control heights, shadows and radii. Raw berry RGBA values should not appear in components.
- Define typography variants such as `pageTitle`, `sectionTitle`, `panelTitle` or a documented weight scale; validate actual Inter font loading separately.
- Centralize `MuiButton`, `MuiIconButton`, `MuiPaper`, `MuiCard`, `MuiAccordion`, `MuiToggleButton`, `MuiTextField`, `MuiAlert` and `MuiTooltip` defaults where a consistent contract exists.

**P1/P2:**

- Add component variants for `Surface`/`Paper` (`glass`, `outlined`), buttons if semantic variants beyond native MUI are truly needed, and compact/responsive controls.
- Put `disableElevation`, target sizes, common densities and focus-visible behavior in `defaultProps`/overrides rather than repeating `sx`.
- Export token types and theme augmentation so application `sx` remains typed.

**Keep local:**

- A4 dimensions, millimetre spacing, preview typography and print page-break rules.
- CV preset names and selection; optionally construct their token objects through a generic library helper.
- Background artwork/brand gradient until it is confirmed as shared brand identity across consumers.
- MUI Grid v5 mobile workaround, which is app/version-specific technical debt.

## Proposed library components

| Priority | Component                           | Source pattern                                         | Scope                                                    |
| -------- | ----------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| P0       | `MyUiProvider` / `createMyUiTheme`  | Theme embedded in `I18nProvider`                       | Theme and design tokens, no localization/storage         |
| P0       | `Surface`                           | Repeated Paper/Box glass panels                        | Composable visual surface with typed variants            |
| P0       | MUI component defaults and variants | Repeated `sx`, radii, weights, 44px controls           | Consistency without unnecessary wrappers                 |
| P1       | `IconAction`                        | Repeated tooltip/delete icon button                    | Accessible icon action with semantic tone                |
| P1       | `FieldArray` compound component     | Four repeatable editors                                | Generic add/remove/reorder-capable controlled list shell |
| P1       | `SegmentedControl<T>`               | Language and mobile view toggles                       | Generic exclusive option control                         |
| P1       | `ResponsiveStepper`                 | Desktop/mobile wizard progress                         | Data-driven responsive progress indicator                |
| P1       | `ActionBar`                         | Editor/export/footer actions                           | Responsive/sticky action composition and safe area       |
| P1       | `ConfirmDialog`                     | Local-data deletion dialog; browser confirms elsewhere | Accessible controlled confirmation UI                    |
| P2       | `TagInput`                          | Chip group editor                                      | Controlled removable tag entry                           |
| P2       | `SelectableCardGroup<T>`            | Setup start cards                                      | Accessible generic card selection                        |
| P2       | `SelectField<T>`                    | Theme/page/column select recipes                       | Labelled MUI select convenience component                |
| P2       | `LoadingState`                      | Wizard hydration loader                                | Accessible centred status/loader                         |
| P2       | `EditableAccordion`                 | Personal and section editor shells                     | Composed summary/status/actions/content shell            |
| P3       | `ArticleSection`                    | Privacy policy sections                                | Semantic long-form section primitive                     |
| P3       | `ResponsiveSplitView`               | Editor/preview responsive layout                       | Only after a second demonstrated consumer                |

Not proposed at present: table, pagination, tabs, badge, empty-state or data-grid components. There is no evidence of their required APIs in this project; adding them now would be speculative.

## Proposed component API

APIs should retain normal MUI composition and forward refs where appropriate. Illustrative TypeScript contracts:

```tsx
type SurfaceProps = PaperProps & {
  variant?: "plain" | "outlined" | "glass";
  padding?: "none" | "compact" | "comfortable" | "spacious";
};

type IconActionProps = Omit<IconButtonProps, "aria-label" | "color"> & {
  label: string;
  icon: React.ReactNode;
  tone?: "neutral" | "primary" | "danger" | "warning";
  tooltip?: boolean;
};

type SegmentedOption<T extends string> = {
  value: T;
  label: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
};
type SegmentedControlProps<T extends string> = {
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  label: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
};

type SelectFieldOption<T extends string | number> = {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
};
type SelectFieldProps<T extends string | number> = {
  label: string;
  value: T;
  options: readonly SelectFieldOption<T>[];
  onChange: (value: T) => void;
  fullWidth?: boolean;
  size?: "small" | "medium";
};

type ConfirmDialogProps = {
  open: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel: React.ReactNode;
  cancelLabel: React.ReactNode;
  tone?: "primary" | "danger";
  busy?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

type ResponsiveStepperProps<T extends string | number> = {
  steps: readonly { id: T; label: React.ReactNode }[];
  activeStep: T;
  ariaLabel: string;
  compactAt?: Breakpoint;
  renderCompactLabel?: (activeIndex: number, total: number) => React.ReactNode;
};

type TagInputProps = {
  value: readonly string[];
  onChange: (value: string[]) => void;
  inputLabel: string;
  addLabel?: string;
  allowDuplicates?: boolean;
  normalize?: (value: string) => string;
  maxTags?: number;
};

type SelectableCardGroupProps<T extends string> = {
  value: T | null;
  options: readonly {
    value: T;
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
  }[];
  onChange: (value: T) => void;
  columns?: ResponsiveStyleValue<number>;
  ariaLabel: string;
};
```

For `FieldArray`, prefer compound components/render props over a field-schema API. This keeps validation libraries, domain types and form state out of `my-ui-library`. The library should not translate labels, read localStorage, call `window.confirm`, print, download files or know `CvData`.

## Migration priorities

### P0 — foundational

1. Establish package peer dependencies, theme augmentation and a standalone `MyUiProvider`.
2. Extract palette/shape/typography plus semantic surface, shadow, radius, spacing and control-size tokens.
3. Replace repeated visual constants through theme overrides/variants, especially 44px controls and glass `Surface` styling.
4. Add visual regression/accessibility coverage for focus, contrast, disabled state and responsive behavior before consumers migrate.

### P1 — highly reusable

1. Build `IconAction`, `SegmentedControl`, `ActionBar`, `ResponsiveStepper` and `ConfirmDialog` from the observed use cases.
2. Build the compositional `FieldArray` shell and refactor the four local editors to consume it while retaining their domain fields locally.
3. Convert wizard/screen panels to `Surface` variants and remove raw shadows/RGBA/blur from callers.

### P2 — reusable

1. Extract `TagInput`, `SelectableCardGroup`, `SelectField`, `LoadingState` and possibly `EditableAccordion`.
2. Standardize section/title typography and responsive spacing presets.
3. Replace browser-native confirmations with the library `ConfirmDialog` only after product behavior (async handling and destructive-state safeguards) is specified.

### P3 — optional

1. Extract `ArticleSection` if a second long-form page appears.
2. Extract `ResponsiveSplitView` only with another validated consumer.
3. Evaluate whether CV print tokens belong in a separate library module; do not mix exact A4 CSS with general application UI by default.

### Suggested migration order and safeguards

Start with tokens/theme, then leaf primitives, then compositions, and only then update project screens. Preserve MUI prop compatibility where practical. Add Storybook or equivalent isolated examples for each extracted component, keyboard/focus tests for interactive controls, and viewport tests at 320px, `sm`, `md` and `lg`. Keep the print preview regression-tested separately at exact 210mm × 297mm.

## Summary

| Current component                     | Proposed library component                      | Category | Priority | Complexity |
| ------------------------------------- | ----------------------------------------------- | -------- | -------- | ---------- |
| Theme in `I18nProvider`               | `MyUiProvider`, `createMyUiTheme`               | A        | P0       | Medium     |
| Repeated glass `Paper`/`Box` recipes  | `Surface`                                       | A        | P0       | Medium     |
| Repeated Button `sx`/styles           | MUI `Button` defaults/variants                  | A        | P0       | Low        |
| Repeated delete `IconButton` pattern  | `IconAction`                                    | A        | P1       | Low        |
| Repeated bottom/export action layouts | `ActionBar`                                     | A        | P1       | Medium     |
| `AppLanguageSwitcher`                 | `SegmentedControl<T>` + local adapter           | B        | P1       | Low        |
| `WizardStepper`                       | `ResponsiveStepper`                             | B        | P1       | Medium     |
| `BodyItemsEditor`                     | `FieldArray<string>` + local fields             | B        | P1       | Medium     |
| `CardsEditor`                         | `FieldArray<CvCard>` + local fields             | B        | P1       | Medium     |
| `ItemsEditor`                         | `FieldArray<CvItem>` + local fields             | B        | P1       | Medium     |
| `ChipGroupsEditor`                    | `FieldArray<ChipGroup>` + `TagInput`            | B        | P1/P2    | High       |
| `SetupStartOptions`                   | `SelectableCardGroup<T>` + local import callout | B        | P2       | Medium     |
| `PolicySection`                       | `ArticleSection`                                | B        | P3       | Low        |
| `CvSectionAccordion` shell            | `EditableAccordion` + local content             | B        | P2       | Medium     |
| Hydration branch in `CvWizard`        | `LoadingState`                                  | A        | P2       | Low        |
| Select recipes in toolbar/accordion   | `SelectField<T>`                                | A        | P2       | Low        |
| `EditorStep` responsive layout        | `ResponsiveSplitView` (conditional)             | B        | P3       | High       |
| `LegalFooter` dialog only             | `ConfirmDialog`; footer remains local           | C/B      | P1       | Medium     |
| `CvWizard`                            | None; consume library components                | C        | —        | —          |
| `CvEditor`                            | None; consume `FieldArray`-based editors        | C        | —        | —          |
| `PersonalDataEditor`                  | None; consume generic fields/accordion          | C        | —        | —          |
| `CvEditorToolbar`                     | None; consume button/select/action primitives   | C        | —        | —          |
| `CvSectionsEditor`                    | None                                            | C        | —        | —          |
| `CvPreview` / `SectionRenderer`       | None; optional separate print-token module      | C        | P3       | High       |
| `SetupStep`                           | None; consume library primitives                | C        | —        | —          |
| `WizardHeader`                        | None; consume `Surface`/stepper                 | C        | —        | —          |
| `EditorStep`                          | None; consume surface/action primitives         | C        | —        | —          |
| `ExportStep`                          | None; consume surface/action/alert primitives   | C        | —        | —          |
| `PrivacyPageContent`                  | None; consume surface/article primitives        | C        | —        | —          |
