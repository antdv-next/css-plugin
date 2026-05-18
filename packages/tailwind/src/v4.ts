/**
 * Tailwind CSS v4 主题生成器
 *
 * Tailwind CSS v4 使用 @theme 指令在 CSS 中定义主题变量。
 *
 * 本模块导出两套生成器：
 *
 * 1. `generateThemeCSS()` / `defaultThemeCSS` —— 经典入口（与 1.x 行为一致）。
 *    生成的 token 直接占用 Tailwind 原生命名空间（如 `--color-primary`），
 *    使用 `bg-primary`、`text-lg` 等内置 utility。
 *
 * 2. `generateCompatThemeCSS()` / `defaultCompatThemeCSS` —— 兼容入口（推荐用于新项目）。
 *    所有 token 都加 namespace 前缀（如 `--color-ant-primary`），
 *    用法变为 `bg-ant-primary`、`text-ant-lg`，避免与 Tailwind 自身/业务 token 冲突。
 *    可选额外发出 `@utility a-bg-primary { ... }` 前缀简写。
 */

import type { AntdPluginOptions } from './types'
import { colorNames } from './types'

// 与 antdv 1.3.0 内置 CSS 变量保持一致：
// padding 仅到 xl，margin 到 xxl，xxxl 已被移除
const paddingTokens = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const
const marginTokens = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const

const paddingUtilityConfig = [
  ['p', 'padding'],
  ['px', 'padding-inline'],
  ['py', 'padding-block'],
  ['pt', 'padding-top'],
  ['pr', 'padding-right'],
  ['pb', 'padding-bottom'],
  ['pl', 'padding-left'],
] as const

const marginUtilityConfig = [
  ['m', 'margin'],
  ['mx', 'margin-inline'],
  ['my', 'margin-block'],
  ['mt', 'margin-top'],
  ['mr', 'margin-right'],
  ['mb', 'margin-bottom'],
  ['ml', 'margin-left'],
] as const

// ---------------------------------------------------------------------------
// Token 描述符：[shortName, antTokenName] —— 由两套生成器共享，确保 1.3.0 token 不漂移。
// ---------------------------------------------------------------------------

/**
 * 颜色 token：shortName → `var(--{antPrefix}-color-{antTokenName})`
 * shortName 是最终被消费的工具类后缀，例如 `bg-primary` 中的 `primary`
 */
