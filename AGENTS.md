# AGENTS.md

## Big Picture
- Monorepo publishes two libraries: `@antdv-next/tailwind` and `@antdv-next/unocss` from `packages/*`, with demos in `examples/*`.
- Purpose: bridge Ant Design Vue CSS variables (for example `--ant-color-primary`) into utility-class tooling.
- Package boundaries: Tailwind in `packages/tailwind/src/*`, UnoCSS in `packages/unocss/src/*`.

## Architecture Notes
- Tailwind has two paths: v3 plugin API via `createAntdPlugin` in `packages/tailwind/src/plugin.ts`, and v4 CSS generation via `generateThemeCSS` in `packages/tailwind/src/v4.ts`.
- `packages/tailwind/theme.css` is generated; edit `src/v4.ts`, then regenerate.
- UnoCSS exposes two presets sharing `packages/unocss/src/common/*`:
  - `presetAntd` in `preset.ts` (keys: `borderRadius`, `fontSize`, `boxShadow`).
  - `presetAntdTailwind4` in `presetTailwind4.ts` (keys: `radius`, `text`, `shadow`, `defaults`).

## Project-Specific Conventions
- Keep custom spacing limited to `m-*` / `p-*`; do not override global spacing (`w-*`, `max-w-*`, `gap-*`).
- Defaults are API behavior: `antPrefix: 'ant'`; UnoCSS `prefix: 'a'`, `allowUnprefixed: true`.
- Preserve parity between `preset.ts` and `presetTailwind4.ts`; mirror rule/theme changes.
- TS strictness is enabled in root `tsconfig.json`; keep exported option types accurate.

## Workflows
- Install with pnpm only:
  ```bash
  pnpm install
  ```
- Build all:
  ```bash
  pnpm build
  ```
- Build one package:
  ```bash
  pnpm --filter @antdv-next/tailwind build
  pnpm --filter @antdv-next/unocss build
  ```
- Regenerate Tailwind v4 CSS after `src/v4.ts` edits:
  ```bash
  pnpm --filter @antdv-next/tailwind generate:theme
  ```
- Run UnoCSS preset tests:
  ```bash
  pnpm vitest packages/unocss/src/preset.test.ts
  ```

## Integration Guardrails
- Keep peer deps external (`tailwindcss`, `unocss`); do not bundle them.
- Respect each package `exports` map when adding entrypoints.
- If token/rule names change, update docs and wiring examples in `packages/*/README.md`, `examples/unocss-v3/uno.config.ts`, and `examples/unocss-v4/uno.config.ts`.
