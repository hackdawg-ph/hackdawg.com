import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const root = document.getElementById('modal-portal');

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function Modal({ children }) {
    const el = document.createElement('div');

    useEffect(() => {
        root.appendChild(el);

        return () => {
            root.removeChild(el);
        };
    }, []);

    return ReactDOM.createPortal(children, el);
}
