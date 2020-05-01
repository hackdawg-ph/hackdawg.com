import React from 'react';
import PropTypes from 'prop-types';

Slave.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function Slave({ children }) {
    return <div>{children}</div>;
}
