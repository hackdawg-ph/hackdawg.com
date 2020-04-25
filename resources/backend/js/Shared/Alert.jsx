import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CheckCircleOutlineIcon from '@backend/Shared/Icons/CheckCircleOutline';
import ExclamationOutlineIcon from '@backend/Shared/Icons/ExclamationOutline';
import InformationCircleOutlineIcon from '@backend/Shared/Icons/InformationCircleOutline';
import XCircleOutlineIcon from '@backend/Shared/Icons/XCircleOutline';

export default function Alert({ message }) {
    return (
        <div
            className={cx('rounded-md p-4', {
                'bg-blue-50': message.type === 'info',
                'bg-green-50': message.type === 'success',
                'bg-yellow-50': message.type === 'warning',
                'bg-red-50': message.type === 'error',
            })}
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    {message.type === 'info' ? (
                        <InformationCircleOutlineIcon className="w-5 h-5 text-blue-400" />
                    ) : message.type === 'success' ? (
                        <CheckCircleOutlineIcon className="w-5 h-5 text-green-400" />
                    ) : message.type === 'warning' ? (
                        <ExclamationOutlineIcon className="w-5 h-5 text-yellow-400" />
                    ) : message.type === 'error' ? (
                        <XCircleOutlineIcon className="w-5 h-5 text-red-400" />
                    ) : null}
                </div>
                <div className="ml-3">
                    <h3
                        className={cx('text-sm leading-5 font-medium', {
                            'text-blue-800': message.type === 'info',
                            'text-green-800': message.type === 'success',
                            'text-yellow-800': message.type === 'warning',
                            'text-red-800': message.type === 'error',
                        })}
                    >
                        {message.title}
                    </h3>
                    <div
                        className={cx('mt-2 text-sm leading-5', {
                            'text-blue-700': message.type === 'info',
                            'text-green-700': message.type === 'success',
                            'text-yellow-700': message.type === 'warning',
                            'text-red-700': message.type === 'error',
                        })}
                    >
                        {typeof message.body === 'string' ? <p>{message.body}</p> : message.body}
                    </div>
                </div>
            </div>
        </div>
    );
}

Alert.propTypes = {
    message: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    }),
};
