/**
 * Ant Design Vue Next Tailwind CSS Plugin
 *
 * 基于 Ant Design Vue 的 CSS 变量系统生成 Tailwind CSS 主题配置
 */

import type { AntdPluginOptions } from './types'
import plugin from 'tailwindcss/plugin'
import { buildPalettes } from './colors'
import {
  buildBorderRadiusTheme,
  buildColorsTheme,
  buildFontSizeTheme,
  buildShadowTheme,
} from './theme'

const spacingTokens = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const

const paddingUtilityConfig = [
  ['p', ['padding']],
  ['px', ['padding-left', 'padding-right']],
  ['py', ['padding-top', 'padding-bottom']],
  ['pt', ['padding-top']],
  ['pr', ['padding-right']],
  ['pb', ['padding-bottom']],
  ['pl', ['padding-left']],
] as const

const marginUtilityConfig = [
  ['m', ['margin']],
  ['mx', ['margin-left', 'margin-right']],
  ['my', ['margin-top', 'margin-bottom']],
  ['mt', ['margin-top']],
  ['mr', ['margin-right']],
  ['mb', ['margin-bottom']],
  ['ml', ['margin-left']],
] as const

function buildSpacingUtilities(antPrefix: string) {
  const utilities: Record<string, Record<string, string>> = {}

  for (const token of spacingTokens) {
    const paddingValue = `var(--${antPrefix}-padding-${token})`
    const marginValue = `var(--${antPrefix}-margin-${token})`

    for (const [utilityName, cssProperties] of paddingUtilityConfig) {
      const selector = `.${utilityName}-${token}`
      utilities[selector] = utilities[selector] || {}
      for (const cssProperty of cssProperties)
        utilities[selector][cssProperty] = paddingValue
    }

    for (const [utilityName, cssProperties] of marginUtilityConfig) {
      const selector = `.${utilityName}-${token}`
      utilities[selector] = utilities[selector] || {}
      for (const cssProperty of cssProperties)
        utilities[selector][cssProperty] = marginValue
    }
  }

  return utilities
}

/**
 * 创建 Ant Design Vue Tailwind CSS 插件
 *
 * @param options - 插件配置选项
 * @returns Tailwind CSS 插件
 *
 * @example
 * ```js
 * // tailwind.config.js
 * import antdPlugin from '@antdv-next/tailwind'
 *
 * export default {
 *   plugins: [
 *     antdPlugin({
 *       antPrefix: 'ant'
 *     })
 *   ]
 * }
 * ```
 */
export function createAntdPlugin(options: AntdPluginOptions = {}) {
  const { antPrefix = 'ant' } = options

  // 构建调色板
  const builtPalettes = buildPalettes(antPrefix)

  return plugin(
    // 插件函数 - 用于添加自定义 utilities, components 等
    ({ addUtilities }) => {
      // 仅注入 padding / margin，避免污染 max-w-* / w-* / gap-* 等依赖 spacing 的工具类
      addUtilities(buildSpacingUtilities(antPrefix))
    },
    // 主题配置 - 扩展 Tailwind 的默认主题
    {
      theme: {
        extend: {
          colors: buildColorsTheme(antPrefix, builtPalettes),
          borderRadius: buildBorderRadiusTheme(antPrefix),
          fontSize: buildFontSizeTheme(antPrefix),
          boxShadow: buildShadowTheme(antPrefix),
        },
      },
    },
  )
}

/**
 * 默认导出：使用默认配置的插件
 */
export default createAntdPlugin()
