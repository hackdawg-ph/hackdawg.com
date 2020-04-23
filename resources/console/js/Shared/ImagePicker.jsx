import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Avatar from '@console/Shared/Avatar';

export default function ImagePicker({ id, label, description, defaultValue = null, onChange = noop, errors = [] }) {
    const [file, setFile] = useState(defaultValue);

    function getImageUrl(file) {
        if (typeof file === 'string') {
            return file;
        }

        return file ? URL.createObjectURL(file) : null;
    }

    function handlePicked(event) {
        const file = event.target.files[0];
        setFile(file);
        onChange(file);
    }

    useEffect(() => {
        if (file) {
            URL.revokeObjectURL(file.preview);
        }
    }, [file]);

    return (
        <div>
            <label className="block text-sm leading-5 font-medium text-gray-700">{label}</label>
            <div className="mt-2 flex items-center">
                <Avatar url={getImageUrl(file)} />

                <span className="ml-5 rounded-md shadow-sm">
                    <label htmlFor={'image-picker-' + id}>
                        <p className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-gray-50 active:text-gray-800 cursor-pointer transition duration-150 ease-in-out">
                            Change
                        </p>
                        <input
                            id={'image-picker-' + id}
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={handlePicked}
                        />
                    </label>
                </span>
            </div>

            {description && (
                <p className="mt-2 text-sm text-gray-500" id={id + '-description'}>
                    {description}
                </p>
            )}

            {errors.length > 0 && (
                <p className="mt-2 text-sm text-red-600" id={id + '-error'}>
                    {errors[0]}
                </p>
            )}
        </div>
    );
}

ImagePicker.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
};
