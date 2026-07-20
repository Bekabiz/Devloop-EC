/** Small inline flag icons for the language switcher. */
export function FlagUK({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 3) / 5} viewBox="0 0 60 36" aria-hidden="true">
      <clipPath id="uk-clip">
        <rect width="60" height="36" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="36" fill="#012169" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="7" />
        <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="3" />
        <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="12" />
        <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </svg>
  )
}

export function FlagGR({ size = 18 }: { size?: number }) {
  const s = 36 / 9
  return (
    <svg width={size} height={(size * 3) / 5} viewBox="0 0 60 36" aria-hidden="true">
      <rect width="60" height="36" fill="#0D5EAF" />
      {[1, 3, 5, 7].map((i) => (
        <rect key={i} y={i * s} width="60" height={s} fill="#fff" />
      ))}
      <rect width={s * 5} height={s * 5} fill="#0D5EAF" />
      <rect x={s * 2} width={s} height={s * 5} fill="#fff" />
      <rect y={s * 2} width={s * 5} height={s} fill="#fff" />
    </svg>
  )
}
