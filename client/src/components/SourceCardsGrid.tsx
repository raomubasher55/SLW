import { Badge, Box, Card, Flex, Grid, Text } from '@radix-ui/themes'
import type { SourceCard } from '../data'
import { accentBgClass } from './styleMaps'

type SourceCardsGridProps = {
  sources: SourceCard[]
}

export function SourceCardsGrid({ sources }: SourceCardsGridProps) {
  return (
    <Grid columns={{ initial: '1', md: '3' }} gap="4" className="source-grid">
      {sources.map((source) => (
        <Card key={source.id} className="source-card">
          <Flex align="center" justify="between" className="source-card-header">
            <Flex align="center" gap="2">
              <span className={`legend-dot ${accentBgClass[source.accent]}`} />
              <Text size="2" weight="medium">
                {source.label}
              </Text>
            </Flex>
            <Badge color={source.statusTone} variant="soft" className="source-badge">
              {source.status}
            </Badge>
          </Flex>
          <Grid columns="2" gap="4" className="source-metrics">
            {source.metrics.map((metric) => (
              <Box key={metric.label}>
                <Text size="1" color="gray" className="metric-label">
                  {metric.label}
                </Text>
                <Text size="4" weight="bold" className="metric-value">
                  {metric.value}
                  <Text size="1" color="gray" className="metric-unit">
                    {metric.unit}
                  </Text>
                </Text>
              </Box>
            ))}
          </Grid>
        </Card>
      ))}
    </Grid>
  )
}
