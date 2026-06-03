<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import OptionCard from '../ui/OptionCard.vue'
import type { Material } from '../../types/window'

const store = useStore()
const materials = ref<Material[]>([])
const loading = ref(false)

const selected = ref<Material | null>(store.state.configuration.material)

onMounted(async () => {
  loading.value = true
  materials.value = await store.dispatch('fetchMaterials')
  loading.value = false
})

function selectMaterial(material: Material) {
  selected.value = material
  store.commit('SET_MATERIAL', material)
}

function priceLabel(modifier: number): string {
  if (modifier === 1.0) return 'Base price'
  const percent = Math.round((modifier - 1) * 100)
  return `+${percent}%`
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-gray-800 mb-1">Choose your frame material</h2>
    <p class="text-sm text-gray-500 mb-6">
      The frame material affects insulation, appearance, and price.
    </p>

    <!-- Loading skeleton -->
    <div v-if="loading" class="flex flex-col gap-3">
      <div
        v-for="n in 3"
        :key="n"
        class="h-20 bg-gray-100 rounded-xl animate-pulse"
      />
    </div>

    <!-- Options -->
    <div v-else class="flex flex-col gap-3">
      <OptionCard
        v-for="material in materials"
        :key="material.id"
        :label="material.label"
        :description="material.description"
        :selected="selected?.id === material.id"
        :badge="priceLabel(material.priceModifier)"
        @select="selectMaterial(material)"
      />
    </div>
  </div>
</template>