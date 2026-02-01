import type { Preset } from 'unocss'
import type { BasePresetOptions } from './common'
import { definePreset } from 'unocss'
import {
  buildBorderRadiusTheme,
  buildColorsTheme,
  buildFontSizeTheme,
  buildPalettes,
  buildShadowTheme,
  buildSpacingTheme,
  createAutocompleteTemplates,
  createBorderRules,
  createColorRules,
  createRoundedRules,
  createShadowRules,
  createSpacingRules,
  createTextRules,
} from './common'

export type { ColorName } from './common'

export interface AntdPresetOptions extends BasePresetOptions {}

export const presetAntd = definePreset((options?: AntdPresetOptions): Preset => {
  const prefix = options?.prefix || 'a'
  const antPrefix = options?.antPrefix || 'ant'

  // 根据 antPrefix 动态生成调色板
  const builtPalettes = buildPalettes(antPrefix)

  return {
    name: 'preset-antd',
    theme: {
      colors: buildColorsTheme(antPrefix, builtPalettes),
      spacing: buildSpacingTheme(antPrefix),
      borderRadius: buildBorderRadiusTheme(antPrefix),
      fontSize: buildFontSizeTheme(antPrefix),
      boxShadow: buildShadowTheme(antPrefix),
    },

    // 自定义规则
    rules: ([
      ...createColorRules(prefix),
      ...createBorderRules(prefix),
      ...createSpacingRules(prefix),
      ...createTextRules(prefix, 'fontSize'),
      ...createRoundedRules(prefix, 'borderRadius'),
      ...createShadowRules(prefix, 'boxShadow'),
    ] as any),
    autocomplete: {
      templates: createAutocompleteTemplates({
        prefix,
        themeKeys: {
          rounded: 'borderRadius',
          shadow: 'boxShadow',
          text: 'fontSize',
        },
      }),
    },
  }
})

export default presetAntd