const COLOR_TOKENS: ReadonlyArray<readonly [string, string]> = [
  // Primary（10 级色阶）
  ['primary', 'primary'],
  ['primary-hover', 'primary-hover'],
  ['primary-active', 'primary-active'],
  ['primary-bg', 'primary-bg'],
  ['primary-bg-hover', 'primary-bg-hover'],
  ['primary-border', 'primary-border'],
  ['primary-border-hover', 'primary-border-hover'],
  ['primary-text', 'primary-text'],
  ['primary-text-hover', 'primary-text-hover'],
  ['primary-text-active', 'primary-text-active'],
  // Success
  ['success', 'success'],
  ['success-hover', 'success-hover'],
  ['success-active', 'success-active'],
  ['success-bg', 'success-bg'],
  ['success-bg-hover', 'success-bg-hover'],
  ['success-border', 'success-border'],
  ['success-border-hover', 'success-border-hover'],
  ['success-text', 'success-text'],
  ['success-text-hover', 'success-text-hover'],
  ['success-text-active', 'success-text-active'],
  // Warning
  ['warning', 'warning'],
  ['warning-hover', 'warning-hover'],
  ['warning-active', 'warning-active'],
  ['warning-bg', 'warning-bg'],
  ['warning-bg-hover', 'warning-bg-hover'],
  ['warning-border', 'warning-border'],
  ['warning-border-hover', 'warning-border-hover'],
  ['warning-text', 'warning-text'],
  ['warning-text-hover', 'warning-text-hover'],
  ['warning-text-active', 'warning-text-active'],
  ['warning-affix', 'warning-affix'],
  // Error
  ['error', 'error'],
  ['error-hover', 'error-hover'],
  ['error-active', 'error-active'],
  ['error-bg', 'error-bg'],
  ['error-bg-hover', 'error-bg-hover'],
  ['error-bg-filled-hover', 'error-bg-filled-hover'],
  ['error-bg-active', 'error-bg-active'],
  ['error-border', 'error-border'],
  ['error-border-hover', 'error-border-hover'],
  ['error-text', 'error-text'],
  ['error-text-hover', 'error-text-hover'],
  ['error-text-active', 'error-text-active'],
  ['error-affix', 'error-affix'],
  // Info
  ['info', 'info'],
  ['info-hover', 'info-hover'],
  ['info-active', 'info-active'],
  ['info-bg', 'info-bg'],
  ['info-bg-hover', 'info-bg-hover'],
  ['info-border', 'info-border'],
  ['info-border-hover', 'info-border-hover'],
  ['info-text', 'info-text'],
  ['info-text-hover', 'info-text-hover'],
  ['info-text-active', 'info-text-active'],
  // Link
  ['link', 'link'],
  ['link-hover', 'link-hover'],
  ['link-active', 'link-active'],
  // Text
  ['text', 'text'],
  ['text-secondary', 'text-secondary'],
  ['text-tertiary', 'text-tertiary'],
  ['text-quaternary', 'text-quaternary'],
  ['text-quat', 'text-quaternary'],
  ['text-placeholder', 'text-placeholder'],
  ['text-disabled', 'text-disabled'],
  ['text-heading', 'text-heading'],
  ['text-label', 'text-label'],
  ['text-description', 'text-description'],
  ['text-light-solid', 'text-light-solid'],
  ['main', 'text'],
  ['sec', 'text-secondary'],
  ['quat', 'text-quaternary'],
  // Fill
  ['fill', 'fill'],
  ['fill-secondary', 'fill-secondary'],
  ['fill-tertiary', 'fill-tertiary'],
  ['fill-quaternary', 'fill-quaternary'],
  ['fill-content', 'fill-content'],
  ['fill-content-hover', 'fill-content-hover'],
  ['fill-alter', 'fill-alter'],
  // Background
  ['base', 'bg-base'],
  ['container', 'bg-container'],
  ['container-disabled', 'bg-container-disabled'],
  ['layout', 'bg-layout'],
  ['elevated', 'bg-elevated'],
  ['spotlight', 'bg-spotlight'],
  ['blur', 'bg-blur'],
  ['mask', 'bg-mask'],
  ['solid', 'bg-solid'],
  ['solid-hover', 'bg-solid-hover'],
  ['solid-active', 'bg-solid-active'],
  ['split', 'split'],
  // Border
  ['border', 'border'],
  ['border-secondary', 'border-secondary'],
  ['border-sec', 'border-secondary'],
  ['border-disabled', 'border-disabled'],
  ['border-bg', 'border-bg'],
  // Icon
  ['icon', 'icon'],
  ['icon-hover', 'icon-hover'],
  // Misc
  ['highlight', 'highlight'],
  ['white', 'white'],
]

/** Border-radius token：shortName → `--{antPrefix}-border-radius-{antTokenName}` 的尾段 */
const RADIUS_TOKENS: ReadonlyArray<readonly [string, string]> = [
  ['xs', 'border-radius-xs'],
  ['sm', 'border-radius-sm'],
  ['DEFAULT', 'border-radius'],
  ['lg', 'border-radius-lg'],
]

/** Font-size token */
const FONT_SIZE_TOKENS: ReadonlyArray<readonly [string, string]> = [
  ['sm', 'font-size-sm'],
  ['DEFAULT', 'font-size'],
  ['lg', 'font-size-lg'],
  ['xl', 'font-size-xl'],
  ['h1', 'font-size-heading-1'],
  ['h2', 'font-size-heading-2'],
  ['h3', 'font-size-heading-3'],
]

