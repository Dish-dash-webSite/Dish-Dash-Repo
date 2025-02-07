import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers, updateUserRole, banUser } from '../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';

const Users: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, status, error } = useAppSelector((state) => state.users);
    const navigate = useNavigate();

    console.log('users',users)
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            await dispatch(updateUserRole({ userId, role: newRole })).unwrap();
        } catch (error) {
            console.error('Failed to update role:', error);
        }
    };

    const handleBanUser = async (userId: number, isBanned: boolean) => {
        try {
            await dispatch(banUser({ userId, isBanned: !isBanned })).unwrap();
        } catch (error) {
            console.error('Failed to ban/unban user:', error);
        }
    };

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
                <div className="w-8 h-8 border-4 border-[#FF8000] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-lg p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-[#1e293b]">Admin Panel</h1>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-[#FF8000] text-white px-4 py-2 rounded-lg hover:bg-[#FF8000]/90 transition-colors"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </nav>

            {/* Users Table */}
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-8 text-[#1e293b]">Users</h1>
                
                <div className="bg-white rounded-xl shadow-lg border border-[#e2e8f0]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-[#e2e8f0]">
                                    <th className="p-4 text-[#475569]">ID</th>
                                    <th className="p-4 text-[#475569]">Email</th>
                                    <th className="p-4 text-[#475569]">Role</th>
                                    <th className="p-4 text-[#475569]">Phone</th>
                                    <th className="p-4 text-[#475569]">Created At</th>
                                    <th className="p-4 text-[#475569]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr 
                                        key={user.id} 
                                        className="border-b border-[#e2e8f0] hover:bg-[#f1f5f9] transition-colors"
                                    >
                                        <td className="p-4 text-[#334155]">{user.id}</td>
                                        <td className="p-4 text-[#334155]">{user.email}</td>
                                        <td className="p-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className={`px-2 py-1 rounded transition-colors ${
                                                    user.role === 'admin' ? 'bg-[#FF8000]/10 text-[#FF8000] hover:bg-[#FF8000]/20' :
                                                    user.role === 'driver' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' :
                                                    user.role === 'restaurantowner' ? 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20' :
                                                    user.role === 'meta' ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' :
                                                    user.role === 'banned' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' :
                                                    'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
                                                }`}
                                            >
                                                <option value="customer">Customer</option>
                                                <option value="restaurantowner">Restaurant Owner</option>
                                                <option value="meta">Meta</option>
                                                <option value="driver">Driver</option>
                                                <option value="admin">Admin</option>
                                                <option value="banned">Banned</option>
                                            </select>
                                        </td>
                                        <td className="p-4 text-[#334155]">{user.phoneNumber || 'N/A'}</td>
                                        <td className="p-4 text-[#334155]">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleBanUser(user.id, user.role !== 'banned')}
                                                className={`px-2 py-1 rounded ${
                                                    user.role === 'banned' ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' :
                                                    'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                                                }`}
                                            >
                                                {user.role === 'banned' ? 'Unban' : 'Ban'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;