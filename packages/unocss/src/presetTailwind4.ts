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
  const allowUnprefixed = options?.allowUnprefixed ?? true
  const antPrefix = options?.antPrefix || 'ant'

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

    // 自定义规则
    rules: ([
      // 带前缀的规则 (如 a-mx-lg)
      ...createColorRules(prefix),
      ...createBorderRules(prefix),
      ...createSpacingRules(prefix, antPrefix),
      ...createTextRules(prefix, 'text'),
      ...createRoundedRules(prefix, 'radius'),
      ...createShadowRules(prefix, 'shadow'),
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
