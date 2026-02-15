import './GridDetails.css'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { brand, navItems, userProfile } from '../data'
import { EnergyImportExportCard } from '../components/EnergyImportExportCard'
import { GridPhaseMetricsTable } from '../components/GridPhaseMetricsTable'
import { Sidebar } from '../components/Sidebar'
import { useGrid } from '../contexts/grid/GridContext'
export function GridDetails() {
  const { data } = useGrid()
  return (
    <Box className="grid-details-shell energy-shell">
      <Flex className="energy-layout">
        <Sidebar brandName={brand.name} navItems={navItems} user={userProfile} />

        <Box className="grid-details-main">
          <Flex direction="column" gap="1" className="grid-details-header">
            <Text size="5" weight="bold">
              Grid Details
            </Text>
            <Text size="2" color="gray">
              Backend Metrics Overview
            </Text>
          </Flex>

          <Grid columns={{ initial: '1', lg: '12' }} gap="5" className="grid-details-grid">
            <Box className="grid-details-left">
              <GridPhaseMetricsTable data={data} />
            </Box>

            <Box className="grid-details-right">
              <EnergyImportExportCard data={data.energy} />
            </Box>
          </Grid>
        </Box>
      </Flex>
    </Box>
  )
}
