<script setup lang="ts">
import type { ConfiguratorStep } from '../../types/window'

interface Props {
  steps: ConfiguratorStep[]
  currentStep: number
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center justify-center w-full px-4 py-6">
    <div
      v-for="(step, index) in steps"
      :key="step.id"
      class="flex items-center"
    >
      <!-- Step circle -->
      <div class="flex flex-col items-center">
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors duration-200"
          :class="{
            'bg-blue-600 border-blue-600 text-white': step.id === currentStep,
            'bg-green-500 border-green-500 text-white': step.completed && step.id !== currentStep,
            'bg-white border-gray-300 text-gray-400': !step.completed && step.id !== currentStep,
          }"
        >
          <span v-if="step.completed && step.id !== currentStep">✓</span>
          <span v-else>{{ step.id }}</span>
        </div>
        <span
          class="mt-1 text-xs font-medium"
          :class="{
            'text-blue-600': step.id === currentStep,
            'text-green-500': step.completed && step.id !== currentStep,
            'text-gray-400': !step.completed && step.id !== currentStep,
          }"
        >
          {{ step.label }}
        </span>
      </div>

      <!-- Connector line between steps -->
      <div
        v-if="index < steps.length - 1"
        class="w-12 h-0.5 mx-1 mb-4 transition-colors duration-200"
        :class="step.completed ? 'bg-green-500' : 'bg-gray-200'"
      />
    </div>
  </div>
</template>