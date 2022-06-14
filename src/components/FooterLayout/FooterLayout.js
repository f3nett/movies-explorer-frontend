import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const FooterLayout = () => {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
};

export default FooterLayout;
