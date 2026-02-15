import type { ReactElement, SVGProps } from 'react'
import type { MetricIconKey, NavIconKey } from '../data'

export type IconProps = SVGProps<SVGSVGElement>

export const navIconMap: Record<NavIconKey, (props: IconProps) => ReactElement> = {
  dashboard: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4 4h7v7H4V4zm9 0h7v4h-7V4zM4 13h7v7H4v-7zm9-3h7v10h-7V10z"
        fill="currentColor"
      />
    </svg>
  ),
  analytics: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M5 9h3v10H5V9zm5-4h3v14h-3V5zm5 7h3v7h-3v-7z"
        fill="currentColor"
      />
    </svg>
  ),
  genset: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4 8h16v10H4V8zm2-3h8v3H6V5zm9 1h3v2h-3V6z"
        fill="currentColor"
      />
      <circle cx="9" cy="13" r="2" fill="#0b141b" />
      <circle cx="15" cy="13" r="2" fill="#0b141b" />
    </svg>
  ),
  inverters: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4 5h16v14H4V5zm3 3h10v2H7V8zm0 4h10v2H7v-2z"
        fill="currentColor"
      />
      <circle cx="8" cy="17" r="1.5" fill="#0b141b" />
      <circle cx="12" cy="17" r="1.5" fill="#0b141b" />
      <circle cx="16" cy="17" r="1.5" fill="#0b141b" />
    </svg>
  ),
}

export const settingsIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M19.4 13a7.7 7.7 0 000-2l2.1-1.6-2-3.4-2.6.9a7.5 7.5 0 00-1.7-1L15 2h-4l-.2 2.9a7.5 7.5 0 00-1.7 1l-2.6-.9-2 3.4L4.6 11a7.7 7.7 0 000 2l-2.1 1.6 2 3.4 2.6-.9c.5.4 1.1.7 1.7 1L11 22h4l.2-2.9c.6-.3 1.2-.6 1.7-1l2.6.9 2-3.4L19.4 13z"
      fill="currentColor"
    />
    <circle cx="12" cy="12" r="3" className="gear-center" />
  </svg>
)

export const boltIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
      fill="currentColor"
    />
  </svg>
)

export const wavesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M3 8c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M3 14c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
)

export const offlineIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M7 2h10v6h3L12 22 4 8h3V2z" fill="currentColor" />
  </svg>
)

export const infoIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 10v6" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="7" r="1" fill="currentColor" />
  </svg>
)

export const trendIcon = (direction: 'up' | 'down' | 'flat') => {
  if (direction === 'flat') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="trend-icon">
        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="trend-icon">
      <path
        d={direction === 'up' ? 'M6 14l6-6 6 6' : 'M6 10l6 6 6-6'}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}

export const metricIconMap: Record<MetricIconKey, (props: IconProps) => ReactElement> = {
  bolt: boltIcon,
  waves: wavesIcon,
  offline: offlineIcon,
}
