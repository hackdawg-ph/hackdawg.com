import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Icon({
    size = 'medium',
    children,
    className,
    ...props
}) {
    return (
        <span
            className={cx(
                'inline-flex items-center',
                {
                    'w-5 h-5': size === 'small',
                    'w-6 h-6': size === 'medium',
                    'w-8 h-8': size === 'large',
                },
                className,
            )}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            {children}
        </span>
    );
}

Icon.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
