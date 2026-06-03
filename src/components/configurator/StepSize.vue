<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import OptionCard from '../ui/OptionCard.vue'
import type { SizeOption } from '../../types/window'

const store = useStore()
const sizes = ref<SizeOption[]>([])
const loading = ref(false)

const selected = ref<SizeOption | null>(store.state.configuration.size)

onMounted(async () => {
  loading.value = true
  sizes.value = await store.dispatch('fetchSizes')
  loading.value = false
})

function selectSize(size: SizeOption) {
  selected.value = size
  store.commit('SET_SIZE', size)
}

function dimensionLabel(size: SizeOption): string {
  return `${size.widthMm} × ${size.heightMm} mm — from €${size.basePrice}`
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-gray-800 mb-1">Select a window size</h2>
    <p class="text-sm text-gray-500 mb-6">
      Standard sizes for most residential applications. Custom sizing available on request.
    </p>

    <div v-if="loading" class="flex flex-col gap-3">
      <div
        v-for="n in 4"
        :key="n"
        class="h-20 bg-gray-100 rounded-xl animate-pulse"
      />
    </div>

    <div v-else class="flex flex-col gap-3">
      <OptionCard
        v-for="size in sizes"
        :key="size.id"
        :label="size.label"
        :description="dimensionLabel(size)"
        :selected="selected?.id === size.id"
        @select="selectSize(size)"
      />
    </div>
  </div>
</template>