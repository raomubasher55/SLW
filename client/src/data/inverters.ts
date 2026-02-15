export type InverterPhaseTotals = {
  l1: string
  l2: string
  l3: string
  total?: string
  unit: string
}

export type InverterMetrics = {
  voltage: InverterPhaseTotals
  current: InverterPhaseTotals
  activePower: InverterPhaseTotals
  powerFactor: InverterPhaseTotals
  frequency: {
    value: string
    unit: string
  }
  dailyYield: {
    value: string
    unit: string
  }
  totalYield: {
    value: string
    unit: string
  }
}

export type InverterInfo = {
  id: string
  name: string
  status: 'online' | 'warning'
  lastSync: string
  metrics: InverterMetrics
}

export const inverters: InverterInfo[] = [
  {
    id: 'inverter1',
    name: 'Inverter 1',
    status: 'online',
    lastSync: '-',
    metrics: {
      voltage: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'V' },
      current: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'A' },
      activePower: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'kW' },
      powerFactor: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'PF' },
      frequency: { value: '0.00', unit: 'Hz' },
      dailyYield: { value: '0.00', unit: 'kWh' },
      totalYield: { value: '0.00', unit: 'kWh' },
    },
  },
  {
    id: 'inverter2',
    name: 'Inverter 2',
    status: 'warning',
    lastSync: '-',
    metrics: {
      voltage: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'V' },
      current: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'A' },
      activePower: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'kW' },
      powerFactor: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'PF' },
      frequency: { value: '0.00', unit: 'Hz' },
      dailyYield: { value: '0.00', unit: 'kWh' },
      totalYield: { value: '0.00', unit: 'kWh' },
    },
  },
  {
    id: 'inverter3',
    name: 'Inverter 3',
    status: 'online',
    lastSync: '-',
    metrics: {
      voltage: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'V' },
      current: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'A' },
      activePower: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'kW' },
      powerFactor: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'PF' },
      frequency: { value: '0.00', unit: 'Hz' },
      dailyYield: { value: '0.00', unit: 'kWh' },
      totalYield: { value: '0.00', unit: 'kWh' },
    },
  },
  {
    id: 'inverter4',
    name: 'Inverter 4',
    status: 'online',
    lastSync: '-',
    metrics: {
      voltage: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'V' },
      current: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'A' },
      activePower: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'kW' },
      powerFactor: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'PF' },
      frequency: { value: '0.00', unit: 'Hz' },
      dailyYield: { value: '0.00', unit: 'kWh' },
      totalYield: { value: '0.00', unit: 'kWh' },
    },
  },
  {
    id: 'inverter5',
    name: 'Inverter 5',
    status: 'online',
    lastSync: '-',
    metrics: {
      voltage: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'V' },
      current: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'A' },
      activePower: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'kW' },
      powerFactor: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'PF' },
      frequency: { value: '0.00', unit: 'Hz' },
      dailyYield: { value: '0.00', unit: 'kWh' },
      totalYield: { value: '0.00', unit: 'kWh' },
    },
  },
  {
    id: 'inverter6',
    name: 'Inverter 6',
    status: 'online',
    lastSync: '-',
    metrics: {
      voltage: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'V' },
      current: { l1: '0.00', l2: '0.00', l3: '0.00', unit: 'A' },
      activePower: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'kW' },
      powerFactor: { l1: '0.00', l2: '0.00', l3: '0.00', total: '0.00', unit: 'PF' },
      frequency: { value: '0.00', unit: 'Hz' },
      dailyYield: { value: '0.00', unit: 'kWh' },
      totalYield: { value: '0.00', unit: 'kWh' },
    },
  },
]

export const invertersStatus = 1
export const invertersEnabled = invertersStatus === 1
