/**
 * 规则生成函数
 *
 * 每组 `create*Rules` 都会按需输出三类工具类：
 * - prefixed   ：`${prefix}-bg-primary`     —— 稳定 API（推荐）
 * - unprefixed ：`bg-primary`               —— 旧 API（兼容）
 * - namespaced ：`bg-${tokenPrefix}-primary`—— namespace 安全 API（推荐替代裸写法）
 */

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 将一个 token 名（可能带 namespace 前缀）解析回 theme 中的实际 key。
 *
 * - `resolveTokenKey('primary')                   -> 'primary'`
 * - `resolveTokenKey('ant-primary', 'ant')        -> 'primary'`
 * - `resolveTokenKey('ant', 'ant')                -> 'DEFAULT'`
 * - `resolveTokenKey('primary', 'ant')            -> 'primary'`（不带 namespace 时透传）
 */
function resolveTokenKey(token: string, tokenPrefix?: string) {
  if (!tokenPrefix)
    return token

  if (token === tokenPrefix)
    return 'DEFAULT'

  const namespacePrefix = `${tokenPrefix}-`
  if (token.startsWith(namespacePrefix))
    return token.slice(namespacePrefix.length)

  return token
}

function createThemeValueResolver(themeKey: string, tokenPrefix?: string) {
  return (token: string, theme: any) => (theme[themeKey] as any)?.[resolveTokenKey(token, tokenPrefix)]
}

/**
 * 创建颜色类规则（color / bg）
 */
export function createColorRules(
  prefix: string,
  tokenPrefix?: string,
  allowUnprefixed = true,
  allowPrefixedUtilities = true,
) {
  const p = prefix ? `${prefix}-` : ''
  const ns = tokenPrefix ? escapeRegExp(tokenPrefix) : ''
  const resolveColor = (token: string, theme: any) =>
    (theme.colors as any)?.[resolveTokenKey(token, tokenPrefix)]
  const rules: any[] = []

  if (allowPrefixedUtilities) {
    rules.push(
      [new RegExp(`^${p}(?:color|c)-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token!, theme)
        if (color)
          return { color }
      }],
      [new RegExp(`^${p}bg-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token!, theme)
        if (color)
          return { 'background-color': color }
      }],
    )
  }

  if (allowUnprefixed) {
    rules.push(
      [new RegExp(`^(?:color|c)-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token!, theme)
        if (color)
          return { color }
      }],
      [new RegExp(`^bg-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token!, theme)
        if (color)
          return { 'background-color': color }
      }],
    )
  }

  if (tokenPrefix) {
    rules.push(
      [new RegExp(`^(?:color|c)-${ns}(?:-(.+))?$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token ? `${tokenPrefix}-${token}` : tokenPrefix, theme)
        if (color)
          return { color }
      }],
      [new RegExp(`^bg-${ns}(?:-(.+))?$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token ? `${tokenPrefix}-${token}` : tokenPrefix, theme)
        if (color)
          return { 'background-color': color }
      }],
    )
  }

  return rules
}

/**
 * 创建边框颜色规则
 */
