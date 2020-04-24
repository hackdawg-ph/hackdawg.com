import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ExclamationCircleIcon from '@console/Shared/Icons/ExclamationCircle';

export default function TextInput({
    className,
    id,
    value = '',
    label = null,
    description = null,
    addOn = null,
    multiline = false,
    errors = [],
    ...props
}) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor={id}>
                    {label}
                </label>
            )}

            <div
                className={cx('relative flex rounded-md shadow-sm', {
                    'mt-1': label !== null,
                })}
            >
                {addOn && (
                    <span className="hidden md:inline-flex items-center px-3 rounded-l-md border border-r border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        {addOn}
                    </span>
                )}

                {multiline ? (
                    <textarea
                        className={cx(
                            'form-textarea appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5',
                            {
                                'focus:shadow-outline-indigo focus:border-indigo-300': errors.length === 0,
                                'form-textarea-danger text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red':
                                    errors.length > 0,
                            },
                            className,
                        )}
                        id={id}
                        defaultValue={value || ''}
                        {...props}
                    ></textarea>
                ) : (
                    <input
                        className={cx(
                            'form-input appearance-none block w-full px-3 py-2 border-gray-300 placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5',
                            {
                                'focus:shadow-outline-indigo focus:border-indigo-300': errors.length === 0,
                                'form-input-danger text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red':
                                    errors.length > 0,
                                'md:border-l-0 md:rounded-none md:rounded-r-md': addOn !== null,
                                'border rounded-md': addOn === null,
                            },
                            className,
                        )}
                        id={id}
                        value={value || ''}
                        {...props}
                    />
                )}

                {errors.length > 0 && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                )}
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

TextInput.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    addOn: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    multiline: PropTypes.bool,
};
