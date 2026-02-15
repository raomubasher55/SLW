import { Box, Card, Flex, Text } from '@radix-ui/themes'
import type { InverterMetrics } from '../data'

type InverterPhaseTableProps = {
  metrics: InverterMetrics
}

type PhaseRow = {
  label: string
  l1: string
  l2: string
  l3: string
  total?: string
  unit: string
}

export function InverterPhaseTable({ metrics }: InverterPhaseTableProps) {
  const rows: PhaseRow[] = [
    { label: 'Voltage', ...metrics.voltage },
    { label: 'Current', ...metrics.current },
    { label: 'Active Power', ...metrics.activePower },
    { label: 'Power Factor', ...metrics.powerFactor },
  ]

  return (
    <Card className="inverter-card inverter-table-card">
      <Flex align="center" justify="between" className="inverter-card-head">
        <Text size="2" weight="bold" className="inverter-card-title">
          3-Phase Output Metrics
        </Text>
        <span className="inverter-tag">
          {metrics.frequency.value} {metrics.frequency.unit}
        </span>
      </Flex>
      <Box className="inverter-table-wrap">
        <table className="inverter-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Phase L1</th>
              <th>Phase L2</th>
              <th>Phase L3</th>
              <th>Average/Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="inverter-muted">{row.label}</td>
                <td className="inverter-mono">{`${row.l1} ${row.unit}`}</td>
                <td className="inverter-mono">{`${row.l2} ${row.unit}`}</td>
                <td className="inverter-mono">{`${row.l3} ${row.unit}`}</td>
                <td className="inverter-primary">
                  {row.total ? `${row.total} ${row.unit}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Card>
  )
}
