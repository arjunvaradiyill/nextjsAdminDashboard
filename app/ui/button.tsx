import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'medium',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={clsx(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
            'h-9 px-3 text-sm': size === 'small',
            'h-10 px-4': size === 'medium',
            'h-11 px-8': size === 'large',
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
