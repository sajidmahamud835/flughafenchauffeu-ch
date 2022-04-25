import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../componants/layouts/Footer/Footer';
import Header from '../../componants/layouts/Header/Header';

const Home = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home;