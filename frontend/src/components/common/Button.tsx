import React from 'react';

export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

export const Button = React.forwardRef<HTMLButtonElement, any>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                    variant === 'default' && 'bg-indigo-600 text-white hover:bg-indigo-700',
                    variant === 'outline' && 'border border-gray-300 bg-transparent hover:bg-gray-100',
                    variant === 'ghost' && 'hover:bg-gray-100 hover:text-gray-900',
                    size === 'default' && 'h-10 px-4 py-2',
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';
