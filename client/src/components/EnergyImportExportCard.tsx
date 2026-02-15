import { Card, Flex, Text } from '@radix-ui/themes'

type EnergyImportExportCardProps = {
  data: {
    importKwh: string
    exportKwh: string
    unit: string
  }
}

export function EnergyImportExportCard({ data }: EnergyImportExportCardProps) {
  return (
    <Card className="grid-details-card grid-energy-card">
      <Text size="2" weight="medium" className="grid-energy-title">
        Energy Import / Export
      </Text>
      <Flex direction="column" gap="4" className="grid-energy-body">
        <Flex align="center" justify="between" className="grid-energy-row">
          <Text size="1" color="gray" className="grid-energy-label">
            Import
          </Text>
          <Text size="4" weight="bold">
            {data.importKwh} {data.unit}
          </Text>
        </Flex>
        <Flex align="center" justify="between" className="grid-energy-row">
          <Text size="1" color="gray" className="grid-energy-label">
            Export
          </Text>
          <Text size="4" weight="bold">
            {data.exportKwh} {data.unit}
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
