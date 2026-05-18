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
