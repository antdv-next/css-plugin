/**
 * 公共类型定义
 */

export interface BasePresetOptions {
  /**
   * @desc 自定义 class 书写的前缀
   * @default 'a'
   * @example prefix: 'antd' -> class="antd-bg-primary"
   */
  prefix?: string
  /**
   * @desc 是否保留带 prefix 的工具类
   * @default true
   * @example allowPrefixedUtilities: false -> 不生成 class="a-bg-primary"
   */
  allowPrefixedUtilities?: boolean
  /**
   * @desc 是否允许旧的不带 prefix 的工具类
   * @default true
   * @example allowUnprefixed: false -> 不生成 class="bg-primary"
   */
  allowUnprefixed?: boolean
  /**
   * @desc 自定义 CSS 变量的前缀（与 ConfigProvider 的 prefixCls 对应）
   * @default 'ant'
   * @example antPrefix: 'my-app' -> var(--my-app-color-primary)
   */
  antPrefix?: string
  /**
   * @desc 无前缀工具类使用的 token 前缀
   * @default 'ant'
   * @example tokenPrefix: 'ant' -> class="bg-ant-primary"
   */
  tokenPrefix?: string
}

export const colorNames = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const

export type ColorName = typeof colorNames[number]
