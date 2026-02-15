import { Box, Card, Flex, Text } from '@radix-ui/themes'

type GridPhaseMetricsTableProps = {
  data: {
    voltage: PhaseRowData
    current: PhaseRowData
    activePower: PhaseRowData
    reactivePower: PhaseRowData
    powerFactor: PhaseRowData
    frequency: {
      value: string
      unit: string
    }
  }
}

type PhaseRowData = {
  l1: string
  l2: string
  l3: string
  total?: string
  unit: string
}

type PhaseRow = PhaseRowData & {
  label: string
}

export function GridPhaseMetricsTable({ data }: GridPhaseMetricsTableProps) {
  const rows: PhaseRow[] = [
    { label: 'Voltage', ...data.voltage },
    { label: 'Current', ...data.current },
    { label: 'Active Power', ...data.activePower },
    { label: 'Reactive Power', ...data.reactivePower },
    { label: 'Power Factor', ...data.powerFactor },
  ]

  return (
    <Card className="grid-details-card grid-phase-table">
      <Flex align="center" justify="between" className="grid-details-card-head">
        <Text size="2" weight="medium" className="grid-details-card-title">
          3-Phase Output Metrics
        </Text>
        <Flex align="center" gap="2">
          <span className="grid-details-pill">{`${data.frequency.value} ${data.frequency.unit}`}</span>
        </Flex>
      </Flex>
      <Box className="grid-phase-table-wrap">
        <table className="grid-phase-table-grid">
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
                <td className="grid-phase-label">{row.label}</td>
                <td className="grid-phase-value">{`${row.l1} ${row.unit}`}</td>
                <td className="grid-phase-value">{`${row.l2} ${row.unit}`}</td>
                <td className="grid-phase-value">{`${row.l3} ${row.unit}`}</td>
                <td className="grid-phase-total">
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
