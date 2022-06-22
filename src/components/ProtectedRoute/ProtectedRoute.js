import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children }) => {
    if (!loggedIn) {
        return <Navigate to='/' replace />;
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;
