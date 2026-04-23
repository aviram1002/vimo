import clsx from 'clsx'

type BadgeVariant = 'coming' | 'not' | 'maybe' | 'premium' | 'new' | 'default'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
  dot?: boolean
}

const variantMap: Record<BadgeVariant, string> = {
  coming:  'bg-green-100 text-green-700',
  not:     'bg-red-100 text-red-700',
  maybe:   'bg-amber-100 text-amber-700',
  premium: 'text-white',
  new:     'bg-violet-100 text-brand-purple',
  default: 'bg-gray-100 text-gray-600',
}

export function Badge({ children, variant = 'default', className, dot = false }: BadgeProps) {
  const isPremium = variant === 'premium'
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold',
        variantMap[variant],
        isPremium && 'bg-gradient-to-r from-amber-400 to-red-500',
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
      )}
      {children}
    </span>
  )
}
