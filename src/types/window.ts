export interface Material {
  id: string
  label: string
  description: string
  priceModifier: number // multiplier, e.g. 1.0 = base, 1.3 = 30% more
}

export interface SizeOption {
  id: string
  label: string
  widthMm: number
  heightMm: number
  basePrice: number
}

export interface GlazingOption {
  id: string
  label: string
  description: string
  priceModifier: number
}

export interface HardwareOption {
  id: string
  name: string
  finish: string  // e.g. 'White', 'Silver', 'Anthracite'
  style: string   // e.g. 'Standard', 'Designer', 'Security'
  priceAdd: number
}

export interface Extra {
  id: string
  label: string
  description: string
  price: number
}

export interface WindowConfiguration {
  material: Material | null
  size: SizeOption | null
  glazing: GlazingOption | null
  hardware: HardwareOption | null
  extras: Extra[]
}

export interface ConfiguratorStep {
  id: number
  key: keyof WindowConfiguration | 'summary'
  label: string
  completed: boolean
}