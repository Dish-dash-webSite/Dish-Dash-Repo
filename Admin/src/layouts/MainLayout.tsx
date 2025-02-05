import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const MainLayout: React.FC = () => {
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 ml-20">
                {/* Top navigation */}
                <div className="bg-white shadow-md p-4 flex justify-end">
                    <button
                        onClick={() => setShowDashboard(!showDashboard)}
                        className="bg-[#1E293B] text-white px-4 py-2 rounded-md hover:bg-[#334155]"
                    >
                        {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
                    </button>
                </div>
                
                {/* Main content */}
                <div className="p-6">
                    {showDashboard ? (
                        <Dashboard />
                    ) : (
                        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
                            <p className="text-xl text-gray-500">Click the dashboard button to view statistics</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainLayout; 