export type Accent = 'grid' | 'solar' | 'genset'

export const accentClass: Record<Accent, string> = {
  grid: 'accent-grid',
  solar: 'accent-solar',
  genset: 'accent-genset',
}

export const accentBgClass: Record<Accent, string> = {
  grid: 'accent-bg-grid',
  solar: 'accent-bg-solar',
  genset: 'accent-bg-genset',
}
