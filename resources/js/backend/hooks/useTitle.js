import { useEffect } from 'react';
import PropTypes from 'prop-types';

UseTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default function UseTitle(title) {
    useEffect(() => {
        document.title = `${title} | Hackdawg`;
    }, [title]);

    return null;
}
