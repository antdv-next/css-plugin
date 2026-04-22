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
  return (templates ?? []).some(template =>
    template.startsWith('color-')
    || template.startsWith('c-')
    || template.startsWith('bg-')
    || template.startsWith('m-')
    || template.startsWith('text-')
    || template.startsWith('rounded')
    || template.startsWith('shadow'),
  )
}

describe('presetAntd', () => {
  it('supports unprefixed utilities by default', () => {
    const preset = presetAntd()

    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(true)
    expect(hasUnprefixedAutocomplete(preset.autocomplete?.templates as string[])).toBe(true)
  })

  it('can disable unprefixed utilities', () => {
    const preset = presetAntd({ allowUnprefixed: false })
    const colors = (preset.theme as { colors?: Record<string, string> })?.colors

    expect(hasMatchingRule(preset.rules as any[], 'a-color-primary')).toBe(true)
    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(false)
    expect(hasUnprefixedAutocomplete(preset.autocomplete?.templates as string[])).toBe(false)
    expect(colors?.primary).toBeUndefined()
    expect(colors?.['a-primary']).toBeDefined()
  })
})

describe('presetAntdTailwind4', () => {
  it('supports unprefixed utilities by default', () => {
    const preset = presetAntdTailwind4()

    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(true)
    expect(hasUnprefixedAutocomplete(preset.autocomplete?.templates as string[])).toBe(true)
  })

  it('can disable unprefixed utilities', () => {
    const preset = presetAntdTailwind4({ allowUnprefixed: false })
    const colors = (preset.theme as { colors?: Record<string, string> })?.colors

    expect(hasMatchingRule(preset.rules as any[], 'a-color-primary')).toBe(true)
    expect(hasMatchingRule(preset.rules as any[], 'color-primary')).toBe(false)
    expect(hasUnprefixedAutocomplete(preset.autocomplete?.templates as string[])).toBe(false)
    expect(colors?.primary).toBeUndefined()
    expect(colors?.['a-primary']).toBeDefined()
  })
})
