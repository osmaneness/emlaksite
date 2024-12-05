import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const location = useLocation();

    console.log('ProtectedRoute - isAdmin:', isAdmin);

    // Eğer giriş yapılmamışsa, kullanıcıyı login sayfasına yönlendir
    return isAdmin ? (
        children
    ) : (
        <Navigate to="/admin/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoute;
