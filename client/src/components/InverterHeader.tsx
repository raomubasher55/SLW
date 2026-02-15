import { Badge, Box, Button, Flex, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import type { InverterInfo } from '../data'

type InverterHeaderProps = {
  inverter: InverterInfo
}

const backIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="inverter-back-icon">
    <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const settingsIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="inverter-action-icon">
    <path
      d="M19.4 13a7.7 7.7 0 000-2l2.1-1.6-2-3.4-2.6.9a7.5 7.5 0 00-1.7-1L15 2h-4l-.2 2.9a7.5 7.5 0 00-1.7 1l-2.6-.9-2 3.4L4.6 11a7.7 7.7 0 000 2l-2.1 1.6 2 3.4 2.6-.9c.5.4 1.1.7 1.7 1L11 22h4l.2-2.9c.6-.3 1.2-.6 1.7-1l2.6.9 2-3.4L19.4 13z"
      fill="currentColor"
    />
    <circle cx="12" cy="12" r="3" className="inverter-gear-center" />
  </svg>
)

export function InverterHeader({ inverter }: InverterHeaderProps) {
  return (
    <Box className="inverter-header">
      <Flex align="center" justify="between" gap="4" className="inverter-header-row">
        <Flex align="center" gap="4">
          <Link to="/" className="inverter-back-link" aria-label="Back to dashboard">
            {backIcon}
          </Link>
          <Box>
            <Flex align="center" gap="2" className="inverter-breadcrumb">
              <Text size="1" color="gray">
                Dashboard
                <span className="inverter-breadcrumb-sep">/</span>
              </Text>
              <Text size="1" color="gray">
                Inverters
                <span className="inverter-breadcrumb-sep">/</span>
              </Text>
              <Text size="1" color="gray">
                {inverter.name}
              </Text>
            </Flex>
            <Flex align="center" gap="2" wrap="wrap">
              <Text size="4" weight="bold">
                {inverter.name}
              </Text>
              <Badge
                color={inverter.status === 'online' ? 'green' : 'amber'}
                variant="soft"
                className="inverter-status-pill"
              >
                {inverter.status === 'online' ? 'Online' : 'Attention'}
              </Badge>
            </Flex>
          </Box>
        </Flex>
        <Flex align="center" gap="3">
          <Box className="inverter-localtime">
            <Text size="1" color="gray" className="inverter-localtime-label">
              Last Sync
            </Text>
            <Text size="2" className="inverter-localtime-value">
              {inverter.lastSync}
            </Text>
          </Box>
          <Button size="2" className="inverter-action">
            {settingsIcon}
            Configure
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
