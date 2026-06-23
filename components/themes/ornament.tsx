// Decorative, themeable line ornaments shared across the /themes pages.
// Pure SVG, no client JS — safe in server components.

export function OrnamentLine({
  color,
  width = 120,
  className,
  opacity = 1,
}: {
  color: string
  width?: number
  className?: string
  opacity?: number
}) {
  return (
    <svg
      viewBox="0 0 140 10"
      width={width}
      height={(width / 140) * 10}
      aria-hidden="true"
      className={className}
      style={{ opacity }}
    >
      <line x1="0" y1="4.5" x2="55" y2="4.5" stroke={color} strokeWidth="0.5" opacity="0.5" />
      <rect x="64" y="1.5" width="6" height="6" transform="rotate(45 67 4.5)" fill={color} opacity="0.5" />
      <rect x="73" y="1.5" width="6" height="6" transform="rotate(45 76 4.5)" fill={color} opacity="0.25" />
      <line x1="85" y1="4.5" x2="140" y2="4.5" stroke={color} strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

// A single diamond + flanking hairlines — a tighter section divider.
export function OrnamentDiamond({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-3" aria-hidden="true">
      <span style={{ width: 44, height: 1, background: `linear-gradient(90deg, transparent, ${color})`, opacity: 0.6 }} />
      <span style={{ width: 5, height: 5, background: color, transform: 'rotate(45deg)' }} />
      <span style={{ width: 44, height: 1, background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.6 }} />
    </span>
  )
}
