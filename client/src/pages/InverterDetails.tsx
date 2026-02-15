import './InverterDetails.css'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { Navigate, useParams } from 'react-router-dom'
import { brand, navItems, userProfile } from '../data'
import { InverterHeader } from '../components/InverterHeader'
import { InverterPhaseTable } from '../components/InverterPhaseTable'
import { InverterSubnav } from '../components/InverterSubnav'
import { InverterYieldCard } from '../components/InverterYieldCard'
import { Sidebar } from '../components/Sidebar'
import { useInverters } from '../contexts/inverters/InvertersContext'

export function InverterDetails() {
  const params = useParams<{ inverterId: string }>()
  const activeId = params.inverterId ?? ''
  const { list } = useInverters()
  const active = list.find((item) => item.id === activeId)

  if (!active) {
    return <Navigate to="/inverters/inverter1" replace />
  }

  return (
    <Box className="inverter-shell energy-shell">
      <Flex className="energy-layout">
        <Sidebar brandName={brand.name} navItems={navItems} user={userProfile} />

        <Box className="inverter-content">
          <InverterHeader inverter={active} />

          <Box className="inverter-main">
            <InverterSubnav items={list} />

            <Grid columns={{ initial: '1', lg: '12' }} gap="5">
              <Box className="inverter-left">
                <InverterPhaseTable metrics={active.metrics} />
              </Box>
              <Box className="inverter-right">
                <InverterYieldCard metrics={active.metrics} />
              </Box>
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
