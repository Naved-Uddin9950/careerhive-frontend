import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Space from '../../components/Space';

const index = () => {
    return (
        <div className='w-full h-full'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default index;