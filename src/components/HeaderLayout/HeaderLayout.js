import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const HeaderLayout = ({ loggedIn, onOpenNavigation }) => {
    return (
        <>
            <Header loggedIn={loggedIn} onOpenNavigation={onOpenNavigation} />
            <Outlet />
        </>
    );
};

export default HeaderLayout;
