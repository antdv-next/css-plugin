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
   * @desc 是否允许不带 prefix 的工具类
   * @default true
   * @example allowUnprefixed: false -> 仅支持 class="a-bg-primary"
   */
  allowUnprefixed?: boolean
  /**
   * @desc 自定义 CSS 变量的前缀（与 ConfigProvider 的 prefixCls 对应）
   * @default 'ant'
   * @example antPrefix: 'my-app' -> var(--my-app-color-primary)
   */
  antPrefix?: string
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
