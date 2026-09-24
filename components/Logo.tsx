'use client'

/**
 * Brand mark, drawn as SVG so it stays crisp, themeable and animatable.
 *
 * It follows the supplied logo: a heart formed from navy / teal / green
 * strokes, an open door inside it, a figure with raised arms stepping
 * through, and a path sweeping up to the doorway.
 *
 * If you later want the exact raster artwork instead, drop it at
 * /public/logo.png and swap <LogoMark> for an <Image>. Keeping it as SVG
 * is what makes the animated hero version possible.
 */

export function LogoMark({
  className = 'h-10 w-10',
  animated = false,
  onDark = false,
}: {
  className?: string
  animated?: boolean
  onDark?: boolean
}) {
  const navy = onDark ? '#ffffff' : '#162d63'
  const teal = onDark ? '#72d8e3' : '#17a0b0'
  const green = onDark ? '#a0e07d' : '#5abb33'

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="My Health Enrollment"
      fill="none"
    >
      {/* outer heart — navy left lobe, teal right lobe */}
      <path
        d="M50 87C50 87 11 61.5 11 35.5 11 20.5 22.5 11 34 11c8 0 13.5 5 16 8.5"
        stroke={navy}
        strokeWidth="8"
        strokeLinecap="round"
        className={animated ? 'logo-draw logo-draw-1' : undefined}
      />
      <path
        d="M50 19.5C52.5 16 58 11 66 11c11.5 0 23 9.5 23 24.5C89 61.5 50 87 50 87"
        stroke={teal}
        strokeWidth="8"
        strokeLinecap="round"
        className={animated ? 'logo-draw logo-draw-2' : undefined}
      />

      {/* green sweep along the right of the heart */}
      <path
        d="M86 28c4.5 9 3 20-4.5 30"
        stroke={green}
        strokeWidth="6.5"
        strokeLinecap="round"
        className={animated ? 'logo-draw logo-draw-3' : undefined}
      />

      {/* open door */}
      <path
        d="M41 32h21v34H41z"
        fill={onDark ? 'rgba(255,255,255,.12)' : '#ffffff'}
        stroke={navy}
        strokeWidth="5"
        strokeLinejoin="round"
        className={animated ? 'logo-pop logo-pop-1' : undefined}
      />
      <path
        d="M41 32 30 27v44l11-5z"
        fill={navy}
        className={animated ? 'logo-pop logo-pop-1' : undefined}
      />

      {/* figure, arms raised */}
      <g className={animated ? 'logo-pop logo-pop-2' : undefined}>
        <circle cx="51.5" cy="42" r="4.6" fill={teal} />
        <path
          d="M51.5 49v11M51.5 51l-7-6M51.5 51l7-6M51.5 60l-5 7M51.5 60l5 7"
          stroke={teal}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* path leading to the door */}
      <path
        d="M30 90c6-7 3-13 10-16.5"
        stroke={teal}
        strokeWidth="7"
        strokeLinecap="round"
        className={animated ? 'logo-draw logo-draw-4' : undefined}
      />
      <path
        d="M70 90c-6-7-3-13-10-16.5"
        stroke={green}
        strokeWidth="7"
        strokeLinecap="round"
        className={animated ? 'logo-draw logo-draw-5' : undefined}
      />

      {animated && (
        <style>{`
          .logo-draw{stroke-dasharray:180;stroke-dashoffset:180;animation:logoDraw 1.15s cubic-bezier(.22,1,.36,1) forwards}
          .logo-draw-1{animation-delay:.05s}
          .logo-draw-2{animation-delay:.2s}
          .logo-draw-3{animation-delay:.5s}
          .logo-draw-4{animation-delay:.62s}
          .logo-draw-5{animation-delay:.72s}
          .logo-pop{opacity:0;transform-origin:50px 50px;animation:logoPop .55s cubic-bezier(.22,1,.36,1) forwards}
          .logo-pop-1{animation-delay:.85s}
          .logo-pop-2{animation-delay:1s}
          @keyframes logoDraw{to{stroke-dashoffset:0}}
          @keyframes logoPop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}
          @media (prefers-reduced-motion: reduce){
            .logo-draw{stroke-dashoffset:0;animation:none}
            .logo-pop{opacity:1;animation:none}
          }
        `}</style>
      )}
    </svg>
  )
}

export function LogoWordmark({
  onDark = false,
  className = '',
}: {
  onDark?: boolean
  className?: string
}) {
  return (
    <span className={`whitespace-nowrap leading-[1.05] ${className}`}>
      <span
        className={`block text-[15px] font-extrabold tracking-tight ${
          onDark ? 'text-white' : 'text-navy-800'
        }`}
      >
        My Health
      </span>
      <span
        className={`block text-[13px] font-bold tracking-[0.08em] ${
          onDark ? 'text-teal-300' : 'text-teal-600'
        }`}
      >
        ENROLLMENT
      </span>
    </span>
  )
}

export default function Logo({
  onDark = false,
  animated = false,
  markClass = 'h-11 w-11',
}: {
  onDark?: boolean
  animated?: boolean
  markClass?: string
}) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={markClass} onDark={onDark} animated={animated} />
      <LogoWordmark onDark={onDark} />
    </span>
  )
}
