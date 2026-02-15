import { Box, Card, Flex, Text } from '@radix-ui/themes'

type SummaryCardProps = {
  energy: string
  unit: string
  peak: string
  min: string
  delta: string
}

export function SummaryCard({ energy, unit, peak, min, delta }: SummaryCardProps) {
  return (
    <Card className="grid-details-summary">
      <Text size="1" weight="medium" className="grid-details-summary-title">
        Today's Summary
      </Text>
      <Box className="grid-details-summary-body">
        <Box>
          <Text size="1" className="grid-details-summary-label">
            Energy Consumption
          </Text>
          <Flex align="baseline" gap="2">
            <Text size="6" weight="bold">
              {energy}
            </Text>
            <Text size="2" weight="medium">
              {unit}
            </Text>
          </Flex>
        </Box>

        <GridRow label="Peak Demand" value={peak} />
        <GridRow label="Min Load" value={min} />

        <Flex align="center" gap="2" className="grid-details-summary-delta">
          <span className="grid-details-summary-arrow" />
          <Text size="1" weight="medium">
            {delta}
          </Text>
        </Flex>
      </Box>
    </Card>
  )
}

type GridRowProps = {
  label: string
  value: string
}

function GridRow({ label, value }: GridRowProps) {
  return (
    <Flex align="center" justify="between" className="grid-details-summary-row">
      <Text size="1" className="grid-details-summary-label">
        {label}
      </Text>
      <Text size="3" weight="bold">
        {value}
      </Text>
    </Flex>
  )
}
