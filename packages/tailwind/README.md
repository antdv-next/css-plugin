# @antdv-next/tailwind

Ant Design Vue Tailwind CSS Plugin - 将 Ant Design Vue 的设计系统集成到 Tailwind CSS 中。

[中文文档](./README.zh-CN.md)

## Features

- 🎨 **Design Tokens**: 基于 Ant Design Vue CSS 变量系统
- 🔧 **完全兼容**: 与 Tailwind CSS v3 和 v4 无缝集成
- 📦 **开箱即用**: 零配置启动
- 🎯 **TypeScript**: 完整的类型支持
- ⚡️ **按需生成**: 只生成使用的样式

## Installation

```bash
npm install @antdv-next/tailwind
# or
pnpm add @antdv-next/tailwind
# or
yarn add @antdv-next/tailwind
```

## Tailwind CSS v4 Usage (Recommended)

Tailwind CSS v4 使用 `@theme` 指令在 CSS 中定义主题变量。

### 方式 1: 直接导入 CSS 文件

在你的 CSS 文件中：

```css
@import "tailwindcss";
@import "@antdv-next/tailwind/theme.css";
```

### 方式 2: 使用 JS 动态生成

```ts
import { generateThemeCSS } from '@antdv-next/tailwind/v4'

// 使用默认配置
const css = generateThemeCSS()

// 自定义配置
const customCss = generateThemeCSS({ antPrefix: 'my-app' })
```

### Tailwind v4 使用示例

```vue
<template>
  <div class="bg-primary text-white p-lg rounded-lg shadow-card">
    <h1 class="text-ant-h1 text-primary">Hello Ant Design Vue</h1>
    <p class="text-text-secondary mt-sm">
      使用 Tailwind CSS v4 工具类
    </p>
  </div>
</template>
```

## Tailwind CSS v3 Usage

### Basic Setup

在你的 `tailwind.config.js` 中添加插件：

```js
import antdPlugin from '@antdv-next/tailwind'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [antdPlugin],
}
```

### Custom Configuration

```js
import { createAntdPlugin } from '@antdv-next/tailwind'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [
    createAntdPlugin({
      // 自定义 CSS 变量前缀（对应 ConfigProvider 的 prefixCls）
      antPrefix: 'ant', // 默认: 'ant'
    }),
  ],
}
```

### Using in Components

```vue
<template>
  <div class="bg-primary text-white p-lg rounded-lg shadow-card">
    <h1 class="text-ant-h1 text-primary">Hello Ant Design Vue</h1>
    <p class="text-secondary mt-sm">
      使用 Tailwind CSS 工具类和 Ant Design Vue 设计系统
    </p>
    <button class="bg-success hover:bg-success-hover px-md py-sm rounded">
      Success Button
    </button>
  </div>
</template>
```

## Available Utilities

### Colors

#### Brand Colors
- `bg-primary`, `text-primary`, `border-primary`
- `bg-primary-hover`, `bg-primary-active`
- `bg-primary-bg` (极浅背景)

#### Status Colors
- Success: `bg-success`, `bg-success-bg`, `border-success-border`
- Warning: `bg-warning`, `bg-warning-bg`, `border-warning-border`
- Error: `bg-error`, `bg-error-bg`, `border-error-border`
- Info: `bg-info`, `bg-info-bg`, `border-info-border`

#### Ant Design Palette
支持 13 种颜色，每种包含 1-10 级色阶：
- `blue`, `purple`, `cyan`, `green`, `magenta`, `pink`, `red`
- `orange`, `yellow`, `volcano`, `geekblue`, `lime`, `gold`

```html
<!-- 使用色阶 -->
<div class="bg-blue-1 text-blue-6 border-blue-3">Light Blue</div>
<div class="bg-red-5 text-white">Medium Red</div>
```

#### Neutral Colors
- Text: `text-text`, `text-text-secondary`, `text-text-tertiary`
- Background: `bg-container`, `bg-layout`, `bg-base`, `bg-elevated`
- Border: `border-border`, `border-border-sec`

### Spacing

