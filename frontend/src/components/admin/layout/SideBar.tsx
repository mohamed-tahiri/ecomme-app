import React from 'react';
import {
    FaBars,
    FaUsers,
    FaBoxOpen,
    FaThLarge,
    FaCog,
    FaTachometerAlt,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { MdProductionQuantityLimits } from 'react-icons/md';

interface SideBarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
    {
        label: 'Dashboard',
        icon: <FaTachometerAlt />,
        path: '/admin-xy3a9t98f9m3oi9j/dashboard',
    },
    {
        label: 'Users',
        icon: <FaUsers />,
        path: '/admin-xy3a9t98f9m3oi9j/users',
    },
    {
        label: 'Products',
        icon: <MdProductionQuantityLimits />,
        path: '/admin-xy3a9t98f9m3oi9j/products',
    },
    {
        label: 'orders',
        icon: <FaBoxOpen />,
        path: '/admin-xy3a9t98f9m3oi9j/orders',
    },
    {
        label: 'Categories',
        icon: <FaThLarge />,
        path: '/admin-xy3a9t98f9m3oi9j/categories',
    },
    {
        label: 'Settings',
        icon: <FaCog />,
        path: '/admin-xy3a9t98f9m3oi9j/settings',
    },
];

const SideBar: React.FC<SideBarProps> = ({ collapsed, setCollapsed }) => {
    return (
        <aside
            className={`bg-[var(--primary-button-background)] text-white h-screen p-4 transition-all duration-300
            flex flex-col ${collapsed ? 'w-20' : 'w-80'} overflow-hidden`}
        >
            <div className="flex items-center justify-between mb-10">
                {!collapsed && <h2 className="text-xl font-bold">Admin</h2>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-white text-2xl p-2 hover:bg-[#e4650b] rounded"
                >
                    <FaBars />
                </button>
            </div>

            <nav className="flex flex-col gap-3">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-3 py-2 rounded-lg transition-colors 
                             hover:bg-[#e4650b] ${isActive ? 'bg-[#e4650b]' : ''}`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>
                        {!collapsed && (
                            <span className="text-sm">{item.label}</span>
                        )}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default SideBar;
