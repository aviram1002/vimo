import clsx from 'clsx'

interface ProgressBarProps {
  value: number // 0–100
  label?: string
  showPercent?: boolean
  color?: 'brand' | 'green' | 'red' | 'amber'
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

const colorMap = {
  brand: 'from-brand-purple to-brand-teal',
  green: 'from-green-400 to-green-500',
  red:   'from-red-400 to-red-500',
  amber: 'from-amber-400 to-amber-500',
}

const sizeMap = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
}

export function ProgressBar({
  value,
  label,
  showPercent = false,
  color = 'brand',
  size = 'sm',
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={clsx('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-brand-muted">{label}</span>}
          {showPercent && <span className="text-xs font-bold text-brand-purple">{pct}%</span>}
        </div>
      )}
      <div className={clsx('progress-track', sizeMap[size])}>
        <div
          className={clsx('progress-fill bg-gradient-to-l', colorMap[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
