/**
 * 主题配置生成函数
 */

export function withThemeTokenPrefix<T>(theme: Record<string, T>, tokenPrefix: string | undefined) {
  if (!tokenPrefix)
    return theme

  return Object.fromEntries(
    Object.entries(theme).map(([key, value]) => [`${tokenPrefix}-${key}`, value]),
  ) as Record<string, T>
}

/**
 * 构建颜色主题
 *
 * 与 antdv 1.3.0 内置 CSS 变量对齐。
 */
export function buildColorsTheme(antPrefix: string, builtPalettes: Record<string, string>) {
  const v = (name: string) => `var(--${antPrefix}-color-${name})`

  return {
    ...builtPalettes,

    // ---------- Primary ----------
    'DEFAULT': v('primary'),
    'primary': v('primary'),
    'primary-hover': v('primary-hover'),
    'primary-active': v('primary-active'),
    'primary-bg': v('primary-bg'),
    'primary-bg-hover': v('primary-bg-hover'),
    'primary-border': v('primary-border'),
    'primary-border-hover': v('primary-border-hover'),
    'primary-text': v('primary-text'),
    'primary-text-hover': v('primary-text-hover'),
    'primary-text-active': v('primary-text-active'),

    // ---------- Success ----------
    'success': v('success'),
    'success-hover': v('success-hover'),
    'success-active': v('success-active'),
    'success-bg': v('success-bg'),
    'success-bg-hover': v('success-bg-hover'),
    'success-border': v('success-border'),
    'success-border-hover': v('success-border-hover'),
    'success-text': v('success-text'),
    'success-text-hover': v('success-text-hover'),
    'success-text-active': v('success-text-active'),

    // ---------- Warning ----------
    'warning': v('warning'),
    'warning-hover': v('warning-hover'),
    'warning-active': v('warning-active'),
    'warning-bg': v('warning-bg'),
    'warning-bg-hover': v('warning-bg-hover'),
    'warning-border': v('warning-border'),
    'warning-border-hover': v('warning-border-hover'),
    'warning-text': v('warning-text'),
    'warning-text-hover': v('warning-text-hover'),
    'warning-text-active': v('warning-text-active'),
    'warning-affix': v('warning-affix'),

    // ---------- Error ----------
    'error': v('error'),
    'error-hover': v('error-hover'),
    'error-active': v('error-active'),
    'error-bg': v('error-bg'),
    'error-bg-hover': v('error-bg-hover'),
    'error-bg-filled-hover': v('error-bg-filled-hover'),
    'error-bg-active': v('error-bg-active'),
    'error-border': v('error-border'),
    'error-border-hover': v('error-border-hover'),
    'error-text': v('error-text'),
    'error-text-hover': v('error-text-hover'),
    'error-text-active': v('error-text-active'),
    'error-affix': v('error-affix'),

    // ---------- Info ----------
    'info': v('info'),
    'info-hover': v('info-hover'),
    'info-active': v('info-active'),
    'info-bg': v('info-bg'),
    'info-bg-hover': v('info-bg-hover'),
    'info-border': v('info-border'),
    'info-border-hover': v('info-border-hover'),
    'info-text': v('info-text'),
    'info-text-hover': v('info-text-hover'),
    'info-text-active': v('info-text-active'),

    // ---------- Link ----------
    'link': v('link'),
    'link-hover': v('link-hover'),
    'link-active': v('link-active'),

    // ---------- Text ----------
    'text': v('text'),
    'text-secondary': v('text-secondary'),
    'text-tertiary': v('text-tertiary'),
    'text-quat': v('text-quaternary'),
    'text-quaternary': v('text-quaternary'),
    'text-placeholder': v('text-placeholder'),
    'text-disabled': v('text-disabled'),
    'text-heading': v('text-heading'),
    'text-label': v('text-label'),
    'text-description': v('text-description'),
    'text-light-solid': v('text-light-solid'),

    // ---------- Fill ----------
    'fill': v('fill'),
    'fill-secondary': v('fill-secondary'),
    'fill-tertiary': v('fill-tertiary'),
    'fill-quaternary': v('fill-quaternary'),
    'fill-content': v('fill-content'),
    'fill-content-hover': v('fill-content-hover'),
    'fill-alter': v('fill-alter'),

    // ---------- Background ----------
    // `base`（colorBgBase）不在此处：theme.colors 会被合并进全局 theme，
    // preset-wind 的 text-<color> 规则会把内置字号工具 text-base 解析成
    // color 并覆盖 font-size（issue #10 同类冲突）。见 buildBgOnlyColorsTheme。
    'container': v('bg-container'),
    'container-disabled': v('bg-container-disabled'),
    'layout': v('bg-layout'),
    'elevated': v('bg-elevated'),
    'spotlight': v('bg-spotlight'),
    'blur': v('bg-blur'),
    'mask': v('bg-mask'),
    'solid': v('bg-solid'),
    'solid-hover': v('bg-solid-hover'),
    'solid-active': v('bg-solid-active'),

    // ---------- 文本别名 ----------
    'main': v('text'),
    'sec': v('text-secondary'),
    'quat': v('text-quaternary'),
    'split': v('split'),

    // ---------- Border ----------
    'border': v('border'),
    'border-sec': v('border-secondary'),
    'border-secondary': v('border-secondary'),
    'border-disabled': v('border-disabled'),
    'border-bg': v('border-bg'),

    // ---------- Icon ----------
    'icon': v('icon'),
    'icon-hover': v('icon-hover'),

    // ---------- 其它 ----------
    'highlight': v('highlight'),
    'white': v('white'),
  }
}

