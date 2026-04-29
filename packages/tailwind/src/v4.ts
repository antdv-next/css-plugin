/**
 * Tailwind CSS v4 主题生成器
 *
 * Tailwind CSS v4 使用 @theme 指令在 CSS 中定义主题变量
 * 这个模块生成对应的 CSS 内容，可以通过以下方式使用：
 *
 * 1. 直接导入 CSS 文件：@import "@antdv-next/tailwind/v4"
 * 2. 使用 generateThemeCSS() 函数动态生成
 */

import type { AntdPluginOptions, AntdV4CompatOptions } from './types'
import { colorNames } from './types'

const spacingTokens = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const

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

function pushDirectionalSpacingUtilities(
  lines: string[],
  variableNamespace: 'padding' | 'margin',
  utilityConfig: ReadonlyArray<readonly [string, string]>,
): void {
  for (const [utilityName, cssProperty] of utilityConfig) {
    for (const token of spacingTokens) {
      lines.push(`@utility ${utilityName}-${token} {`)
      lines.push(`  ${cssProperty}: var(--${variableNamespace}-${token});`)
      lines.push('}')
    }
    lines.push('')
  }
}

function withTokenPrefix(tokenPrefix: string, token: string): string {
  return `${tokenPrefix}-${token}`
}

function pushCompatColorTokens(lines: string[], antPrefix: string, tokenPrefix: string): void {
  lines.push('  /* Ant Design Palette Colors */')
  for (const color of colorNames) {
    lines.push(`  --color-${withTokenPrefix(tokenPrefix, color)}: var(--${antPrefix}-${color});`)
    for (let i = 1; i <= 10; i++) {
      lines.push(`  --color-${withTokenPrefix(tokenPrefix, `${color}-${i}`)}: var(--${antPrefix}-${color}-${i});`)
    }
  }

  lines.push('')
  lines.push('  /* Brand / Primary Colors */')
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'primary')}: var(--${antPrefix}-color-primary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'primary-hover')}: var(--${antPrefix}-color-primary-hover);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'primary-active')}: var(--${antPrefix}-color-primary-active);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'primary-bg')}: var(--${antPrefix}-color-primary-bg);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'primary-bg-hover')}: var(--${antPrefix}-color-primary-bg-hover);`)

  lines.push('')
  lines.push('  /* Functional Colors */')
  for (const status of ['success', 'warning', 'error'] as const) {
    lines.push(`  --color-${withTokenPrefix(tokenPrefix, status)}: var(--${antPrefix}-color-${status});`)
    lines.push(`  --color-${withTokenPrefix(tokenPrefix, `${status}-bg`)}: var(--${antPrefix}-color-${status}-bg);`)
    lines.push(`  --color-${withTokenPrefix(tokenPrefix, `${status}-border`)}: var(--${antPrefix}-color-${status}-border);`)
    lines.push(`  --color-${withTokenPrefix(tokenPrefix, `${status}-hover`)}: var(--${antPrefix}-color-${status}-hover);`)
  }
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'info')}: var(--${antPrefix}-color-info);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'info-bg')}: var(--${antPrefix}-color-info-bg);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'info-border')}: var(--${antPrefix}-color-info-border);`)

  lines.push('')
  lines.push('  /* Link Colors */')
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'link')}: var(--${antPrefix}-color-link);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'link-hover')}: var(--${antPrefix}-color-link-hover);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'link-active')}: var(--${antPrefix}-color-link-active);`)

  lines.push('')
  lines.push('  /* Text / Fill / Background Colors */')
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'text')}: var(--${antPrefix}-color-text);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'text-secondary')}: var(--${antPrefix}-color-text-secondary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'text-tertiary')}: var(--${antPrefix}-color-text-tertiary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'text-quaternary')}: var(--${antPrefix}-color-text-quaternary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'text-quat')}: var(--${antPrefix}-color-text-quaternary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'main')}: var(--${antPrefix}-color-text);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'sec')}: var(--${antPrefix}-color-text-secondary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'quat')}: var(--${antPrefix}-color-text-quaternary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'fill')}: var(--${antPrefix}-color-fill);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'fill-secondary')}: var(--${antPrefix}-color-fill-secondary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'fill-tertiary')}: var(--${antPrefix}-color-fill-tertiary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'fill-quaternary')}: var(--${antPrefix}-color-fill-quaternary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'base')}: var(--${antPrefix}-color-bg-base);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'container')}: var(--${antPrefix}-color-bg-container);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'layout')}: var(--${antPrefix}-color-bg-layout);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'elevated')}: var(--${antPrefix}-color-bg-elevated);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'mask')}: var(--${antPrefix}-color-bg-mask);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'split')}: var(--${antPrefix}-color-split);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'border')}: var(--${antPrefix}-color-border);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'border-secondary')}: var(--${antPrefix}-color-border-secondary);`)
  lines.push(`  --color-${withTokenPrefix(tokenPrefix, 'border-sec')}: var(--${antPrefix}-color-border-secondary);`)
}

