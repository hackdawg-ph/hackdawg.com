import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Button({ variant = 'primary', size = 'md', className, children, type = 'button', ...props }) {
    return (
        <button
            className={cx(
                'py-2 border rounded-md text-sm font-medium transition duration-150 ease-in-out',
                {
                    'border-transparent bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 text-white':
                        variant === 'primary',
                    'border-gray-300 text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800':
                        variant === 'secondary',
                    'px-3 leading-4': size === 'sm',
                    'px-4 leading-5 ': size === 'md',
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
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['reset', 'submit', 'button']),
};
