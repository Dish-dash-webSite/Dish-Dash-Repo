import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample dashboard cards */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Total Users</h2>
                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
                    <p className="text-3xl font-bold text-green-600">56</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
                    <p className="text-3xl font-bold text-purple-600">$12,345</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 