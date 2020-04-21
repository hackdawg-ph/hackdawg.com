import React from 'react';
import PropTypes from 'prop-types';

export default function Avatar({ url }) {
    if (!url) {
        return null;
    }

    return <img />;
}

Avatar.propTypes = {
    url: PropTypes.string,
};
