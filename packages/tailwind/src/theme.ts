/**
 * 主题配置生成函数 - 适配 Tailwind CSS
 */

/**
 * 构建颜色主题
 */
export function buildColorsTheme(antPrefix: string, builtPalettes: Record<string, string>) {
  return {
    ...builtPalettes,
    // 核心品牌色 (Primary)
    'DEFAULT': `var(--${antPrefix}-color-primary)`,
    'primary': `var(--${antPrefix}-color-primary)`,
    'primary-hover': `var(--${antPrefix}-color-primary-hover)`,
    'primary-active': `var(--${antPrefix}-color-primary-active)`,
    'primary-bg': `var(--${antPrefix}-color-primary-bg)`,
    'primary-bg-hover': `var(--${antPrefix}-color-primary-bg-hover)`,

    // 功能辅助色
    'success': `var(--${antPrefix}-color-success)`,
    'success-bg': `var(--${antPrefix}-color-success-bg)`,
    'success-border': `var(--${antPrefix}-color-success-border)`,
    'success-hover': `var(--${antPrefix}-color-success-hover)`,

    'warning': `var(--${antPrefix}-color-warning)`,
    'warning-bg': `var(--${antPrefix}-color-warning-bg)`,
    'warning-border': `var(--${antPrefix}-color-warning-border)`,
    'warning-hover': `var(--${antPrefix}-color-warning-hover)`,

    'error': `var(--${antPrefix}-color-error)`,
    'error-bg': `var(--${antPrefix}-color-error-bg)`,
    'error-border': `var(--${antPrefix}-color-error-border)`,
    'error-hover': `var(--${antPrefix}-color-error-hover)`,

    'info': `var(--${antPrefix}-color-info)`,
    'info-bg': `var(--${antPrefix}-color-info-bg)`,
    'info-border': `var(--${antPrefix}-color-info-border)`,

    // Link
    'link': `var(--${antPrefix}-color-link)`,
    'link-hover': `var(--${antPrefix}-color-link-hover)`,
    'link-active': `var(--${antPrefix}-color-link-active)`,

    // 文本色
    'text': `var(--${antPrefix}-color-text)`,
    'text-secondary': `var(--${antPrefix}-color-text-secondary)`,
    'text-tertiary': `var(--${antPrefix}-color-text-tertiary)`,
    'text-quat': `var(--${antPrefix}-color-text-quaternary)`,
    'text-quaternary': `var(--${antPrefix}-color-text-quaternary)`,

    // 填充色
    'fill': `var(--${antPrefix}-color-fill)`,
    'fill-secondary': `var(--${antPrefix}-color-fill-secondary)`,
    'fill-tertiary': `var(--${antPrefix}-color-fill-tertiary)`,
    'fill-quaternary': `var(--${antPrefix}-color-fill-quaternary)`,

    // 中性色
    'base': `var(--${antPrefix}-color-bg-base)`,
    'container': `var(--${antPrefix}-color-bg-container)`,
    'layout': `var(--${antPrefix}-color-bg-layout)`,
    'elevated': `var(--${antPrefix}-color-bg-elevated)`,
    'mask': `var(--${antPrefix}-color-bg-mask)`,

    'main': `var(--${antPrefix}-color-text)`,
    'sec': `var(--${antPrefix}-color-text-secondary)`,
    'quat': `var(--${antPrefix}-color-text-quaternary)`,
    'split': `var(--${antPrefix}-color-split)`,

    'border': `var(--${antPrefix}-color-border)`,
    'border-sec': `var(--${antPrefix}-color-border-secondary)`,
  }
}

/**
 * 构建间距主题
 */
export function buildSpacingTheme(antPrefix: string) {
  return {
    xxs: `var(--${antPrefix}-padding-xxs)`, // 4px
    xs: `var(--${antPrefix}-padding-xs)`, // 8px
    sm: `var(--${antPrefix}-padding-sm)`, // 12px
    // DEFAULT: `var(--${antPrefix}-padding)`, // 16px - 移除以避免生成 p-DEFAULT / m-DEFAULT 等无用工具类
    md: `var(--${antPrefix}-padding-md)`, // 20px
    lg: `var(--${antPrefix}-padding-lg)`, // 24px
    xl: `var(--${antPrefix}-padding-xl)`, // 32px
    xxl: `var(--${antPrefix}-padding-xxl)`, // 48px
    xxxl: `var(--${antPrefix}-padding-xxxl)`, // 64px
  }
}

/**
 * 构建边框圆角主题（borderRadius）
 */
export function buildBorderRadiusTheme(antPrefix: string) {
  return {
    xs: `var(--${antPrefix}-border-radius-xs)`,
    sm: `var(--${antPrefix}-border-radius-sm)`,
    DEFAULT: `var(--${antPrefix}-border-radius)`,
    lg: `var(--${antPrefix}-border-radius-lg)`,
  }
}

/**
 * 构建字体大小主题（fontSize）
 *
 * 键名使用 `ant-*` 前缀，避免与 Tailwind 内置的 rem 体系冲突
 * （例如内置的 text-sm → 0.875rem 不会被覆盖）。
 * 用法：`text-ant-sm`、`text-ant-lg` 等。
 */
export function buildFontSizeTheme(antPrefix: string) {
  return {
    'ant-sm': `var(--${antPrefix}-font-size-sm)`,
    'ant-base': `var(--${antPrefix}-font-size)`,
    'ant-lg': `var(--${antPrefix}-font-size-lg)`,
    'ant-xl': `var(--${antPrefix}-font-size-xl)`,
    'ant-h1': `var(--${antPrefix}-font-size-heading-1)`,
    'ant-h2': `var(--${antPrefix}-font-size-heading-2)`,
    'ant-h3': `var(--${antPrefix}-font-size-heading-3)`,
  }
}

/**
 * 构建阴影主题（boxShadow）
 */
export function buildShadowTheme(antPrefix: string) {
  return {
    'DEFAULT': `var(--${antPrefix}-box-shadow)`,
    'sec': `var(--${antPrefix}-box-shadow-secondary)`,
    'secondary': `var(--${antPrefix}-box-shadow-secondary)`,
    'ter': `var(--${antPrefix}-box-shadow-tertiary)`,
    'tertiary': `var(--${antPrefix}-box-shadow-tertiary)`,
    'card': `var(--${antPrefix}-box-shadow-card)`,
    'arrow': `var(--${antPrefix}-box-shadow-popover-arrow)`,
    'drawer-r': `var(--${antPrefix}-box-shadow-drawer-right)`,
    'drawer-l': `var(--${antPrefix}-box-shadow-drawer-left)`,
    'drawer-u': `var(--${antPrefix}-box-shadow-drawer-up)`,
    'drawer-d': `var(--${antPrefix}-box-shadow-drawer-down)`,
    'drawer-right': `var(--${antPrefix}-box-shadow-drawer-right)`,
    'drawer-left': `var(--${antPrefix}-box-shadow-drawer-left)`,
    'drawer-up': `var(--${antPrefix}-box-shadow-drawer-up)`,
    'drawer-down': `var(--${antPrefix}-box-shadow-drawer-down)`,
  }
}
