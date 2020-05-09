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
            return (
                <blockquote className="px-3 py-2 border-l-2 border-gray-400 text-gray-400 italic" {...attributes}>
                    {children}
                </blockquote>
            );
        case 'bulleted-list':
            return (
                <ul className="list-disc list-inside" {...attributes}>
                    {children}
                </ul>
            );
        case 'heading-one':
            return (
                <h1 className="text-2xl font-bold leading-9" {...attributes}>
                    {children}
                </h1>
            );
        case 'heading-two':
            return (
                <h2 className="text-xl font-semibold leading-8" {...attributes}>
                    {children}
                </h2>
            );
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        case 'numbered-list':
            return (
                <ol className="list-decimal list-inside" {...attributes}>
                    {children}
                </ol>
            );
        default:
            return <p {...attributes}>{children}</p>;
    }
}