export function createBorderRules(
  prefix: string,
  tokenPrefix?: string,
  allowUnprefixed = true,
  allowPrefixedUtilities = true,
) {
  const p = prefix ? `${prefix}-` : ''
  const ns = tokenPrefix ? escapeRegExp(tokenPrefix) : ''
  const resolveColor = (token: string, theme: any) =>
    (theme.colors as any)?.[resolveTokenKey(token, tokenPrefix)]
  const rules: any[] = []

  if (allowPrefixedUtilities) {
    rules.push([new RegExp(`^${p}(?:border|b)-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
      const color = resolveColor(token!, theme)
      if (color)
        return { 'border-color': color }
    }])
  }

  if (allowUnprefixed) {
    rules.push([new RegExp(`^(?:border|b)-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
      const color = resolveColor(token!, theme)
      if (color)
        return { 'border-color': color }
    }])
  }

  if (tokenPrefix) {
    rules.push([new RegExp(`^(?:border|b)-${ns}(?:-(.+))?$`), ([_, token]: [any, any], { theme }: any) => {
      const color = resolveColor(token ? `${tokenPrefix}-${token}` : tokenPrefix, theme)
      if (color)
        return { 'border-color': color }
    }])
  }

  const directions = [
    ['border-t', 'bt', ['border-top-color']],
    ['border-r', 'br', ['border-right-color']],
    ['border-b', 'bb', ['border-bottom-color']],
    ['border-l', 'bl', ['border-left-color']],
    ['border-x', 'bx', ['border-left-color', 'border-right-color']],
    ['border-y', 'by', ['border-top-color', 'border-bottom-color']],
  ] as const

  for (const [full, short, props] of directions) {
    if (allowPrefixedUtilities) {
      rules.push([new RegExp(`^${p}(?:${full}|${short})-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token!, theme)
        if (!color)
          return
        return Object.fromEntries(props.map(prop => [prop, color]))
      }])
    }

    if (allowUnprefixed) {
      rules.push([new RegExp(`^(?:${full}|${short})-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token!, theme)
        if (!color)
          return
        return Object.fromEntries(props.map(prop => [prop, color]))
      }])
    }

    if (tokenPrefix) {
      rules.push([new RegExp(`^(?:${full}|${short})-${ns}(?:-(.+))?$`), ([_, token]: [any, any], { theme }: any) => {
        const color = resolveColor(token ? `${tokenPrefix}-${token}` : tokenPrefix, theme)
        if (!color)
          return
        return Object.fromEntries(props.map(prop => [prop, color]))
      }])
    }
  }

  return rules
}

/**
 * 创建间距规则（Margin / Padding）
 *
 * 与 antdv 1.3.0 内置 CSS 变量保持一致：
 * - padding 仅到 xl（xxl/xxxl 已被移除）
 * - margin 到 xxl（xxxl 已被移除）
 */
const paddingTokens = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const
const marginTokens = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
const paddingTokenPattern = `(${paddingTokens.join('|')})`
const marginTokenPattern = `(${marginTokens.join('|')})`

function getPaddingVar(antPrefix: string, token: string) {
  return `var(--${antPrefix}-padding-${token})`
}

function getMarginVar(antPrefix: string, token: string) {
  return `var(--${antPrefix}-margin-${token})`
}

type SpacingUtility = readonly [
  string,
  string | readonly string[],
  typeof getPaddingVar,
  string,
]

export function createSpacingRules(
  prefix: string,
  antPrefix: string,
  tokenPrefix?: string,
  allowUnprefixed = true,
  allowPrefixedUtilities = true,
) {
  const p = prefix ? `${prefix}-` : ''
  const ns = tokenPrefix ? `${escapeRegExp(tokenPrefix)}-` : ''

  const utilities: ReadonlyArray<SpacingUtility> = [
    // margin
    ['m', 'margin', getMarginVar, marginTokenPattern],
    ['mt', 'margin-top', getMarginVar, marginTokenPattern],
    ['mb', 'margin-bottom', getMarginVar, marginTokenPattern],
    ['ml', 'margin-left', getMarginVar, marginTokenPattern],
    ['mr', 'margin-right', getMarginVar, marginTokenPattern],
    ['mx', ['margin-left', 'margin-right'], getMarginVar, marginTokenPattern],
    ['my', ['margin-top', 'margin-bottom'], getMarginVar, marginTokenPattern],
    // padding
    ['p', 'padding', getPaddingVar, paddingTokenPattern],
    ['pt', 'padding-top', getPaddingVar, paddingTokenPattern],
    ['pb', 'padding-bottom', getPaddingVar, paddingTokenPattern],
    ['pl', 'padding-left', getPaddingVar, paddingTokenPattern],
    ['pr', 'padding-right', getPaddingVar, paddingTokenPattern],
    ['px', ['padding-left', 'padding-right'], getPaddingVar, paddingTokenPattern],
    ['py', ['padding-top', 'padding-bottom'], getPaddingVar, paddingTokenPattern],
  ] as const

  const createStyle = (
    prop: string | readonly string[],
    token: string,
    getter: typeof getPaddingVar,
  ) => {
    const value = getter(antPrefix, token)
    if (Array.isArray(prop))
      return Object.fromEntries(prop.map(key => [key, value]))
    return { [prop as string]: value }
  }

  const rules: any[] = []

  for (const [utility, prop, getter, pattern] of utilities) {
    if (allowPrefixedUtilities) {
      rules.push([new RegExp(`^${p}${utility}-${pattern}$`), ([_, token]: [any, any]) => {
        return createStyle(prop, token!, getter)
      }])
    }

    if (allowUnprefixed) {
      rules.push([new RegExp(`^${utility}-${pattern}$`), ([_, token]: [any, any]) => {
        return createStyle(prop, token!, getter)
      }])
    }

    if (tokenPrefix) {
      rules.push([new RegExp(`^${utility}-${ns}${pattern}$`), ([_, token]: [any, any]) => {
        return createStyle(prop, token!, getter)
      }])
    }
  }

  return rules
}

