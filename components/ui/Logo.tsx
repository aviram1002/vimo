import clsx from 'clsx'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showHeart?: boolean
  className?: string
}

const sizeMap = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
}

export function Logo({ size = 'md', showHeart = true, className }: LogoProps) {
  return (
    <span className={clsx('font-black tracking-tight', sizeMap[size], className)}>
      <span className="text-gradient">Vimo</span>
      {showHeart && (
        <span className="text-brand-pink ml-0.5">♥</span>
      )}
    </span>
  )
}
