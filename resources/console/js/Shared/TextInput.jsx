import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '@console/Shared/Icon';
import ExclamationCircleIcon from '@console/Shared/Icons/ExclamationCircle';

export default function TextInput({ id, label, errors = [], ...props }) {
    return (
        <div>
            <label className="block font-medium text-gray-700" htmlFor={id}>
                {label}
            </label>
            <div className="mt-1 relative flex items-center">
                <input
                    className={cx(
                        'block w-full px-3 py-2 rounded-md border shadow-sm',
                        {
                            'border-red-300 text-red-800': errors.length > 0,
                        },
                    )}
                    id={id}
                    {...props}
                />
                {errors.length > 0 && (
                    <Icon
                        className="absolute inset-y-0 right-0 block h-full mr-2 text-red-500"
                        size="small"
                    >
                        <ExclamationCircleIcon />
                    </Icon>
                )}
            </div>
            {errors && <div className="mt-2 text-red-500">{errors[0]}</div>}
        </div>
    );
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
};
