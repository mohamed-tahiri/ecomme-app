import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="text-[15px] px-[1.875rem] text-[var(--text-color)] bg-[var(--background)]">
                <div className="my-6">
                    <Breadcrumb />
                </div>
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
