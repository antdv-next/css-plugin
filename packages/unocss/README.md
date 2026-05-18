# @antdv-next/unocss

UnoCSS presets for AntDv Next, providing utility classes that map to Ant Design CSS variables.

## Installation

```bash
pnpm add -D @antdv-next/unocss
```

## Presets

This package provides two presets:

### 1. `presetAntd` (Default)

Standard preset compatible with UnoCSS Wind3 style, suitable for most projects.

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetAntd } from '@antdv-next/unocss'

export default defineConfig({
  presets: [
    presetAntd({
      prefix: 'a',                  // class prefix, default: 'a'
      allowPrefixedUtilities: true, // keep a-* utilities, default: true
      allowUnprefixed: true,        // keep legacy bare classes like bg-primary, default: true
      antPrefix: 'ant',             // CSS variable prefix, default: 'ant'
      tokenPrefix: 'ant',           // namespace-safe classes like bg-ant-primary, default: 'ant'
    }),
  ],
})
```

**Theme Keys:**
- `colors` - Color palette
- `borderRadius` - Border radius values
- `fontSize` - Font size values
- `boxShadow` - Shadow values

### 2. `presetAntdTailwind4` (New)

Tailwind 4 compatible preset, aligned with the latest Tailwind CSS v4 theme structure.

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetAntdTailwind4 } from '@antdv-next/unocss'

export default defineConfig({
  presets: [
    presetAntdTailwind4({
      prefix: 'a',                  // class prefix, default: 'a'
      allowPrefixedUtilities: true, // keep a-* utilities, default: true
      allowUnprefixed: true,        // keep legacy bare classes like bg-primary, default: true
      antPrefix: 'ant',             // CSS variable prefix, default: 'ant'
      tokenPrefix: 'ant',           // namespace-safe classes like bg-ant-primary, default: 'ant'
    }),
  ],
})
```

**Theme Keys (Tailwind 4 style):**
- `colors` - Color palette
- `radius` - Border radius (renamed from `borderRadius`)
- `text` - Text configuration (includes fontSize, lineHeight, letterSpacing)
- `shadow` - Box shadow (renamed from `boxShadow`)
- `defaults` - Default values for reset styles

## Key Differences

| Feature | presetAntd | presetAntdTailwind4 |
|---------|------------|---------------------|
| Theme style | UnoCSS Wind3 | Tailwind CSS v4 |
| Border radius key | `borderRadius` | `radius` |
| Shadow key | `boxShadow` | `shadow` |
| Font size | `fontSize` | `text.*.fontSize` |
| Defaults support | ❌ | ✅ `defaults` |
| CSS layers | Standard | `properties`, `theme`, `base` |

## Usage Examples

Both presets emit **three parallel utility patterns** that can be independently toggled:

| Pattern | Example | Toggle | When to use |
| --- | --- | --- | --- |
| **Prefixed** (stable) | `a-bg-primary`, `a-p-lg` | `allowPrefixedUtilities` (default `true`) | Recommended for most projects |
| **Namespace-safe** (recommended replacement for legacy bare) | `bg-ant-primary`, `p-ant-lg` | `tokenPrefix` (default `'ant'`, empty disables) | Prefer when you want short class names without polluting framework tokens |
| **Legacy bare** (back-compat) | `bg-primary`, `p-lg` | `allowUnprefixed` (default `true`; will flip to `false` next major) | Existing projects only |

```vue
<template>
  <!-- Stable prefixed APIs -->
  <div class="a-bg-primary a-color-white">Primary Background</div>
  <div class="a-p-lg a-rounded-lg a-shadow-card">Prefixed</div>

  <!-- Namespace-safe APIs (recommended) -->
  <div class="bg-ant-primary color-ant-white text-ant-lg p-ant-lg rounded-ant-lg shadow-ant-card">
    Namespace safe
  </div>
</template>
```

> Notes:
> - This preset only customizes `m-*` / `p-*` related classes and does not override UnoCSS global spacing scale (`w-*`, `max-w-*`, `gap-*`, etc.).
> - `allowUnprefixed: false` only disables legacy bare utilities such as `bg-primary` and `text-sm`. Prefixed `a-*` and namespace-safe `*-ant-*` utilities remain available.
> - `tokenPrefix` no longer rewrites theme keys — `colors.primary` stays as `colors.primary`. Namespace resolution happens at the rule level, so `bg-ant-primary` resolves to the same `colors.primary` entry.

## When to Use Which?

### Use `presetAntd` if:
- You're using other UnoCSS presets (Wind3, Attributify, etc.)
- You prefer the standard UnoCSS theme structure
- You need compatibility with existing UnoCSS configurations

