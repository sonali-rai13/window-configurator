<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import StepIndicator from '../components/ui/StepIndicator.vue'
import PriceSummaryBar from '../components/ui/PriceSummaryBar.vue'
import StepMaterial from '../components/configurator/StepMaterial.vue'
import StepSize from '../components/configurator/StepSize.vue'
import StepGlazing from '../components/configurator/StepGlazing.vue'
import StepExtras from '../components/configurator/StepExtras.vue'
import StepSummary from '../components/configurator/StepSummary.vue'

const store = useStore()

const currentStep = computed(() => store.state.currentStep)
const steps = computed(() => store.state.steps)
const totalPrice = computed(() => store.getters.totalPrice)
const canProceed = computed(() => store.getters.canProceed)
const orderSubmitted = ref(false)

function handleSubmitted() {
  orderSubmitted.value = true
}

function handleReset() {
  orderSubmitted.value = false
}

function handleNext() {
  store.dispatch('nextStep')
}

function handlePrev() {
  store.dispatch('prevStep')
}

const stepComponents: Record<number, unknown> = {
  1: StepMaterial,
  2: StepSize,
  3: StepGlazing,
  4: StepExtras,
  5: StepSummary,
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-24">

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-lg font-bold text-gray-900 leading-none">Window Configurator</h1>
          <p class="text-xs text-gray-400 mt-0.5">Build your perfect window</p>
        </div>
        <span class="text-xs text-gray-400 font-medium">
          Step {{ currentStep }} of {{ steps.length }}
        </span>
      </div>
    </header>

    <!-- Step indicator -->
    <div class="bg-white border-b border-gray-100">
      <div class="max-w-3xl mx-auto">
        <StepIndicator :steps="steps" :current-step="currentStep" />
      </div>
    </div>

    <!-- Step content -->
    <main class="max-w-3xl mx-auto px-4 pt-8">
      <transition name="fade" mode="out-in">
        <component
          :is="stepComponents[currentStep]"
          :key="currentStep"
          @submitted="handleSubmitted"
          @reset="handleReset"
        />
      </transition>
    </main>

    <!-- Fixed price bar + navigation -->
    <PriceSummaryBar
      v-if="!orderSubmitted"
      :total-price="totalPrice"
      :current-step="currentStep"
      :total-steps="steps.length"
      :can-proceed="canProceed"
      @next="handleNext"
      @prev="handlePrev"
    />

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>