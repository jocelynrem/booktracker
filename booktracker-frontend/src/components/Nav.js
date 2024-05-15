import React from 'react';
import Button from './Button';

const Nav = ({ loggedIn, handleLoginLogout }) => {
    return (
        <nav className="bg-white shadow p-6 rounded-lg mb-4 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Book Tracker</h1>
            {loggedIn ? (
                <Button
                    type="button"
                    onClick={handleLoginLogout}
                    className="inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    Logout
                </Button>
            ) : (
                <>
                    <Button
                        type="button"
                        onClick={() => { }} // Add logic for showing login form
                        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Login
                    </Button>
                    {/* <Button
                        type="button"
                        onClick={() => { }} // Add logic for showing register form
                        className="inline-flex items-center gap-x-2 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        Register
                    </Button> */}
                </>
            )}
        </nav>
    );
};

export default Nav;
