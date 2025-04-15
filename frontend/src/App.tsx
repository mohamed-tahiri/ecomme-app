import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Routes />
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
