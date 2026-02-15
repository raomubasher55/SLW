import type { GensetBackendSample } from '../../data/gensetDetails'
import type { GridBackendSample } from '../../data/gridDetails'
import type { InverterInfo, InverterMetrics } from '../../data/inverters'
import type { MqttMessage, MqttPayload } from '../realtime/types'

const pick = (payload: MqttPayload, key: string, fallback: string) =>
  payload[key] && payload[key] !== '' ? payload[key] : fallback

const pickFirst = (payload: MqttPayload, keys: string[], fallback: string) => {
  for (const key of keys) {
    if (payload[key] && payload[key] !== '') return payload[key]
  }
  return fallback
}

const detectWapdaPrefix = (payload: MqttPayload) => {
  if (Object.keys(payload).some((key) => key.startsWith('Wapda_Gens_G2_'))) {
    return 'Wapda_Gens_G2_'
  }
  if (Object.keys(payload).some((key) => key.startsWith('Wapda_Gens_W1_'))) {
    return 'Wapda_Gens_W1_'
  }
  return 'Wapda_Gens_W1_'
}

export const mapPayloadToBackendSample = (
  payload: MqttPayload,
  fallback: GridBackendSample | GensetBackendSample,
): GridBackendSample | GensetBackendSample => {
  const prefix = detectWapdaPrefix(payload)
  return {
    voltage: {
      l1: pick(payload, `${prefix}V1`, fallback.voltage.l1),
      l2: pick(payload, `${prefix}V2`, fallback.voltage.l2),
      l3: pick(payload, `${prefix}V3`, fallback.voltage.l3),
      unit: fallback.voltage.unit,
    },
    current: {
      l1: pick(payload, `${prefix}A1`, fallback.current.l1),
      l2: pick(payload, `${prefix}A2`, fallback.current.l2),
      l3: pick(payload, `${prefix}A3`, fallback.current.l3),
      unit: fallback.current.unit,
    },
    activePower: {
      l1: pick(payload, `${prefix}KW1`, fallback.activePower.l1),
      l2: pick(payload, `${prefix}KW2`, fallback.activePower.l2),
      l3: pick(payload, `${prefix}KW3`, fallback.activePower.l3),
      total: pickFirst(payload, [`${prefix}KW_T`, `${prefix}KW1_T`], fallback.activePower.total ?? '0.00'),
      unit: fallback.activePower.unit,
    },
    reactivePower: {
      l1: pick(payload, `${prefix}KVAR1`, fallback.reactivePower.l1),
      l2: pick(payload, `${prefix}KVAR2`, fallback.reactivePower.l2),
      l3: pick(payload, `${prefix}KVAR3`, fallback.reactivePower.l3),
      total: pick(payload, `${prefix}KVAR_T`, fallback.reactivePower.total ?? '0.00'),
      unit: fallback.reactivePower.unit,
    },
    powerFactor: {
      l1: pick(payload, `${prefix}PF1`, fallback.powerFactor.l1),
      l2: pick(payload, `${prefix}PF2`, fallback.powerFactor.l2),
      l3: pick(payload, `${prefix}PF3`, fallback.powerFactor.l3),
      total: pick(payload, `${prefix}PF_T`, fallback.powerFactor.total ?? '0.00'),
      unit: fallback.powerFactor.unit,
    },
    frequency: {
      value: pick(payload, `${prefix}HZ`, fallback.frequency.value),
      unit: fallback.frequency.unit,
    },
    energy: {
      importKwh: pick(payload, `${prefix}Positive_KWH`, fallback.energy.importKwh),
      exportKwh: pick(payload, `${prefix}Negative_KWH`, fallback.energy.exportKwh),
      unit: fallback.energy.unit,
    },
  }
}

const getInvPrefix = (inverterKey: string) => {
  const num = inverterKey.replace(/[^0-9]/g, '')
  return `SOLAR_INV${num}_`
}

const getInvYieldKeys = (inverterKey: string) => {
  const num = inverterKey.replace(/[^0-9]/g, '')
  return {
    daily: [`SOLAR_INV${num}_DY`, `SOLAR_Inv${num}_MY`, `SOLAR_INV${num}_MY`],
    total: [`SOLAR_INV${num}_TY`, `SOLAR_Inv${num}_YY`, `SOLAR_INV${num}_YY`],
  }
}

export const mapPayloadToInverterMetrics = (
  payload: MqttPayload,
  fallback: InverterMetrics,
  inverterKey: string,
): InverterMetrics => {
  const prefix = getInvPrefix(inverterKey)
  const yieldKeys = getInvYieldKeys(inverterKey)
  const kw = pick(payload, `${prefix}KW`, fallback.activePower.total ?? '0.00')
  const pf = pick(payload, `${prefix}PF`, fallback.powerFactor.total ?? '0.00')
  return {
    voltage: {
      l1: pick(payload, `${prefix}V1`, fallback.voltage.l1),
      l2: pick(payload, `${prefix}V2`, fallback.voltage.l2),
      l3: pick(payload, `${prefix}V3`, fallback.voltage.l3),
      unit: fallback.voltage.unit,
    },
    current: {
      l1: pick(payload, `${prefix}A1`, fallback.current.l1),
      l2: pick(payload, `${prefix}A2`, fallback.current.l2),
      l3: pick(payload, `${prefix}A3`, fallback.current.l3),
      unit: fallback.current.unit,
    },
    activePower: {
      l1: kw,
      l2: kw,
      l3: kw,
      total: kw,
      unit: fallback.activePower.unit,
    },
    powerFactor: {
      l1: pf,
      l2: pf,
      l3: pf,
      total: pf,
      unit: fallback.powerFactor.unit,
    },
    frequency: {
      value: pick(payload, `${prefix}HZ`, fallback.frequency.value),
      unit: fallback.frequency.unit,
    },
    dailyYield: {
      value: pickFirst(payload, yieldKeys.daily, fallback.dailyYield.value),
      unit: fallback.dailyYield.unit,
    },
    totalYield: {
      value: pickFirst(payload, yieldKeys.total, fallback.totalYield.value),
      unit: fallback.totalYield.unit,
    },
  }
}

export const mergeInvertersWithMqtt = (
  list: InverterInfo[],
  messages: Record<string, MqttMessage>,
) =>
  list.map((inverter) => {
    const sourceKey = inverter.id.replace('inverter', 'inv')
    const message = messages[sourceKey]
    if (!message) return inverter
    return {
      ...inverter,
      metrics: mapPayloadToInverterMetrics(message.payload, inverter.metrics, sourceKey),
    }
  })
