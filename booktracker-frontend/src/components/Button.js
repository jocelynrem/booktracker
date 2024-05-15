// src/components/Button.js
import React from 'react';

const Button = ({ type, onClick, icon: Icon, className, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex items-center gap-x-2 px-3.5 py-2.5 text-sm font-semibold shadow-sm rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
        >
            {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
            {children}
        </button>
    );
};

export default Button;
