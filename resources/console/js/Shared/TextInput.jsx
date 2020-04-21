import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '@console/Shared/Icon';
import ExclamationCircleIcon from '@console/Shared/Icons/ExclamationCircle';

export default function TextInput({
    id,
    value,
    label = null,
    description,
    multiline = false,
    errors = [],
    ...props
}) {
    return (
        <div>
            {label && (
                <label className="block font-medium text-gray-700" htmlFor={id}>
                    {label}
                </label>
            )}

            <div
                className={cx('relative flex flex-col justify-center', {
                    'mt-1': label !== null,
                })}
            >
                {multiline ? (
                    <textarea
                        className={cx('form-textarea block w-full', {
                            'form-textarea-danger': errors.length > 0,
                        })}
                        id={id}
                        defaultValue={value}
                        {...props}
                    ></textarea>
                ) : (
                    <input
                        className={cx('form-input block w-full', {
                            'form-input-danger': errors.length > 0,
                        })}
                        id={id}
                        value={value}
                        {...props}
                    />
                )}
                {description && (
                    <div className="mt-2 text-gray-600">{description}</div>
                )}
                {errors.length > 0 && (
                    <Icon
                        className="absolute inset-y-0 right-0 block h-full mr-2 text-red-500"
                        size="small"
                    >
                        <ExclamationCircleIcon />
                    </Icon>
                )}
            </div>

            {errors.length > 0 && (
                <div className="mt-2 text-red-500">{errors[0]}</div>
            )}
        </div>
    );
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    multiline: PropTypes.bool,
};
