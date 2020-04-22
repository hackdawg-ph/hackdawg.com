import React from 'react';

export default function XOutline(props) {
    return (
        <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L18 18" />
        </svg>
    );
}
