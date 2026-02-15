import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes'
import type { HeaderInfo } from '../data'

type TopbarProps = {
  header: HeaderInfo
}

export function Topbar({ header }: TopbarProps) {
  return (
    <Flex className="energy-topbar" align="center" justify="between">
      <Box>
        <Heading size="4">{header.title}</Heading>
        <Text size="1" color="gray">
          {header.subtitle}
        </Text>
      </Box>
      <Flex align="center" gap="4" className="topbar-actions">
        <Flex align="center" gap="2" className="status-update">
          <span className="status-dot" />
          <Text size="1" color="gray">
            Last Updated:
          </Text>
          <Text size="1" weight="medium">
            {header.lastUpdated}
          </Text>
        </Flex>
        <Button size="2" className="download-button">
          Download PDF
        </Button>
      </Flex>
    </Flex>
  )
}
