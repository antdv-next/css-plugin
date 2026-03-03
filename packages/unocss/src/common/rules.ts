/**
 * 规则生成函数
 */

/**
 * 创建颜色类规则
 */
export function createColorRules(prefix: string) {
  const p = prefix ? `${prefix}-` : ''
  
  return [
    // ${prefix}-color-primary 或 ${prefix}-c-primary -> color: var(--${antPrefix}-color-primary)
    [new RegExp(`^${p}(?:color|c)-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { color }
    }],

    // ${prefix}-bg-container -> background-color: var(--${antPrefix}-color-bg-container)
    [new RegExp(`^${p}bg-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { 'background-color': color }
    }],
  ]
}

/**
 * 创建边框颜色规则
 */
export function createBorderRules(prefix: string) {
  const p = prefix ? `${prefix}-` : ''
  
  return [
    // ${prefix}-border 或 ${prefix}-b -> border-color: var(--${antPrefix}-color-border) (DEFAULT)
    [new RegExp(`^${p}(?:border|b)$`), (_: any, { theme }: any) => {
      const color = (theme.colors as any)?.border
      if (color)
        return { 'border-color': color }
    }],
    // ${prefix}-border-primary 或 ${prefix}-b-primary -> border-color: ...
    [new RegExp(`^${p}(?:border|b)-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { 'border-color': color }
    }],
    // 方向性 border: bt/border-t, br/border-r, bb/border-b, bl/border-l
    [new RegExp(`^${p}(?:border-t|bt)-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { 'border-top-color': color }
    }],
    [new RegExp(`^${p}(?:border-r|br)-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { 'border-right-color': color }
    }],
    [new RegExp(`^${p}(?:border-b|bb)-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { 'border-bottom-color': color }
    }],
    [new RegExp(`^${p}(?:border-l|bl)-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { 'border-left-color': color }
    }],
    // 双向 border: bx/border-x, by/border-y
    [new RegExp(`^${p}(?:border-x|bx)-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { 'border-left-color': color, 'border-right-color': color }
    }],
    [new RegExp(`^${p}(?:border-y|by)-(.+)$`), ([_, c]: [any, any], { theme }: any) => {
      const color = (theme.colors as any)?.[c!]
      if (color)
        return { 'border-top-color': color, 'border-bottom-color': color }
    }],
  ]
}

/**
 * 创建间距规则（Margin / Padding）
 */
const spacingTokens = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const
const spacingTokenPattern = `(${spacingTokens.join('|')})`

function getPaddingVar(antPrefix: string, token: string) {
  return `var(--${antPrefix}-padding-${token})`
}

function getMarginVar(antPrefix: string, token: string) {
  return `var(--${antPrefix}-margin-${token})`
}

