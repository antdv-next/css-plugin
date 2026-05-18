# @antdv-next/tailwind

Ant Design Vue Tailwind CSS 插件 - 将 Ant Design Vue 的设计系统集成到 Tailwind CSS 中。

[English](./README.md)

## 特性

- 🎨 **设计令牌**: 基于 Ant Design Vue CSS 变量系统
- 🔧 **完全兼容**: 与 Tailwind CSS v3 和 v4 无缝集成
- 📦 **开箱即用**: 零配置启动
- 🎯 **TypeScript**: 完整的类型支持
- ⚡️ **按需生成**: 只生成使用的样式

## 安装

```bash
npm install @antdv-next/tailwind
# 或
pnpm add @antdv-next/tailwind
# 或
yarn add @antdv-next/tailwind
```

## Tailwind CSS v4 用法（推荐）

Tailwind CSS v4 使用 `@theme` 指令在 CSS 中定义主题变量。本包提供两个并存的 v4 入口：

| 入口 | 工具类示例 | 适用场景 |
| --- | --- | --- |
| `theme.css`（经典） | `bg-primary`、`p-lg`、`text-lg`、`shadow-card` | 现有项目；接受 antdv token 直接占用 Tailwind 原生 utility |
| `compat.css`（**推荐**） | `bg-ant-primary`、`p-ant-lg`、`text-ant-lg`、`shadow-ant-card`（再加可选的 `a-bg-primary` 等前缀简写） | 新项目；避免与 Tailwind 内置 token / 业务自定义 token 冲突 |

