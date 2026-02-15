export type PhaseTotals = {
  l1: string
  l2: string
  l3: string
  total?: string
  unit: string
}

export type GensetBackendSample = {
  voltage: PhaseTotals
  current: PhaseTotals
  activePower: PhaseTotals
  reactivePower: PhaseTotals
  powerFactor: PhaseTotals
  frequency: {
    value: string
    unit: string
  }
  energy: {
    importKwh: string
    exportKwh: string
    unit: string
  }
}

export const gensetBackendSample: GensetBackendSample = {
  voltage: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'V' },
  current: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'A' },
  activePower: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'kW' },
  reactivePower: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'kVAR' },
  powerFactor: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'PF' },
  frequency: { value: '0.00', unit: 'Hz' },
  energy: { importKwh: '0.00', exportKwh: '0.00', unit: 'kWh' },
}

export const gensetStatus = 1
export const gensetEnabled = gensetStatus === 1
