import React from 'react';
import { Search } from 'lucide-react';

export const Navbar = ({ onSearch, searchTerm }) => {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-3 sticky top-0 z-30">
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1 max-w-md relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/5 transition-all outline-none placeholder:text-slate-400"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-semibold text-slate-900">Admin</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Premium</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 text-xs font-bold ring-2 ring-white">
                        AU
                    </div>
                </div>
            </div>
        </nav>
    );
};
