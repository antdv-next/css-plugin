# Tailwind CSS v4 Example

Vite + Vue 3 + TypeScript scaffolding for `@antdv-next/tailwind` 的 v4 入口。

## 安装 Tailwind v4 工具链

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

然后在 `vite.config.ts` 启用插件：

```ts
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

## 两种 v4 入口

`@antdv-next/tailwind` 提供两个并存入口：

### 1. 经典入口 `theme.css`

token 直接占用 Tailwind 原生 utility（如 `bg-primary`），适合现有项目。

```css
/* src/style.css */
@import "tailwindcss";
@import "@antdv-next/tailwind/theme.css";
```

```vue
<template>
  <div class="bg-primary text-white p-lg rounded-lg shadow-card">
    <h1 class="text-h1">Classic theme.css</h1>
  </div>
</template>
```

### 2. 命名空间安全入口 `compat.css`（推荐）

所有 token 加 `ant-` 命名空间隔离，并额外发出 `a-*` 前缀简写，避免与 Tailwind/业务自定义 token 冲突。

```css
/* src/style.css */
@import "tailwindcss";
@import "@antdv-next/tailwind/compat.css";
```

```vue
<template>
  <!-- namespace 安全写法 -->
  <div class="bg-ant-primary text-ant-light-solid p-ant-lg rounded-ant-lg shadow-ant-card">
    <h1 class="text-ant-h1">Namespace safe</h1>
  </div>

  <!-- 额外的 a-* 前缀简写 -->
  <div class="a-bg-primary a-color-white a-p-lg a-rounded-lg a-shadow-card">
    Prefixed shortcut
  </div>
</template>
```

## 通过 JS 动态生成自定义 CSS

```ts
import { generateCompatThemeCSS } from '@antdv-next/tailwind/v4'

const css = generateCompatThemeCSS({
  antPrefix: 'ant',             // antdv CSS 变量前缀
  tokenPrefix: 'antd',          // 改成 antd 命名空间 → bg-antd-primary
  prefix: 'antd',               // 简写也改成 antd-bg-primary
  allowPrefixedUtilities: true, // 关闭则不生成前缀简写
})
```

更多说明见 [@antdv-next/tailwind 文档](../../packages/tailwind/README.md)。
