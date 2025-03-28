import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import { CartProvider } from './context/CartContext';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    {/* Layout contenant Header et Footer */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route
                            path="collections/:slug"
                            element={<CategoryProductsPage />}
                        />
                        <Route
                            path="products/:slug"
                            element={<ProductDetailPage />}
                        />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