/**
 * 不进入 theme.colors 的颜色 token。
 *
 * 这些 key 与 preset-wind 内置工具类同名（如 `base` 对应字号工具 text-base），
 * 一旦进入合并后的全局 theme 就会被 wind 的颜色规则抢先解析。
 * 它们只通过本 preset 自己的 color/bg/border 规则消费（见 createColorRules
 * 等的 extraColors 参数），对应工具类（bg-base 等）行为不变。
 */
export function buildBgOnlyColorsTheme(antPrefix: string) {
  return {
    base: `var(--${antPrefix}-color-bg-base)`,
  }
}

/**
 * 构建 Padding 主题
 *
 * antdv 1.3.0 之后 padding token 仅到 xl（32px），不再有 xxl/xxxl。
 */
export function buildPaddingTheme(antPrefix: string) {
  return {
    xxs: `var(--${antPrefix}-padding-xxs)`, // 4px
    xs: `var(--${antPrefix}-padding-xs)`, // 8px
    sm: `var(--${antPrefix}-padding-sm)`, // 12px
    md: `var(--${antPrefix}-padding-md)`, // 20px
    lg: `var(--${antPrefix}-padding-lg)`, // 24px
    xl: `var(--${antPrefix}-padding-xl)`, // 32px
  }
}

/**
 * 构建 Margin 主题
 *
 * antdv 1.3.0 之后 margin token 到 xxl（48px），不再有 xxxl。
 */
export function buildMarginTheme(antPrefix: string) {
  return {
    xxs: `var(--${antPrefix}-margin-xxs)`, // 4px
    xs: `var(--${antPrefix}-margin-xs)`, // 8px
    sm: `var(--${antPrefix}-margin-sm)`, // 12px
    md: `var(--${antPrefix}-margin-md)`, // 20px
    lg: `var(--${antPrefix}-margin-lg)`, // 24px
    xl: `var(--${antPrefix}-margin-xl)`, // 32px
    xxl: `var(--${antPrefix}-margin-xxl)`, // 48px
  }
}

/**
 * 构建边框圆角主题（Wind3 风格）
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
 * 构建边框圆角主题（Tailwind 4 风格 - radius）
 */
export function buildRadiusTheme(antPrefix: string) {
  return buildBorderRadiusTheme(antPrefix)
}

/**
 * 构建字体大小主题（Wind3 风格）
 */
export function buildFontSizeTheme(antPrefix: string) {
  return {
    sm: `var(--${antPrefix}-font-size-sm)`,
    DEFAULT: `var(--${antPrefix}-font-size)`,
    lg: `var(--${antPrefix}-font-size-lg)`,
    xl: `var(--${antPrefix}-font-size-xl)`,
    h1: `var(--${antPrefix}-font-size-heading-1)`,
    h2: `var(--${antPrefix}-font-size-heading-2)`,
    h3: `var(--${antPrefix}-font-size-heading-3)`,
  }
}

/**
 * 构建文本主题（Tailwind 4 风格 - text）
 */
export function buildTextTheme(antPrefix: string) {
  return {
    sm: {
      fontSize: `var(--${antPrefix}-font-size-sm)`,
    },
    DEFAULT: {
      fontSize: `var(--${antPrefix}-font-size)`,
    },
    lg: {
      fontSize: `var(--${antPrefix}-font-size-lg)`,
    },
    xl: {
      fontSize: `var(--${antPrefix}-font-size-xl)`,
    },
    h1: {
      fontSize: `var(--${antPrefix}-font-size-heading-1)`,
    },
    h2: {
      fontSize: `var(--${antPrefix}-font-size-heading-2)`,
    },
    h3: {
      fontSize: `var(--${antPrefix}-font-size-heading-3)`,
    },
  }
}

/**
 * 构建阴影主题（boxShadow 或 shadow）
 */
export function buildShadowTheme(antPrefix: string) {
  return {
    // DEFAULT 是当用户只写 class="${prefix}-shadow" 时使用的值
    'DEFAULT': `var(--${antPrefix}-box-shadow)`,

    // 对应 class="${prefix}-shadow-sec" 或 "${prefix}-shadow-secondary"
    'sec': `var(--${antPrefix}-box-shadow-secondary)`,
    'secondary': `var(--${antPrefix}-box-shadow-secondary)`,

    // 对应 class="${prefix}-shadow-ter"
    'ter': `var(--${antPrefix}-box-shadow-tertiary)`,
    'tertiary': `var(--${antPrefix}-box-shadow-tertiary)`,

    // 常用组件阴影
    'card': `var(--${antPrefix}-box-shadow-card)`,
    'arrow': `var(--${antPrefix}-box-shadow-popover-arrow)`,

    // 方向性阴影 (抽屉等使用)
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
