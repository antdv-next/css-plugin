import { createGenerator, presetWind3 } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetAntd } from './preset'
import { presetAntdTailwind4 } from './presetTailwind4'

function hasMatchingRule(rules: any[] | undefined, utility: string) {
  return (rules ?? []).some((rule) => {
    if (!Array.isArray(rule) || !(rule[0] instanceof RegExp))
      return false

    return rule[0].test(utility)
  })
}

function hasUnprefixedAutocomplete(templates: string[] | undefined) {
  const legacyPatterns = [
    /^color-\(/,
    /^c-\(/,
    /^bg-\(/,
    /^border-\(/,
    /^b-\(/,
    /^(?:border-[trblxy]|b[trblxy])-\(/,
    /^(?:m|mt|mb|ml|mr|mx|my)-\(/,
    /^(?:p|pt|pb|pl|pr|px|py)-\(/,
    /^text-\(/,
    /^(?:rounded|rd)(?:$|-\()/,
    /^(?:rounded|rd)-[trbl](?:$|-\()/,
    /^shadow(?:$|-\()/,
  ]

  return (templates ?? []).some(template => legacyPatterns.some(pattern => pattern.test(template)))
}

function resolveUtility(preset: any, utility: string) {
  for (const rule of (preset.rules ?? [])) {
    if (!Array.isArray(rule) || !(rule[0] instanceof RegExp) || typeof rule[1] !== 'function')
      continue

    const match = utility.match(rule[0])
    if (!match)
      continue

    return rule[1](match, { theme: preset.theme ?? {} })
  }
}

describe('presetAntd', () => {
  it('supports unprefixed utilities by default', () => {
    const preset = presetAntd()

    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(true)
    expect(hasMatchingRule(preset.rules as any[], 'text-ant-sm')).toBe(true)
    expect(hasUnprefixedAutocomplete(preset.autocomplete?.templates as string[])).toBe(true)
  })

  it('adds namespace-safe utilities without changing prefixed APIs', () => {
    const preset = presetAntd()

    expect(resolveUtility(preset, 'a-bg-primary')).toEqual({
      'background-color': 'var(--ant-color-primary)',
    })
    expect(resolveUtility(preset, 'bg-ant-primary')).toEqual({
      'background-color': 'var(--ant-color-primary)',
    })
    expect(resolveUtility(preset, 'p-ant-lg')).toEqual({
      padding: 'var(--ant-padding-lg)',
    })
    expect(resolveUtility(preset, 'rounded-ant-sm')).toEqual({
      'border-radius': 'var(--ant-border-radius-sm)',
    })
    expect(resolveUtility(preset, 'shadow-ant-card')).toEqual({
      'box-shadow': 'var(--ant-box-shadow-card)',
    })
    expect(resolveUtility(preset, 'text-ant-sm')).toEqual({
      'font-size': 'var(--ant-font-size-sm)',
    })
  })

  it('treats bare namespace as DEFAULT', () => {
    const preset = presetAntd()

    expect(resolveUtility(preset, 'bg-ant')).toEqual({
      'background-color': 'var(--ant-color-primary)',
    })
    expect(resolveUtility(preset, 'shadow-ant')).toEqual({
      'box-shadow': 'var(--ant-box-shadow)',
    })
    expect(resolveUtility(preset, 'rounded-ant')).toEqual({
      'border-radius': 'var(--ant-border-radius)',
    })
  })

  it('supports custom tokenPrefix', () => {
    const preset = presetAntd({
      tokenPrefix: 'antd',
      allowUnprefixed: false,
      allowPrefixedUtilities: false,
    })

    expect(hasMatchingRule(preset.rules as any[], 'a-color-primary')).toBe(false)
    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(false)
    expect(hasMatchingRule(preset.rules as any[], 'color-antd-primary')).toBe(true)
    expect(resolveUtility(preset, 'color-antd-primary')).toEqual({
      color: 'var(--ant-color-primary)',
    })
  })

  it('can disable legacy bare utilities while preserving namespaced ones', () => {
    const preset = presetAntd({ allowUnprefixed: false })
    const colors = (preset.theme as { colors?: Record<string, string> })?.colors

    expect(hasMatchingRule(preset.rules as any[], 'a-color-primary')).toBe(true)
    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(false)
    expect(hasMatchingRule(preset.rules as any[], 'color-ant-primary')).toBe(true)
    expect(hasUnprefixedAutocomplete(preset.autocomplete?.templates as string[])).toBe(false)
    // theme key 不再受 allowUnprefixed 影响
    expect(colors?.primary).toBeDefined()
    expect(colors?.['a-primary']).toBeUndefined()
    expect(resolveUtility(preset, 'color-ant-primary')).toEqual({
      color: 'var(--ant-color-primary)',
    })
  })

  it('can disable both bare and prefixed, keeping only namespaced utilities', () => {
    const preset = presetAntd({
      allowUnprefixed: false,
      allowPrefixedUtilities: false,
    })

    expect(hasMatchingRule(preset.rules as any[], 'a-bg-primary')).toBe(false)
    expect(hasMatchingRule(preset.rules as any[], 'bg-primary')).toBe(false)
    expect(hasMatchingRule(preset.rules as any[], 'bg-ant-primary')).toBe(true)
  })

  it('does not treat border-style keywords as border colors (#10)', () => {
    const preset = presetAntd()

    // 裸写法放行 border-style 关键字，交还给 preset-wind 处理
    expect(resolveUtility(preset, 'border-solid')).toBeUndefined()
    expect(resolveUtility(preset, 'b-solid')).toBeUndefined()
    expect(resolveUtility(preset, 'border-t-solid')).toBeUndefined()

    // 边框颜色仍可通过 namespace / 前缀写法获得
    expect(resolveUtility(preset, 'border-ant-solid')).toEqual({
      'border-color': 'var(--ant-color-bg-solid)',
    })
    expect(resolveUtility(preset, 'a-border-solid')).toEqual({
      'border-color': 'var(--ant-color-bg-solid)',
    })
    // 非关键字的颜色 token 不受影响
    expect(resolveUtility(preset, 'border-solid-hover')).toEqual({
      'border-color': 'var(--ant-color-bg-solid-hover)',
    })
  })

  it('generates border-style for border-solid with presetWind3 (#10)', async () => {
    const uno = await createGenerator({
      presets: [presetWind3(), presetAntd()],
    })

    const { css } = await uno.generate('border-solid border-ant-solid', { preflights: false })

    expect(css).toContain('border-style:solid')
    expect(css).toMatch(/\.border-ant-solid\{border-color:var\(--ant-color-bg-solid\)/)
    expect(css).not.toMatch(/\.border-solid\{border-color/)
  })

  it('does not hijack preset-wind utilities via merged theme (#10)', async () => {
    const uno = await createGenerator({
      presets: [presetWind3(), presetAntd()],
    })

    const { css } = await uno.generate(
      'text-base text-xs shadow-md bg-base bg-ant-base border-ant-base decoration-solid',
      { preflights: false },
    )

    // text-base / text-xs 必须保持 preset-wind 的字号语义（tuple 值不能被当成 font-size 输出）
    expect(css).toMatch(/\.text-base\{font-size:1rem;line-height:1\.5rem/)
    expect(css).toMatch(/\.text-xs\{font-size:0\.75rem;line-height:1rem/)
    expect(css).not.toMatch(/\.text-base\{color:/)
    // shadow-md 必须走 preset-wind 的 --un-shadow 管线
    expect(css).toContain('--un-shadow:')
    // bg-base / bg-ant-base / border-ant-base 仍由本 preset 提供
    // （相同样式的选择器会被 UnoCSS 合并，因此分开断言）
    expect(css).toContain('.bg-base')
    expect(css).toContain('.bg-ant-base')
    expect(css).toContain('background-color:var(--ant-color-bg-base)')
    expect(css).toMatch(/\.border-ant-base\{border-color:var\(--ant-color-bg-base\)/)
    expect(css).toMatch(/\.decoration-solid\{text-decoration-style:solid/)
  })

  it('leaves preset-wind raw-value tokens to wind (opacity/shadow pipelines) (#10)', async () => {
    const uno = await createGenerator({
      presets: [presetWind3(), presetAntd()],
    })

    const { css } = await uno.generate('bg-black border-black shadow-sm shadow-none', { preflights: false })

    // wind 默认 token 的原始值（#000、shadow 列表）必须由 wind 输出，
    // 保留 --un-bg-opacity / --un-shadow 变量管线
    expect(css).toMatch(/\.bg-black\{--un-bg-opacity:1;background-color:rgb\(0 0 0/)
    expect(css).toMatch(/\.border-black\{--un-border-opacity:1/)
    expect(css).toMatch(/\.shadow-sm\{--un-shadow:/)
    expect(css).toMatch(/\.shadow-none\{--un-shadow:/)
  })

  it('disables namespace mode when tokenPrefix is empty', () => {
    const preset = presetAntd({ tokenPrefix: '' })

    expect(resolveUtility(preset, 'a-bg-primary')).toEqual({
      'background-color': 'var(--ant-color-primary)',
    })
    expect(resolveUtility(preset, 'bg-primary')).toEqual({
      'background-color': 'var(--ant-color-primary)',
    })
    // 关闭 namespace 后，bg-ant-primary 无法解析（theme 里没有 ant-primary key）
    expect(resolveUtility(preset, 'bg-ant-primary')).toBeUndefined()
  })
})

describe('presetAntdTailwind4', () => {
  it('supports unprefixed utilities by default', () => {
    const preset = presetAntdTailwind4()

    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(true)
    expect(hasMatchingRule(preset.rules as any[], 'rounded-ant-lg')).toBe(true)
    expect(hasUnprefixedAutocomplete(preset.autocomplete?.templates as string[])).toBe(true)
  })

  it('can disable legacy bare utilities without rewriting theme keys', () => {
    const preset = presetAntdTailwind4({ allowUnprefixed: false })
    const colors = (preset.theme as { colors?: Record<string, string> })?.colors

    expect(hasMatchingRule(preset.rules as any[], 'a-color-primary')).toBe(true)
    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(false)
    expect(hasMatchingRule(preset.rules as any[], 'bg-ant-primary')).toBe(true)
    expect(hasUnprefixedAutocomplete(preset.autocomplete?.templates as string[])).toBe(false)
    expect(colors?.primary).toBeDefined()
    expect(colors?.['a-primary']).toBeUndefined()
    expect(resolveUtility(preset, 'text-ant-h1')).toEqual({
      'font-size': 'var(--ant-font-size-heading-1)',
    })
  })
})
