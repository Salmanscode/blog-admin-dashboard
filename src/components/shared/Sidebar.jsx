import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Plus, Menu, X } from 'lucide-react';

export const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/create', icon: Plus, label: 'Create Post' },
    ];

    const isActive = (path) => location.pathname === path;

    const NavContent = () => (
        <div className="flex flex-col h-full bg-white">
            <div className="p-8 pb-4">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                        <FileText className="text-white" size={18} />
                    </div>
                    <h1 className="text-lg font-bold text-slate-900">Blog Panel</h1>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${active
                                    ? 'bg-slate-100 text-slate-900'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-8 border-t border-slate-100">
                <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-slate-900 mb-1">Advanced Mode</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Manage your blog with premium tools and insights.</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Menu Button - Floating minimalist */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl transition-transform active:scale-95"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`lg:hidden fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={`lg:hidden fixed top-0 left-0 z-40 w-72 h-full shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <NavContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 bg-white border-r border-slate-100 h-screen sticky top-0">
                <NavContent />
            </aside>
        </>
    );
};
