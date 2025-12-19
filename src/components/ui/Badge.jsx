import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-slate-100 text-slate-600',
        published: 'bg-emerald-50 text-emerald-700',
        draft: 'bg-orange-50 text-orange-700',
        archived: 'bg-slate-100 text-slate-500',
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
