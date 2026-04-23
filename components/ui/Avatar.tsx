import clsx from 'clsx'

interface AvatarProps {
  name?: string
  src?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  className?: string
}

const sizeMap = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-9 h-9 text-sm',
  md: 'w-11 h-11 text-base',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
}

const colors = [
  'bg-violet-100 text-violet-700',
  'bg-pink-100 text-pink-700',
  'bg-amber-100 text-amber-700',
  'bg-teal-100 text-teal-700',
  'bg-blue-100 text-blue-700',
]

function getColor(name?: string) {
  if (!name) return colors[0]
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export function Avatar({ name, src, size = 'md', color, className }: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
    : '?'

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-bold flex-shrink-0 overflow-hidden',
        sizeMap[size],
        !src && (color || getColor(name)),
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  )
}
