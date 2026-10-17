import { describe, it, expect } from 'vitest'
import { PANEL_DEFINITIONS, PANEL_TYPES, getSharedPanelDef } from './panels'
import type { PanelType } from './types'

describe('PANEL_DEFINITIONS and PANEL_TYPES', () => {
  it('registers agentdeck with valid styling, sizes, and canvas capability', () => {
    expect(PANEL_TYPES).toContain('agentdeck')
    const def = PANEL_DEFINITIONS.agentdeck
    expect(def).toBeDefined()
    expect(def.type).toBe('agentdeck')
    expect(def.label).toBe('AgentDeck Control Tower')
    expect(def.brandColor).toBe('#F59E0B')
    expect(def.canLiveOnCanvas).toBe(true)
    expect(def.defaultSize.width).toBeGreaterThanOrEqual(def.minimumSize.width)
    expect(def.defaultSize.height).toBeGreaterThanOrEqual(def.minimumSize.height)
    expect(def.ghostSvg).toContain('<svg')
  })

  it('registers roundtable with valid styling, sizes, and canvas capability', () => {
    expect(PANEL_TYPES).toContain('roundtable')
    const def = PANEL_DEFINITIONS.roundtable
    expect(def).toBeDefined()
    expect(def.type).toBe('roundtable')
    expect(def.label).toBe('Roundtable Room')
    expect(def.brandColor).toBe('#6366F1')
    expect(def.canLiveOnCanvas).toBe(true)
    expect(def.defaultSize.width).toBeGreaterThanOrEqual(def.minimumSize.width)
    expect(def.defaultSize.height).toBeGreaterThanOrEqual(def.minimumSize.height)
    expect(def.ghostSvg).toContain('<svg')
  })

  it('resolves shared definitions via getSharedPanelDef helper', () => {
    const deckDef = getSharedPanelDef('agentdeck')
    expect(deckDef.label).toBe('AgentDeck Control Tower')
    const rtDef = getSharedPanelDef('roundtable')
    expect(rtDef.label).toBe('Roundtable Room')
  })

  it('falls back to editor definition for completely unknown panel types', () => {
    const fallback = getSharedPanelDef('completely-unknown-service')
    expect(fallback.type).toBe('editor')
  })

  it('every panel type has a complete definition with positive dimensions', () => {
    for (const type of PANEL_TYPES) {
      const def = PANEL_DEFINITIONS[type as PanelType]
      expect(def, `missing definition for ${type}`).toBeDefined()
      expect(def.label.length).toBeGreaterThan(0)
      expect(def.brandColor.startsWith('#') || def.brandColor.startsWith('rgb')).toBe(true)
      expect(def.defaultSize.width).toBeGreaterThan(0)
      expect(def.defaultSize.height).toBeGreaterThan(0)
      expect(def.minimumSize.width).toBeGreaterThan(0)
      expect(def.minimumSize.height).toBeGreaterThan(0)
    }
  })
})
