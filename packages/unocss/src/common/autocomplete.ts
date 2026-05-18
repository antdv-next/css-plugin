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
// 与 antdv 1.3.0 内置变量对齐：padding 仅到 xl；margin 到 xxl
const PADDING_ENUM = '(xxs|xs|sm|md|lg|xl)'
const MARGIN_ENUM = '(xxs|xs|sm|md|lg|xl|xxl)'
const SEMANTIC_COLORS = [
  // 品牌色 Primary
  'primary',
  'primary-hover',
  'primary-active',
  'primary-bg',
  'primary-bg-hover',
  'primary-border',
  'primary-border-hover',
  'primary-text',
  'primary-text-hover',
  'primary-text-active',
  // 功能色 Success
  'success',
  'success-hover',
  'success-active',
  'success-bg',
  'success-bg-hover',
  'success-border',
  'success-border-hover',
  'success-text',
  'success-text-hover',
  'success-text-active',
  // 功能色 Warning
  'warning',
  'warning-hover',
  'warning-active',
  'warning-bg',
  'warning-bg-hover',
  'warning-border',
  'warning-border-hover',
  'warning-text',
  'warning-text-hover',
  'warning-text-active',
  'warning-affix',
  // 功能色 Error
  'error',
  'error-hover',
  'error-active',
  'error-bg',
  'error-bg-hover',
  'error-bg-filled-hover',
  'error-bg-active',
  'error-border',
  'error-border-hover',
  'error-text',
  'error-text-hover',
  'error-text-active',
  'error-affix',
  // 功能色 Info
  'info',
  'info-hover',
  'info-active',
  'info-bg',
  'info-bg-hover',
  'info-border',
  'info-border-hover',
  'info-text',
  'info-text-hover',
  'info-text-active',
  // Link
  'link',
  'link-hover',
  'link-active',
  // 文本色
  'text',
  'text-secondary',
  'text-tertiary',
  'text-quat',
  'text-quaternary',
  'text-placeholder',
  'text-disabled',
  'text-heading',
  'text-label',
  'text-description',
  'text-light-solid',
  // 填充色
  'fill',
  'fill-secondary',
  'fill-tertiary',
  'fill-quaternary',
  'fill-content',
  'fill-content-hover',
  'fill-alter',
  // 背景色
  'white',
  'base',
  'container',
  'container-disabled',
  'layout',
  'elevated',
  'spotlight',
  'blur',
  'mask',
  'solid',
  'solid-hover',
  'solid-active',
  // 文本别名
  'main',
  'sec',
  'quat',
  'split',
  // 边框
  'border',
  'border-sec',
  'border-secondary',
  'border-disabled',
  'border-bg',
  // 图标
  'icon',
  'icon-hover',
  // 其它
  'highlight',
].join('|')
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
    `${p}m-${MARGIN_ENUM}`,
    `${p}mt-${MARGIN_ENUM}`,
    `${p}mb-${MARGIN_ENUM}`,
    `${p}ml-${MARGIN_ENUM}`,
    `${p}mr-${MARGIN_ENUM}`,
    `${p}mx-${MARGIN_ENUM}`,
    `${p}my-${MARGIN_ENUM}`,

    // Padding 类
    `${p}p-${PADDING_ENUM}`,
    `${p}pt-${PADDING_ENUM}`,
    `${p}pb-${PADDING_ENUM}`,
    `${p}pl-${PADDING_ENUM}`,
    `${p}pr-${PADDING_ENUM}`,
    `${p}px-${PADDING_ENUM}`,
    `${p}py-${PADDING_ENUM}`,

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

/**
 * 为 namespace 安全的工具类生成模板。
 * 例如 tokenPrefix='ant' 会生成 bg-ant-primary、p-ant-lg、text-ant-sm 等。
 */
