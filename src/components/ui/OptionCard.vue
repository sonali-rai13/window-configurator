<script setup lang="ts">
interface Props {
  label: string
  description?: string
  selected: boolean
  badge?: string
}

defineProps<Props>()
const emit = defineEmits<{ (e: 'select'): void }>()
</script>

<template>
  <button
    type="button"
    class="w-full text-left border-2 rounded-xl p-4 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
    :class="
      selected
        ? 'border-blue-600 bg-blue-50'
        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
    "
    @click="emit('select')"
  >
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="font-semibold text-gray-800 text-sm">{{ label }}</p>
        <p v-if="description" class="text-gray-500 text-xs mt-1 leading-snug">
          {{ description }}
        </p>
      </div>
      <div class="flex flex-col items-end gap-1 shrink-0">
        <span
          v-if="badge"
          class="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full"
        >
          {{ badge }}
        </span>
        <span
          v-if="selected"
          class="text-blue-600 text-lg leading-none"
        >✔</span>
      </div>
    </div>
  </button>
</template>