基于 Ant Design 间距系统：

```html
<!-- Padding -->
<div class="p-xxs">4px padding</div>
<div class="p-xs">8px padding</div>
<div class="p-sm">12px padding</div>
<div class="p-md">20px padding</div>
<div class="p-lg">24px padding</div>
<div class="p-xl">32px padding</div>

<!-- Margin -->
<div class="m-lg">24px margin</div>
```

> Note: both v3 and v4 no longer override Tailwind global spacing scale, so classes like `max-w-md` and `gap-*` keep Tailwind defaults.

### Border Radius

```html
<div class="rounded-xs">Extra small radius</div>
<div class="rounded-sm">Small radius</div>
<div class="rounded">Default radius</div>
<div class="rounded-lg">Large radius</div>
```

### Typography

```html
<div class="text-ant-sm">Small text</div>
<div class="text-ant-base">Default text</div>
<div class="text-ant-lg">Large text</div>
<div class="text-ant-xl">Extra large text</div>
<div class="text-ant-h1">Heading 1</div>
<div class="text-ant-h2">Heading 2</div>
<div class="text-ant-h3">Heading 3</div>
```

### Shadows

```html
<div class="shadow">Default shadow</div>
<div class="shadow-card">Card shadow</div>
<div class="shadow-sec">Secondary shadow</div>
<div class="shadow-ter">Tertiary shadow</div>
```

## CSS Variables

此插件使用 Ant Design Vue 的 CSS 变量系统。确保你的应用中已正确设置这些变量：

```vue
<script setup>
import { ConfigProvider } from '@antdv-next/antdv-next'
</script>

<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
</template>
```

## Comparison with Other Solutions

| Feature | @antdv-next/tailwind | Regular Tailwind | @antdv-next/unocss |
|---------|---------------------|------------------|---------------------|
| Design System | ✅ Ant Design Vue | ❌ Generic | ✅ Ant Design Vue |
| CSS Variables | ✅ Dynamic | ❌ Static | ✅ Dynamic |
| Build Tool | Any | Any | Vite/Webpack |
| Bundle Size | Small | Medium | Smallest |
| Theme Switching | ✅ Runtime | ❌ Build time | ✅ Runtime |

## Best Practices

### 1. Combine with Ant Design Components

```vue
<template>
  <a-card class="shadow-card rounded-lg">
    <div class="space-y-md">
      <h2 class="text-h2 text-primary">Card Title</h2>
      <p class="text-text-secondary">Card content with Tailwind utilities</p>
      <a-button type="primary" class="mt-lg">
        Button
      </a-button>
    </div>
  </a-card>
</template>
```

### 2. Use CSS Variables for Custom Styles

```vue
<template>
  <div
    class="p-lg rounded-lg"
    :style="{
      backgroundColor: 'var(--ant-color-primary-bg)',
      borderColor: 'var(--ant-color-primary)',
    }"
  >
    Custom styled with CSS variables
  </div>
</template>
```

### 3. Responsive Design

结合 Tailwind 的响应式功能：

```html
<div class="p-sm md:p-md lg:p-lg xl:p-xl">
  Responsive padding
</div>
```

## FAQ

### Q: 如何自定义 CSS 变量前缀？

A: 使用 `createAntdPlugin` 并传入 `antPrefix` 选项：

```js
createAntdPlugin({ antPrefix: 'my-app' })
```

### Q: 可以与其他 Tailwind 插件一起使用吗？

A: 可以！此插件会扩展主题并添加 `p-*` / `m-*` 工具类，仍可与其他插件一起使用：

```js
export default {
  plugins: [
    antdPlugin,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Q: 如何迁移现有的 Tailwind 项目？

A: 只需添加插件，现有的 Tailwind 类仍然可用。你可以逐步替换为 Ant Design 主题的类。

## License

MIT

## Related

- [Ant Design Vue Next](https://github.com/antdv-next/antdv-next)
- [@antdv-next/unocss](../unocss) - UnoCSS preset for Ant Design Vue
- [Tailwind CSS](https://tailwindcss.com/)
