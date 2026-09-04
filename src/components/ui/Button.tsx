import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-primary hover:bg-emerald-900 text-on-primary shadow-md hover:shadow-lg',
    secondary: 'bg-secondary hover:bg-teal-800 text-on-secondary shadow-sm',
    outline: 'border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low',
    ghost: 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low',
    danger: 'bg-error-container text-on-error-container hover:bg-red-700 hover:text-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
