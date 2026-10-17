import { describe, it, expect } from 'vitest'
import { PANEL_DEFINITIONS, PANEL_TYPES, getSharedPanelDef } from '../../shared/panels'
import { PANEL_REGISTRY, getPanelDef } from './registry'

describe('Embedded AI Service Panels (AgentDeck & Roundtable)', () => {
  it('registers agentdeck in PANEL_TYPES and PANEL_DEFINITIONS', () => {
    expect(PANEL_TYPES).toContain('agentdeck')
    const def = PANEL_DEFINITIONS.agentdeck
    expect(def).toBeDefined()
    expect(def.type).toBe('agentdeck')
    expect(def.label).toBe('AgentDeck Control Tower')
    expect(def.brandColor).toBe('#F59E0B')
    expect(def.canLiveOnCanvas).toBe(true)
    expect(def.defaultSize.width).toBeGreaterThanOrEqual(def.minimumSize.width)
    expect(def.defaultSize.height).toBeGreaterThanOrEqual(def.minimumSize.height)
  })

  it('registers roundtable in PANEL_TYPES and PANEL_DEFINITIONS', () => {
    expect(PANEL_TYPES).toContain('roundtable')
    const def = PANEL_DEFINITIONS.roundtable
    expect(def).toBeDefined()
    expect(def.type).toBe('roundtable')
    expect(def.label).toBe('Roundtable Room')
    expect(def.brandColor).toBe('#6366F1')
    expect(def.canLiveOnCanvas).toBe(true)
    expect(def.defaultSize.width).toBeGreaterThanOrEqual(def.minimumSize.width)
    expect(def.defaultSize.height).toBeGreaterThanOrEqual(def.minimumSize.height)
  })

  it('resolves shared definitions via getSharedPanelDef helper', () => {
    const deckDef = getSharedPanelDef('agentdeck')
    expect(deckDef.label).toBe('AgentDeck Control Tower')
    const rtDef = getSharedPanelDef('roundtable')
    expect(rtDef.label).toBe('Roundtable Room')
  })

  it('registers renderer definitions with components and factories in PANEL_REGISTRY', () => {
    const deckReg = PANEL_REGISTRY.agentdeck
    expect(deckReg).toBeDefined()
    expect(deckReg.icon).toBeDefined()
    expect(deckReg.Component).toBeDefined()
    expect(typeof deckReg.create).toBe('function')

    const rtReg = PANEL_REGISTRY.roundtable
    expect(rtReg).toBeDefined()
    expect(rtReg.icon).toBeDefined()
    expect(rtReg.Component).toBeDefined()
    expect(typeof rtReg.create).toBe('function')
  })

  it('falls back to editor definition for completely unknown panel types', () => {
    const fallback = getPanelDef('completely-unknown-service')
    expect(fallback.type).toBe('editor')
  })
})
