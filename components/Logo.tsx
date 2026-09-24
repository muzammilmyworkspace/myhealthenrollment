import Image from 'next/image'

/**
 * The real brand artwork.
 *
 * public/logo-mark.png   heart only, white knocked out to transparency so it
 *                        sits on dark surfaces without a white block
 * public/logo-full.png   full lockup (mark + wordmark), also transparent
 *
 * Both are generated from the supplied logo. The wordmark beside the mark in
 * the header is live text rather than part of the image, so it stays crisp
 * and recolours for dark backgrounds.
 */

export function LogoMark({
  className = 'h-11 w-11',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <span className={`relative inline-block flex-shrink-0 ${className}`}>
      <Image
        src="/logo-mark.png"
        alt=""
        fill
        sizes="64px"
        priority={priority}
        className="object-contain"
      />
    </span>
  )
}

export function LogoFull({
  className = 'h-28 w-auto',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/logo-full.png"
      alt="My Health Enrollment"
      width={900}
      height={880}
      priority={priority}
      sizes="(max-width: 640px) 260px, 420px"
      className={className}
    />
  )
}

export function LogoWordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex flex-shrink-0 flex-col whitespace-nowrap leading-[1.04]">
      <span
        className={`block text-[16px] font-extrabold tracking-tight ${
          onDark ? 'text-white' : 'text-navy-800'
        }`}
      >
        My Health
      </span>
      <span
        className={`block text-[12.5px] font-bold tracking-[0.1em] ${
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
  markClass = 'h-11 w-11',
  priority = false,
}: {
  onDark?: boolean
  markClass?: string
  priority?: boolean
}) {
  return (
    <span className="flex flex-shrink-0 items-center gap-2.5">
      <LogoMark className={markClass} priority={priority} />
      <LogoWordmark onDark={onDark} />
    </span>
  )
}
