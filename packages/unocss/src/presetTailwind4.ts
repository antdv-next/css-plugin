import type { Preset } from 'unocss'
import type { BasePresetOptions } from './common'
import { definePreset } from 'unocss'
import {
  buildColorsTheme,
  buildPalettes,
  buildRadiusTheme,
  buildShadowTheme,
  buildTextTheme,
  createAutocompleteTemplates,
  createBorderRules,
  createColorRules,
  createRoundedRules,
  createShadowRules,
  createSpacingRules,
  createTextRules,
} from './common'

export type { ColorName } from './common'

export interface AntdPresetTailwind4Options extends BasePresetOptions {}

export const presetAntdTailwind4 = definePreset((options?: AntdPresetTailwind4Options): Preset => {
  const prefix = options?.prefix || 'a'
  const allowPrefixedUtilities = options?.allowPrefixedUtilities ?? true
  const allowUnprefixed = options?.allowUnprefixed ?? true
  const antPrefix = options?.antPrefix || 'ant'
  const tokenPrefix = options?.tokenPrefix ?? 'ant'

  // 根据 antPrefix 动态生成调色板
  const builtPalettes = buildPalettes(antPrefix)

  return {
    name: 'preset-antd-tailwind4',
    theme: {
      colors: buildColorsTheme(antPrefix, builtPalettes),
      radius: buildRadiusTheme(antPrefix),
      text: buildTextTheme(antPrefix),
      shadow: buildShadowTheme(antPrefix),
      // Tailwind 4 新增的 defaults 配置
      defaults: {},
    },

    // 自定义规则：内部按需输出三类工具类
    rules: ([
      ...createColorRules(prefix, tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createBorderRules(prefix, tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createSpacingRules(prefix, antPrefix, tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createTextRules(prefix, 'text', tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createRoundedRules(prefix, 'radius', tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
      ...createShadowRules(prefix, 'shadow', tokenPrefix, allowUnprefixed, allowPrefixedUtilities),
    ] as any),
    autocomplete: {
      templates: createAutocompleteTemplates({
        prefix,
        allowUnprefixed,
        allowPrefixedUtilities,
        tokenPrefix,
        themeKeys: {
          rounded: 'radius',
          shadow: 'shadow',
          text: 'text',
        },
      }),
    },
  }
})

export default presetAntdTailwind4
