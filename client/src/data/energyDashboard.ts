import { gensetBackendSample, gensetStatus } from './gensetDetails'
import { gridBackendSample, gridStatus } from './gridDetails'
import { inverters, invertersStatus } from './inverters'

export type NavIconKey = 'dashboard' | 'analytics' | 'genset' | 'inverters'

export type NavItem = {
  id: string
  label: string
  icon: NavIconKey
  href: string
}

export type MetricTrend = {
  direction: 'up' | 'down' | 'flat'
  label: string
}

export type MetricIconKey = 'bolt' | 'waves' | 'offline'

export type MetricCard = {
  id: string
  label: string
  value: string
  unit: string
  accent: 'grid' | 'genset' | 'solar'
  trend: MetricTrend
  icon: MetricIconKey
  statusKey?: 'grid' | 'genset' | 'inverters'
}

export type SourceMixItem = {
  label: string
  value: number
  accent: 'grid' | 'solar' | 'genset'
}

export type SourceMetric = {
  label: string
  value: string
  unit: string
}

export type SourceCard = {
  id: string
  label: string
  status: string
  statusTone: 'blue' | 'amber' | 'green'
  accent: 'grid' | 'genset' | 'solar'
  metrics: SourceMetric[]
}

export type SystemHealthItem = {
  label: string
  value: string
}

export type HeaderInfo = {
  title: string
  subtitle: string
  lastUpdated: string
}

export type UserProfile = {
  name: string
  role: string
  initials: string
}

const parseNumber = (value: string | undefined) => {
  if (!value) return 0
  const cleaned = value.replace(/,/g, '')
  const parsed = Number.parseFloat(cleaned)
  return Number.isNaN(parsed) ? 0 : parsed
}

export type SourceStatuses = {
  grid: 0 | 1
  genset: 0 | 1
  inverters: 0 | 1
}

export type DashboardOverrides = {
  grid?: typeof gridBackendSample
  genset?: typeof gensetBackendSample
  inverters?: typeof inverters
}

export const defaultStatuses: SourceStatuses = {
  grid: gridStatus === 1 ? 1 : 0,
  genset: gensetStatus === 1 ? 1 : 0,
  inverters: invertersStatus === 1 ? 1 : 0,
}

const averagePhaseValue = (values: string[]) => {
  const total = values.reduce((sum, value) => sum + parseNumber(value), 0)
  return total / Math.max(values.length, 1)
}