/** Box-shadow token */
const SHADOW_TOKENS: ReadonlyArray<readonly [string, string]> = [
  ['DEFAULT', 'box-shadow'],
  ['secondary', 'box-shadow-secondary'],
  ['sec', 'box-shadow-secondary'],
  ['tertiary', 'box-shadow-tertiary'],
  ['ter', 'box-shadow-tertiary'],
  ['card', 'box-shadow-card'],
  ['arrow', 'box-shadow-popover-arrow'],
  ['drawer-right', 'box-shadow-drawer-right'],
  ['drawer-left', 'box-shadow-drawer-left'],
  ['drawer-up', 'box-shadow-drawer-up'],
  ['drawer-down', 'box-shadow-drawer-down'],
  ['drawer-r', 'box-shadow-drawer-right'],
  ['drawer-l', 'box-shadow-drawer-left'],
  ['drawer-u', 'box-shadow-drawer-up'],
  ['drawer-d', 'box-shadow-drawer-down'],
]

function pushDirectionalSpacingUtilities(
  lines: string[],
  variableNamespace: 'padding' | 'margin',
  tokens: ReadonlyArray<string>,
  utilityConfig: ReadonlyArray<readonly [string, string]>,
  utilityPrefix = '',
  utilityInfix = '',
): void {
  // utilityPrefix: 加在 utility 名前，用于补出 `@utility a-p-lg`
  // utilityInfix:  加在 utility 名后、token 名前，用于补出 `@utility p-ant-lg { ...: var(--padding-ant-lg) }`
  const infix = utilityInfix ? `${utilityInfix}-` : ''
  for (const [utilityName, cssProperty] of utilityConfig) {
    for (const token of tokens) {
      lines.push(`@utility ${utilityPrefix}${utilityName}-${infix}${token} {`)
      lines.push(`  ${cssProperty}: var(--${variableNamespace}-${infix}${token});`)
      lines.push('}')
    }
    lines.push('')
  }
}

// ---------------------------------------------------------------------------
// 经典入口：generateThemeCSS（与 1.x 行为一致，仅升级到 1.3.0 token）
// ---------------------------------------------------------------------------

/**
 * 生成 Tailwind CSS v4 主题 CSS 内容（经典入口）。
 *
 * Tailwind v4 使用 @theme 指令定义主题变量，变量命名约定：
 * - --color-*: 颜色工具类 (bg-*, text-*, border-*)
 * - --padding-*: padding 工具类 (p-*, px-*, py-*)
 * - --margin-*: margin 工具类 (m-*, mx-*, my-*)
 * - --radius-*: 圆角工具类 (rounded-*)
 * - --text-*: 字体大小工具类 (text-sm, text-lg)
 * - --shadow-*: 阴影工具类 (shadow-*)
 */
