import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Button({
    variant = 'primary',
    className,
    children,
    type = 'button',
    ...props
}) {
    return (
        <button
            className={cx(
                'relative py-2 px-4 border font-medium rounded-md',
                {
                    'border-transparent text-white bg-indigo-600 hover:bg-indigo-500':
                        variant === 'primary',
                    'border-gray-300 text-gray-900 bg-white hover:bg-gray-100':
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
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['reset', 'submit', 'button']),
};
