/**
 * Tailwind CSS v4 主题生成器
 *
 * Tailwind CSS v4 使用 @theme 指令在 CSS 中定义主题变量
 * 这个模块生成对应的 CSS 内容，可以通过以下方式使用：
 *
 * 1. 直接导入 CSS 文件：@import "@antdv-next/tailwind/v4"
 * 2. 使用 generateThemeCSS() 函数动态生成
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

function pushDirectionalSpacingUtilities(
  lines: string[],
  variableNamespace: 'padding' | 'margin',
  tokens: ReadonlyArray<string>,
  utilityConfig: ReadonlyArray<readonly [string, string]>,
): void {
  for (const [utilityName, cssProperty] of utilityConfig) {
    for (const token of tokens) {
      lines.push(`@utility ${utilityName}-${token} {`)
      lines.push(`  ${cssProperty}: var(--${variableNamespace}-${token});`)
      lines.push('}')
    }
    lines.push('')
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

  const c = (key: string, src: string) => {
    lines.push(`  --color-${key}: var(--${antPrefix}-color-${src});`)
  }

  lines.push('')
  lines.push('  /* Brand / Primary Colors */')
  c('primary', 'primary')
  c('primary-hover', 'primary-hover')
  c('primary-active', 'primary-active')
  c('primary-bg', 'primary-bg')
  c('primary-bg-hover', 'primary-bg-hover')
  c('primary-border', 'primary-border')
  c('primary-border-hover', 'primary-border-hover')
  c('primary-text', 'primary-text')
  c('primary-text-hover', 'primary-text-hover')
  c('primary-text-active', 'primary-text-active')

  lines.push('')
  lines.push('  /* Functional Colors - Success */')
  c('success', 'success')
  c('success-hover', 'success-hover')
  c('success-active', 'success-active')
  c('success-bg', 'success-bg')
  c('success-bg-hover', 'success-bg-hover')
  c('success-border', 'success-border')
  c('success-border-hover', 'success-border-hover')
  c('success-text', 'success-text')
  c('success-text-hover', 'success-text-hover')
  c('success-text-active', 'success-text-active')

  lines.push('')
  lines.push('  /* Functional Colors - Warning */')
  c('warning', 'warning')
  c('warning-hover', 'warning-hover')
  c('warning-active', 'warning-active')
  c('warning-bg', 'warning-bg')
  c('warning-bg-hover', 'warning-bg-hover')
  c('warning-border', 'warning-border')
  c('warning-border-hover', 'warning-border-hover')
  c('warning-text', 'warning-text')
  c('warning-text-hover', 'warning-text-hover')
  c('warning-text-active', 'warning-text-active')
  c('warning-affix', 'warning-affix')

  lines.push('')
  lines.push('  /* Functional Colors - Error */')
  c('error', 'error')
  c('error-hover', 'error-hover')
  c('error-active', 'error-active')
  c('error-bg', 'error-bg')
  c('error-bg-hover', 'error-bg-hover')
  c('error-bg-filled-hover', 'error-bg-filled-hover')
  c('error-bg-active', 'error-bg-active')
  c('error-border', 'error-border')
  c('error-border-hover', 'error-border-hover')
  c('error-text', 'error-text')
  c('error-text-hover', 'error-text-hover')
  c('error-text-active', 'error-text-active')
  c('error-affix', 'error-affix')

  lines.push('')
  lines.push('  /* Functional Colors - Info */')
  c('info', 'info')
  c('info-hover', 'info-hover')
  c('info-active', 'info-active')
  c('info-bg', 'info-bg')
  c('info-bg-hover', 'info-bg-hover')
  c('info-border', 'info-border')
  c('info-border-hover', 'info-border-hover')
  c('info-text', 'info-text')
  c('info-text-hover', 'info-text-hover')
  c('info-text-active', 'info-text-active')

  lines.push('')
  lines.push('  /* Link Colors */')
  c('link', 'link')
  c('link-hover', 'link-hover')
  c('link-active', 'link-active')

  lines.push('')
  lines.push('  /* Text Colors */')
  c('text', 'text')
  c('text-secondary', 'text-secondary')
  c('text-tertiary', 'text-tertiary')
  c('text-quaternary', 'text-quaternary')
  c('text-quat', 'text-quaternary')
  c('text-placeholder', 'text-placeholder')
  c('text-disabled', 'text-disabled')
  c('text-heading', 'text-heading')
  c('text-label', 'text-label')
  c('text-description', 'text-description')
  c('text-light-solid', 'text-light-solid')
  c('main', 'text')
  c('sec', 'text-secondary')
  c('quat', 'text-quaternary')

  lines.push('')
  lines.push('  /* Fill Colors */')
  c('fill', 'fill')
  c('fill-secondary', 'fill-secondary')
  c('fill-tertiary', 'fill-tertiary')
  c('fill-quaternary', 'fill-quaternary')
  c('fill-content', 'fill-content')
  c('fill-content-hover', 'fill-content-hover')
  c('fill-alter', 'fill-alter')

  lines.push('')
  lines.push('  /* Background Colors */')
  c('base', 'bg-base')
  c('container', 'bg-container')
  c('container-disabled', 'bg-container-disabled')
  c('layout', 'bg-layout')
  c('elevated', 'bg-elevated')
  c('spotlight', 'bg-spotlight')
  c('blur', 'bg-blur')
  c('mask', 'bg-mask')
  c('solid', 'bg-solid')
  c('solid-hover', 'bg-solid-hover')
  c('solid-active', 'bg-solid-active')
  c('split', 'split')

  lines.push('')
  lines.push('  /* Border Colors */')
  c('border', 'border')
  c('border-secondary', 'border-secondary')
  c('border-sec', 'border-secondary')
  c('border-disabled', 'border-disabled')
  c('border-bg', 'border-bg')

  lines.push('')
  lines.push('  /* Icon Colors */')
  c('icon', 'icon')
  c('icon-hover', 'icon-hover')

  lines.push('')
  lines.push('  /* Misc */')
  c('highlight', 'highlight')
  c('white', 'white')

  // 间距变量（拆分 padding / margin，避免污染 max-w-md 等 spacing 相关工具类）
  lines.push('')
  lines.push('  /* Padding Tokens */')
  for (const token of paddingTokens) {
    lines.push(`  --padding-${token}: var(--${antPrefix}-padding-${token});`)
  }

  lines.push('')
  lines.push('  /* Margin Tokens */')
  for (const token of marginTokens) {
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
  pushDirectionalSpacingUtilities(lines, 'padding', paddingTokens, paddingUtilityConfig)
  lines.push('/* Margin Utilities */')
  pushDirectionalSpacingUtilities(lines, 'margin', marginTokens, marginUtilityConfig)

  return lines.join('\n')
}

/**
 * 生成预构建的主题 CSS（使用默认配置）
 */
export const defaultThemeCSS = generateThemeCSS()
