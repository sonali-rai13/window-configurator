<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const submitted = ref(false)

const configuration = computed(() => store.state.configuration)
const totalPrice = computed(() => store.getters.totalPrice)

const emit = defineEmits<{
  (e: 'submitted'): void
  (e: 'reset'): void
}>()

function handleReset() {
  submitted.value = false
  store.dispatch('resetConfiguration')
  emit('reset')
}

function handleSubmit() {
  // In a real app this would call an order API
  submitted.value = true
  emit('submitted')
}

</script>

<template>
  <div>
    <!-- Submitted confirmation -->
    <div v-if="submitted" class="text-center py-10">
      <div class="text-5xl mb-4">🎉</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Order submitted!</h2>
      <p class="text-gray-500 text-sm mb-6">
        Thank you for your configuration. Our team will be in touch shortly.
      </p>
      <button
        type="button"
        class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        @click="handleReset"
      >
        Start a new configuration
      </button>
    </div>

    <!-- Summary -->
    <div v-else>
      <h2 class="text-xl font-bold text-gray-800 mb-1">Review your configuration</h2>
      <p class="text-sm text-gray-500 mb-6">
        Here's everything you've selected. Go back to make changes.
      </p>

      <div class="flex flex-col gap-3 mb-6">

        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Material</p>
          <p class="font-semibold text-gray-800">
            {{ configuration.material?.label ?? '—' }}
          </p>
          <p class="text-xs text-gray-500 mt-0.5">
            {{ configuration.material?.description ?? '' }}
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Size</p>
          <p class="font-semibold text-gray-800">
            {{ configuration.size?.label ?? '—' }}
          </p>
          <p class="text-xs text-gray-500 mt-0.5">
            {{ configuration.size ? `${configuration.size.widthMm} × ${configuration.size.heightMm} mm` : '' }}
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Glazing</p>
          <p class="font-semibold text-gray-800">
            {{ configuration.glazing?.label ?? '—' }}
          </p>
          <p class="text-xs text-gray-500 mt-0.5">
            {{ configuration.glazing?.description ?? '' }}
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Extras</p>
          <p
            v-if="configuration.extras.length === 0"
            class="text-gray-400 text-sm"
          >
            None selected
          </p>
          <ul v-else class="flex flex-col gap-1 mt-1">
            <li
              v-for="extra in configuration.extras"
              :key="extra.id"
              class="flex items-center justify-between text-sm"
            >
              <span class="text-gray-700">{{ extra.label }}</span>
              <span class="text-gray-500">+€{{ extra.price }}</span>
            </li>
          </ul>
        </div>

      </div>

      <!-- Total -->
      <div class="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4">
        <span class="font-semibold text-gray-700">Total estimated price</span>
        <span class="text-2xl font-bold text-blue-700">€{{ totalPrice }}</span>
      </div>

      <div class="flex gap-3">
        <button
          type="button"
          class="flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          @click="handleReset"
        >
          Start over
        </button>
        <button
          type="button"
          class="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          @click="handleSubmit"
        >
          Submit order
        </button>
      </div>

    </div>
  </div>
</template>