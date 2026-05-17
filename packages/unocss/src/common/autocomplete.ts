/**
 * 自动补全模板生成函数
 */

import { colorNames } from './types'

export interface AutocompleteOptions {
  prefix: string
  allowUnprefixed?: boolean
  allowPrefixedUtilities?: boolean
  tokenPrefix?: string
  themeKeys: {
    rounded: 'borderRadius' | 'radius'
    shadow: 'boxShadow' | 'shadow'
    text: 'fontSize' | 'text'
  }
}

// 调色板颜色键：blue|blue-1|...|blue-10|purple|...
function buildColorPaletteEnum() {
  const keys: string[] = []
  for (const name of colorNames) {
    keys.push(name)
    for (let i = 1; i <= 10; i++) keys.push(`${name}-${i}`)
  }
  return keys.join('|')
}

// 固定的 AntD 主题枚举值（避免污染 $spacing/$colors 等全局 token）
const SPACING_ENUM = '(xxs|xs|sm|md|lg|xl|xxl|xxxl)'
const SEMANTIC_COLORS = 'primary|primary-hover|primary-active|primary-bg|primary-bg-hover|success|success-bg|success-border|success-hover|warning|warning-bg|warning-border|warning-hover|error|error-bg|error-border|error-hover|info|info-bg|info-border|link|link-hover|link-active|text|text-secondary|text-tertiary|text-quat|text-quaternary|fill|fill-secondary|fill-tertiary|fill-quaternary|white|base|container|layout|elevated|mask|main|sec|quat|split|border|border-sec'
const COLOR_ENUM = `(${buildColorPaletteEnum()}|${SEMANTIC_COLORS})`
const RADIUS_ENUM = '(xs|sm|lg)'
const FONT_ENUM = '(sm|lg|xl|h1|h2|h3)'
const TEXT_ENUM = '(sm|lg|xl|h1|h2|h3)'
const SHADOW_ENUM = '(sec|secondary|ter|tertiary|card|arrow|drawer-r|drawer-l|drawer-u|drawer-d|drawer-right|drawer-left|drawer-up|drawer-down)'

/**
 * 为指定前缀创建模板数组
 */
function createTemplatesForPrefix(prefix: string, themeKeys: AutocompleteOptions['themeKeys']) {
  const p = prefix ? `${prefix}-` : ''
  const textEnum = themeKeys.text === 'text' ? TEXT_ENUM : FONT_ENUM

  return [
    // 颜色类
    `${p}color-${COLOR_ENUM}`,
    `${p}c-${COLOR_ENUM}`,
    `${p}bg-${COLOR_ENUM}`,

    // Border 边框色
    `${p}border-${COLOR_ENUM}`,
    `${p}b-${COLOR_ENUM}`,
    // Border 方向性
    `${p}border-t-${COLOR_ENUM}`,
    `${p}bt-${COLOR_ENUM}`,
    `${p}border-r-${COLOR_ENUM}`,
    `${p}br-${COLOR_ENUM}`,
    `${p}border-b-${COLOR_ENUM}`,
    `${p}bb-${COLOR_ENUM}`,
    `${p}border-l-${COLOR_ENUM}`,
    `${p}bl-${COLOR_ENUM}`,
    `${p}border-x-${COLOR_ENUM}`,
    `${p}bx-${COLOR_ENUM}`,
    `${p}border-y-${COLOR_ENUM}`,
    `${p}by-${COLOR_ENUM}`,

    // Margin 类
    `${p}m-${SPACING_ENUM}`,
    `${p}mt-${SPACING_ENUM}`,
    `${p}mb-${SPACING_ENUM}`,
    `${p}ml-${SPACING_ENUM}`,
    `${p}mr-${SPACING_ENUM}`,
    `${p}mx-${SPACING_ENUM}`,
    `${p}my-${SPACING_ENUM}`,

    // Padding 类
    `${p}p-${SPACING_ENUM}`,
    `${p}pt-${SPACING_ENUM}`,
    `${p}pb-${SPACING_ENUM}`,
    `${p}pl-${SPACING_ENUM}`,
    `${p}pr-${SPACING_ENUM}`,
    `${p}px-${SPACING_ENUM}`,
    `${p}py-${SPACING_ENUM}`,

    // 字体
    `${p}text-${textEnum}`,

    // Rounded 圆角
    `${p}rounded`,
    `${p}rd`,
    `${p}rounded-${RADIUS_ENUM}`,
    `${p}rd-${RADIUS_ENUM}`,
    // 角落圆角
    `${p}rounded-tl`,
    `${p}rounded-tl-${RADIUS_ENUM}`,
    `${p}rounded-tr`,
    `${p}rounded-tr-${RADIUS_ENUM}`,
    `${p}rounded-bl`,
    `${p}rounded-bl-${RADIUS_ENUM}`,
    `${p}rounded-br`,
    `${p}rounded-br-${RADIUS_ENUM}`,
    // 边侧圆角
    `${p}rounded-t`,
    `${p}rounded-t-${RADIUS_ENUM}`,
    `${p}rounded-r`,
    `${p}rounded-r-${RADIUS_ENUM}`,
    `${p}rounded-b`,
    `${p}rounded-b-${RADIUS_ENUM}`,
    `${p}rounded-l`,
    `${p}rounded-l-${RADIUS_ENUM}`,

    // Shadow 阴影
    `${p}shadow`,
    `${p}shadow-${SHADOW_ENUM}`,
  ]
}