export function generateThemeCSS(options: AntdPluginOptions = {}): string {
  const { antPrefix = 'ant' } = options
  const lines: string[] = []

  lines.push('@theme inline {')

  // 调色板（blue/purple/.../gold + 1-10 级）
  lines.push('  /* Ant Design Palette Colors */')
  for (const color of colorNames) {
    lines.push(`  --color-${color}: var(--${antPrefix}-${color});`)
    for (let i = 1; i <= 10; i++)
      lines.push(`  --color-${color}-${i}: var(--${antPrefix}-${color}-${i});`)
  }

  // 语义颜色
  lines.push('')
  lines.push('  /* Semantic Colors */')
  for (const [key, antKey] of COLOR_TOKENS)
    lines.push(`  --color-${key}: var(--${antPrefix}-color-${antKey});`)

  // Padding
  lines.push('')
  lines.push('  /* Padding Tokens */')
  for (const token of paddingTokens)
    lines.push(`  --padding-${token}: var(--${antPrefix}-padding-${token});`)

  // Margin
  lines.push('')
  lines.push('  /* Margin Tokens */')
  for (const token of marginTokens)
    lines.push(`  --margin-${token}: var(--${antPrefix}-margin-${token});`)

  // Radius
  lines.push('')
  lines.push('  /* Border Radius */')
  for (const [key, antKey] of RADIUS_TOKENS)
    lines.push(`  --radius-${key}: var(--${antPrefix}-${antKey});`)

  // Font size
  lines.push('')
  lines.push('  /* Font Size */')
  for (const [key, antKey] of FONT_SIZE_TOKENS)
    lines.push(`  --text-${key}: var(--${antPrefix}-${antKey});`)

  // Shadow
  lines.push('')
  lines.push('  /* Box Shadow */')
  for (const [key, antKey] of SHADOW_TOKENS)
    lines.push(`  --shadow-${key}: var(--${antPrefix}-${antKey});`)

  lines.push('}')
  lines.push('')
  lines.push('/* Padding Utilities */')
  pushDirectionalSpacingUtilities(lines, 'padding', paddingTokens, paddingUtilityConfig)
  lines.push('/* Margin Utilities */')
  pushDirectionalSpacingUtilities(lines, 'margin', marginTokens, marginUtilityConfig)

  return lines.join('\n')
}

/** 预构建的经典主题 CSS（默认配置） */
export const defaultThemeCSS = generateThemeCSS()

// ---------------------------------------------------------------------------
// 兼容入口：generateCompatThemeCSS（namespace 安全 + 可选前缀 utility）
// ---------------------------------------------------------------------------

export interface AntdV4CompatOptions {
  /**
   * antdv-next CSS 变量前缀，与 ConfigProvider 的 prefixCls 对应。
   * @default 'ant'
   * @example antPrefix: 'my-app' -> var(--my-app-color-primary)
   */
  antPrefix?: string

  /**
   * Tailwind v4 theme token 的命名空间前缀。
   * 输出的变量形如 `--color-{tokenPrefix}-primary`，对应工具类 `bg-{tokenPrefix}-primary`。
   * 传空字符串可关闭 namespace（不推荐，会回到旧的命名冲突状态）。
   * @default 'ant'
   */
  tokenPrefix?: string

  /**
   * 是否额外输出带前缀的 `@utility` 工具类，例如 `a-bg-primary`。
   * 这些 utility 不依赖 @theme namespace，直接指向 antdv 变量，可作为短写法。
   * @default true
   */
  allowPrefixedUtilities?: boolean

  /**
   * 前缀 utility 使用的前缀。
   * @default 'a'
   * @example prefix: 'antd' -> @utility antd-bg-primary { ... }
   */
  prefix?: string
}

/**
 * 在每个 `${prefix}-${utility}-${token} { property: var(--${antPrefix}-${antVar}) }` 块中写入。
 */
function pushPrefixedUtility(
  lines: string[],
  prefix: string,
  utility: string,
  token: string,
  property: string,
  cssVar: string,
) {
  lines.push(`@utility ${prefix}-${utility}-${token} {`)
  lines.push(`  ${property}: var(${cssVar});`)
  lines.push('}')
}

/**
 * 生成 Tailwind CSS v4 兼容主题 CSS 内容（推荐用于新项目）。
 *
 * 默认输出：
 * - `@theme inline` 中所有 token 都加 `ant-` namespace，例如 `--color-ant-primary`
 * - 对应 Tailwind v4 工具类：`bg-ant-primary`、`text-ant-lg`、`p-ant-lg`、`rounded-ant-lg`、`shadow-ant-card`
 * - 额外发出 `@utility a-bg-primary { ... }` 一类前缀简写（可通过 allowPrefixedUtilities 关闭）
 *
 * @example
 * ```css
 * @import "tailwindcss";
 * @import "@antdv-next/tailwind/compat.css";
 * ```
 *
 * @example
 * ```ts
 * import { generateCompatThemeCSS } from '@antdv-next/tailwind/v4'
 *
 * const css = generateCompatThemeCSS({
 *   tokenPrefix: 'antd',
 *   prefix: 'antd',
 * })
 * ```
 */
