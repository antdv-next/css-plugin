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
    presetAntdTailwind4({
      // 关闭旧裸写法以避免与 Wind4 原生工具类冲突
      // 仍保留 a-* 与 *-ant-* 两种安全写法
      allowUnprefixed: false,
    }),
  ],
  shortcuts: [],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});