function createNamespacedTemplates(tokenPrefix: string, themeKeys: AutocompleteOptions['themeKeys']) {
  const ns = `${tokenPrefix}-`
  const textEnum = themeKeys.text === 'text' ? TEXT_ENUM : FONT_ENUM

  return [
    // 颜色类
    `color-${tokenPrefix}`,
    `color-${ns}${COLOR_ENUM}`,
    `c-${tokenPrefix}`,
    `c-${ns}${COLOR_ENUM}`,
    `bg-${tokenPrefix}`,
    `bg-${ns}${COLOR_ENUM}`,

    // Border 边框色
    `border-${tokenPrefix}`,
    `border-${ns}${COLOR_ENUM}`,
    `b-${tokenPrefix}`,
    `b-${ns}${COLOR_ENUM}`,
    // Border 方向性
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

    // Margin 类
    `m-${ns}${MARGIN_ENUM}`,
    `mt-${ns}${MARGIN_ENUM}`,
    `mb-${ns}${MARGIN_ENUM}`,
    `ml-${ns}${MARGIN_ENUM}`,
    `mr-${ns}${MARGIN_ENUM}`,
    `mx-${ns}${MARGIN_ENUM}`,
    `my-${ns}${MARGIN_ENUM}`,

    // Padding 类
    `p-${ns}${PADDING_ENUM}`,
    `pt-${ns}${PADDING_ENUM}`,
    `pb-${ns}${PADDING_ENUM}`,
    `pl-${ns}${PADDING_ENUM}`,
    `pr-${ns}${PADDING_ENUM}`,
    `px-${ns}${PADDING_ENUM}`,
    `py-${ns}${PADDING_ENUM}`,

    // 字体
    `text-${ns}${textEnum}`,

    // Rounded 圆角
    `rounded-${tokenPrefix}`,
    `rd-${tokenPrefix}`,
    `rounded-${ns}${RADIUS_ENUM}`,
    `rd-${ns}${RADIUS_ENUM}`,
    // 角落圆角
    `rounded-tl-${tokenPrefix}`,
    `rounded-tl-${ns}${RADIUS_ENUM}`,
    `rounded-tr-${tokenPrefix}`,
    `rounded-tr-${ns}${RADIUS_ENUM}`,
    `rounded-bl-${tokenPrefix}`,
    `rounded-bl-${ns}${RADIUS_ENUM}`,
    `rounded-br-${tokenPrefix}`,
    `rounded-br-${ns}${RADIUS_ENUM}`,
    // 边侧圆角
    `rounded-t-${tokenPrefix}`,
    `rounded-t-${ns}${RADIUS_ENUM}`,
    `rounded-r-${tokenPrefix}`,
    `rounded-r-${ns}${RADIUS_ENUM}`,
    `rounded-b-${tokenPrefix}`,
    `rounded-b-${ns}${RADIUS_ENUM}`,
    `rounded-l-${tokenPrefix}`,
    `rounded-l-${ns}${RADIUS_ENUM}`,

    // Shadow 阴影
    `shadow-${tokenPrefix}`,
    `shadow-${ns}${SHADOW_ENUM}`,
  ]
}

/**
 * 创建自动补全模板。
 * 三类模板按需合并并去重：
 * - prefixed   ：`${prefix}-bg-primary`     （allowPrefixedUtilities）
 * - unprefixed ：`bg-primary`               （allowUnprefixed）
 * - namespaced ：`bg-${tokenPrefix}-primary`（tokenPrefix 非空）
 */
export function createAutocompleteTemplates(options: AutocompleteOptions) {
  const {
    prefix,
    allowUnprefixed = true,
    allowPrefixedUtilities = true,
    tokenPrefix = 'ant',
    themeKeys,
  } = options

  return Array.from(new Set([
    // 带前缀的模板 (如 a-mx-lg)
    ...(allowPrefixedUtilities ? createTemplatesForPrefix(prefix, themeKeys) : []),
    // 不带前缀的旧模板 (如 mx-lg)
    ...(allowUnprefixed ? createTemplatesForPrefix('', themeKeys) : []),
    // namespace 安全模板 (如 m-ant-lg, bg-ant-primary)
    ...(tokenPrefix ? createNamespacedTemplates(tokenPrefix, themeKeys) : []),
  ]))
}
