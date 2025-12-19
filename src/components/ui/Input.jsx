import React from 'react';

export const Input = ({
    label,
    error,
    className = '',
    type = 'text',
    required = false,
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-400 ${error ? 'border-red-500' : 'border-slate-200'
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 ml-1 text-[10px] font-bold uppercase text-red-500">{error}</p>}
        </div>
    );
};

export const Textarea = ({
    label,
    error,
    className = '',
    rows = 4,
    required = false,
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                rows={rows}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all resize-none placeholder:text-slate-400 ${error ? 'border-red-500' : 'border-slate-200'
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 ml-1 text-[10px] font-bold uppercase text-red-500">{error}</p>}
        </div>
    );
};
