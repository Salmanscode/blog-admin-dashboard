import React from 'react';

export const Card = ({ children, className = '', hover = true }) => {
    return (
        <div
            className={`${hover ? 'premium-card' : 'bg-white rounded-xl border border-slate-200 shadow-sm'} ${className}`}
        >
            {children}
        </div>
    );
};
