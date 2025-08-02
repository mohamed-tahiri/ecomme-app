import React, { useState, useEffect } from 'react';
import { MdOutlineDelete, MdVisibility, MdEdit } from 'react-icons/md';
import { FaSearch, FaDownload } from 'react-icons/fa';
import ConfirmModal from '../../components/modals/ConfirmModal';
import Pagination from '../../components/pagination/Pagination';
import { getAllOrders, PaginatedOrders } from '../../services/orderService';
import { Order } from '../../types/order';
import { useAppearance } from '../../context/AppearanceContext';

const AdminOrdersPage: React.FC = () => {
    const { settings } = useAppearance();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');

    const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const response: PaginatedOrders = await getAllOrders(page, limit);
            setOrders(response.data);
            setTotalPages(response.pagination.totalPages);
            setTotalCount(response.pagination.totalCount);
        } catch (err) {
            console.error(err);
            setError('Error loading orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page]);

    const handleAskDelete = (order: Order) => {
        setOrderToDelete(order);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!orderToDelete) return;

        try {
            // TODO: Implement delete order API call
            console.log('Deleting order:', orderToDelete.id);
            fetchOrders();
        } catch (err: any) {
            console.log('Error deleting order.');
        } finally {
            setShowDeleteModal(false);
            setOrderToDelete(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'shipped':
                return 'bg-blue-100 text-blue-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'canceled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'failed':
                return 'bg-red-100 text-red-700';
            case 'refunded':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredOrders = orders.filter(
        (order) =>
            order.reference?.toLowerCase().includes(search.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Orders Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage and track all orders
                    </p>
                </div>
                <button
                    className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
                    style={{ backgroundColor: settings.primaryColor }}
                >
                    <FaDownload />
                    <span>Export Orders</span>
                </button>
            </div>

            {/* Search Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders by reference or customer name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        {filteredOrders.length} orders found
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-4 text-center"
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                            <span className="ml-2 text-gray-600">
                                                Loading orders...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-4 text-center text-red-500"
                                    >
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center"
                                    >
                                        <div className="text-gray-500">
                                            {search
                                                ? 'No orders found matching your search.'
                                                : 'No orders found.'}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div
                                                        className="h-10 w-10 rounded-lg flex items-center justify-center text-white"
                                                        style={{
                                                            backgroundColor:
                                                                settings.primaryColor,
                                                        }}
                                                    >
                                                        <span className="text-sm font-medium">
                                                            {order.reference
                                                                ?.charAt(0)
                                                                .toUpperCase() ||
                                                                'O'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.reference}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {order.user?.name || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {order.user?.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">
                                                $
                                                {order.total?.toFixed(2) ||
                                                    '0.00'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                    order.status || 'pending'
                                                )}`}
                                            >
                                                {order.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(
                                                    order.paymentStatus ||
                                                        'pending'
                                                )}`}
                                            >
                                                {order.paymentStatus ||
                                                    'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                                    title="View Order"
                                                >
                                                    <MdVisibility className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="text-green-600 hover:text-green-900 transition-colors"
                                                    title="Edit Order"
                                                >
                                                    <MdEdit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleAskDelete(order)
                                                    }
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                    title="Delete Order"
                                                >
                                                    <MdOutlineDelete className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-end mt-4">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Delete Order"
                message={`Are you sure you want to delete order "${orderToDelete?.reference}"?`}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setOrderToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default AdminOrdersPage;
