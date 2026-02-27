import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, PlusCircle, User, LogIn, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-primary-600 p-2 rounded-lg text-white font-bold text-xl">RM</div>
                        <span className="font-bold text-xl hidden sm:inline text-gray-800 tracking-tight">Chennai Finder</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/rooms" className="text-gray-600 hover:text-primary-600 flex items-center gap-1 font-medium">
                            <Search size={18} /> Find Rooms
                        </Link>
                        <Link to="/upload" className="text-gray-600 hover:text-primary-600 flex items-center gap-1 font-medium">
                            <PlusCircle size={18} /> Post Room
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-gray-600 hover:text-red-600 font-medium"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center gap-1 text-gray-600 hover:text-primary-600 font-medium">
                                    <LogIn size={18} /> Login
                                </Link>
                                <Link to="/signup" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
