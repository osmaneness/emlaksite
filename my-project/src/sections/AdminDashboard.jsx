import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();

    const handleAddListing = () => {
        navigate('/admin/add-listing');
    };

    const handleDeleteListing = () => {
        navigate('/admin/delete-listing');
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        console.log('Çıkış yapıldı, yönlendiriliyor...');
        navigate('/admin/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={handleAddListing}
                        className="bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        İlan Ekle
                    </button>
                    <button
                        onClick={handleDeleteListing}
                        className="bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        İlan Sil
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-gray-500 text-white font-bold py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
