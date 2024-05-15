// src/components/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Nav = ({ loggedIn, handleLoginLogout }) => {
    return (
        <nav className="bg-white shadow p-6 rounded-lg mb-4 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">
                <Link to="/books">Book Tracker</Link>
            </h1>
            <div>
                {loggedIn ? (
                    <Button onClick={handleLoginLogout} className="bg-red-600 text-white py-2 px-4 rounded">
                        Logout
                    </Button>
                ) : (
                    <>
                        <Link to="/login" className="mr-4 bg-indigo-600 text-white py-2 px-4 rounded">Login</Link>
                        <Link to="/register" className="bg-green-600 text-white py-2 px-4 rounded">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
