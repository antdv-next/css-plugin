import type { Preset } from 'unocss'
import type { BasePresetOptions } from './common'
import { definePreset } from 'unocss'
import {
  buildBorderRadiusTheme,
  buildColorsTheme,
  buildFontSizeTheme,
  buildPalettes,
  buildShadowTheme,
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
  const allowPrefixedUtilities = options?.allowPrefixedUtilities ?? true
  const allowUnprefixed = options?.allowUnprefixed ?? true
  const antPrefix = options?.antPrefix || 'ant'
  const tokenPrefix = options?.tokenPrefix || 'ant'

  // 根据 antPrefix 动态生成调色板
  const builtPalettes = buildPalettes(antPrefix)

  return {
    name: 'preset-antd',
    theme: {
      colors: buildColorsTheme(antPrefix, builtPalettes),
      borderRadius: buildBorderRadiusTheme(antPrefix),
      fontSize: buildFontSizeTheme(antPrefix),
      boxShadow: buildShadowTheme(antPrefix),
    },

    // 自定义规则
    rules: ([
      ...createColorRules(prefix, tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createBorderRules(prefix, tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createSpacingRules(prefix, antPrefix, tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createTextRules(prefix, 'fontSize', tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createRoundedRules(prefix, 'borderRadius', tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createShadowRules(prefix, 'boxShadow', tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
    ] as any),
    autocomplete: {
      templates: createAutocompleteTemplates({
        prefix,
        allowUnprefixed,
        allowPrefixedUtilities,
        tokenPrefix,
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