export function createSpacingRules(prefix: string, antPrefix: string) {
  const p = prefix ? `${prefix}-` : ''
  
  return [
    // --- Margin ---
    // ${prefix}-m-sm -> margin: 12px (var)
    [new RegExp(`^${p}m-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { margin: getMarginVar(antPrefix, s) }
    }],
    // ${prefix}-mt-lg -> margin-top: 24px (var)
    [new RegExp(`^${p}mt-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { 'margin-top': getMarginVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}mb-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { 'margin-bottom': getMarginVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}ml-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { 'margin-left': getMarginVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}mr-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { 'margin-right': getMarginVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}mx-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      const v = getMarginVar(antPrefix, s)
      return { 'margin-left': v, 'margin-right': v }
    }],
    [new RegExp(`^${p}my-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      const v = getMarginVar(antPrefix, s)
      return { 'margin-top': v, 'margin-bottom': v }
    }],

    // --- Padding ---
    [new RegExp(`^${p}p-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { padding: getPaddingVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}pt-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { 'padding-top': getPaddingVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}pb-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { 'padding-bottom': getPaddingVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}pl-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { 'padding-left': getPaddingVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}pr-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      return { 'padding-right': getPaddingVar(antPrefix, s) }
    }],
    [new RegExp(`^${p}px-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      const v = getPaddingVar(antPrefix, s)
      return { 'padding-left': v, 'padding-right': v }
    }],
    [new RegExp(`^${p}py-${spacingTokenPattern}$`), ([_, s]: [any, any]) => {
      const v = getPaddingVar(antPrefix, s)
      return { 'padding-top': v, 'padding-bottom': v }
    }],
  ]
}

/**
 * 创建文本规则（支持 fontSize 和 text 两种模式）
 * @param prefix class 前缀
 * @param themeKey 主题键名，'fontSize' 或 'text'
 */
export function createTextRules(prefix: string, themeKey: 'fontSize' | 'text' = 'fontSize') {
  const p = prefix ? `${prefix}-` : ''
  
  return [
    // ${prefix}-text-lg -> font-size: 16px (var)
    [new RegExp(`^${p}text-(.+)$`), ([_, s]: [any, any], { theme }: any) => {
      if (themeKey === 'fontSize') {
        const v = (theme.fontSize as any)?.[s!]
        if (v)
          return { 'font-size': v }
      }
      else {
        const textConfig = (theme.text as any)?.[s!]
        if (textConfig?.fontSize) {
          return { 'font-size': textConfig.fontSize }
        }
      }
    }],
  ]
}

/**
 * 创建圆角规则（支持 borderRadius 和 radius 两种模式）
 * @param prefix class 前缀
 * @param themeKey 主题键名，'borderRadius' 或 'radius'
 */
export function createRoundedRules(prefix: string, themeKey: 'borderRadius' | 'radius' = 'borderRadius') {
  const p = prefix ? `${prefix}-` : ''
  
  return [
    // ${prefix}-rounded -> border-radius: var(--${antPrefix}-border-radius) (DEFAULT)
    [new RegExp(`^${p}(?:rounded|rd)$`), (_: any, { theme }: any) => {
      const v = (theme[themeKey] as any)?.DEFAULT
      if (v)
        return { 'border-radius': v }
    }],
    // ${prefix}-rounded-sm 或 ${prefix}-rd-sm -> border-radius: 4px (var)
    [new RegExp(`^${p}(?:rounded|rd)-(.+)$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s!]
      if (v)
        return { 'border-radius': v }
    }],
    // 角落圆角: rounded-tl, rounded-tr, rounded-bl, rounded-br (简写: rd-tl, rd-tr, rd-bl, rd-br)
    [new RegExp(`^${p}(?:rounded|rd)-tl(?:-(.+))?$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s || 'DEFAULT']
      if (v)
        return { 'border-top-left-radius': v }
    }],
    [new RegExp(`^${p}(?:rounded|rd)-tr(?:-(.+))?$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s || 'DEFAULT']
      if (v)
        return { 'border-top-right-radius': v }
    }],
    [new RegExp(`^${p}(?:rounded|rd)-bl(?:-(.+))?$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s || 'DEFAULT']
      if (v)
        return { 'border-bottom-left-radius': v }
    }],
    [new RegExp(`^${p}(?:rounded|rd)-br(?:-(.+))?$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s || 'DEFAULT']
      if (v)
        return { 'border-bottom-right-radius': v }
    }],
    // 边侧圆角: rounded-t, rounded-r, rounded-b, rounded-l (简写: rd-t, rd-r, rd-b, rd-l)
    [new RegExp(`^${p}(?:rounded|rd)-t(?:-(.+))?$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s || 'DEFAULT']
      if (v)
        return { 'border-top-left-radius': v, 'border-top-right-radius': v }
    }],
    [new RegExp(`^${p}(?:rounded|rd)-r(?:-(.+))?$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s || 'DEFAULT']
      if (v)
        return { 'border-top-right-radius': v, 'border-bottom-right-radius': v }
    }],
    [new RegExp(`^${p}(?:rounded|rd)-b(?:-(.+))?$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s || 'DEFAULT']
      if (v)
        return { 'border-bottom-left-radius': v, 'border-bottom-right-radius': v }
    }],
    [new RegExp(`^${p}(?:rounded|rd)-l(?:-(.+))?$`), ([_, s]: [any, any], { theme }: any) => {
      const v = (theme[themeKey] as any)?.[s || 'DEFAULT']
      if (v)
        return { 'border-top-left-radius': v, 'border-bottom-left-radius': v }
    }],
  ]
}

/**
 * 创建阴影规则（支持 boxShadow 和 shadow 两种模式）
 * @param prefix class 前缀
 * @param themeKey 主题键名，'boxShadow' 或 'shadow'
 */
export function createShadowRules(prefix: string, themeKey: 'boxShadow' | 'shadow' = 'boxShadow') {
  const p = prefix ? `${prefix}-` : ''
  
  return [
    [
      new RegExp(`^${p}shadow(?:-(.+))?$`),
      ([_, s]: [any, any], { theme }: any) => {
        // 如果 s 存在(有后缀)，用 s；如果 s 不存在(没后缀)，用 'DEFAULT'
        const key = s || 'DEFAULT'
        const v = (theme[themeKey] as any)?.[key]

        if (v)
          return { 'box-shadow': v }
      },
    ],
  ]
}
