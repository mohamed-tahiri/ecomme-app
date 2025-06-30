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
import OrderListPage from '../pages/OrderListPage';
import AnnouncementPage from '../pages/AnnouncementPage';
import LayoutAdmin from '../components/admin/layout/LayoutAdmin';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import OrderPage from '../pages/OrderPage';
import CreateAnnouncementPage from '../pages/CreateAnnouncementPage';
import ProductsPage from '../pages/ProductsPage';
import AdminProductsPage from '../pages/admin/ProductsPage';
import MesStoresPage from '../pages/MesStoresPage';
import CreateStorePage from '../pages/CreateStorePage';
import BoutiquePage from '../pages/BoutiquePage';
import ConfigurateurPCWithoutLayout from '../pages/ConfigurateurPCWithoutLayout';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import SettingPage from '../pages/admin/SettingPage';
import MaintenanceRoute from '../utils/MaintenanceRoute';
import UsersPage from '../pages/admin/UsersPage';
import CategoriesPage from '../pages/admin/CategoriesPage';

const router = createBrowserRouter([
    {
        element: <MaintenanceRoute />,
        children: [
            // Route SANS le Layout
            {
                path: '/collections/configurateur-pc',
                element: <ConfigurateurPCWithoutLayout />, // Rendu sans le Layout
            },
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
                        path: 'collections',
                        element: <ProductsPage />,
                    },
                    {
                        path: 'boutique/:slug',
                        element: <BoutiquePage />,
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
                        path: 'order',
                        element: (
                            <PrivateRoute allowedRoles={['ROLE_CUSTOMER']} />
                        ),
                        children: [
                            {
                                path: '',
                                element: <OrderPage />,
                            },
                        ],
                    },
                    // Route pour la page de confirmation de commande
                    {
                        path: 'order-confirmation/:orderNumber',
                        element: (
                            <PrivateRoute allowedRoles={['ROLE_CUSTOMER']} />
                        ),
                        children: [
                            {
                                path: '',
                                element: <OrderConfirmationPage />,
                            },
                        ],
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
                                        element: <OrderListPage />,
                                    },
                                    {
                                        path: 'annonces',
                                        children: [
                                            {
                                                path: '',
                                                element: <AnnouncementPage />,
                                            },
                                            {
                                                path: 'new',
                                                element: (
                                                    <CreateAnnouncementPage />
                                                ),
                                            },
                                        ],
                                    },
                                    {
                                        path: 'stores',
                                        children: [
                                            {
                                                path: '',
                                                element: <MesStoresPage />,
                                            },
                                            {
                                                path: 'new',
                                                element: <CreateStorePage />,
                                            },
                                        ],
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
                                element: <UsersPage />,
                            },
                            {
                                path: 'products',
                                element: <AdminProductsPage />,
                            },
                            {
                                path: 'categories',
                                element: <CategoriesPage />,
                            },
                            {
                                path: 'settings',
                                element: <SettingPage />,
                            },
                        ],
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
