// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type = 'button', className, children, icon: IconComponent, onClick }) => {
    return (
        <button
            type={type}
            className={`inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
            onClick={onClick}
        >
            {IconComponent && <IconComponent className="h-5 w-5" aria-hidden="true" />}
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    icon: PropTypes.elementType, // Accept a React component as the icon prop
    onClick: PropTypes.func,
};

export default Button;
