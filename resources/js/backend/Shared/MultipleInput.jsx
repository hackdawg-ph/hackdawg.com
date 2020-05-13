import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import useToggle from '@/backend/hooks/useToggle';

MultipleInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    dataset: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string,
        }),
    ),
    defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    onChange: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
};

export default function MultipleInput({ id, label, dataset = [], defaultValue = [], onChange = noop, errors = [] }) {
    const inputRef = useRef(null);
    const [term, setTerm] = useState('');
    const [keys, setKeys] = useState(defaultValue);
    const [suggestions, setSuggestions] = useState([]);
    const suggestionToggle = useToggle();

    function focusInput() {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    function handleRemoved(key) {
        setKeys(keys.filter(k => k !== key));

        focusInput();
    }

    function handleAdded(data) {
        const newKeys = keys.filter(key => key !== data.key).concat(data.key);

        setKeys(newKeys);
        suggestionToggle.setOpen(false);
        setTerm('');

        focusInput();
    }

    useEffect(() => {
        onChange(keys);
    }, [keys]);

    useEffect(() => {
        if (term) {
            const filteredSuggestions = dataset
                .filter(data => keys.indexOf(data.key) === -1)
                .filter(data => data.name.includes(term));

            setSuggestions(filteredSuggestions);
            suggestionToggle.setOpen(true);
        }
    }, [term]);

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium leading-5 text-gray-700" htmlFor={id}>
                    {label}
                </label>
            )}

            <div className="relative form-input inline-block w-full mt-1 px-3 py-2 border-gray-300 cursor-text">
                {keys.length > 0 && (
                    <ul className="inline" role="listbox">
                        {keys
                            .filter(key => dataset.find(data => data.key === key))
                            .map(key => (
                                <li key={key} className="mr-2 float-left">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                                        {dataset.find(data => data.key === key).name}
                                        <button
                                            type="button"
                                            className="flex-shrink-0 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                                            onClick={() => handleRemoved(key)}
                                        >
                                            <svg
                                                className="h-2 w-2"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 8 8"
                                            >
                                                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                            </svg>
                                        </button>
                                    </span>
                                </li>
                            ))}
                    </ul>
                )}

                <input
                    ref={inputRef}
                    id={id}
                    className="appearance-none sm:text-sm sm:leading-5"
                    type="text"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                />

                {suggestionToggle.open && (
                    <ul
                        className="absolute inset-x-0 top-full w-full max-h-64 overflow-scroll -mt-1 bg-white border border-gray-300 rounded shadow-sm"
                        role="listbox"
                    >
                        {suggestions.map(data => (
                            <li
                                key={data.key}
                                className="px-3 py-1 border-b text-gray-900 hover:text-gray-500 cursor-pointer"
                                onClick={() => handleAdded(data)}
                            >
                                {data.name}
                            </li>
                        ))}

                        {suggestions.length === 0 && (
                            <li className="px-3 py-1 border-b cursor-pointer">
                                <span className="text-gray-500">No tag matching </span>
                                <span className="text-gray-900 font-bold">{`"${term}"`}</span>
                            </li>
                        )}
                    </ul>
                )}
            </div>

            {errors.length > 0 && (
                <p className="mt-2 text-sm text-red-600" id={id + '-error'}>
                    {errors[0]}
                </p>
            )}
        </div>
    );
}
