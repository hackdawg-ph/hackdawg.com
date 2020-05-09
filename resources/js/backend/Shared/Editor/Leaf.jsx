import React from 'react';
import PropTypes from 'prop-types';

Leaf.propTypes = {
    leaf: PropTypes.shape({
        text: PropTypes.string,
        bold: PropTypes.bool,
        code: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
    }),
    attributes: PropTypes.object,
    children: PropTypes.object,
};

export default function Leaf({ attributes, children, leaf }) {
    if (leaf.bold) {
        children = <strong className="font-bold">{children}</strong>;
    }

    if (leaf.code) {
        children = <code className="bg-gray-100">{children}</code>;
    }

    if (leaf.italic) {
        children = <em className="italic">{children}</em>;
    }

    if (leaf.underline) {
        children = <u className="underline">{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
}
