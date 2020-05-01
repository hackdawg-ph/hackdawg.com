import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@backend/Shared/Icons/CheckCircleOutline';
import ExclamationOutlineIcon from '@backend/Shared/Icons/ExclamationOutline';
import InformationCircleOutlineIcon from '@backend/Shared/Icons/InformationCircleOutline';
import XOutlineIcon from '@backend/Shared/Icons/XOutline';
import XCircleOutlineIcon from '@backend/Shared/Icons/XCircleOutline';

const notificationRoot = document.getElementById('notification-portal');

Portal.propTypes = {
    children: PropTypes.node.isRequired,
};

function Portal({ children }) {
    const el = document.createElement('div');

    useEffect(() => {
        notificationRoot.appendChild(el);

        return () => {
            notificationRoot.removeChild(el);
        };
    }, []);

    return ReactDOM.createPortal(children, el);
}

Notification.propTypes = {
    timeout: PropTypes.number,
    message: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        variant: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
    }),
};

export default function Notification({ timeout = 3000, message }) {
    const [queue, setQueue] = useState([]);

    function pop() {
        setQueue(queue => queue.slice(1));
    }

    function push(newMessage) {
        if (!newMessage) {
            return;
        }

        setQueue(queue => queue.concat(newMessage));
    }

    useEffect(() => {
        push(message);

        const handle = setTimeout(() => {
            pop();
        }, timeout);

        return () => {
            clearTimeout(handle);
        };
    }, [message]);

    if (queue.length === 0) {
        return null;
    }

    return (
        <Portal>
            <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
                {/*
                    Notification panel, show/hide based on alert state.
                    Entering: "transform ease-out duration-300 transition"
                    From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    To: "translate-y-0 opacity-100 sm:translate-x-0"
                    Leaving: "transition ease-in duration-100"
                    From: "opacity-100"
                    To: "opacity-0"
                */}
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
                    <div className="rounded-lg shadow-xs overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    {message.variant === 'info' ? (
                                        <InformationCircleOutlineIcon className="h-6 w-6 text-blue-400" />
                                    ) : message.variant === 'success' ? (
                                        <CheckCircleOutlineIcon className="h-6 w-6 text-green-400" />
                                    ) : message.variant === 'warning' ? (
                                        <ExclamationOutlineIcon className="h-6 w-6 text-orange-400" />
                                    ) : message.variant === 'danger' ? (
                                        <XCircleOutlineIcon className="h-6 w-6 text-red-400" />
                                    ) : null}
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm leading-5 font-medium text-gray-900">{queue[0].title}</p>
                                    <p className="mt-1 text-sm leading-5 text-gray-500">{queue[0].body}</p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                                        onClick={() => pop()}
                                    >
                                        <XOutlineIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
