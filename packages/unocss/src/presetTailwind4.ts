import type { Preset } from 'unocss'
import type { BasePresetOptions } from './common'
import { definePreset } from 'unocss'
import {
  buildColorsTheme,
  buildPalettes,
  buildRadiusTheme,
  buildShadowTheme,
  buildTextTheme,
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

export interface AntdPresetTailwind4Options extends BasePresetOptions {}

export const presetAntdTailwind4 = definePreset((options?: AntdPresetTailwind4Options): Preset => {
  const prefix = options?.prefix || 'a'
  const allowUnprefixed = options?.allowUnprefixed ?? true
  const antPrefix = options?.antPrefix || 'ant'
  const themeTokenPrefix = allowUnprefixed ? undefined : prefix

  // 根据 antPrefix 动态生成调色板
  const builtPalettes = buildPalettes(antPrefix)

  return {
    name: 'preset-antd-tailwind4',
    theme: {
      colors: withThemeTokenPrefix(buildColorsTheme(antPrefix, builtPalettes), themeTokenPrefix),
      radius: withThemeTokenPrefix(buildRadiusTheme(antPrefix), themeTokenPrefix),
      text: withThemeTokenPrefix(buildTextTheme(antPrefix), themeTokenPrefix),
      shadow: withThemeTokenPrefix(buildShadowTheme(antPrefix), themeTokenPrefix),
      // Tailwind 4 新增的 defaults 配置
      defaults: {},
    },

    // 自定义规则
    rules: ([
      // 带前缀的规则 (如 a-mx-lg)
      ...createColorRules(prefix, themeTokenPrefix),
      ...createBorderRules(prefix, themeTokenPrefix),
      ...createSpacingRules(prefix, antPrefix),
      ...createTextRules(prefix, 'text', themeTokenPrefix),
      ...createRoundedRules(prefix, 'radius', themeTokenPrefix),
      ...createShadowRules(prefix, 'shadow', themeTokenPrefix),
      // 可选的不带前缀规则 (如 mx-lg)
      ...(allowUnprefixed
        ? [
            ...createColorRules(''),
            ...createBorderRules(''),
            ...createSpacingRules('', antPrefix),
            ...createTextRules('', 'text'),
            ...createRoundedRules('', 'radius'),
            ...createShadowRules('', 'shadow'),
          ]
        : []),
    ] as any),
    autocomplete: {
      templates: createAutocompleteTemplates({
        prefix,
        allowUnprefixed,
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
