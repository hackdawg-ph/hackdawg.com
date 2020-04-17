import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Icon({ size = 'medium', children }) {
    return (
        <svg
            className={cx({
                'w-5 h-5': size === 'small',
                'w-6 h-6': size === 'medium',
                'w-8 h-8': size === 'large',
            })}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
        >
            {children}
        </svg>
    );
}

Icon.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    children: PropTypes.node.isRequired,
};
