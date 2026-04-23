# antdv-next css-plugin

[English](./README.md)

一个用于 `antdv-next` 生态的样式工具集 Monorepo，当前发布两个包：

- `@antdv-next/tailwind`：将 Ant Design Vue CSS 变量映射到 Tailwind（支持 v3 插件模式 + v4 `@theme` 模式）
- `@antdv-next/unocss`：提供 UnoCSS 预设（标准模式 + Tailwind v4 风格模式）

## 仓库结构

```text
packages/
  tailwind/   # @antdv-next/tailwind
  unocss/     # @antdv-next/unocss
examples/
  tailwind-v3/
  tailwind-v4/
  unocss-v3/
  unocss-v4/
```

## 环境与安装

> 本仓库使用 pnpm 工作区，并在 `preinstall` 中限制为 pnpm。

```bash
pnpm install
```

## 常用命令

```bash
# 构建全部包
pnpm build

# 仅构建 Tailwind 包
pnpm --filter @antdv-next/tailwind build

# 仅构建 UnoCSS 包
pnpm --filter @antdv-next/unocss build

# 修改 tailwind v4 生成器后，重新生成 theme.css
pnpm --filter @antdv-next/tailwind generate:theme

# 运行 UnoCSS 预设测试
pnpm vitest packages/unocss/src/preset.test.ts
```

## 快速使用

### Tailwind

- v3：在 `tailwind.config.*` 中使用 `@antdv-next/tailwind` 插件
- v4：在 CSS 中导入 `@antdv-next/tailwind/theme.css`

```ts
// tailwind.config.ts (v3)
import antdPlugin from '@antdv-next/tailwind'

export default {
  plugins: [antdPlugin],
}
```

```css
/* app.css (v4) */
@import "tailwindcss";
@import "@antdv-next/tailwind/theme.css";
```

### UnoCSS

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetAntd, presetAntdTailwind4 } from '@antdv-next/unocss'

export default defineConfig({
  presets: [
    presetAntd(),
    // 或使用 Tailwind v4 风格键名
    // presetAntdTailwind4(),
  ],
})
```

## 文档与示例

- Tailwind 包文档：`packages/tailwind/README.zh-CN.md`
- UnoCSS 包文档：`packages/unocss/README.zh-CN.md`
- 示例项目：`examples/*`

