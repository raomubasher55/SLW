import '../App.css'
import { Box, Card, Flex, Grid, ScrollArea, Text } from '@radix-ui/themes'
import { useState } from 'react'
import {
  brand,
  buildDashboardData,
  defaultStatuses,
  header,
  inverters,
  navItems,
  userProfile,
} from '../data'
import { useGrid } from '../contexts/grid/GridContext'
import { useGenset } from '../contexts/genset/GensetContext'
import { useInverters } from '../contexts/inverters/InvertersContext'
import { MetricsGrid } from '../components/MetricsGrid'
import { Sidebar } from '../components/Sidebar'
import { SourceContributionCard } from '../components/SourceContributionCard'
import { Topbar } from '../components/Topbar'

export function Dashboard() {
  const [statuses, setStatuses] = useState(defaultStatuses)
  const { data: gridData, lastUpdated: gridUpdated } = useGrid()
  const { data: gensetData, lastUpdated: gensetUpdated } = useGenset()
  const { list: liveInverters, lastUpdated: invUpdated } = useInverters()
  const { metrics, sourceMix } = buildDashboardData(statuses, {
    grid: gridData,
    genset: gensetData,
    inverters: liveInverters,
  })
  const totalDailyYield = liveInverters.reduce((sum, inverter) => {
    const value = Number(inverter.metrics.dailyYield.value.replace(/,/g, ''))
    return sum + (Number.isFinite(value) ? value : 0)
  }, 0)
  const lastUpdated = gridUpdated ?? gensetUpdated ?? invUpdated ?? header.lastUpdated
  const headerInfo = { ...header, lastUpdated }

  const handleToggle = (key: keyof typeof statuses) => {
    setStatuses((prev) => ({ ...prev, [key]: prev[key] === 1 ? 0 : 1 }))
  }

  return (
    <Box className="energy-shell">
      <Flex className="energy-layout">
        <Sidebar brandName={brand.name} navItems={navItems} user={userProfile} />

        <Flex direction="column" className="energy-main">
          <Topbar header={headerInfo} />

          <ScrollArea scrollbars="vertical" className="energy-scroll">
            <Box className="energy-scroll-inner">
              <Grid columns={{ initial: '1', lg: '12' }} gap="4" className="dashboard-main-grid">
                <Box className="dashboard-left">
                  <MetricsGrid
                    metrics={metrics}
                    statuses={statuses}
                    onToggleStatus={handleToggle}
                    columns={{ initial: '1' }}
                  />
                </Box>
                <Box className="dashboard-right">
                  <Box className="dashboard-right-stack">
                    <Box className="dashboard-right-item dashboard-right-item--mix">
                      <SourceContributionCard items={sourceMix} />
                    </Box>
                    <Box className="dashboard-right-item dashboard-right-item--daily">
                      <Card className="panel-card">
                        <Text size="2" weight="medium" className="panel-title">
                          Daily Production
                        </Text>
                        <Flex direction="column" gap="2">
                          <Text size="6" weight="bold">
                            {totalDailyYield.toLocaleString()}
                            <Text as="span" size="3" color="gray">
                              {' '}
                              kWh
                            </Text>
                          </Text>
                          <Text size="2" color="gray">
                            Total inverter daily yield
                          </Text>
                        </Flex>
                      </Card>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </ScrollArea>
        </Flex>
      </Flex>
    </Box>
  )
}
