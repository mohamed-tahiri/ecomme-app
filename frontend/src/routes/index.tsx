// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/admin/AdminPage';
import PrivateRoute from '../utils/PrivateRoute';
import ProductDetailPage from '../pages/ProductDetailPage'; // Ensure this page is imported
import CategoryProductsPage from '../pages/CategoryProductsPage'; // Ensure this page is imported
import SearchPage from '../pages/SearchPage'; // Ensure this page is imported
import CartPage from '../pages/CartPage'; // Ensure this page is imported
import ContactPage from '../pages/ContactPage'; // Ensure this page is imported
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../components/layout/Layout';
import ProfileLayout from '../components/profile/ProfileLayout';
import OrderPage from '../pages/OrderPage';
import AnnouncementPage from '../pages/AnnouncementPage';
import LayoutAdmin from '../components/admin/layout/LayoutAdmin';
import UnauthorizedPage from '../pages/UnauthorizedPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: 'products/:slug',
                element: <ProductDetailPage />,
            },
            {
                path: 'collections/:slug',
                element: <CategoryProductsPage />,
            },
            {
                path: 'search',
                element: <SearchPage />,
            },
            {
                path: 'cart',
                element: <CartPage />,
            },
            {
                path: 'contact',
                element: <ContactPage />,
            },
            {
                path: 'account',
                element: (
                    <PrivateRoute
                        allowedRoles={['ROLE_CUSTOMER', 'ROLE_VENDOR']}
                    />
                ),
                children: [
                    {
                        path: '',
                        element: <ProfileLayout />,
                        children: [
                            {
                                path: 'commandes',
                                element: <OrderPage />,
                            },
                            {
                                path: 'annonces',
                                element: <AnnouncementPage />,
                            },
                        ],
                    },
                ],
            },
            {
                path: 'unauthorized',
                element: <UnauthorizedPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
    {
        path: '/admin-xy3a9t98f9m3oi9j',
        element: <PrivateRoute allowedRoles={['ROLE_ADMIN']} />,
        children: [
            {
                path: '',
                element: <LayoutAdmin />,
                children: [
                    {
                        path: 'dashboard',
                        element: <AdminPage />,
                    },
                    {
                        path: 'users',
                    },
                    {
                        path: 'products',
                    },
                    {
                        path: 'categories',
                    },
                    {
                        path: 'settings',
                    },
                ],
            },
        ],
    },
]);

const Routes: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default Routes;
