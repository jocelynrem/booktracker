// src/components/Button.js
import React from 'react';

const Button = ({ type, onClick, icon: Icon, children, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
        >
            {Icon && <Icon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />}
            {children}
        </button>
    );
};

export default Button;
