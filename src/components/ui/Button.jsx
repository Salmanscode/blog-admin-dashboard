import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap';

    const variants = {
        primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm disabled:bg-slate-300',
        secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm disabled:bg-slate-50',
        danger: 'bg-red-50 text-red-600 hover:bg-red-100 disabled:bg-red-100',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'cursor-not-allowed' : ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
