// src/pages/admin/UsersPage.tsx
import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const CategoriesPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const mockData = Array.from({ length: 42 }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
            email: `user${i + 1}@mail.com`,
            role: i % 2 === 0 ? 'Admin' : 'Customer',
        }));
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        setUsers(mockData.slice(offset, offset + pageSize));
        setTotalPages(Math.ceil(mockData.length / pageSize));
    }, [page]);

    const handleEdit = (userId: number) => {
        alert(`Edit user ${userId}`);
    };

    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter((u) => u.id !== userId));
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Users</h1>
            <div className="bg-white shadow rounded-xl overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="px-4 py-2">{user.id}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(user.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center space-x-2">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span className="text-sm">
                    Page {page} / {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CategoriesPage;

// Identical structure can be copied to ProductsPage.tsx and CategoriesPage.tsx with adjusted interfaces and mock data fields
// Also support Create button and modal/dialogs can be added if needed
