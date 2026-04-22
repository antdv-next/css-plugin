import type { Preset } from 'unocss'
import type { BasePresetOptions } from './common'
import { definePreset } from 'unocss'
import {
  buildBorderRadiusTheme,
  buildColorsTheme,
  buildFontSizeTheme,
  buildPalettes,
  buildShadowTheme,
  withThemeTokenPrefix,
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
  const allowUnprefixed = options?.allowUnprefixed ?? true
  const antPrefix = options?.antPrefix || 'ant'
  const themeTokenPrefix = allowUnprefixed ? undefined : prefix

  // 根据 antPrefix 动态生成调色板
  const builtPalettes = buildPalettes(antPrefix)

  return {
    name: 'preset-antd',
    theme: {
      colors: withThemeTokenPrefix(buildColorsTheme(antPrefix, builtPalettes), themeTokenPrefix),
      borderRadius: withThemeTokenPrefix(buildBorderRadiusTheme(antPrefix), themeTokenPrefix),
      fontSize: withThemeTokenPrefix(buildFontSizeTheme(antPrefix), themeTokenPrefix),
      boxShadow: withThemeTokenPrefix(buildShadowTheme(antPrefix), themeTokenPrefix),
    },

    // 自定义规则
    rules: ([
      // 带前缀的规则 (如 a-mx-lg)
      ...createColorRules(prefix, themeTokenPrefix),
      ...createBorderRules(prefix, themeTokenPrefix),
      ...createSpacingRules(prefix, antPrefix),
      ...createTextRules(prefix, 'fontSize', themeTokenPrefix),
      ...createRoundedRules(prefix, 'borderRadius', themeTokenPrefix),
      ...createShadowRules(prefix, 'boxShadow', themeTokenPrefix),
      // 可选的不带前缀规则 (如 mx-lg)
      ...(allowUnprefixed
        ? [
            ...createColorRules(''),
            ...createBorderRules(''),
            ...createSpacingRules('', antPrefix),
            ...createTextRules('', 'fontSize'),
            ...createRoundedRules('', 'borderRadius'),
            ...createShadowRules('', 'boxShadow'),
          ]
        : []),
    ] as any),
    autocomplete: {
      templates: createAutocompleteTemplates({
        prefix,
        allowUnprefixed,
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
