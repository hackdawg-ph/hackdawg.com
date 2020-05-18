import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import UserCustomIcon from '@/backend/Shared/Icons/UserCustom';

Avatar.propTypes = {
    variant: PropTypes.oneOf(['rounded']),
    size: PropTypes.oneOf(['custom', 'sm', 'md', 'lg']),
    url: PropTypes.string,
    className: PropTypes.string,
};

export default function Avatar({ variant = 'rounded', size = 'md', url = null, className }) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (hasError) {
            setHasError(false);
        }
    }, [url]);

    return (
        <div
            className={cx(
                'overflow-hidden overflow-hidden bg-gray-100',
                {
                    'rounded-full': variant === 'rounded',
                    'w-8 h-8': size === 'sm',
                    'w-12 h-12': size === 'md',
                    'w-16 h-16': size === 'lg',
                },
                className,
            )}
        >
            {url === null || hasError ? (
                <UserCustomIcon className="w-full h-full text-gray-300" />
            ) : (
                <img
                    className="w-full h-full object-cover object-center"
                    src={url}
                    onError={() => setHasError(true)}
                    alt="Avatar"
                />
            )}
        </div>
    );
}
