import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import type { Material, SizeOption, GlazingOption, Extra } from '../../types/window'

const mockMaterial: Material = {
  id: 'pvc',
  label: 'PVC',
  description: 'Low maintenance',
  priceModifier: 1.0,
}

const mockSize: SizeOption = {
  id: 'medium',
  label: 'Medium',
  widthMm: 900,
  heightMm: 1200,
  basePrice: 280,
}

const mockGlazing: GlazingOption = {
  id: 'double',
  label: 'Double Glazing',
  description: 'Standard choice',
  priceModifier: 1.25,
}

const mockExtra: Extra = {
  id: 'handle-premium',
  label: 'Premium Handle',
  description: 'Brushed steel',
  price: 45,
}

function buildStore() {
  return createStore({
    state: {
      configuration: {
        material: null,
        size: null,
        glazing: null,
        extras: [],
      },
    },
    getters: {
      totalPrice(state: any): number {
        const { material, size, glazing, extras } = state.configuration
        if (!size) return 0
        const materialMod = material?.priceModifier ?? 1
        const glazingMod = glazing?.priceModifier ?? 1
        const extrasTotal = extras.reduce((sum: number, e: Extra) => sum + e.price, 0)
        return Math.round(size.basePrice * materialMod * glazingMod + extrasTotal)
      },
    },
    mutations: {
      SET_MATERIAL(state: any, material: Material) {
        state.configuration.material = material
      },
      SET_SIZE(state: any, size: SizeOption) {
        state.configuration.size = size
      },
      SET_GLAZING(state: any, glazing: GlazingOption) {
        state.configuration.glazing = glazing
      },
      TOGGLE_EXTRA(state: any, extra: Extra) {
        const index = state.configuration.extras.findIndex((e: Extra) => e.id === extra.id)
        if (index >= 0) {
          state.configuration.extras.splice(index, 1)
        } else {
          state.configuration.extras.push(extra)
        }
      },
      RESET_CONFIGURATION(state: any) {
        state.configuration = { material: null, size: null, glazing: null, extras: [] }
      },
    },
  })
}

describe('Vuex Store — configuration mutations', () => {
  let store: ReturnType<typeof buildStore>

  beforeEach(() => {
    store = buildStore()
  })

  it('sets material correctly', () => {
    store.commit('SET_MATERIAL', mockMaterial)
    expect(store.state.configuration.material).toEqual(mockMaterial)
  })

  it('sets size correctly', () => {
    store.commit('SET_SIZE', mockSize)
    expect(store.state.configuration.size).toEqual(mockSize)
  })

  it('sets glazing correctly', () => {
    store.commit('SET_GLAZING', mockGlazing)
    expect(store.state.configuration.glazing).toEqual(mockGlazing)
  })

  it('adds an extra when toggled on', () => {
    store.commit('TOGGLE_EXTRA', mockExtra)
    expect(store.state.configuration.extras).toHaveLength(1)
    expect(store.state.configuration.extras[0].id).toBe('handle-premium')
  })

  it('removes an extra when toggled off', () => {
    store.commit('TOGGLE_EXTRA', mockExtra)
    store.commit('TOGGLE_EXTRA', mockExtra)
    expect(store.state.configuration.extras).toHaveLength(0)
  })

  it('resets configuration to initial state', () => {
    store.commit('SET_MATERIAL', mockMaterial)
    store.commit('SET_SIZE', mockSize)
    store.commit('RESET_CONFIGURATION')
    expect(store.state.configuration.material).toBeNull()
    expect(store.state.configuration.size).toBeNull()
    expect(store.state.configuration.extras).toHaveLength(0)
  })
})

describe('Vuex Store — totalPrice getter', () => {
  let store: ReturnType<typeof buildStore>

  beforeEach(() => {
    store = buildStore()
  })

  it('returns 0 when no size is selected', () => {
    expect(store.getters.totalPrice).toBe(0)
  })

  it('returns base price when only size is selected', () => {
    store.commit('SET_SIZE', mockSize)
    expect(store.getters.totalPrice).toBe(280)
  })

  it('applies material modifier correctly', () => {
    store.commit('SET_SIZE', mockSize)
    store.commit('SET_MATERIAL', { ...mockMaterial, priceModifier: 1.35 })
    expect(store.getters.totalPrice).toBe(Math.round(280 * 1.35))
  })

  it('applies glazing modifier correctly', () => {
    store.commit('SET_SIZE', mockSize)
    store.commit('SET_GLAZING', mockGlazing)
    expect(store.getters.totalPrice).toBe(Math.round(280 * 1.25))
  })

  it('adds extras to total price', () => {
    store.commit('SET_SIZE', mockSize)
    store.commit('TOGGLE_EXTRA', mockExtra)
    expect(store.getters.totalPrice).toBe(280 + 45)
  })

  it('calculates full price with all options selected', () => {
    store.commit('SET_SIZE', mockSize)
    store.commit('SET_MATERIAL', { ...mockMaterial, priceModifier: 1.35 })
    store.commit('SET_GLAZING', mockGlazing)
    store.commit('TOGGLE_EXTRA', mockExtra)
    const expected = Math.round(280 * 1.35 * 1.25 + 45)
    expect(store.getters.totalPrice).toBe(expected)
  })
})