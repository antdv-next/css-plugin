import { presetAntdTailwind4 } from '@antdv-next/unocss';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  safelist: [],
  presets: [
    presetWind4(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetAntdTailwind4(),
  ],
  shortcuts: [],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});