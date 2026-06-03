<script setup lang="ts">
interface Props {
  totalPrice: number
  currentStep: number
  totalSteps: number
  canProceed: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'next'): void
  (e: 'prev'): void
}>()
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
    <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

      <!-- Price display -->
      <div>
        <p class="text-xs text-gray-500 leading-none mb-0.5">Estimated price</p>
        <p class="text-xl font-bold text-gray-900">
          {{ totalPrice > 0 ? `€${totalPrice}` : '—' }}
        </p>
      </div>

      <!-- Navigation buttons -->
      <div class="flex gap-2">
        <button
          v-if="currentStep > 1"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          @click="emit('prev')"
        >
          Back
        </button>

        <button
          v-if="currentStep < totalSteps"
          type="button"
          class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition-colors"
          :class="canProceed ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'"
          :disabled="!canProceed"
          @click="emit('next')"
        >
          Continue
        </button>
      </div>

    </div>
  </div>
</template>