> 详细背景见 [Issue #7 (RFC)](https://github.com/antdv-next/css-plugin/issues/7)。

### 方式 1：直接导入 CSS 文件

```css
@import "tailwindcss";

/* 二选一 —— 经典入口 */
@import "@antdv-next/tailwind/theme.css";

/* 或者 —— 命名空间安全入口（推荐） */
@import "@antdv-next/tailwind/compat.css";
```

### 方式 2：使用 JS 动态生成

```ts
import {
  generateCompatThemeCSS,
  generateThemeCSS,
} from '@antdv-next/tailwind/v4'

// 经典入口（默认 antPrefix='ant'）
const css = generateThemeCSS()

// 命名空间安全入口
const compatCss = generateCompatThemeCSS({
  antPrefix: 'ant',             // antdv CSS 变量前缀
  tokenPrefix: 'ant',           // 输出 --color-ant-primary、@utility p-ant-lg
  prefix: 'a',                  // 额外输出 @utility a-bg-primary 等简写
  allowPrefixedUtilities: true, // 是否生成上述前缀简写
})
```

### compat.css 默认配置

- `antPrefix`：antdv-next CSS 变量前缀（对应 `ConfigProvider` 的 `prefixCls`）
- `tokenPrefix`：注入 Tailwind v4 theme token 的命名空间，例如 `--color-ant-primary`、`--padding-ant-lg`、`--text-ant-lg`。同时会生成 `@utility p-ant-lg { padding: var(--padding-ant-lg) }` 这种安全的方向性 utility，避免覆盖 Tailwind 原生 `p-*`
- `prefix`：额外的前缀 utility 写法（如 `a-bg-primary`、`a-p-lg`）。这些 utility 直接绑定到 antdv 变量，不依赖 `tokenPrefix`
- `allowPrefixedUtilities`：是否生成上述前缀 utility。关闭后仅保留 `@theme inline` 中的 namespace token

### Tailwind v4 工具类对照

| 命名空间 | theme.css | compat.css（推荐） | 前缀简写 |
| --- | --- | --- | --- |
| 颜色 | `bg-primary`、`text-blue-5` | `bg-ant-primary`、`text-ant-blue-5` | `a-bg-primary`、`a-c-primary` |
| Padding | `p-lg`、`px-sm` | `p-ant-lg`、`px-ant-sm` | `a-p-lg`、`a-px-sm` |
| Margin | `m-lg`、`my-sm` | `m-ant-lg`、`my-ant-sm` | `a-m-lg`、`a-my-sm` |
| Radius | `rounded-lg` | `rounded-ant-lg` | `a-rounded-lg`、`a-rd-lg` |
| Font size | `text-h1` | `text-ant-h1` | `a-text-h1` |
| Shadow | `shadow-card` | `shadow-ant-card` | `a-shadow-card` |

### Tailwind v4 使用示例

```vue
<template>
  <!-- 经典 theme.css 写法 -->
  <div class="bg-primary text-white p-lg rounded-lg shadow-card">
    <h1 class="text-h1 text-primary">经典 theme.css</h1>
  </div>

  <!-- compat.css 推荐写法（命名空间安全） -->
  <div class="bg-ant-primary text-ant-light-solid p-ant-lg rounded-ant-lg shadow-ant-card">
    <h1 class="text-ant-h1 color-ant-primary">namespace 安全</h1>
  </div>

  <!-- compat.css 还会额外发出 a-* 前缀简写 -->
  <div class="a-bg-primary a-color-white a-p-lg a-rounded-lg a-shadow-card">
    前缀简写
  </div>
</template>
```

---

## Tailwind CSS v3 用法

### 基础配置

在 `tailwind.config.js` 中添加插件：

```js
import antdPlugin from '@antdv-next/tailwind'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [antdPlugin],
}
```

### 自定义配置

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

### 在组件中使用

```vue
<template>
  <div class="bg-primary text-white p-lg rounded-lg shadow-card">
    <h1 class="text-h1 text-primary">你好 Ant Design Vue</h1>
    <p class="text-secondary mt-sm">
      使用 Tailwind CSS 工具类和 Ant Design Vue 设计系统
    </p>
    <button class="bg-success hover:bg-success-hover px-md py-sm rounded">
      成功按钮
    </button>
  </div>
</template>
```

## 可用工具类

### 颜色

#### 品牌色
- `bg-primary`, `text-primary`, `border-primary` - 主色
- `bg-primary-hover`, `bg-primary-active` - 主色交互态
- `bg-primary-bg` - 主色极浅背景

#### 功能色
- Success（成功）: `bg-success`, `bg-success-bg`, `border-success-border`
- Warning（警告）: `bg-warning`, `bg-warning-bg`, `border-warning-border`
- Error（错误）: `bg-error`, `bg-error-bg`, `border-error-border`
- Info（信息）: `bg-info`, `bg-info-bg`, `border-info-border`

#### Ant Design 调色板
支持 13 种颜色，每种包含 1-10 级色阶：
- `blue`（蓝色）, `purple`（紫色）, `cyan`（青色）, `green`（绿色）
- `magenta`（品红）, `pink`（粉色）, `red`（红色）, `orange`（橙色）
- `yellow`（黄色）, `volcano`（火山色）, `geekblue`（极客蓝）
- `lime`（青柠）, `gold`（金色）

```html
<!-- 使用色阶 -->
<div class="bg-blue-1 text-blue-6 border-blue-3">浅蓝色</div>
<div class="bg-red-5 text-white">中度红色</div>
<div class="bg-gold-8 text-gold-1">深金色</div>
```

#### 中性色
- 文本: `text-text`（主文本）, `text-text-secondary`（次要）, `text-text-tertiary`（第三级）
- 背景: `bg-container`（容器）, `bg-layout`（布局）, `bg-base`（基础）, `bg-elevated`（浮层）
- 边框: `border-border`, `border-border-sec`

### 间距

基于 Ant Design 间距系统：

```html
<!-- 内边距 -->
<div class="p-xxs">4px 内边距</div>
<div class="p-xs">8px 内边距</div>
<div class="p-sm">12px 内边距</div>
<div class="p-md">20px 内边距</div>
<div class="p-lg">24px 内边距</div>
<div class="p-xl">32px 内边距</div>

<!-- 外边距 -->
<div class="m-lg">24px 外边距</div>
```

> 注意：v3 和 v4 都不再覆盖 Tailwind 全局 spacing，因此 `max-w-md`、`gap-*` 等类保持 Tailwind 默认行为。

### 圆角

```html
<div class="rounded-xs">超小圆角</div>
<div class="rounded-sm">小圆角</div>
<div class="rounded">默认圆角</div>
<div class="rounded-lg">大圆角</div>
```

### 字体

```html
<div class="text-sm">小号文本</div>
<div class="text">默认文本</div>
<div class="text-lg">大号文本</div>
<div class="text-xl">超大号文本</div>
<div class="text-h1">一级标题</div>
<div class="text-h2">二级标题</div>
<div class="text-h3">三级标题</div>
```

### 阴影

```html
<div class="shadow">默认阴影</div>
<div class="shadow-card">卡片阴影</div>
<div class="shadow-sec">次要阴影</div>
<div class="shadow-ter">第三级阴影</div>
```

## CSS 变量

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

## 与其他方案对比

| 特性 | @antdv-next/tailwind | 原生 Tailwind | @antdv-next/unocss |
|------|---------------------|---------------|---------------------|
| 设计系统 | ✅ Ant Design Vue | ❌ 通用 | ✅ Ant Design Vue |
| CSS 变量 | ✅ 动态 | ❌ 静态 | ✅ 动态 |
| 构建工具 | 任意 | 任意 | Vite/Webpack |
| 包体积 | 小 | 中等 | 最小 |
| 主题切换 | ✅ 运行时 | ❌ 构建时 | ✅ 运行时 |

## 最佳实践

### 1. 与 Ant Design 组件结合

```vue
<template>
  <a-card class="shadow-card rounded-lg">
    <div class="space-y-md">
      <h2 class="text-h2 text-primary">卡片标题</h2>
      <p class="text-text-secondary">卡片内容使用 Tailwind 工具类</p>
      <a-button type="primary" class="mt-lg">
        按钮
      </a-button>
    </div>
  </a-card>
</template>
```

### 2. 使用 CSS 变量自定义样式

```vue
<template>
  <div
    class="p-lg rounded-lg"
    :style="{
      backgroundColor: 'var(--ant-color-primary-bg)',
      borderColor: 'var(--ant-color-primary)',
    }"
  >
    使用 CSS 变量自定义样式
  </div>
</template>
```

### 3. 响应式设计

结合 Tailwind 的响应式功能：

```html
<div class="p-sm md:p-md lg:p-lg xl:p-xl">
  响应式内边距
</div>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>
```

### 4. 主题切换

配合 Ant Design Vue 的主题功能：

```vue
<script setup>
import { ConfigProvider, theme } from '@antdv-next/antdv-next'
import { ref } from 'vue'

const isDark = ref(false)
</script>

<template>
  <ConfigProvider
    :theme="{
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <div class="bg-container text-text p-lg">
      <!-- 主题会自动切换，Tailwind 类也会跟随变化 -->
      <button
        class="bg-primary text-white px-md py-sm rounded hover:bg-primary-hover"
        @click="isDark = !isDark"
      >
        切换主题
      </button>
    </div>
  </ConfigProvider>
</template>
```

## 完整示例

```vue
<script setup>
import { ref } from 'vue'
import { Form, Input, Button, Card, message } from '@antdv-next/antdv-next'

const formData = ref({
  username: '',
  password: '',
})

function handleSubmit() {
  message.success('登录成功！')
}
</script>

<template>
  <div class="min-h-screen bg-layout flex items-center justify-center p-lg">
    <Card class="w-full max-w-md shadow-card">
      <div class="space-y-lg">
        <div class="text-center">
          <h1 class="text-h1 text-primary">欢迎回来</h1>
          <p class="text-text-secondary mt-sm">请登录您的账户</p>
        </div>

        <Form @submit="handleSubmit" class="space-y-md">
          <div>
            <label class="text-sm text-text-secondary block mb-xs">
              用户名
            </label>
            <Input
              v-model:value="formData.username"
              class="w-full"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label class="text-sm text-text-secondary block mb-xs">
              密码
            </label>
            <Input
              v-model:value="formData.password"
              type="password"
              class="w-full"
              placeholder="请输入密码"
            />
          </div>

          <Button
            type="primary"
            html-type="submit"
            block
            class="mt-lg"
          >
            登录
          </Button>
        </Form>

        <div class="text-center">
          <a href="#" class="text-link hover:text-link-hover text-sm">
            忘记密码？
          </a>
        </div>
      </div>
    </Card>
  </div>
</template>
```

## 常见问题

### Q: 如何自定义 CSS 变量前缀？

A: 使用 `createAntdPlugin` 并传入 `antPrefix` 选项：

```js
createAntdPlugin({ antPrefix: 'my-app' })
```

然后在 ConfigProvider 中设置相同的前缀：

```vue
<ConfigProvider prefix-cls="my-app">
  <!-- 你的应用 -->
</ConfigProvider>
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

### Q: 与 UnoCSS preset 有什么区别？

A: 主要区别在于构建工具和生成方式：

| 特性 | Tailwind 插件 | UnoCSS Preset |
|------|--------------|---------------|
| 生成方式 | PostCSS 处理 | 按需生成 |
| 性能 | 较好 | 极佳 |
| 包体积 | 较小 | 最小 |
| 兼容性 | 更广 | Vite 优先 |
| 学习曲线 | 平缓（Tailwind 生态） | 稍陡 |

建议：
- 如果你使用 Vite，推荐 [@antdv-next/unocss](../unocss)
- 如果你使用其他构建工具或已有 Tailwind 项目，使用此插件

## 许可证

MIT

## 相关链接

- [Ant Design Vue Next](https://github.com/antdv-next/antdv-next)
- [@antdv-next/unocss](../unocss) - UnoCSS preset for Ant Design Vue
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind CSS 中文文档](https://tailwind.nodejs.cn/)
