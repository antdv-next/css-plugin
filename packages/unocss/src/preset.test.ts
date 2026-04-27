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

  it('maps text-ant-* to Ant Design font-size variables without colliding with built-in text-sm', () => {
    const preset = presetAntd()
    const fontSize = (preset.theme as { fontSize?: Record<string, string> })?.fontSize

    // ant-* keys exist
    expect(fontSize?.['ant-sm']).toBe('var(--ant-font-size-sm)')
    expect(fontSize?.['ant-lg']).toBe('var(--ant-font-size-lg)')
    expect(fontSize?.['ant-xl']).toBe('var(--ant-font-size-xl)')
    expect(fontSize?.['ant-h1']).toBe('var(--ant-font-size-heading-1)')
    expect(fontSize?.['ant-base']).toBe('var(--ant-font-size)')

    // conflicting short keys must NOT exist so built-in text-sm / text-lg are preserved
    expect(fontSize?.['sm']).toBeUndefined()
    expect(fontSize?.['lg']).toBeUndefined()
    expect(fontSize?.['xl']).toBeUndefined()
    expect(fontSize?.['DEFAULT']).toBeUndefined()

    // rule matches text-ant-sm (Ant variable) but not plain text-sm
    expect(hasMatchingRule(preset.rules as any[], 'text-ant-sm')).toBe(true)
    expect(hasMatchingRule(preset.rules as any[], 'a-text-ant-sm')).toBe(true)
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

  it('maps text-ant-* to Ant Design font-size variables without colliding with built-in text-sm', () => {
    const preset = presetAntdTailwind4()
    const text = (preset.theme as { text?: Record<string, { fontSize: string }> })?.text

    // ant-* keys exist
    expect(text?.['ant-sm']?.fontSize).toBe('var(--ant-font-size-sm)')
    expect(text?.['ant-lg']?.fontSize).toBe('var(--ant-font-size-lg)')
    expect(text?.['ant-xl']?.fontSize).toBe('var(--ant-font-size-xl)')
    expect(text?.['ant-h1']?.fontSize).toBe('var(--ant-font-size-heading-1)')
    expect(text?.['ant-base']?.fontSize).toBe('var(--ant-font-size)')

    // conflicting short keys must NOT exist
    expect(text?.['sm']).toBeUndefined()
    expect(text?.['lg']).toBeUndefined()
    expect(text?.['xl']).toBeUndefined()
    expect(text?.['DEFAULT']).toBeUndefined()

    // rule matches text-ant-sm (Ant variable)
    expect(hasMatchingRule(preset.rules as any[], 'text-ant-sm')).toBe(true)
    expect(hasMatchingRule(preset.rules as any[], 'a-text-ant-sm')).toBe(true)
  })
})
