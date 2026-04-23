import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: React.ElementType
  onClick?: () => void
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  as: Tag = 'div',
  onClick,
}: CardProps) {
  return (
    <Tag
      className={clsx(
        'card',
        paddingMap[padding],
        hover && 'card-lift cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Tag>
  )
}

export function StatCard({
  label,
  value,
  icon,
  change,
  changeType = 'up',
  color = 'purple',
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  color?: 'purple' | 'pink' | 'teal' | 'amber'
}) {
  const iconBg = {
    purple: 'bg-violet-100',
    pink:   'bg-pink-100',
    teal:   'bg-teal-100',
    amber:  'bg-amber-100',
  }[color]

  const changeColor = {
    up:      'text-green-600',
    down:    'text-red-500',
    neutral: 'text-brand-muted',
  }[changeType]

  return (
    <Card hover className="flex flex-col gap-1">
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3', iconBg)}>
        {icon}
      </div>
      <div className="text-3xl font-black text-brand-text tracking-tight">{value}</div>
      <div className="text-sm text-brand-muted">{label}</div>
      {change && (
        <div className={clsx('text-xs font-semibold mt-1', changeColor)}>{change}</div>
      )}
    </Card>
  )
}
