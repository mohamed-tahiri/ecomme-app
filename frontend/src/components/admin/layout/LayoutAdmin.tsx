import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const LayoutAdmin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex">
            {/* Fixed Sidebar */}
            <div className="fixed top-0 left-0 h-screen z-40">
                <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            {/* Content area adjusts margin-left based on sidebar state */}
            <div
                className={`transition-all duration-300 w-full p-6 ${
                    collapsed ? 'ml-20' : 'ml-80'
                }`}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutAdmin;
