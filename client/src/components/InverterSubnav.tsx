import { Flex } from '@radix-ui/themes'
import { NavLink } from 'react-router-dom'
import type { InverterInfo } from '../data'

type InverterSubnavProps = {
  items: InverterInfo[]
}

export function InverterSubnav({ items }: InverterSubnavProps) {
  return (
    <Flex align="center" gap="2" className="inverter-subnav">
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={`/inverters/${item.id}`}
          className={({ isActive }) =>
            `inverter-subnav-link ${isActive ? 'is-active' : ''}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </Flex>
  )
}
