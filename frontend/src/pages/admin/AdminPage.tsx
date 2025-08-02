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
import { useAppearance } from '../../context/AppearanceContext';

const AdminPage = () => {
    const { settings } = useAppearance();
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
            icon: (
                <FaUsers
                    className="text-3xl"
                    style={{ color: settings.primaryColor }}
                />
            ),
            label: 'Total Users',
            value: loading ? '...' : stats.users.toLocaleString(),
            change: '+12%',
            changeType: 'positive',
        },
        {
            icon: (
                <FaBox
                    className="text-3xl"
                    style={{ color: settings.primaryColor }}
                />
            ),
            label: 'Total Products',
            value: loading ? '...' : stats.products.toLocaleString(),
            change: '+8%',
            changeType: 'positive',
        },
        {
            icon: (
                <FaShoppingCart
                    className="text-3xl"
                    style={{ color: settings.primaryColor }}
                />
            ),
            label: 'Total Orders',
            value: loading ? '...' : stats.orders.toLocaleString(),
            change: '+15%',
            changeType: 'positive',
        },
        {
            icon: (
                <FaMoneyBillWave
                    className="text-3xl"
                    style={{ color: settings.primaryColor }}
                />
            ),
            label: 'Total Revenue',
            value: loading ? '...' : `$${stats.revenue.toLocaleString()}`,
            change: '+23%',
            changeType: 'positive',
        },
    ];

    const visitData = [
        { name: 'Mon', visits: 120, orders: 15 },
        { name: 'Tue', visits: 150, orders: 22 },
        { name: 'Wed', visits: 180, orders: 28 },
        { name: 'Thu', visits: 220, orders: 35 },
        { name: 'Fri', visits: 280, orders: 42 },
        { name: 'Sat', visits: 320, orders: 48 },
        { name: 'Sun', visits: 290, orders: 38 },
    ];

    const recentOrders = [
        {
            id: '1',
            customer: 'John Doe',
            product: 'iPhone 13 Pro',
            amount: 999.99,
            status: 'delivered',
        },
        {
            id: '2',
            customer: 'Jane Smith',
            product: 'MacBook Air',
            amount: 1299.99,
            status: 'shipped',
        },
        {
            id: '3',
            customer: 'Bob Johnson',
            product: 'AirPods Pro',
            amount: 249.99,
            status: 'pending',
        },
        {
            id: '4',
            customer: 'Alice Brown',
            product: 'iPad Air',
            amount: 599.99,
            status: 'delivered',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'shipped':
                return 'bg-blue-100 text-blue-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Welcome back! Here's what's happening with your store.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button
                        className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
                        style={{ backgroundColor: settings.primaryColor }}
                    >
                        <FaDownload />
                        <span>Export Report</span>
                    </button>
                    <button
                        className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
                        style={{ backgroundColor: settings.primaryColor }}
                    >
                        <FaPlus />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    {card.label}
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {card.value}
                                </p>
                            </div>
                            <div className="text-right">
                                {card.icon}
                                <p
                                    className={`text-xs mt-1 ${
                                        card.changeType === 'positive'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {card.change}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visits Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Weekly Visits
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={visitData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="visits"
                                stroke={settings.primaryColor}
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Weekly Orders
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={visitData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="orders"
                                fill={settings.primaryColor}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Recent Orders
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.product}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${order.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
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

export default AdminPage;