/**
 * 创建文本规则（支持 fontSize 和 text 两种模式）
 */
export function createTextRules(
  prefix: string,
  themeKey: 'fontSize' | 'text' = 'fontSize',
  tokenPrefix?: string,
  allowUnprefixed = true,
  allowPrefixedUtilities = true,
) {
  const p = prefix ? `${prefix}-` : ''
  const ns = tokenPrefix ? `${escapeRegExp(tokenPrefix)}-` : ''
  const rules: any[] = []

  const resolveValue = (token: string, theme: any) => {
    const key = resolveTokenKey(token, tokenPrefix)
    if (themeKey === 'fontSize')
      return (theme.fontSize as any)?.[key]
    return (theme.text as any)?.[key]?.fontSize
  }

  if (allowPrefixedUtilities) {
    rules.push([new RegExp(`^${p}text-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
      const value = resolveValue(token!, theme)
      if (value)
        return { 'font-size': value }
    }])
  }

  if (allowUnprefixed) {
    rules.push([new RegExp(`^text-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
      const value = resolveValue(token!, theme)
      if (value)
        return { 'font-size': value }
    }])
  }

  if (tokenPrefix) {
    rules.push([new RegExp(`^text-${ns}(.+)$`), ([_, token]: [any, any], { theme }: any) => {
      const value = resolveValue(`${tokenPrefix}-${token!}`, theme)
      if (value)
        return { 'font-size': value }
    }])
  }

  return rules
}

function buildRadiusStyle(props: string[], value: string) {
  return Object.fromEntries(props.map(prop => [prop, value]))
}

/**
 * 创建圆角规则
 */
