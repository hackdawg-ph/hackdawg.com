import React from 'react';
import PropTypes from 'prop-types';

Element.propTypes = {
    element: PropTypes.shape({
        type: PropTypes.oneOf([
            'block-quote',
            'bulleted-list',
            'heading-one',
            'heading-two',
            'list-item',
            'numbered-list',
            'paragraph',
        ]),
    }),
    attributes: PropTypes.object,
    children: PropTypes.object,
};

export default function Element({ attributes, children, element }) {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>;
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>;
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
        default:
            return <p {...attributes}>{children}</p>;
    }
}
