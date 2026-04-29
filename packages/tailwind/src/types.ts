/**
 * Tailwind CSS Plugin 类型定义
 */

export interface AntdPluginOptions {
  /**
   * @desc 自定义 class 书写的前缀
   * @default undefined (使用 Tailwind 默认)
   * @example prefix: 'antd' -> class="antd-bg-primary"
   */
  prefix?: string
  /**
   * @desc 自定义 CSS 变量的前缀（与 ConfigProvider 的 prefixCls 对应）
   * @default 'ant'
   * @example antPrefix: 'my-app' -> var(--my-app-color-primary)
   */
  antPrefix?: string
}

/**
 * Tailwind CSS v4 兼容模式配置。
 *
 * 兼容模式会把 Ant Design token 放入独立 namespace，例如：
 * --color-ant-primary -> bg-ant-primary / text-ant-primary
 *
 * 同时可以按 UnoCSS 风格额外生成带 prefix 的工具类，例如：
 * a-bg-primary / a-text-primary
 */
export interface AntdV4CompatOptions extends AntdPluginOptions {
  /**
   * @desc Tailwind v4 theme token 的命名空间
   * @default 'ant'
   * @example tokenPrefix: 'ant' -> --color-ant-primary
   */
  tokenPrefix?: string
  /**
   * @desc 是否额外生成带 prefix 的工具类
   * @default true
   * @example allowPrefixedUtilities: true -> class="a-bg-primary"
   */
  allowPrefixedUtilities?: boolean
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
