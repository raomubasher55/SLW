import { Button, Card, Flex, Grid, Text } from '@radix-ui/themes'
import type { MetricCard, SourceStatuses } from '../data'
import { metricIconMap, trendIcon } from './icons'
import { accentClass } from './styleMaps'

type MetricsGridProps = {
  metrics: MetricCard[]
  statuses?: SourceStatuses
  onToggleStatus?: (key: keyof SourceStatuses) => void
  columns?: {
    initial?: string
    md?: string
    xl?: string
  }
}

export function MetricsGrid({ metrics, statuses, onToggleStatus, columns }: MetricsGridProps) {
  const gridColumns = columns ?? { initial: '1', md: '3' }
  return (
    <Grid columns={gridColumns} gap="4" className="metric-grid">
      {metrics.map((metric) => {
        const Icon = metricIconMap[metric.icon]
        const statusKey = metric.statusKey
        const statusValue = statusKey && statuses ? statuses[statusKey] : undefined
        return (
          <Card key={metric.id} className="metric-card">
            <Flex direction="column" gap="3">
              <Flex align="center" justify="between">
                <Text size="1" weight="medium" className="metric-label">
                  {metric.label}
                </Text>
                <Flex align="center" gap="2">
                  {statusKey && statusValue !== undefined ? (
                    <span className={`metric-status ${statusValue === 1 ? 'is-on' : 'is-off'}`}>
                      {statusValue === 1 ? 'ON' : 'OFF'}
                    </span>
                  ) : null}
                  <Icon className={`metric-icon ${accentClass[metric.accent]}`} />
                </Flex>
              </Flex>
              {statusKey && onToggleStatus ? (
                <Button
                  size="1"
                  variant="soft"
                  className="metric-toggle"
                  onClick={() => onToggleStatus(statusKey)}
                >
                  {statusValue === 1 ? 'Turn Off' : 'Turn On'}
                </Button>
              ) : null}
              <Flex align="baseline" gap="2">
                <Text size="6" weight="bold" className="metric-value">
                  {metric.value}
                </Text>
                <Text size="3" color="gray">
                  {metric.unit}
                </Text>
              </Flex>
              <Flex
                align="center"
                gap="2"
                className={`metric-trend trend-${metric.trend.direction}`}
              >
                {trendIcon(metric.trend.direction)}
                <Text size="1" weight="medium">
                  {metric.trend.label}
                </Text>
              </Flex>
            </Flex>
          </Card>
        )
      })}
    </Grid>
  )
}
