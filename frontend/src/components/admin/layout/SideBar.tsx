const SideBar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav className="flex flex-col space-y-4">
                <a
                    href="/admin-xy3a9t98f9m3oi9j/dashboard"
                    className="hover:text-gray-300"
                >
                    Dashboard
                </a>
                <a
                    href="/admin-xy3a9t98f9m3oi9j/users"
                    className="hover:text-gray-300"
                >
                    Users
                </a>
                <a
                    href="/admin-xy3a9t98f9m3oi9j/products"
                    className="hover:text-gray-300"
                >
                    Products
                </a>
                <a
                    href="/admin-xy3a9t98f9m3oi9j/settings"
                    className="hover:text-gray-300"
                >
                    Settings
                </a>
            </nav>
        </aside>
    );
};

export default SideBar;
