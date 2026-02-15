import { Flex, Link, Text } from '@radix-ui/themes'

type GridDetailsFooterProps = {
  uptime: string
  firmware: string
  links: string[]
}

export function GridDetailsFooter({ uptime, firmware, links }: GridDetailsFooterProps) {
  return (
    <Flex direction={{ initial: 'column', md: 'row' }} className="grid-details-footer">
      <Flex align="center" gap="3" className="grid-details-footer-left">
        <Text size="1" color="gray">
          {uptime}
        </Text>
        <span className="grid-details-footer-dot" />
        <Text size="1" color="gray">
          {firmware}
        </Text>
      </Flex>
      <Flex align="center" gap="4" className="grid-details-footer-links">
        {links.map((link) => (
          <Link key={link} href="#" className="grid-details-footer-link">
            {link}
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}
