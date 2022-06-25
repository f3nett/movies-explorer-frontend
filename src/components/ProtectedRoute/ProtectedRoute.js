import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const ProtectedRoute = ({ loggedIn, isLoading, children }) => {
    if (isLoading) {
        return <Preloader />;
    } else if (loggedIn) {
        return children ? children : <Outlet />;
    } else return <Navigate to='/' replace />;
};

export default ProtectedRoute;
