'use client'
import { forwardRef } from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  iconEnd?: React.ReactNode
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconEnd, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold text-brand-muted">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={clsx(
              'input-base',
              icon && 'pr-10',
              iconEnd && 'pl-10',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
              className
            )}
            {...props}
          />
          {iconEnd && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted">
              {iconEnd}
            </span>
          )}
        </div>
        {hint && !error && <p className="text-xs text-brand-muted">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-semibold text-brand-muted">{label}</label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'input-base resize-none',
            error && 'border-red-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
