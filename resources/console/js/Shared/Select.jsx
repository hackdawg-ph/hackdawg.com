import React from 'react';
import PropTypes from 'prop-types';

export default function Select({ id, label, options = [], ...props }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-5 text-gray-700">
                {label}
            </label>
            <select
                id={id}
                className="mt-1 block form-select w-full py-2 px-3 py-0 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                {...props}
            >
                {options.map((option, key) => (
                    <option key={`select-${id}-option-${key}`} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

Select.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.string,
};
