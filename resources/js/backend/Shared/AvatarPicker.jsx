import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Avatar from '@/backend/Shared/Avatar';

AvatarPicker.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
};

export default function AvatarPicker({ id, label, defaultValue = null, onChange = noop, errors = [] }) {
    const [value, setValue] = useState(defaultValue);

    function fileUrl() {
        if (typeof value === 'string') {
            return value;
        }

        return value ? URL.createObjectURL(value) : null;
    }

    function handlePicked(event) {
        setValue(event.target.files[0]);
        onChange(event.target.files[0]);
    }

    useEffect(() => {
        if (value) {
            URL.revokeObjectURL(value.preview);
        }
    }, [value]);

    return (
        <div>
            <label className="block text-sm leading-5 font-medium text-gray-700">{label}</label>

            <div className="mt-2 flex items-center">
                <Avatar url={fileUrl()} />

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

            <p className="mt-2 text-sm text-gray-500" id={id + '-description'}>
                File can be PNG, JPG, GIF up to 10MB
            </p>

            {errors.length > 0 && (
                <p className="mt-2 text-sm text-red-600" id={id + '-error'}>
                    {errors[0]}
                </p>
            )}
        </div>
    );
}
