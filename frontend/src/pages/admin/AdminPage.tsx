// src/pages/admin/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import {
    FaUsers,
    FaBox,
    FaChartLine,
    FaCogs,
    FaPlus,
    FaDownload,
    FaShoppingCart,
    FaMoneyBillWave,
} from 'react-icons/fa';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
import { getUsers } from '../../services/userService';
import { getCategories } from '../../services/categoryService';
import { getOrders } from '../../services/orderService';
import { Order } from '../../types/order';

const AdminPage = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [users, categories, orders] = await Promise.all([
                    getUsers(1, 1), // Just get count
                    getCategories(),
                    getOrders(),
                ]);

                const totalRevenue = orders.reduce(
                    (sum: number, order: Order) => sum + order.total,
                    0
                );

                setStats({
                    users: users.pagination.totalCount,
                    products: 0, // TODO: Add product count API
                    orders: orders.length,
                    revenue: totalRevenue,
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statsCards = [
        {
            icon: <FaUsers className="text-blue-500 text-3xl" />,
            label: 'Total Users',
            value: loading ? '...' : stats.users.toLocaleString(),
            change: '+12%',
            changeType: 'positive',
        },
        {
            icon: <FaBox className="text-green-500 text-3xl" />,
            label: 'Total Products',
            value: loading ? '...' : stats.products.toLocaleString(),
            change: '+8%',
            changeType: 'positive',
        },
        {
            icon: <FaShoppingCart className="text-purple-500 text-3xl" />,
            label: 'Total Orders',
            value: loading ? '...' : stats.orders.toLocaleString(),
            change: '+15%',
            changeType: 'positive',
        },
        {
            icon: <FaMoneyBillWave className="text-yellow-500 text-3xl" />,
            label: 'Total Revenue',
            value: loading ? '...' : `$${stats.revenue.toLocaleString()}`,
            change: '+23%',
            changeType: 'positive',
        },
    ];

    const visitData = [
        { name: 'Mon', visits: 120, orders: 15 },
        { name: 'Tue', visits: 210, orders: 25 },
        { name: 'Wed', visits: 180, orders: 20 },
        { name: 'Thu', visits: 260, orders: 30 },
        { name: 'Fri', visits: 310, orders: 35 },
        { name: 'Sat', visits: 400, orders: 45 },
        { name: 'Sun', visits: 300, orders: 40 },
    ];

    const recentOrders = [
        {
            id: '#001',
            user: 'Alice Johnson',
            total: '$49.99',
            status: 'Paid',
            date: '2024-01-15',
        },
        {
            id: '#002',
            user: 'Bob Smith',
            total: '$89.00',
            status: 'Pending',
            date: '2024-01-14',
        },
        {
            id: '#003',
            user: 'Charlie Brown',
            total: '$120.00',
            status: 'Delivered',
            date: '2024-01-13',
        },
        {
            id: '#004',
            user: 'Diana Prince',
            total: '$75.50',
            status: 'Shipped',
            date: '2024-01-12',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'shipped':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Welcome back! Here's what's happening with your store.
                    </p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <FaDownload />
                    Export Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-sm rounded-xl p-6 border hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div>{stat.icon}</div>
                                <div>
                                    <div className="text-gray-600 text-sm font-medium">
                                        {stat.label}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`text-sm font-medium ${
                                    stat.changeType === 'positive'
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                                {stat.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visits Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">
                        Weekly Activity
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={visitData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="visits"
                                stroke="#6366f1"
                                strokeWidth={3}
                                name="Visits"
                            />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#10b981"
                                strokeWidth={3}
                                name="Orders"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">
                        Revenue Overview
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={visitData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View All Orders →
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-200">
                                <th className="pb-3 text-sm font-medium text-gray-600">
                                    Order ID
                                </th>
                                <th className="pb-3 text-sm font-medium text-gray-600">
                                    Customer
                                </th>
                                <th className="pb-3 text-sm font-medium text-gray-600">
                                    Total
                                </th>
                                <th className="pb-3 text-sm font-medium text-gray-600">
                                    Status
                                </th>
                                <th className="pb-3 text-sm font-medium text-gray-600">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="py-3 text-sm text-gray-600">
                                        {order.user}
                                    </td>
                                    <td className="py-3 text-sm font-medium text-gray-900">
                                        {order.total}
                                    </td>
                                    <td className="py-3">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-sm text-gray-500">
                                        {order.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                        <FaPlus />
                        <span>Add Product</span>
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <FaUsers />
                        <span>Manage Users</span>
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <FaShoppingCart />
                        <span>View Orders</span>
                    </button>
                    <button className="bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2">
                        <FaCogs />
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
