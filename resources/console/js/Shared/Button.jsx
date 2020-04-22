import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Button({ variant = 'primary', className, children, type = 'button', ...props }) {
    return (
        <button
            className={cx(
                'py-2 px-4 border rounded-md text-sm leading-5 font-medium transition duration-150 ease-in-out',
                {
                    'border-transparent bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 text-white':
                        variant === 'primary',
                    'border-gray-300 text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800':
                        variant === 'secondary',
                },
                className,
            )}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary']),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['reset', 'submit', 'button']),
};
