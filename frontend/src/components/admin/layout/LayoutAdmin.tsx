import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useAppearance } from '../../../context/AppearanceContext';

const LayoutAdmin: React.FC = () => {
    const { settings } = useAppearance();
    const [collapsed, setCollapsed] = useState(settings.sidebarCollapsed);

    // Mettre à jour l'état collapsed quand les paramètres changent
    useEffect(() => {
        setCollapsed(settings.sidebarCollapsed);
    }, [settings.sidebarCollapsed]);

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
