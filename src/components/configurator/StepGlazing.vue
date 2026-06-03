<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import OptionCard from '../ui/OptionCard.vue'
import type { GlazingOption } from '../../types/window'

const store = useStore()
const glazingOptions = ref<GlazingOption[]>([])
const loading = ref(false)

const selected = ref<GlazingOption | null>(store.state.configuration.glazing)

onMounted(async () => {
  loading.value = true
  glazingOptions.value = await store.dispatch('fetchGlazingOptions')
  loading.value = false
})

function selectGlazing(option: GlazingOption) {
  selected.value = option
  store.commit('SET_GLAZING', option)
}

function priceLabel(modifier: number): string {
  if (modifier === 1.0) return 'Base price'
  const percent = Math.round((modifier - 1) * 100)
  return `+${percent}%`
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-gray-800 mb-1">Choose your glazing</h2>
    <p class="text-sm text-gray-500 mb-6">
      Glazing type has the biggest impact on thermal efficiency and noise reduction.
    </p>

    <div v-if="loading" class="flex flex-col gap-3">
      <div
        v-for="n in 3"
        :key="n"
        class="h-20 bg-gray-100 rounded-xl animate-pulse"
      />
    </div>

    <div v-else class="flex flex-col gap-3">
      <OptionCard
        v-for="option in glazingOptions"
        :key="option.id"
        :label="option.label"
        :description="option.description"
        :selected="selected?.id === option.id"
        :badge="priceLabel(option.priceModifier)"
        @select="selectGlazing(option)"
      />
    </div>
  </div>
</template>