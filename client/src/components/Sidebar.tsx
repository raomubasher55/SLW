import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import { NavLink } from 'react-router-dom'
import type { NavItem, UserProfile } from '../data'
import { boltIcon, navIconMap, settingsIcon } from './icons'

type SidebarProps = {
  brandName: string
  navItems: NavItem[]
  user: UserProfile
}

export function Sidebar({ brandName, navItems, user }: SidebarProps) {
  return (
    <Box className="energy-sidebar">
      <Flex align="center" gap="3" className="sidebar-brand">
        <Box className="brand-icon">{boltIcon({ className: 'brand-icon-svg' })}</Box>
        <Text size="3" weight="bold" className="sidebar-title">
          {brandName}
        </Text>
      </Flex>

      <Box className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = navIconMap[item.icon]
          return (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''}`
              }
            >
              <Icon className="nav-icon" />
              <Text size="2" weight="medium" className="nav-label">
                {item.label}
              </Text>
            </NavLink>
          )
        })}
      </Box>

      <Box className="sidebar-footer">
        <Flex align="center" gap="3" className="nav-item nav-item-muted">
          {settingsIcon({ className: 'nav-icon' })}
          <Text size="2" weight="medium" className="nav-label">
            Settings
          </Text>
        </Flex>
        <Flex align="center" gap="3" className="profile-row">
          <Avatar fallback={user.initials} radius="full" />
          <Box className="profile-text">
            <Text size="2" weight="medium">
              {user.name}
            </Text>
            <Text size="1" color="gray">
              {user.role}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
