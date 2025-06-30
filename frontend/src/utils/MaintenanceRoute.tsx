import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MaintenancePage from '../pages/MaintenancePage';

const MaintenanceRoute: React.FC = () => {
    const [isMaintenance, setIsMaintenance] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const maintenanceMode = localStorage.getItem('maintenance');
        setIsMaintenance(maintenanceMode === 'on');
    }, []);

    const isAdminRoute = location.pathname.startsWith(
        '/admin-xy3a9t98f9m3oi9j'
    );

    console.log(isAdminRoute);

    if (isMaintenance && !isAdminRoute) {
        return <MaintenancePage />;
    }

    return <Outlet />;
};

export default MaintenanceRoute;
