import { createStore } from 'vuex'
import type { Material, SizeOption, GlazingOption, Extra, WindowConfiguration, ConfiguratorStep } from '../types/window'
import { windowApi } from '../services/windowApi'

export interface RootState {
  configuration: WindowConfiguration
  steps: ConfiguratorStep[]
  currentStep: number
  loading: boolean
  error: string | null
}

const initialConfiguration: WindowConfiguration = {
  material: null,
  size: null,
  glazing: null,
  extras: [],
}

const initialSteps: ConfiguratorStep[] = [
  { id: 1, key: 'material', label: 'Material', completed: false },
  { id: 2, key: 'size', label: 'Size', completed: false },
  { id: 3, key: 'glazing', label: 'Glazing', completed: false },
  { id: 4, key: 'extras', label: 'Extras', completed: false },
  { id: 5, key: 'summary', label: 'Summary', completed: false },
]

export default createStore<RootState>({
  state: {
    configuration: { ...initialConfiguration },
    steps: initialSteps.map(s => ({ ...s })),
    currentStep: 1,
    loading: false,
    error: null,
  },

  getters: {
    totalPrice(state: RootState): number {
      const { material, size, glazing, extras } = state.configuration
      if (!size) return 0
      const materialMod = material?.priceModifier ?? 1
      const glazingMod = glazing?.priceModifier ?? 1
      const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0)
      return Math.round(size.basePrice * materialMod * glazingMod + extrasTotal)
    },

    isStepComplete: (state: RootState) => (stepKey: string): boolean => {
      if (stepKey === 'material') return state.configuration.material !== null
      if (stepKey === 'size') return state.configuration.size !== null
      if (stepKey === 'glazing') return state.configuration.glazing !== null
      if (stepKey === 'extras') return true // extras are optional
      return false
    },

    canProceed(state: RootState, getters: any): boolean {
      const current = state.steps[state.currentStep - 1]
      if (!current) return false
      return getters.isStepComplete(current.key)
    },

    completedSteps(state: RootState): number {
      return state.steps.filter(s => s.completed).length
    },
  },

  mutations: {
    SET_MATERIAL(state: RootState, material: Material) {
      state.configuration.material = material
      state.steps[0].completed = true
    },

    SET_SIZE(state: RootState, size: SizeOption) {
      state.configuration.size = size
      state.steps[1].completed = true
    },

    SET_GLAZING(state: RootState, glazing: GlazingOption) {
      state.configuration.glazing = glazing
      state.steps[2].completed = true
    },

    TOGGLE_EXTRA(state: RootState, extra: Extra) {
      const index = state.configuration.extras.findIndex(e => e.id === extra.id)
      if (index >= 0) {
        state.configuration.extras.splice(index, 1)
      } else {
        state.configuration.extras.push(extra)
      }
    },

    SET_CURRENT_STEP(state: RootState, step: number) {
      state.currentStep = step
    },

    MARK_STEP_COMPLETED(state: RootState, stepIndex: number) {
      state.steps[stepIndex].completed = true
    },

    SET_LOADING(state: RootState, value: boolean) {
      state.loading = value
    },

    SET_ERROR(state: RootState, message: string | null) {
      state.error = message
    },

    RESET_CONFIGURATION(state: RootState) {
      state.configuration = { ...initialConfiguration, extras: [] }
      state.steps = initialSteps.map(s => ({ ...s }))
      state.currentStep = 1
      state.error = null
    },
  },

  actions: {
    async fetchMaterials({ commit }: { commit: Function }) {
      commit('SET_LOADING', true)
      try {
        const materials = await windowApi.getMaterials()
        commit('SET_LOADING', false)
        return materials
      } catch (e) {
        commit('SET_ERROR', 'Failed to load materials. Please try again.')
        commit('SET_LOADING', false)
        return []
      }
    },

    async fetchSizes({ commit }: { commit: Function }) {
      commit('SET_LOADING', true)
      try {
        const sizes = await windowApi.getSizes()
        commit('SET_LOADING', false)
        return sizes
      } catch (e) {
        commit('SET_ERROR', 'Failed to load size options. Please try again.')
        commit('SET_LOADING', false)
        return []
      }
    },

    async fetchGlazingOptions({ commit }: { commit: Function }) {
      commit('SET_LOADING', true)
      try {
        const options = await windowApi.getGlazingOptions()
        commit('SET_LOADING', false)
        return options
      } catch (e) {
        commit('SET_ERROR', 'Failed to load glazing options. Please try again.')
        commit('SET_LOADING', false)
        return []
      }
    },

    async fetchExtras({ commit }: { commit: Function }) {
      commit('SET_LOADING', true)
      try {
        const extras = await windowApi.getExtras()
        commit('SET_LOADING', false)
        return extras
      } catch (e) {
        commit('SET_ERROR', 'Failed to load extras. Please try again.')
        commit('SET_LOADING', false)
        return []
      }
    },

    goToStep({ commit, state }: {commit: Function, state: RootState}, step: number) {
      if (step >= 1 && step <= state.steps.length) {
        commit('SET_CURRENT_STEP', step)
      }
    },

    nextStep({ commit, state }: {commit: Function, state: RootState}) {
      if (state.currentStep < state.steps.length) {
        commit('MARK_STEP_COMPLETED', state.currentStep - 1)
        commit('SET_CURRENT_STEP', state.currentStep + 1)
      }
    },

    prevStep({ commit, state }: {commit: Function, state: RootState}) {
      if (state.currentStep > 1) {
        commit('SET_CURRENT_STEP', state.currentStep - 1)
      }
    },

    resetConfiguration({ commit }: {commit: Function}) {
      commit('RESET_CONFIGURATION')
    },
  },
})