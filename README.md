# Window Configurator

A step-by-step window configuration app built with Vue 3, TypeScript, and Vuex 4.
Users select frame material, size, glazing type, and optional extras to build a custom window order with live price calculation.

## Features

- 5-step guided configurator with progress indicator
- Live price calculation based on selected options
- Simulated async API calls with loading skeleton states
- Add/remove optional extras with real-time price updates
- Order summary with confirmation screen
- Fully responsive layout

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript** — strict typing throughout, interfaces for all domain models
- **Vuex 4** — centralised state for configuration and step management
- **Vue Router 4** — client-side routing
- **Tailwind CSS v3** — utility-first styling
- **Vite** — development server and build tool
- **Vitest + Vue Test Utils** — unit tests for store mutations and price getter

## Project Structure
src/
├── components/
│   ├── configurator/        # One component per step
│   │   ├── StepMaterial.vue
│   │   ├── StepSize.vue
│   │   ├── StepGlazing.vue
│   │   ├── StepExtras.vue
│   │   └── StepSummary.vue
│   └── ui/                  # Reusable presentational components
│       ├── OptionCard.vue
│       ├── StepIndicator.vue
│       └── PriceSummaryBar.vue
├── services/
│   └── windowApi.ts         # Mock API with simulated network delay
├── store/
│   └── index.ts             # Vuex store — state, mutations, actions, getters
├── types/
│   └── window.ts            # TypeScript interfaces for all domain models
└── views/
└── ConfiguratorView.vue # Page-level component, wires everything together

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm run test
```

App runs at `http://localhost:5173`

## Key Design Decisions

**API data stays in component state, not the store** — the lists of available materials, sizes, and glazing options are local to each step component. Only what the user has actually selected lives in Vuex. This keeps the store focused on configuration state rather than becoming a data cache.

**Price calculation as a getter** — `totalPrice` is derived entirely from store state, so it stays in sync automatically whenever any selection changes. No manual recalculation needed.

**Dynamic component pattern** — `ConfiguratorView` uses a step-to-component map and Vue's `<component :is>` rather than five `v-if` blocks. Easier to extend and cleaner to read.

**Extras step is always completable** — extras are optional by design, so the Continue button is never blocked on that step. The store getter handles this explicitly.

**Mock API simulates real latency** — each `windowApi` method has a small artificial delay so loading skeleton states actually render during development, matching real-world behaviour.

## Running Tests

```bash
npm run test
```

Tests cover Vuex store mutations (material, size, glazing, extras toggle, reset) and the `totalPrice` getter across all selection combinations.
