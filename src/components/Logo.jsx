// Develop EC monogram — monochrome rendering of the brand mark
export default function Logo({ size = 40, mono = true }) {
  const dark = mono ? "#ffffff" : "#003E4D"
  const mid = mono ? "#e0e0e0" : "#2D2D2D"
  const light = mono ? "#999999" : "#9A9B97"
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 420 420"
      role="img"
      aria-label="Develop EC"
    >
      <g transform="translate(20,14)">
        <path
          d="M0 88 L150 0 L150 300 L0 392 Z M26 103 L124 46 L124 284 L26 345 Z"
          fill={dark}
          fillRule="evenodd"
        />
        <path d="M170 0 L194 15 L194 300 L286 356 L286 384 L170 314 Z" fill={mid} />
        <path d="M194 62 L292 122 L292 154 L194 94 Z" fill={mid} />
        <path d="M194 153 L292 213 L292 245 L194 185 Z" fill={mid} />
        <path
          d="M304 241 L381 195 L381 226 L330 256 L330 326 L381 296 L381 327 L304 373 Z"
          fill={light}
        />
      </g>
    </svg>
  )
}