function pushCompatThemeTokens(lines: string[], antPrefix: string, tokenPrefix: string): void {
  pushCompatColorTokens(lines, antPrefix, tokenPrefix)

  lines.push('')
  lines.push('  /* Padding / Margin Tokens */')
  for (const token of spacingTokens) {
    lines.push(`  --padding-${withTokenPrefix(tokenPrefix, token)}: var(--${antPrefix}-padding-${token});`)
    lines.push(`  --margin-${withTokenPrefix(tokenPrefix, token)}: var(--${antPrefix}-margin-${token});`)
  }

  lines.push('')
  lines.push('  /* Border Radius */')
  lines.push(`  --radius-${withTokenPrefix(tokenPrefix, 'xs')}: var(--${antPrefix}-border-radius-xs);`)
  lines.push(`  --radius-${withTokenPrefix(tokenPrefix, 'sm')}: var(--${antPrefix}-border-radius-sm);`)
  lines.push(`  --radius-${tokenPrefix}: var(--${antPrefix}-border-radius);`)
  lines.push(`  --radius-${withTokenPrefix(tokenPrefix, 'lg')}: var(--${antPrefix}-border-radius-lg);`)

  lines.push('')
  lines.push('  /* Font Size */')
  lines.push(`  --text-${withTokenPrefix(tokenPrefix, 'sm')}: var(--${antPrefix}-font-size-sm);`)
  lines.push(`  --text-${tokenPrefix}: var(--${antPrefix}-font-size);`)
  lines.push(`  --text-${withTokenPrefix(tokenPrefix, 'lg')}: var(--${antPrefix}-font-size-lg);`)
  lines.push(`  --text-${withTokenPrefix(tokenPrefix, 'xl')}: var(--${antPrefix}-font-size-xl);`)
  lines.push(`  --text-${withTokenPrefix(tokenPrefix, 'h1')}: var(--${antPrefix}-font-size-heading-1);`)
  lines.push(`  --text-${withTokenPrefix(tokenPrefix, 'h2')}: var(--${antPrefix}-font-size-heading-2);`)
  lines.push(`  --text-${withTokenPrefix(tokenPrefix, 'h3')}: var(--${antPrefix}-font-size-heading-3);`)

  lines.push('')
  lines.push('  /* Box Shadow */')
  lines.push(`  --shadow-${tokenPrefix}: var(--${antPrefix}-box-shadow);`)
  lines.push(`  --shadow-${withTokenPrefix(tokenPrefix, 'secondary')}: var(--${antPrefix}-box-shadow-secondary);`)
  lines.push(`  --shadow-${withTokenPrefix(tokenPrefix, 'sec')}: var(--${antPrefix}-box-shadow-secondary);`)
  lines.push(`  --shadow-${withTokenPrefix(tokenPrefix, 'tertiary')}: var(--${antPrefix}-box-shadow-tertiary);`)
  lines.push(`  --shadow-${withTokenPrefix(tokenPrefix, 'ter')}: var(--${antPrefix}-box-shadow-tertiary);`)
  lines.push(`  --shadow-${withTokenPrefix(tokenPrefix, 'card')}: var(--${antPrefix}-box-shadow-card);`)
  lines.push(`  --shadow-${withTokenPrefix(tokenPrefix, 'arrow')}: var(--${antPrefix}-box-shadow-popover-arrow);`)
  for (const [name, cssVar] of [
    ['drawer-right', 'box-shadow-drawer-right'],
    ['drawer-left', 'box-shadow-drawer-left'],
    ['drawer-up', 'box-shadow-drawer-up'],
    ['drawer-down', 'box-shadow-drawer-down'],
    ['drawer-r', 'box-shadow-drawer-right'],
    ['drawer-l', 'box-shadow-drawer-left'],
    ['drawer-u', 'box-shadow-drawer-up'],
    ['drawer-d', 'box-shadow-drawer-down'],
  ] as const) {
    lines.push(`  --shadow-${withTokenPrefix(tokenPrefix, name)}: var(--${antPrefix}-${cssVar});`)
  }
}