### Use `presetAntdTailwind4` if:
- You're migrating from or working with Tailwind CSS v4
- You want alignment with the latest Tailwind CSS conventions
- You prefer the new `radius`, `shadow`, and `text` theme keys
- You need the `defaults` configuration for reset styles

## Supported Utility Classes

All utilities listed below come in three flavors. Pick the column that matches your chosen mode:

| Category | Prefixed (`a-*`) | Namespace-safe (`*-ant-*`) | Legacy bare |
| --- | --- | --- | --- |
| Color | `a-color-{c}` / `a-c-{c}` | `color-ant-{c}` / `c-ant-{c}` | `color-{c}` / `c-{c}` |
| Background | `a-bg-{c}` | `bg-ant-{c}` (`bg-ant` = primary) | `bg-{c}` |
| Border color | `a-border-{c}` / `a-b-{c}` | `border-ant-{c}` / `b-ant-{c}` | `border-{c}` / `b-{c}` |
| Directional border | `a-border-{t/r/b/l/x/y}-{c}` (`a-bt-` …) | `border-{t/r/b/l/x/y}-ant-{c}` (`bt-ant-` …) | `border-{t/r/b/l/x/y}-{c}` |
| Margin | `a-m{x/y/t/r/b/l}-{size}` | `m{x/y/t/r/b/l}-ant-{size}` | `m{x/y/t/r/b/l}-{size}` |
| Padding | `a-p{x/y/t/r/b/l}-{size}` | `p{x/y/t/r/b/l}-ant-{size}` | `p{x/y/t/r/b/l}-{size}` |
| Border radius | `a-rounded[-{size}]` / `a-rd[-{size}]` (corner/side too) | `rounded-ant[-{size}]` / `rd-ant[-{size}]` (`rounded-ant` = DEFAULT) | `rounded[-{size}]` / `rd[-{size}]` |
| Shadow | `a-shadow[-{type}]` | `shadow-ant[-{type}]` (`shadow-ant` = DEFAULT) | `shadow[-{type}]` |
| Font size | `a-text-{size}` | `text-ant-{size}` | `text-{size}` |

## Available Theme Tokens

### Colors

Aligned with antdv 1.3.0. All tokens below work with `color-`, `c-`, `bg-`, `border-`, `b-`, and directional border utilities in any of the three modes.

- Primary (10 levels): `primary`, `primary-hover`, `primary-active`, `primary-bg`, `primary-bg-hover`, `primary-border`, `primary-border-hover`, `primary-text`, `primary-text-hover`, `primary-text-active`
- Success / Warning / Error / Info (each provides the same 10-level set): `{name}`, `{name}-hover`, `{name}-active`, `{name}-bg`, `{name}-bg-hover`, `{name}-border`, `{name}-border-hover`, `{name}-text`, `{name}-text-hover`, `{name}-text-active`
- Error extras: `error-bg-filled-hover`, `error-bg-active`, `error-affix`
- Warning extras: `warning-affix`
- Link: `link`, `link-hover`, `link-active`
- Text: `text`, `text-secondary`, `text-tertiary`, `text-quaternary` (alias `text-quat`), `text-placeholder`, `text-disabled`, `text-heading`, `text-label`, `text-description`, `text-light-solid`
- Fill: `fill`, `fill-secondary`, `fill-tertiary`, `fill-quaternary`, `fill-content`, `fill-content-hover`, `fill-alter`
- Background: `base`, `container`, `container-disabled`, `layout`, `elevated`, `spotlight`, `blur`, `mask`, `solid`, `solid-hover`, `solid-active`
- Border: `border`, `border-secondary` (alias `border-sec`), `border-disabled`, `border-bg`
- Icon: `icon`, `icon-hover`
- Misc: `highlight`, `white`, `split`
- Aliases: `main` (= text), `sec` (= text-secondary), `quat` (= text-quaternary)
- Palette (1-10 levels): `blue`, `purple`, `cyan`, `green`, `magenta`, `pink`, `red`, `orange`, `yellow`, `volcano`, `geekblue`, `lime`, `gold`

### Spacing (aligned with antdv 1.3.0)

- Padding (`p-*`): `xxs`, `xs`, `sm`, `md`, `lg`, `xl`
- Margin (`m-*`): `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

> Breaking from earlier 1.x: `p-xxl` / `p-xxxl` / `m-xxxl` no longer exist — the underlying antdv variables were removed.

### Border Radius / Radius
`xs`, `sm`, `lg` (DEFAULT bound to the bare `rounded` / `a-rounded` / `rounded-ant`)

### Shadow / BoxShadow
`sec`/`secondary`, `ter`/`tertiary`, `card`, `arrow`, `drawer-r`, `drawer-l`, `drawer-u`, `drawer-d` (DEFAULT bound to the bare `shadow` / `a-shadow` / `shadow-ant`)

## License

MIT
