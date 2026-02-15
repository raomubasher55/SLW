import { Flex, Text } from '@radix-ui/themes'
import type { SystemHealthItem } from '../data'

type FooterProps = {
  items: SystemHealthItem[]
  version: string
}

export function Footer({ items, version }: FooterProps) {
  return (
    <Flex align="center" justify="between" className="energy-footer">
      <Flex align="center" gap="4" className="footer-left">
        {items.map((item) => (
          <Flex key={item.label} align="center" gap="2" className="health-item">
            <span className="health-dot" />
            <Text size="1" weight="medium" className="health-text">
              {item.label}: {item.value}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Text size="1" weight="medium" className="footer-right">
        {version}
      </Text>
    </Flex>
  )
}
