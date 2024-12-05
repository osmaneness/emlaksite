import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin/dashboard';

    useEffect(() => {
        // Check if the admin is already logged in
        const isAdminLoggedIn = localStorage.getItem('isAdmin');
        if (isAdminLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [from, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        // Static admin username and password
        const adminUsername = 'admin';
        const adminPassword = 'password123';

        // Validate username and password
        if (username === adminUsername && password === adminPassword) {
            localStorage.setItem('isAdmin', 'true');
            console.log('Login successful, redirecting...');
            navigate(from, { replace: true });
        } else {
            setError('Invalid username or password!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 rounded-md w-full hover:bg-blue-600 transition duration-200"
                    >
                        Log In
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}

export default AdminLogin;
