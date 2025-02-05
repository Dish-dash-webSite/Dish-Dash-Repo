import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h2 className="text-gray-500 text-lg font-medium">Total Users</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
                    <p className="text-sm text-gray-400 mt-1">+12% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h2 className="text-gray-500 text-lg font-medium">Active Orders</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">56</p>
                    <p className="text-sm text-gray-400 mt-1">+8% from last week</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h2 className="text-gray-500 text-lg font-medium">Total Revenue</h2>
                    <p className="text-3xl font-bold text-purple-600 mt-2">$12,345</p>
                    <p className="text-sm text-gray-400 mt-1">+15% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h2 className="text-gray-500 text-lg font-medium">Conversion Rate</h2>
                    <p className="text-3xl font-bold text-orange-600 mt-2">8.2%</p>
                    <p className="text-sm text-gray-400 mt-1">+2.1% from last month</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Chart Placeholder</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">User Activity</h2>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Chart Placeholder</span>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600">U</span>
                            </div>
                            <div>
                                <p className="font-medium">New user registered</p>
                                <p className="text-sm text-gray-500">2 minutes ago</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">View</span>
                    </div>
                    {/* Add more activity items here */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
