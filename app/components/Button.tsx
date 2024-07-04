// components/Button.tsx
import React, { forwardRef } from 'react'

import { cn } from '@/utils/cn'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { type = 'button', className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn('py-2 px-4 bg-stone-700 text-white rounded hover:bg-neutral-500', className)}
      {...props}
    >
      {children}
    </button>
  )
})
