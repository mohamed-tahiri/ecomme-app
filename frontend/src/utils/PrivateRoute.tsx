// PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    allowedRoles?: string[]; // Liste des rôles autorisés
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
    const { user, auth, loading } = useAuth();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!auth) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
