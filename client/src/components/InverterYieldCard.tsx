import { Card, Flex, Text } from '@radix-ui/themes'
import type { InverterMetrics } from '../data'

type InverterYieldCardProps = {
  metrics: InverterMetrics
}

export function InverterYieldCard({ metrics }: InverterYieldCardProps) {
  return (
    <Card className="inverter-card inverter-yield-card">
      <Text size="2" weight="bold" className="inverter-card-title">
        Energy Yield
      </Text>
      <Flex direction="column" gap="4" className="inverter-yield-body">
        <Flex align="center" justify="between" className="inverter-yield-row">
          <Text size="1" color="gray">
            Daily Yield
          </Text>
          <Text size="4" weight="bold">
            {metrics.dailyYield.value} {metrics.dailyYield.unit}
          </Text>
        </Flex>
        <Flex align="center" justify="between" className="inverter-yield-row">
          <Text size="1" color="gray">
            Total Yield
          </Text>
          <Text size="4" weight="bold">
            {metrics.totalYield.value} {metrics.totalYield.unit}
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
