import React from 'react';

export const Select = ({
    label,
    options = [],
    error,
    className = '',
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
            <select
                className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all appearance-none cursor-pointer ${error ? 'border-red-500' : 'border-slate-200'
                    } ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1.5 ml-1 text-[10px] font-bold uppercase text-red-500">{error}</p>}
        </div>
    );
};
