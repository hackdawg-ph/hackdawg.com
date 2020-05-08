import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import noop from 'lodash/noop';
import Modal from '@/backend/Shared/Modals/Modal';
import ExclamationOutlineIcon from '@/backend/Shared/Icons/ExclamationOutline';

Alert.propTypes = {
    message: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
        variant: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
    }),
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default function Alert({ message, onCancel = noop, onConfirm = noop }) {
    return (
        <Modal>
            <div className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                {/*
                    Background overlay, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                      From: "opacity-0"
                      To: "opacity-100"
                    Leaving: "ease-in duration-200"
                      From: "opacity-100"
                      To: "opacity-0"
                 */}
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" />
                </div>

                {/*
                    Modal panel, show/hide based on modal state.

                    Entering: "ease-out duration-300"
                      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      To: "opacity-100 translate-y-0 sm:scale-100"
                    Leaving: "ease-in duration-200"
                      From: "opacity-100 translate-y-0 sm:scale-100"
                      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                 */}
                <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
                    <div className="sm:flex sm:items-start">
                        <div
                            className={cx(
                                'mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10',
                                {
                                    'bg-blue-100': message.variant === 'info',
                                    'bg-green-100': message.variant === 'success',
                                    'bg-yellow-100': message.variant === 'warning',
                                    'bg-red-100': message.variant === 'danger',
                                },
                            )}
                        >
                            <ExclamationOutlineIcon
                                className={cx('h-6 w-6', {
                                    'text-blue-600': message.variant === 'info',
                                    'text-green-600': message.variant === 'success',
                                    'text-yellow-600': message.variant === 'warning',
                                    'text-red-600': message.variant === 'danger',
                                })}
                            />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{message.title}</h3>
                            <div className="mt-2">
                                <p className="text-sm leading-5 text-gray-500">{message.body}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                                type="button"
                                className={cx(
                                    'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5',
                                    {
                                        'bg-blue-600 hover:bg-blue-500 focus:border-blue-700 focus:shadow-outline-blue':
                                            message.variant === 'info',
                                        'bg-green-600 hover:bg-green-500 focus:border-green-700 focus:shadow-outline-green':
                                            message.variant === 'success',
                                        'bg-yellow-600 hover:bg-yellow-500 focus:border-yellow-700 focus:shadow-outline-yellow':
                                            message.variant === 'warning',
                                        'bg-red-600 hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red':
                                            message.variant === 'danger',
                                    },
                                )}
                                onClick={onConfirm}
                            >
                                Confirm
                            </button>
                        </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