export function generateCompatThemeCSS(options: AntdV4CompatOptions = {}): string {
  const {
    antPrefix = 'ant',
    tokenPrefix = 'ant',
    allowPrefixedUtilities = true,
    prefix = 'a',
  } = options

  const ns = tokenPrefix ? `${tokenPrefix}-` : ''
  const lines: string[] = []

  lines.push('@theme inline {')

  // 调色板
  lines.push('  /* Ant Design Palette Colors */')
  for (const color of colorNames) {
    lines.push(`  --color-${ns}${color}: var(--${antPrefix}-${color});`)
    for (let i = 1; i <= 10; i++)
      lines.push(`  --color-${ns}${color}-${i}: var(--${antPrefix}-${color}-${i});`)
  }

  // 语义颜色
  lines.push('')
  lines.push('  /* Semantic Colors */')
  for (const [key, antKey] of COLOR_TOKENS)
    lines.push(`  --color-${ns}${key}: var(--${antPrefix}-color-${antKey});`)

  // Padding
  lines.push('')
  lines.push('  /* Padding Tokens */')
  for (const token of paddingTokens)
    lines.push(`  --padding-${ns}${token}: var(--${antPrefix}-padding-${token});`)

  // Margin
  lines.push('')
  lines.push('  /* Margin Tokens */')
  for (const token of marginTokens)
    lines.push(`  --margin-${ns}${token}: var(--${antPrefix}-margin-${token});`)

  // Radius
  lines.push('')
  lines.push('  /* Border Radius */')
  for (const [key, antKey] of RADIUS_TOKENS)
    lines.push(`  --radius-${ns}${key}: var(--${antPrefix}-${antKey});`)

  // Font size
  lines.push('')
  lines.push('  /* Font Size */')
  for (const [key, antKey] of FONT_SIZE_TOKENS)
    lines.push(`  --text-${ns}${key}: var(--${antPrefix}-${antKey});`)

  // Shadow
  lines.push('')
  lines.push('  /* Box Shadow */')
  for (const [key, antKey] of SHADOW_TOKENS)
    lines.push(`  --shadow-${ns}${key}: var(--${antPrefix}-${antKey});`)

  lines.push('}')

  // namespace 模式下，`p-ant-lg`、`m-ant-lg` 等方向性 spacing 工具类
  // 需要显式 @utility 注册（Tailwind v4 不会基于 --padding-* 自动生成方向性 utility）。
  if (tokenPrefix) {
    lines.push('')
    lines.push(`/* Padding Utilities (${tokenPrefix}-* namespace) */`)
    pushDirectionalSpacingUtilities(lines, 'padding', paddingTokens, paddingUtilityConfig, '', tokenPrefix)
    lines.push(`/* Margin Utilities (${tokenPrefix}-* namespace) */`)
    pushDirectionalSpacingUtilities(lines, 'margin', marginTokens, marginUtilityConfig, '', tokenPrefix)
  }

  // 可选：额外的 `${prefix}-*` 前缀简写
  if (allowPrefixedUtilities) {
    lines.push('')
    lines.push(`/* Prefixed utilities (${prefix}-*) */`)

    // 颜色：a-bg-* / a-color-* (a-c-*) / a-border-* (a-b-*)
    for (const [key, antKey] of COLOR_TOKENS) {
      const cssVar = `--${antPrefix}-color-${antKey}`
      pushPrefixedUtility(lines, prefix, 'bg', key, 'background-color', cssVar)
      pushPrefixedUtility(lines, prefix, 'color', key, 'color', cssVar)
      pushPrefixedUtility(lines, prefix, 'c', key, 'color', cssVar)
      pushPrefixedUtility(lines, prefix, 'border', key, 'border-color', cssVar)
      pushPrefixedUtility(lines, prefix, 'b', key, 'border-color', cssVar)
    }
    lines.push('')

    // 调色板：a-bg-blue, a-bg-blue-1 ...
    for (const color of colorNames) {
      const baseVar = `--${antPrefix}-${color}`
      pushPrefixedUtility(lines, prefix, 'bg', color, 'background-color', baseVar)
      pushPrefixedUtility(lines, prefix, 'color', color, 'color', baseVar)
      pushPrefixedUtility(lines, prefix, 'c', color, 'color', baseVar)
      pushPrefixedUtility(lines, prefix, 'border', color, 'border-color', baseVar)
      pushPrefixedUtility(lines, prefix, 'b', color, 'border-color', baseVar)
      for (let i = 1; i <= 10; i++) {
        const v = `--${antPrefix}-${color}-${i}`
        pushPrefixedUtility(lines, prefix, 'bg', `${color}-${i}`, 'background-color', v)
        pushPrefixedUtility(lines, prefix, 'color', `${color}-${i}`, 'color', v)
        pushPrefixedUtility(lines, prefix, 'c', `${color}-${i}`, 'color', v)
        pushPrefixedUtility(lines, prefix, 'border', `${color}-${i}`, 'border-color', v)
        pushPrefixedUtility(lines, prefix, 'b', `${color}-${i}`, 'border-color', v)
      }
    }
    lines.push('')

    // Padding / Margin
    for (const [utility, property] of paddingUtilityConfig) {
      for (const token of paddingTokens)
        pushPrefixedUtility(lines, prefix, utility, token, property, `--${antPrefix}-padding-${token}`)
    }
    lines.push('')
    for (const [utility, property] of marginUtilityConfig) {
      for (const token of marginTokens)
        pushPrefixedUtility(lines, prefix, utility, token, property, `--${antPrefix}-margin-${token}`)
    }
    lines.push('')

    // Radius：rounded / rd
    for (const [key, antKey] of RADIUS_TOKENS) {
      const cssVar = `--${antPrefix}-${antKey}`
      if (key === 'DEFAULT') {
        lines.push(`@utility ${prefix}-rounded {`)
        lines.push(`  border-radius: var(${cssVar});`)
        lines.push('}')
        lines.push(`@utility ${prefix}-rd {`)
        lines.push(`  border-radius: var(${cssVar});`)
        lines.push('}')
      }
      else {
        pushPrefixedUtility(lines, prefix, 'rounded', key, 'border-radius', cssVar)
        pushPrefixedUtility(lines, prefix, 'rd', key, 'border-radius', cssVar)
      }
    }
    lines.push('')

    // 文字字号：a-text-sm / a-text-lg ...
    for (const [key, antKey] of FONT_SIZE_TOKENS) {
      const cssVar = `--${antPrefix}-${antKey}`
      if (key === 'DEFAULT') {
        lines.push(`@utility ${prefix}-text {`)
        lines.push(`  font-size: var(${cssVar});`)
        lines.push('}')
      }
      else {
        pushPrefixedUtility(lines, prefix, 'text', key, 'font-size', cssVar)
      }
    }
    lines.push('')

    // 阴影：a-shadow / a-shadow-card ...
    for (const [key, antKey] of SHADOW_TOKENS) {
      const cssVar = `--${antPrefix}-${antKey}`
      if (key === 'DEFAULT') {
        lines.push(`@utility ${prefix}-shadow {`)
        lines.push(`  box-shadow: var(${cssVar});`)
        lines.push('}')
      }
      else {
        pushPrefixedUtility(lines, prefix, 'shadow', key, 'box-shadow', cssVar)
      }
    }
  }

  return lines.join('\n')
}

/** 预构建的兼容主题 CSS（默认配置） */
export const defaultCompatThemeCSS = generateCompatThemeCSS()
