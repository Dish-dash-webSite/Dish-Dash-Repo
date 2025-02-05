import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-8 bg-[#000033] min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-white/20">
                    <h2 className="text-gray-300 text-lg font-medium">Total Users</h2>
                    <p className="text-3xl font-bold text-[#FF8000] mt-2">1,234</p>
                    <p className="text-sm text-gray-400 mt-1">+12% from last month</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-white/20">
                    <h2 className="text-gray-300 text-lg font-medium">Active Orders</h2>
                    <p className="text-3xl font-bold text-[#FF8000] mt-2">56</p>
                    <p className="text-sm text-gray-400 mt-1">+8% from last week</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-white/20">
                    <h2 className="text-gray-300 text-lg font-medium">Total Revenue</h2>
                    <p className="text-3xl font-bold text-[#FF8000] mt-2">$12,345</p>
                    <p className="text-sm text-gray-400 mt-1">+15% from last month</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-white/20">
                    <h2 className="text-gray-300 text-lg font-medium">Conversion Rate</h2>
                    <p className="text-3xl font-bold text-[#FF8000] mt-2">8.2%</p>
                    <p className="text-sm text-gray-400 mt-1">+2.1% from last month</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
                    <h2 className="text-xl font-semibold mb-4 text-white">Sales Overview</h2>
                    <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                        <span className="text-gray-400">Chart Placeholder</span>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
                    <h2 className="text-xl font-semibold mb-4 text-white">User Activity</h2>
                    <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                        <span className="text-gray-400">Chart Placeholder</span>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-4 text-white">Recent Activities</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-[#FF8000]/20 rounded-full flex items-center justify-center">
                                <span className="text-[#FF8000]">U</span>
                            </div>
                            <div>
                                <p className="font-medium text-white">New user registered</p>
                                <p className="text-sm text-gray-400">2 minutes ago</p>
                            </div>
                        </div>
                        <span className="text-sm text-[#FF8000] hover:text-[#FF8000]/80 cursor-pointer">View</span>
                    </div>
                    {/* Add more activity items here */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
