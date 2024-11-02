import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayOut = () => {
    return (
        <>
            <h1>Admin LayOut</h1>
            <Outlet />
        </>
    )
}

export default AdminLayOut