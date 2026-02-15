import './GensetDetails.css'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { brand, navItems, userProfile } from '../data'
import { EnergyImportExportCard } from '../components/EnergyImportExportCard'
import { GridPhaseMetricsTable } from '../components/GridPhaseMetricsTable'
import { Sidebar } from '../components/Sidebar'
import { useGenset } from '../contexts/genset/GensetContext'
export function GensetDetails() {
  const { data } = useGenset()
  return (
    <Box className="genset-shell energy-shell">
      <Flex className="energy-layout">
        <Sidebar brandName={brand.name} navItems={navItems} user={userProfile} />

        <Box className="genset-content">
          <Box className="genset-main">
            <Flex direction="column" gap="1" className="genset-header">
              <Text size="5" weight="bold">
                Genset Details
              </Text>
              <Text size="2" color="gray">
                Backend Metrics Overview
              </Text>
            </Flex>

            <Grid columns={{ initial: '1', lg: '12' }} gap="5">
              <Box className="genset-left">
                <GridPhaseMetricsTable data={data} />
              </Box>

              <Box className="genset-right">
                <EnergyImportExportCard data={data.energy} />
              </Box>
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