export function createRoundedRules(
  prefix: string,
  themeKey: 'borderRadius' | 'radius' = 'borderRadius',
  tokenPrefix?: string,
  allowUnprefixed = true,
  allowPrefixedUtilities = true,
) {
  const p = prefix ? `${prefix}-` : ''
  const ns = tokenPrefix ? escapeRegExp(tokenPrefix) : ''
  const resolveRadius = createThemeValueResolver(themeKey, tokenPrefix)
  const rules: any[] = []

  if (allowPrefixedUtilities) {
    rules.push(
      [new RegExp(`^${p}(?:rounded|rd)$`), (_: any, { theme }: any) => {
        const value = resolveRadius('DEFAULT', theme)
        if (value)
          return { 'border-radius': value }
      }],
      [new RegExp(`^${p}(?:rounded|rd)-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const value = resolveRadius(token!, theme)
        if (value)
          return { 'border-radius': value }
      }],
    )
  }

  if (allowUnprefixed) {
    rules.push(
      [new RegExp(`^(?:rounded|rd)$`), (_: any, { theme }: any) => {
        const value = resolveRadius('DEFAULT', theme)
        if (value)
          return { 'border-radius': value }
      }],
      [new RegExp(`^(?:rounded|rd)-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const value = resolveRadius(token!, theme)
        if (value)
          return { 'border-radius': value }
      }],
    )
  }

  if (tokenPrefix) {
    rules.push(
      [new RegExp(`^(?:rounded|rd)-${ns}$`), (_: any, { theme }: any) => {
        const value = resolveRadius(tokenPrefix, theme)
        if (value)
          return { 'border-radius': value }
      }],
      [new RegExp(`^(?:rounded|rd)-${ns}-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
        const value = resolveRadius(`${tokenPrefix}-${token!}`, theme)
        if (value)
          return { 'border-radius': value }
      }],
    )
  }

  const directions = [
    ['tl', ['border-top-left-radius']],
    ['tr', ['border-top-right-radius']],
    ['bl', ['border-bottom-left-radius']],
    ['br', ['border-bottom-right-radius']],
    ['t', ['border-top-left-radius', 'border-top-right-radius']],
    ['r', ['border-top-right-radius', 'border-bottom-right-radius']],
    ['b', ['border-bottom-left-radius', 'border-bottom-right-radius']],
    ['l', ['border-top-left-radius', 'border-bottom-left-radius']],
  ] as const

  for (const [suffix, props] of directions) {
    if (allowPrefixedUtilities) {
      rules.push(
        [new RegExp(`^${p}(?:rounded|rd)-${suffix}$`), (_: any, { theme }: any) => {
          const value = resolveRadius('DEFAULT', theme)
          if (value)
            return buildRadiusStyle([...props], value)
        }],
        [new RegExp(`^${p}(?:rounded|rd)-${suffix}-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
          const value = resolveRadius(token!, theme)
          if (value)
            return buildRadiusStyle([...props], value)
        }],
      )
    }

    if (allowUnprefixed) {
      rules.push(
        [new RegExp(`^(?:rounded|rd)-${suffix}$`), (_: any, { theme }: any) => {
          const value = resolveRadius('DEFAULT', theme)
          if (value)
            return buildRadiusStyle([...props], value)
        }],
        [new RegExp(`^(?:rounded|rd)-${suffix}-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
          const value = resolveRadius(token!, theme)
          if (value)
            return buildRadiusStyle([...props], value)
        }],
      )
    }

    if (tokenPrefix) {
      rules.push(
        [new RegExp(`^(?:rounded|rd)-${suffix}-${ns}$`), (_: any, { theme }: any) => {
          const value = resolveRadius(tokenPrefix, theme)
          if (value)
            return buildRadiusStyle([...props], value)
        }],
        [new RegExp(`^(?:rounded|rd)-${suffix}-${ns}-(.+)$`), ([_, token]: [any, any], { theme }: any) => {
          const value = resolveRadius(`${tokenPrefix}-${token!}`, theme)
          if (value)
            return buildRadiusStyle([...props], value)
        }],
      )
    }
  }

  return rules
}

/**
 * 创建阴影规则
 */
export function createShadowRules(
  prefix: string,
  themeKey: 'boxShadow' | 'shadow' = 'boxShadow',
  tokenPrefix?: string,
  allowUnprefixed = true,
  allowPrefixedUtilities = true,
) {
  const p = prefix ? `${prefix}-` : ''
  const ns = tokenPrefix ? escapeRegExp(tokenPrefix) : ''
  const resolveShadow = createThemeValueResolver(themeKey, tokenPrefix)
  const rules: any[] = []

  if (allowPrefixedUtilities) {
    rules.push([new RegExp(`^${p}shadow(?:-(.+))?$`), ([_, token]: [any, any], { theme }: any) => {
      const value = resolveShadow(token || 'DEFAULT', theme)
      if (value)
        return { 'box-shadow': value }
    }])
  }

  if (allowUnprefixed) {
    rules.push([new RegExp(`^shadow(?:-(.+))?$`), ([_, token]: [any, any], { theme }: any) => {
      const value = resolveShadow(token || 'DEFAULT', theme)
      if (value)
        return { 'box-shadow': value }
    }])
  }

  if (tokenPrefix) {
    rules.push([new RegExp(`^shadow-${ns}(?:-(.+))?$`), ([_, token]: [any, any], { theme }: any) => {
      const value = resolveShadow(token ? `${tokenPrefix}-${token}` : tokenPrefix, theme)
      if (value)
        return { 'box-shadow': value }
    }])
  }

  return rules
}
