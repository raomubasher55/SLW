import { Box, Card, Flex, Text } from '@radix-ui/themes'
import type { SourceMixItem } from '../data'
import { infoIcon } from './icons'
import { accentBgClass } from './styleMaps'

type SourceContributionCardProps = {
  items: SourceMixItem[]
}

export function SourceContributionCard({ items }: SourceContributionCardProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1
  const colorMap: Record<SourceMixItem['accent'], string> = {
    grid: 'var(--grid)',
    solar: 'var(--solar)',
    genset: 'var(--genset)',
  }
  const size = 188
  const stroke = 30
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const gapPercent = 2.6
  const normalized = items.map((item) => ({
    ...item,
    percent: (item.value / total) * 100,
  }))
  const chartItems = normalized.filter((item) => item.value > 0)
  const gapStep = chartItems.length > 1 ? gapPercent : 0
  let offset = 0
  return (
    <Card className="panel-card">
      <Flex align="center" gap="2" className="panel-title">
        <Text size="2" weight="medium">
          Source Contribution
        </Text>
        {infoIcon({ className: 'panel-info' })}
      </Flex>
      <Box className="mix-chart-wrap">
        <Box className="mix-chart">
          <svg
            className="mix-chart-svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden="true"
          >
            <circle
              className="mix-chart-track"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
            />
            {chartItems.map((item) => {
              const segment = Math.max(item.percent - gapStep, 0)
              const length = (segment / 100) * circumference
              const dashArray = `${length} ${circumference - length}`
              const dashOffset = (offset / 100) * circumference
              offset += segment + gapStep
              return (
                <g key={item.label}>
                  <circle
                    className="mix-chart-segment"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={colorMap[item.accent]}
                    strokeWidth={stroke}
                    strokeDasharray={dashArray}
                    strokeDashoffset={-dashOffset}
                  />
                </g>
              )
            })}
          </svg>
          <span className="mix-chart-ring" aria-hidden="true" />
        </Box>
      </Box>
      <Box className="mix-legend">
        {normalized.map((item) => (
          <Flex key={item.label} align="center" justify="between" className="legend-row">
            <Flex align="center" gap="2">
              <span className={`legend-dot ${accentBgClass[item.accent]}`} />
              <Text size="1" color="gray">
                {item.label}
              </Text>
            </Flex>
            <Text size="1" weight="medium">
              {Math.round(item.percent)}%
            </Text>
          </Flex>
        ))}
      </Box>
    </Card>
  )
}