function pushCompatPrefixedUtilities(lines: string[], prefix: string, tokenPrefix: string): void {
  const p = prefix ? `${prefix}-` : ''
  if (!p)
    return

  lines.push('/* Prefixed Color Utilities */')
  lines.push(`@utility ${p}color-* {`)
  lines.push(`  color: --value(--color-${tokenPrefix}-*);`)
  lines.push('}')
  lines.push(`@utility ${p}c-* {`)
  lines.push(`  color: --value(--color-${tokenPrefix}-*);`)
  lines.push('}')
  lines.push(`@utility ${p}bg-* {`)
  lines.push(`  background-color: --value(--color-${tokenPrefix}-*);`)
  lines.push('}')
  lines.push(`@utility ${p}border {`)
  lines.push(`  border-color: var(--color-${tokenPrefix}-border);`)
  lines.push('}')
  lines.push(`@utility ${p}border-* {`)
  lines.push(`  border-color: --value(--color-${tokenPrefix}-*);`)
  lines.push('}')
  lines.push(`@utility ${p}b {`)
  lines.push(`  border-color: var(--color-${tokenPrefix}-border);`)
  lines.push('}')
  lines.push(`@utility ${p}b-* {`)
  lines.push(`  border-color: --value(--color-${tokenPrefix}-*);`)
  lines.push('}')
  lines.push('')

  lines.push('/* Prefixed Text / Radius / Shadow Utilities */')
  lines.push(`@utility ${p}text-* {`)
  lines.push(`  color: --value(--color-${tokenPrefix}-*);`)
  lines.push(`  font-size: --value(--text-${tokenPrefix}-*);`)
  lines.push('}')
  lines.push(`@utility ${p}rounded {`)
  lines.push(`  border-radius: var(--radius-${tokenPrefix});`)
  lines.push('}')
  lines.push(`@utility ${p}rounded-* {`)
  lines.push(`  border-radius: --value(--radius-${tokenPrefix}-*);`)
  lines.push('}')
  lines.push(`@utility ${p}rd {`)
  lines.push(`  border-radius: var(--radius-${tokenPrefix});`)
  lines.push('}')
  lines.push(`@utility ${p}rd-* {`)
  lines.push(`  border-radius: --value(--radius-${tokenPrefix}-*);`)
  lines.push('}')
  lines.push(`@utility ${p}shadow {`)
  lines.push(`  --tw-shadow: var(--shadow-${tokenPrefix});`)
  lines.push('  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);')
  lines.push('}')
  lines.push(`@utility ${p}shadow-* {`)
  lines.push(`  --tw-shadow: --value(--shadow-${tokenPrefix}-*);`)
  lines.push('  box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);')
  lines.push('}')
  lines.push('')

  lines.push('/* Prefixed Padding Utilities */')
  for (const [utilityName, cssProperty] of paddingUtilityConfig) {
    lines.push(`@utility ${p}${utilityName}-* {`)
    lines.push(`  ${cssProperty}: --value(--padding-${tokenPrefix}-*);`)
    lines.push('}')
  }
  lines.push('')
  lines.push('/* Prefixed Margin Utilities */')
  for (const [utilityName, cssProperty] of marginUtilityConfig) {
    lines.push(`@utility ${p}${utilityName}-* {`)
    lines.push(`  ${cssProperty}: --value(--margin-${tokenPrefix}-*);`)
    lines.push('}')
  }
}

