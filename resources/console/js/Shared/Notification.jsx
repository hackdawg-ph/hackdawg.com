import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '@console/Shared/Icon';
import CheckCircleOutlineIcon from '@console/Shared/Icons/CheckCircleOutline';
import XOutlineIcon from '@console/Shared/Icons/XOutline';

const notificationRoot = document.getElementById('notification-portal');

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

Portal.propTypes = {
    children: PropTypes.node.isRequired,
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
            <div className="fixed right-0 top-0 z-50 flex items-start justify-between bg-white rounded-md border shadow-md w-84 mt-6 mr-6 p-5">
                <Icon
                    className={cx({
                        'text-blue-500': queue[0].type === 'info',
                        'text-green-500': queue[0].type === 'success',
                        'text-orange-500': queue[0].type === 'warning',
                        'text-red-500': queue[0].type === 'error',
                    })}
                >
                    <CheckCircleOutlineIcon />
                </Icon>
                <div>
                    <h4 className="mb-1 font-medium">{queue[0].title}</h4>
                    <p className="text-gray-600">{queue[0].body}</p>
                </div>
                <button onClick={() => pop()}>
                    <Icon className="text-gray-600">
                        <XOutlineIcon />
                    </Icon>
                </button>
            </div>
        </Portal>
    );
}

Notification.propTypes = {
    timeout: PropTypes.number,
    message: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    }),
};