export const buildDashboardData = (statuses: SourceStatuses, overrides: DashboardOverrides = {}) => {
  const gridSample = overrides.grid ?? gridBackendSample
  const gensetSample = overrides.genset ?? gensetBackendSample
  const inverterList = overrides.inverters ?? inverters
  const gridActive = statuses.grid === 1 ? parseNumber(gridSample.activePower.total) : 0
  const gensetActive = statuses.genset === 1 ? parseNumber(gensetSample.activePower.total) : 0
  const inverterActive =
    statuses.inverters === 1
      ? inverterList.reduce((sum, inverter) => {
          const total = inverter.metrics.activePower.total
          if (total) return sum + parseNumber(total)
          return (
            sum +
            parseNumber(inverter.metrics.activePower.l1) +
            parseNumber(inverter.metrics.activePower.l2) +
            parseNumber(inverter.metrics.activePower.l3)
          )
        }, 0)
      : 0

  const totalActive = Math.max(gridActive + gensetActive + inverterActive, 1)
  const percentage = (value: number) => Math.round((value / totalActive) * 100)

  const inverterVoltage =
    statuses.inverters === 1
      ? averagePhaseValue(
          inverterList.flatMap((inv) => [
            inv.metrics.voltage.l1,
            inv.metrics.voltage.l2,
            inv.metrics.voltage.l3,
          ]),
        )
      : 0
  const inverterCurrent =
    statuses.inverters === 1
      ? averagePhaseValue(
          inverterList.flatMap((inv) => [
            inv.metrics.current.l1,
            inv.metrics.current.l2,
            inv.metrics.current.l3,
          ]),
        )
      : 0
  const inverterPf =
    statuses.inverters === 1
      ? averagePhaseValue(
          inverterList.flatMap((inv) => [
            inv.metrics.powerFactor.total ?? inv.metrics.powerFactor.l1,
            inv.metrics.powerFactor.l2,
            inv.metrics.powerFactor.l3,
          ]),
        )
      : 0

  const metrics: MetricCard[] = [
    {
      id: 'grid-active',
      label: 'Grid Active Power',
      value: gridActive.toFixed(1),
      unit: 'kW',
      accent: 'grid',
      trend: { direction: 'flat', label: 'Grid Load' },
      icon: 'bolt',
      statusKey: 'grid',
    },
    {
      id: 'genset-active',
      label: 'Genset Active Power',
      value: gensetActive.toFixed(1),
      unit: 'kW',
      accent: 'genset',
      trend: { direction: 'flat', label: 'Genset Load' },
      icon: 'bolt',
      statusKey: 'genset',
    },
    {
      id: 'inverter-active',
      label: 'Inverter Active Power',
      value: inverterActive.toFixed(1),
      unit: 'kW',
      accent: 'solar',
      trend: { direction: 'flat', label: 'Inverter Load' },
      icon: 'bolt',
      statusKey: 'inverters',
    },
    {
      id: 'total-power',
      label: 'Total Active Power',
      value: totalActive.toFixed(1),
      unit: 'kW',
      accent: 'grid',
      trend: { direction: 'up', label: 'Combined Load' },
      icon: 'bolt',
    },
  ]

  const sourceMix: SourceMixItem[] = [
    { label: 'Grid', value: percentage(gridActive), accent: 'grid' },
    { label: 'Inverters', value: percentage(inverterActive), accent: 'solar' },
    { label: 'Genset', value: percentage(gensetActive), accent: 'genset' },
  ]

  const sourceCards: SourceCard[] = [
    {
      id: 'grid-source',
      label: 'Grid Utility',
      status: statuses.grid === 1 ? 'Online' : 'Offline',
      statusTone: statuses.grid === 1 ? 'blue' : 'amber',
      accent: 'grid',
      metrics: [
        { label: 'Voltage', value: gridSample.voltage.l1, unit: gridSample.voltage.unit },
        { label: 'Current', value: gridSample.current.l1, unit: gridSample.current.unit },
        {
          label: 'Power Factor',
          value: gridSample.powerFactor.total ?? gridSample.powerFactor.l1,
          unit: gridSample.powerFactor.unit,
        },
        {
          label: 'Active Power',
          value: statuses.grid === 1 ? gridSample.activePower.total ?? gridSample.activePower.l1 : '0.0',
          unit: gridSample.activePower.unit,
        },
      ],
    },
    {
      id: 'genset-source',
      label: 'Diesel Genset',
      status: statuses.genset === 1 ? 'Online' : 'Offline',
      statusTone: statuses.genset === 1 ? 'amber' : 'blue',
      accent: 'genset',
      metrics: [
        { label: 'Voltage', value: gensetSample.voltage.l1, unit: gensetSample.voltage.unit },
        { label: 'Current', value: gensetSample.current.l1, unit: gensetSample.current.unit },
        {
          label: 'Power Factor',
          value: gensetSample.powerFactor.total ?? gensetSample.powerFactor.l1,
          unit: gensetSample.powerFactor.unit,
        },
        {
          label: 'Active Power',
          value: statuses.genset === 1 ? gensetSample.activePower.total ?? gensetSample.activePower.l1 : '0.0',
          unit: gensetSample.activePower.unit,
        },
      ],
    },
    {
      id: 'inverter-source',
      label: 'Inverters',
      status: statuses.inverters === 1 ? 'Online' : 'Offline',
      statusTone: statuses.inverters === 1 ? 'green' : 'amber',
      accent: 'solar',
      metrics: [
        { label: 'Voltage', value: inverterVoltage.toFixed(1), unit: 'V' },
        { label: 'Current', value: inverterCurrent.toFixed(0), unit: 'A' },
        { label: 'Power Factor', value: inverterPf.toFixed(2), unit: 'PF' },
        { label: 'Active Power', value: inverterActive.toFixed(1), unit: 'kW' },
      ],
    },
  ]

  return { metrics, sourceMix, sourceCards }
}

export const brand = {
  name: 'POWERCORE',
}

export const header: HeaderInfo = {
  title: 'Energy Dashboard Overview',
  subtitle: 'Grid, Genset, and Inverters',
  lastUpdated: '14:02:48 PM',
}

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard', href: '/' },
  { id: 'grid', label: 'Grid', icon: 'analytics', href: '/grid-details' },
  { id: 'genset', label: 'Genset', icon: 'genset', href: '/genset-details' },
  { id: 'inverters', label: 'Inverters', icon: 'inverters', href: '/inverters/inverter1' },
]

const initialData = buildDashboardData(defaultStatuses)
export const metrics: MetricCard[] = initialData.metrics
export const sourceMix: SourceMixItem[] = initialData.sourceMix
export const sourceCards: SourceCard[] = initialData.sourceCards

export const systemHealth: SystemHealthItem[] = [
  { label: 'System', value: 'OK' },
  { label: 'Network', value: '42ms' },
  { label: 'DB Sync', value: 'Active' },
]

export const userProfile: UserProfile = {
  name: 'J. Harrison',
  role: 'Site Engineer',
  initials: 'JH',
}

export const footer = {
  version: 'PowerCore Terminal v2.4.1',
}
