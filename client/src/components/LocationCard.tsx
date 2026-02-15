import { Box, Card, Flex, Text } from '@radix-ui/themes'

type LocationCardProps = {
  title: string
  status: string
}

const pinIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="grid-details-pin">
    <path
      d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7z"
      fill="currentColor"
    />
    <circle cx="12" cy="9" r="2.5" fill="#0b141b" />
  </svg>
)

export function LocationCard({ title, status }: LocationCardProps) {
  return (
    <Card className="grid-details-card grid-details-location">
      <Flex align="center" gap="2" className="grid-details-location-head">
        {pinIcon}
        <Text size="1" weight="medium">
          {title}
        </Text>
      </Flex>
      <Box className="grid-details-location-body">
        <Box className="grid-details-location-image" />
        <Box className="grid-details-location-overlay">
          <Text size="1" color="gray" className="grid-details-location-label">
            Status
          </Text>
          <Text size="2" weight="bold" className="grid-details-location-status">
            {status}
          </Text>
        </Box>
      </Box>
    </Card>
  )
}
