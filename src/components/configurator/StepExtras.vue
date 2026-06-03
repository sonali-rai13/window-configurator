<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import OptionCard from '../ui/OptionCard.vue'
import type { Extra } from '../../types/window'

const store = useStore()
const extras = ref<Extra[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  extras.value = await store.dispatch('fetchExtras')
  loading.value = false
})

function isSelected(extra: Extra): boolean {
  return store.state.configuration.extras.some((e: Extra) => e.id === extra.id)
}

function toggleExtra(extra: Extra) {
  store.commit('TOGGLE_EXTRA', extra)
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-gray-800 mb-1">Add extras</h2>
    <p class="text-sm text-gray-500 mb-6">
      Optional upgrades — you can skip this step if you don't need anything extra.
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
        v-for="extra in extras"
        :key="extra.id"
        :label="extra.label"
        :description="extra.description"
        :selected="isSelected(extra)"
        :badge="`+€${extra.price}`"
        @select="toggleExtra(extra)"
      />
    </div>
  </div>
</template>