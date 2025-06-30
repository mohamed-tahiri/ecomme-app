// src/pages/admin/AdminPage.tsx

import {
    FaUsers,
    FaBox,
    FaChartLine,
    FaCogs,
    FaPlus,
    FaDownload,
} from 'react-icons/fa';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const stats = [
    {
        icon: <FaUsers className="text-blue-500 text-3xl" />,
        label: 'Users',
        value: '1,254',
    },
    {
        icon: <FaBox className="text-green-500 text-3xl" />,
        label: 'Products',
        value: '342',
    },
    {
        icon: <FaChartLine className="text-purple-500 text-3xl" />,
        label: 'Visits',
        value: '24,903',
    },
    {
        icon: <FaCogs className="text-yellow-500 text-3xl" />,
        label: 'Settings',
        value: 'Up to date',
    },
];

const visitData = [
    { name: 'Mon', visits: 120 },
    { name: 'Tue', visits: 210 },
    { name: 'Wed', visits: 180 },
    { name: 'Thu', visits: 260 },
    { name: 'Fri', visits: 310 },
    { name: 'Sat', visits: 400 },
    { name: 'Sun', visits: 300 },
];

const recentOrders = [
    { id: '#001', user: 'Alice', total: '€49.99', status: 'Paid' },
    { id: '#002', user: 'Bob', total: '€89.00', status: 'Pending' },
    { id: '#003', user: 'Charlie', total: '€120.00', status: 'Cancelled' },
];

const AdminPage = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white shadow rounded-xl p-6 flex items-center space-x-4"
                    >
                        <div>{stat.icon}</div>
                        <div>
                            <div className="text-gray-600">{stat.label}</div>
                            <div className="text-xl font-semibold">
                                {stat.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Weekly Visits</h2>
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
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm flex items-center gap-2">
                        <FaDownload />
                        Export
                    </button>
                </div>
                <table className="w-full text-left border-t">
                    <thead>
                        <tr className="text-gray-600">
                            <th className="py-2">Order ID</th>
                            <th>User</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="py-2">{order.id}</td>
                                <td>{order.user}</td>
                                <td>{order.total}</td>
                                <td>
                                    <span
                                        className={`inline-block px-2 py-1 text-xs rounded ${
                                            order.status === 'Paid'
                                                ? 'bg-green-100 text-green-700'
                                                : order.status === 'Pending'
                                                  ? 'bg-yellow-100 text-yellow-700'
                                                  : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                        <FaPlus /> New Product
                    </button>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2">
                        <FaUsers /> Manage Users
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
