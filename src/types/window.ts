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
  extras: Extra[]
}

export interface ConfiguratorStep {
  id: number
  key: keyof WindowConfiguration | 'summary'
  label: string
  completed: boolean
}