/**
 * 生成 Tailwind CSS v4 主题 CSS 内容
 *
 * Tailwind v4 使用 @theme 指令定义主题变量，变量命名约定：
 * - --color-*: 颜色工具类 (bg-*, text-*, border-*)
 * - --padding-*: padding 工具类 (p-*, px-*, py-*)
 * - --margin-*: margin 工具类 (m-*, mx-*, my-*)
 * - --radius-*: 圆角工具类 (rounded-*)
 * - --text-*: 字体大小工具类 (text-sm, text-lg)
 * - --shadow-*: 阴影工具类 (shadow-*)
 *
 * @param options 配置选项
 * @returns 生成的 CSS 字符串
 */
export function generateThemeCSS(options: AntdPluginOptions = {}): string {
  const { antPrefix = 'ant' } = options

  const lines: string[] = []

  lines.push('@theme inline {')

  // 颜色变量 --color-*
  lines.push('  /* Ant Design Palette Colors */')
  for (const color of colorNames) {
    // 基础色
    lines.push(`  --color-${color}: var(--${antPrefix}-${color});`)
    // 1-10 色阶
    for (let i = 1; i <= 10; i++) {
      lines.push(`  --color-${color}-${i}: var(--${antPrefix}-${color}-${i});`)
    }
  }

  lines.push('')
  lines.push('  /* Brand / Primary Colors */')
  lines.push(`  --color-primary: var(--${antPrefix}-color-primary);`)
  lines.push(`  --color-primary-hover: var(--${antPrefix}-color-primary-hover);`)
  lines.push(`  --color-primary-active: var(--${antPrefix}-color-primary-active);`)
  lines.push(`  --color-primary-bg: var(--${antPrefix}-color-primary-bg);`)
  lines.push(`  --color-primary-bg-hover: var(--${antPrefix}-color-primary-bg-hover);`)

  lines.push('')
  lines.push('  /* Functional Colors - Success */')
  lines.push(`  --color-success: var(--${antPrefix}-color-success);`)
  lines.push(`  --color-success-bg: var(--${antPrefix}-color-success-bg);`)
  lines.push(`  --color-success-border: var(--${antPrefix}-color-success-border);`)
  lines.push(`  --color-success-hover: var(--${antPrefix}-color-success-hover);`)

  lines.push('')
  lines.push('  /* Functional Colors - Warning */')
  lines.push(`  --color-warning: var(--${antPrefix}-color-warning);`)
  lines.push(`  --color-warning-bg: var(--${antPrefix}-color-warning-bg);`)
  lines.push(`  --color-warning-border: var(--${antPrefix}-color-warning-border);`)
  lines.push(`  --color-warning-hover: var(--${antPrefix}-color-warning-hover);`)

  lines.push('')
  lines.push('  /* Functional Colors - Error */')
  lines.push(`  --color-error: var(--${antPrefix}-color-error);`)
  lines.push(`  --color-error-bg: var(--${antPrefix}-color-error-bg);`)
  lines.push(`  --color-error-border: var(--${antPrefix}-color-error-border);`)
  lines.push(`  --color-error-hover: var(--${antPrefix}-color-error-hover);`)

  lines.push('')
  lines.push('  /* Functional Colors - Info */')
  lines.push(`  --color-info: var(--${antPrefix}-color-info);`)
  lines.push(`  --color-info-bg: var(--${antPrefix}-color-info-bg);`)
  lines.push(`  --color-info-border: var(--${antPrefix}-color-info-border);`)

  lines.push('')
  lines.push('  /* Link Colors */')
  lines.push(`  --color-link: var(--${antPrefix}-color-link);`)
  lines.push(`  --color-link-hover: var(--${antPrefix}-color-link-hover);`)
  lines.push(`  --color-link-active: var(--${antPrefix}-color-link-active);`)

  lines.push('')
  lines.push('  /* Text Colors */')
  lines.push(`  --color-text: var(--${antPrefix}-color-text);`)
  lines.push(`  --color-text-secondary: var(--${antPrefix}-color-text-secondary);`)
  lines.push(`  --color-text-tertiary: var(--${antPrefix}-color-text-tertiary);`)
  lines.push(`  --color-text-quaternary: var(--${antPrefix}-color-text-quaternary);`)
  lines.push(`  --color-text-quat: var(--${antPrefix}-color-text-quaternary);`)
  lines.push(`  --color-main: var(--${antPrefix}-color-text);`)
  lines.push(`  --color-sec: var(--${antPrefix}-color-text-secondary);`)
  lines.push(`  --color-quat: var(--${antPrefix}-color-text-quaternary);`)
  lines.push(`  --color-fill: var(--${antPrefix}-color-fill);`)
  lines.push(`  --color-fill-secondary: var(--${antPrefix}-color-fill-secondary);`)
  lines.push(`  --color-fill-tertiary: var(--${antPrefix}-color-fill-tertiary);`)
  lines.push(`  --color-fill-quaternary: var(--${antPrefix}-color-fill-quaternary);`)

  lines.push('')
  lines.push('  /* Background Colors */')
  lines.push(`  --color-base: var(--${antPrefix}-color-bg-base);`)
  lines.push(`  --color-container: var(--${antPrefix}-color-bg-container);`)
  lines.push(`  --color-layout: var(--${antPrefix}-color-bg-layout);`)
  lines.push(`  --color-elevated: var(--${antPrefix}-color-bg-elevated);`)
  lines.push(`  --color-mask: var(--${antPrefix}-color-bg-mask);`)
  lines.push(`  --color-split: var(--${antPrefix}-color-split);`)

  lines.push('')
  lines.push('  /* Border Colors */')
  lines.push(`  --color-border: var(--${antPrefix}-color-border);`)
  lines.push(`  --color-border-secondary: var(--${antPrefix}-color-border-secondary);`)
  lines.push(`  --color-border-sec: var(--${antPrefix}-color-border-secondary);`)

  // 间距变量（拆分 padding / margin，避免污染 max-w-md 等 spacing 相关工具类）
  lines.push('')
  lines.push('  /* Padding Tokens */')
  for (const token of spacingTokens) {
    lines.push(`  --padding-${token}: var(--${antPrefix}-padding-${token});`)
  }

  lines.push('')
  lines.push('  /* Margin Tokens */')
  for (const token of spacingTokens) {
    lines.push(`  --margin-${token}: var(--${antPrefix}-margin-${token});`)
  }

  // 圆角变量 --radius-*
  lines.push('')
  lines.push('  /* Border Radius */')
  lines.push(`  --radius-xs: var(--${antPrefix}-border-radius-xs);`)
  lines.push(`  --radius-sm: var(--${antPrefix}-border-radius-sm);`)
  lines.push(`  --radius-DEFAULT: var(--${antPrefix}-border-radius);`)
  lines.push(`  --radius-lg: var(--${antPrefix}-border-radius-lg);`)

  // 字体大小变量 --text-*
  lines.push('')
  lines.push('  /* Font Size */')
  lines.push(`  --text-sm: var(--${antPrefix}-font-size-sm);`)
  lines.push(`  --text-DEFAULT: var(--${antPrefix}-font-size);`)
  lines.push(`  --text-lg: var(--${antPrefix}-font-size-lg);`)
  lines.push(`  --text-xl: var(--${antPrefix}-font-size-xl);`)
  lines.push(`  --text-h1: var(--${antPrefix}-font-size-heading-1);`)
  lines.push(`  --text-h2: var(--${antPrefix}-font-size-heading-2);`)
  lines.push(`  --text-h3: var(--${antPrefix}-font-size-heading-3);`)

  // 阴影变量 --shadow-*
  lines.push('')
  lines.push('  /* Box Shadow */')
  lines.push(`  --shadow-DEFAULT: var(--${antPrefix}-box-shadow);`)
  lines.push(`  --shadow-secondary: var(--${antPrefix}-box-shadow-secondary);`)
  lines.push(`  --shadow-sec: var(--${antPrefix}-box-shadow-secondary);`)
  lines.push(`  --shadow-tertiary: var(--${antPrefix}-box-shadow-tertiary);`)
  lines.push(`  --shadow-ter: var(--${antPrefix}-box-shadow-tertiary);`)
  lines.push(`  --shadow-card: var(--${antPrefix}-box-shadow-card);`)
  lines.push(`  --shadow-arrow: var(--${antPrefix}-box-shadow-popover-arrow);`)
  lines.push(`  --shadow-drawer-right: var(--${antPrefix}-box-shadow-drawer-right);`)
  lines.push(`  --shadow-drawer-left: var(--${antPrefix}-box-shadow-drawer-left);`)
  lines.push(`  --shadow-drawer-up: var(--${antPrefix}-box-shadow-drawer-up);`)
  lines.push(`  --shadow-drawer-down: var(--${antPrefix}-box-shadow-drawer-down);`)
  lines.push(`  --shadow-drawer-r: var(--${antPrefix}-box-shadow-drawer-right);`)
  lines.push(`  --shadow-drawer-l: var(--${antPrefix}-box-shadow-drawer-left);`)
  lines.push(`  --shadow-drawer-u: var(--${antPrefix}-box-shadow-drawer-up);`)
  lines.push(`  --shadow-drawer-d: var(--${antPrefix}-box-shadow-drawer-down);`)

  lines.push('}')
  lines.push('')
  lines.push('/* Padding Utilities */')
  pushDirectionalSpacingUtilities(lines, 'padding', paddingUtilityConfig)
  lines.push('/* Margin Utilities */')
  pushDirectionalSpacingUtilities(lines, 'margin', marginUtilityConfig)

  return lines.join('\n')
}

/**
 * 生成 Tailwind CSS v4 兼容主题 CSS。
 *
 * 该模式使用 Tailwind v4 原生 namespace 隔离 token：
 * - --color-ant-primary -> bg-ant-primary / text-ant-primary
 *
 * 同时默认额外生成 UnoCSS 风格的 prefix utilities：
 * - a-bg-primary / a-text-primary / a-rounded-sm
 */
export function generateCompatThemeCSS(options: AntdV4CompatOptions = {}): string {
  const {
    antPrefix = 'ant',
    prefix = 'a',
    tokenPrefix = 'ant',
    allowPrefixedUtilities = true,
  } = options

  const lines: string[] = []

  lines.push('@theme inline {')
  pushCompatThemeTokens(lines, antPrefix, tokenPrefix)
  lines.push('}')
  lines.push('')

  if (allowPrefixedUtilities)
    pushCompatPrefixedUtilities(lines, prefix, tokenPrefix)

  return lines.join('\n')
}

/**
 * 生成预构建的主题 CSS（使用默认配置）
 */
export const defaultThemeCSS = generateThemeCSS()

/**
 * 生成预构建的 v4 兼容主题 CSS（使用默认配置）
 */
export const defaultCompatThemeCSS = generateCompatThemeCSS()