function createNamespacedTemplates(tokenPrefix: string, themeKeys: AutocompleteOptions['themeKeys']) {
  const ns = `${tokenPrefix}-`
  const textEnum = themeKeys.text === 'text' ? TEXT_ENUM : FONT_ENUM

  return [
    `color-${tokenPrefix}`,
    `color-${ns}${COLOR_ENUM}`,
    `c-${tokenPrefix}`,
    `c-${ns}${COLOR_ENUM}`,
    `bg-${tokenPrefix}`,
    `bg-${ns}${COLOR_ENUM}`,

    `border-${tokenPrefix}`,
    `border-${ns}${COLOR_ENUM}`,
    `b-${tokenPrefix}`,
    `b-${ns}${COLOR_ENUM}`,
    `border-t-${tokenPrefix}`,
    `border-t-${ns}${COLOR_ENUM}`,
    `bt-${tokenPrefix}`,
    `bt-${ns}${COLOR_ENUM}`,
    `border-r-${tokenPrefix}`,
    `border-r-${ns}${COLOR_ENUM}`,
    `br-${tokenPrefix}`,
    `br-${ns}${COLOR_ENUM}`,
    `border-b-${tokenPrefix}`,
    `border-b-${ns}${COLOR_ENUM}`,
    `bb-${tokenPrefix}`,
    `bb-${ns}${COLOR_ENUM}`,
    `border-l-${tokenPrefix}`,
    `border-l-${ns}${COLOR_ENUM}`,
    `bl-${tokenPrefix}`,
    `bl-${ns}${COLOR_ENUM}`,
    `border-x-${tokenPrefix}`,
    `border-x-${ns}${COLOR_ENUM}`,
    `bx-${tokenPrefix}`,
    `bx-${ns}${COLOR_ENUM}`,
    `border-y-${tokenPrefix}`,
    `border-y-${ns}${COLOR_ENUM}`,
    `by-${tokenPrefix}`,
    `by-${ns}${COLOR_ENUM}`,

    `m-${ns}${SPACING_ENUM}`,
    `mt-${ns}${SPACING_ENUM}`,
    `mb-${ns}${SPACING_ENUM}`,
    `ml-${ns}${SPACING_ENUM}`,
    `mr-${ns}${SPACING_ENUM}`,
    `mx-${ns}${SPACING_ENUM}`,
    `my-${ns}${SPACING_ENUM}`,

    `p-${ns}${SPACING_ENUM}`,
    `pt-${ns}${SPACING_ENUM}`,
    `pb-${ns}${SPACING_ENUM}`,
    `pl-${ns}${SPACING_ENUM}`,
    `pr-${ns}${SPACING_ENUM}`,
    `px-${ns}${SPACING_ENUM}`,
    `py-${ns}${SPACING_ENUM}`,

    `text-${ns}${textEnum}`,

    `rounded-${tokenPrefix}`,
    `rd-${tokenPrefix}`,
    `rounded-${ns}${RADIUS_ENUM}`,
    `rd-${ns}${RADIUS_ENUM}`,
    `rounded-tl-${tokenPrefix}`,
    `rounded-tl-${ns}${RADIUS_ENUM}`,
    `rounded-tr-${tokenPrefix}`,
    `rounded-tr-${ns}${RADIUS_ENUM}`,
    `rounded-bl-${tokenPrefix}`,
    `rounded-bl-${ns}${RADIUS_ENUM}`,
    `rounded-br-${tokenPrefix}`,
    `rounded-br-${ns}${RADIUS_ENUM}`,
    `rounded-t-${tokenPrefix}`,
    `rounded-t-${ns}${RADIUS_ENUM}`,
    `rounded-r-${tokenPrefix}`,
    `rounded-r-${ns}${RADIUS_ENUM}`,
    `rounded-b-${tokenPrefix}`,
    `rounded-b-${ns}${RADIUS_ENUM}`,
    `rounded-l-${tokenPrefix}`,
    `rounded-l-${ns}${RADIUS_ENUM}`,

    `shadow-${tokenPrefix}`,
    `shadow-${ns}${SHADOW_ENUM}`,
  ]
}

/**
 * 创建自动补全模板（同时支持带前缀和不带前缀）
 */
export function createAutocompleteTemplates(options: AutocompleteOptions) {
  const { prefix, allowUnprefixed = true, allowPrefixedUtilities = true, tokenPrefix = 'ant', themeKeys } = options

  return Array.from(new Set([
    // 带前缀的模板 (如 a-mx-lg)
    ...(allowPrefixedUtilities ? createTemplatesForPrefix(prefix, themeKeys) : []),
    // 不带前缀的模板 (如 mx-lg)
    ...(allowUnprefixed ? createTemplatesForPrefix('', themeKeys) : []),
    // 推荐的 namespace 安全模板 (如 text-ant-sm, bg-ant-primary)
    ...createNamespacedTemplates(tokenPrefix, themeKeys),
  ]))
}
