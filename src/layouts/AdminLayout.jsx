import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/shared/Sidebar';
import { Navbar } from '../components/shared/Navbar';

export const AdminLayout = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar onSearch={setSearchTerm} searchTerm={searchTerm} />

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet context={{ searchTerm }} />
                </main>
            </div>
        </div>
    );
};
