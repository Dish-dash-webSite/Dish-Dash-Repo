import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/users/usersSlice';

const Users: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, status, error } = useAppSelector((state) => state.users);
    console.log('users',users)
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#000033]">
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
        <div className="p-8 bg-[#000033] min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-white">Users</h1>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-white/20">
                                <th className="p-4 text-white">ID</th>
                                <th className="p-4 text-white">Email</th>
                                <th className="p-4 text-white">Role</th>
                                <th className="p-4 text-white">Phone</th>
                                <th className="p-4 text-white">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr 
                                    key={user.id} 
                                    className="border-b border-white/10 hover:bg-white/5"
                                >
                                    <td className="p-4 text-gray-300">{user.id}</td>
                                    <td className="p-4 text-gray-300">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            user.role === 'admin' ? 'bg-[#FF8000]/20 text-[#FF8000]' :
                                            user.role === 'driver' ? 'bg-green-500/20 text-green-500' :
                                            user.role === 'restaurant' ? 'bg-purple-500/20 text-purple-500' :
                                            'bg-blue-500/20 text-blue-500'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-300">{user.phoneNumber || 'N/A'}</td>
                                    <td className="p-4 text-gray-300">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users; 