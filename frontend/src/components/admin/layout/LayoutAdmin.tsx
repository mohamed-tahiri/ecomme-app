import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Footer from './Footer';

const LayoutAdmin: React.FC = () => {
    return (
        <>
            <div className="flex min-h-screen">
                <SideBar />
                <div className=" p-4">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LayoutAdmin;
