'use client'
import { forwardRef } from 'react'
import clsx from 'clsx'

type Variant = 'gradient' | 'outline' | 'ghost' | 'danger' | 'white'
type Size    = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
  iconEnd?: React.ReactNode
  fullWidth?: boolean
  as?: 'button' | 'a'
  href?: string
}

const sizeMap: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-2xl gap-2',
  lg: 'px-6 py-3 text-base rounded-2xl gap-2',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-2.5',
}

const variantMap: Record<Variant, string> = {
  gradient: 'btn-gradient text-white font-bold',
  outline:  'btn-outline font-semibold',
  ghost:    'bg-transparent hover:bg-violet-50 text-brand-text hover:text-brand-purple font-semibold rounded-xl border-0 transition-colors duration-150',
  danger:   'bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-colors duration-200 shadow-md',
  white:    'bg-white text-brand-purple hover:bg-violet-50 font-bold rounded-2xl border border-brand-border transition-colors duration-200',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'gradient',
      size = 'md',
      loading = false,
      icon,
      iconEnd,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center select-none transition-all duration-200 cursor-pointer',
          sizeMap[size],
          variantMap[variant],
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-50 pointer-events-none',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {!loading && iconEnd && <span className="flex-shrink-0">{iconEnd}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
