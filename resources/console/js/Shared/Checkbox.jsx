import React from 'react';
import PropTypes from 'prop-types';

export default function Checkbox({ id, label, ...props }) {
    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
                {...props}
            />
            <label htmlFor={id} className="ml-2 block text-gray-900">
                {label}
            </label>
        </div>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
};
