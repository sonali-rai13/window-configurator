import type { Material, SizeOption, GlazingOption, Extra } from '../types/window'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const materials: Material[] = [
  {
    id: 'pvc',
    label: 'PVC',
    description: 'Low maintenance, great insulation, most popular choice.',
    priceModifier: 1.0,
  },
  {
    id: 'wood',
    label: 'Timber',
    description: 'Classic look, natural insulator, requires periodic treatment.',
    priceModifier: 1.35,
  },
  {
    id: 'aluminium',
    label: 'Aluminium',
    description: 'Slim profiles, modern aesthetic, highly durable.',
    priceModifier: 1.5,
  },
]

const sizes: SizeOption[] = [
  { id: 'small', label: 'Small', widthMm: 600, heightMm: 900, basePrice: 180 },
  { id: 'medium', label: 'Medium', widthMm: 900, heightMm: 1200, basePrice: 280 },
  { id: 'large', label: 'Large', widthMm: 1200, heightMm: 1500, basePrice: 420 },
  { id: 'xlarge', label: 'Extra Large', widthMm: 1500, heightMm: 2000, basePrice: 620 },
]

const glazingOptions: GlazingOption[] = [
  {
    id: 'single',
    label: 'Single Glazing',
    description: 'Basic option, suitable for mild climates.',
    priceModifier: 1.0,
  },
  {
    id: 'double',
    label: 'Double Glazing',
    description: 'Standard choice — good thermal and noise insulation.',
    priceModifier: 1.25,
  },
  {
    id: 'triple',
    label: 'Triple Glazing',
    description: 'Maximum insulation, ideal for cold climates or noisy areas.',
    priceModifier: 1.55,
  },
]

const extras: Extra[] = [
  {
    id: 'handle-premium',
    label: 'Premium Handle',
    description: 'Brushed steel handle with soft-close mechanism.',
    price: 45,
  },
  {
    id: 'internal-blind',
    label: 'Integrated Blind',
    description: 'Built-in blind between the glass panes — no dusting needed.',
    price: 120,
  },
  {
    id: 'security-lock',
    label: 'Multi-Point Security Lock',
    description: 'Enhanced locking system for added peace of mind.',
    price: 85,
  },
  {
    id: 'trickle-vent',
    label: 'Trickle Vent',
    description: 'Allows background ventilation without opening the window.',
    price: 30,
  },
]

export const windowApi = {
  async getMaterials(): Promise<Material[]> {
    await delay(400)
    return materials
  },

  async getSizes(): Promise<SizeOption[]> {
    await delay(300)
    return sizes
  },

  async getGlazingOptions(): Promise<GlazingOption[]> {
    await delay(350)
    return glazingOptions
  },

  async getExtras(): Promise<Extra[]> {
    await delay(300)
    return extras
  },
}