<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import OptionCard from '../ui/OptionCard.vue'
import type { HardwareOption } from '../../types/window'

const store = useStore()

const options = ref<HardwareOption[]>([])
const selected = ref<HardwareOption | null>(store.state.configuration.hardware)
const loading = ref(false)
const activeStyle = ref('All')

const availableStyles = computed(() => {
  const styles = [...new Set(options.value.map(o => o.style))]
  return ['All', ...styles]
})

const filteredOptions = computed(() => {
  if (activeStyle.value === 'All') return options.value
  return options.value.filter(o => o.style === activeStyle.value)
})

onMounted(async () => {
  loading.value = true
  options.value = await store.dispatch('fetchHardware')
  loading.value = false
})

function select(option: HardwareOption) {
  selected.value = option
  store.commit('SET_HARDWARE', option)
}

</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-gray-800 mb-1">Choose your Hardware</h2>
    <p class="text-sm text-gray-500 mb-6">
      Select a handle style and finish for your window.
    </p>

    <div v-if="loading" class="flex flex-col gap-3">
      <div
        v-for="n in 5"
        :key="n"
        class="h-20 bg-gray-100 rounded-xl animate-pulse"
      />
    </div>

    <div v-else>
      <!-- Style filter tabs -->
       <div class="flex gap-2 mb-4 flex-wrap">
        <button
          v-for="style in availableStyles"
          :key="style"
          @click="activeStyle = style"
          :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
            activeStyle === style
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ style }}
        </button>
      </div>
      <!-- Options list -->
      <div class="flex flex-col gap-3">
        <OptionCard
          v-for="option in filteredOptions"
          :key="option.id"
          :label="option.name"
          :description="option.finish"
          :selected="selected?.id === option.id"
          :badge="`+€${option.priceAdd}`"
          @select="select(option)"
        />
      </div>
    </div>
  </div>
</template>