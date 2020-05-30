import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
    const [activeKey, setActiveKey] = useState(-1);
    const [suggestions, setSuggestions] = useState([]);
    const suggestionRef = useRef(null);
    const suggestionToggle = useToggle(suggestionRef);

    function focusInput() {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    function findItemByKey(key) {
        return dataset.find(item => item.key === key);
    }

    function filterSuggestions(newTerm) {
        setSuggestions(
            dataset
                .filter(item => keys.indexOf(item.key) === -1)
                .filter(item => item.name.includes(newTerm.toLowerCase())),
        );
    }

    function detachItem(key) {
        setKeys(keys.filter(k => k !== key));
        focusInput();
    }

    function attachItem(item) {
        const newKeys = keys.filter(key => key !== item.key).concat(item.key);

        setKeys(newKeys);
        suggestionToggle.setOpen(false);
        setTerm('');

        focusInput();
    }

    function handleKeyDown(e) {
        const newItem = suggestions.find((_, key) => key === activeKey);

        switch (e.keyCode) {
            case 8:
                if (term === '') detachItem(keys.pop());
                break;
            case 13:
                e.preventDefault();
                if (newItem) attachItem(newItem);
                break;
            case 38:
                setActiveKey(activeKey < 0 ? activeKey : activeKey - 1);
                break;
            case 40:
                setActiveKey(activeKey + 1 === suggestions.length ? activeKey : activeKey + 1);
                break;
            default:
                suggestionToggle.setOpen(true);
                break;
        }
    }

    useEffect(() => {
        onChange(keys);
    }, [keys]);

    useEffect(() => {
        setActiveKey(-1);

        if (!term) {
            return;
        }

        if (term !== '') {
            return filterSuggestions(term);
        }

        if (term === '') {
            setSuggestions(dataset);
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
                        {keys.filter(findItemByKey).map(key => (
                            <li key={key} className="mr-2 float-left">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                                    {findItemByKey(key).name}
                                    <button
                                        type="button"
                                        className="flex-shrink-0 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                                        onClick={() => detachItem(key)}
                                    >
                                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
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
                    className="appearance-none outline-none sm:text-sm sm:leading-5"
                    type="text"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {suggestionToggle.open && (
                    <ul
                        ref={suggestionRef}
                        className="absolute inset-x-0 top-full w-full max-h-64 overflow-scroll -mt-1 bg-white border border-gray-300 rounded shadow-sm"
                        role="listbox"
                    >
                        {suggestions.map((item, key) => (
                            <li
                                key={item.key}
                                className={cx('px-3 py-1 border-b cursor-pointer', {
                                    'text-indigo-600': key === activeKey,
                                    'text-gray-900 hover:text-gray-500': key !== activeKey,
                                })}
                                onClick={() => attachItem(item)}
                            >
                                {item.name}
                            </li>
                        ))}
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
