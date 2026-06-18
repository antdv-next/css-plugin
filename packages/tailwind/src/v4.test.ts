import { describe, expect, it } from 'vitest'
import { defaultCompatThemeCSS, defaultThemeCSS, generateCompatThemeCSS, generateThemeCSS } from './v4'

describe('generateThemeCSS (classic)', () => {
  it('emits unnamespaced theme tokens', () => {
    const css = generateThemeCSS()
    expect(css).toContain('--color-primary: var(--ant-color-primary);')
    expect(css).toContain('--padding-lg: var(--ant-padding-lg);')
    expect(css).toContain('--margin-xxl: var(--ant-margin-xxl);')
    expect(css).toContain('--shadow-card: var(--ant-box-shadow-card);')
    expect(css).toContain('--text-lg: var(--ant-font-size-lg);')
    expect(css).toContain('--radius-lg: var(--ant-border-radius-lg);')
  })

  it('does not include xxl/xxxl padding (removed in antdv 1.3.0)', () => {
    const css = generateThemeCSS()
    expect(css).not.toMatch(/--padding-xxxl:/)
    expect(css).not.toMatch(/--padding-xxl:/)
    expect(css).not.toMatch(/--margin-xxxl:/)
  })

  it('respects custom antPrefix', () => {
    const css = generateThemeCSS({ antPrefix: 'my' })
    expect(css).toContain('--color-primary: var(--my-color-primary);')
    expect(css).toContain('--padding-lg: var(--my-padding-lg);')
  })

  it('exposes a default snapshot via defaultThemeCSS', () => {
    expect(defaultThemeCSS).toBe(generateThemeCSS())
  })

  it('keeps border-solid as a border-style utility (#10)', () => {
    const css = generateThemeCSS()
    // `--color-solid` 会让 border-solid 变成边框颜色工具类，必须限制在 bg/text 命名空间
    expect(css).not.toContain('--color-solid:')
    expect(css).toContain('--background-color-solid: var(--ant-color-bg-solid);')
    expect(css).toContain('--text-color-solid: var(--ant-color-bg-solid);')
    // solid-hover / solid-active 不与 border-style 关键字冲突，保持原命名空间
    expect(css).toContain('--color-solid-hover: var(--ant-color-bg-solid-hover);')
    expect(css).toContain('--color-solid-active: var(--ant-color-bg-solid-active);')
  })

  it('keeps text-base as a font-size utility (#10)', () => {
    const css = generateThemeCSS()
    // `--color-base` 会让内置字号工具 text-base 被解析成文字颜色，必须限制在 bg 命名空间
    expect(css).not.toContain('--color-base:')
    expect(css).not.toContain('--text-color-base:')
    expect(css).toContain('--background-color-base: var(--ant-color-bg-base);')
  })
})

describe('generateCompatThemeCSS (namespaced)', () => {
  it('namespaces every theme token with the default ant- prefix', () => {
    const css = generateCompatThemeCSS()
    expect(css).toContain('--color-ant-primary: var(--ant-color-primary);')
    expect(css).toContain('--padding-ant-lg: var(--ant-padding-lg);')
    expect(css).toContain('--margin-ant-xxl: var(--ant-margin-xxl);')
    expect(css).toContain('--shadow-ant-card: var(--ant-box-shadow-card);')
    expect(css).toContain('--text-ant-lg: var(--ant-font-size-lg);')
    expect(css).toContain('--radius-ant-lg: var(--ant-border-radius-lg);')
    expect(css).toContain('--color-ant-blue-6: var(--ant-blue-6);')
  })

  it('emits namespaced spacing utilities (p-ant-lg → var(--padding-ant-lg))', () => {
    const css = generateCompatThemeCSS()
    expect(css).toContain('@utility p-ant-lg {')
    expect(css).toContain('  padding: var(--padding-ant-lg);')
    expect(css).toContain('@utility m-ant-xxl {')
    expect(css).toContain('  margin: var(--margin-ant-xxl);')
    // 不应污染 Tailwind 原生 p-* / m-*
    expect(css).not.toMatch(/^@utility p-lg /m)
    expect(css).not.toMatch(/^@utility m-lg /m)
  })

  it('emits prefixed shortcut utilities by default (a-*)', () => {
    const css = generateCompatThemeCSS()
    expect(css).toContain('@utility a-bg-primary {')
    expect(css).toContain('  background-color: var(--ant-color-primary);')
    expect(css).toContain('@utility a-p-lg {')
    expect(css).toContain('  padding: var(--ant-padding-lg);')
    expect(css).toContain('@utility a-rounded {')
    expect(css).toContain('@utility a-shadow {')
    expect(css).toContain('@utility a-shadow-card {')
    expect(css).toContain('@utility a-text {')
    expect(css).toContain('@utility a-text-lg {')
  })

  it('skips prefixed utilities when allowPrefixedUtilities=false', () => {
    const css = generateCompatThemeCSS({ allowPrefixedUtilities: false })
    expect(css).not.toContain('@utility a-bg-primary')
    expect(css).not.toContain('@utility a-p-lg')
    expect(css).not.toContain('@utility a-shadow')
    // 但 namespace 主题 token 仍然存在
    expect(css).toContain('--color-ant-primary: var(--ant-color-primary);')
    expect(css).toContain('@utility p-ant-lg {')
  })

  it('honors custom tokenPrefix', () => {
    const css = generateCompatThemeCSS({ tokenPrefix: 'antd' })
    expect(css).toContain('--color-antd-primary: var(--ant-color-primary);')
    expect(css).toContain('@utility p-antd-lg {')
    expect(css).toContain('  padding: var(--padding-antd-lg);')
    expect(css).not.toContain('--color-ant-primary:')
    expect(css).not.toContain('@utility p-ant-lg')
  })

  it('honors custom prefix for shortcut utilities', () => {
    const css = generateCompatThemeCSS({ prefix: 'antd' })
    expect(css).toContain('@utility antd-bg-primary {')
    expect(css).toContain('@utility antd-rounded {')
    expect(css).not.toContain('@utility a-bg-primary')
  })

  it('honors custom antPrefix (CSS variable source)', () => {
    const css = generateCompatThemeCSS({ antPrefix: 'my' })
    expect(css).toContain('--color-ant-primary: var(--my-color-primary);')
    expect(css).toContain('--padding-ant-lg: var(--my-padding-lg);')
    expect(css).toContain('@utility a-bg-primary {')
    expect(css).toContain('  background-color: var(--my-color-primary);')
  })

  it('exposes a default snapshot via defaultCompatThemeCSS', () => {
    expect(defaultCompatThemeCSS).toBe(generateCompatThemeCSS())
  })
})
