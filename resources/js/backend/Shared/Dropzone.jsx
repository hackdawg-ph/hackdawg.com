import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import noop from 'lodash/noop';

Dropzone.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
    accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    className: PropTypes.string,
};

export default function Dropzone({ id, label, defaultValue = null, onChange = noop, errors = [], accept = '*' }) {
    const [value, setValue] = useState(defaultValue);

    function fileUrl() {
        if (typeof value === 'string') {
            return value;
        }

        return value ? URL.createObjectURL(value) : null;
    }

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length === 1) {
            setValue(acceptedFiles[0]);
            onChange(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        multiple: false, // TODO: Accept multiple files
        accept,
        noClick: true,
        noKeyboard: true,
        onDrop,
    });

    useEffect(() => {
        if (value) {
            URL.revokeObjectURL(value.preview);
        }
    }, [value]);

    return (
        <div>
            {label && <label className="block text-sm leading-5 font-medium text-gray-700">{label}</label>}

            <div className="outline-none" {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="h-48 md:h-56 lg:h-64 mt-2 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    {fileUrl() ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <button
                                className="absolute text-red-500 hover:text-red-600 underline"
                                type="button"
                                onClick={() => setValue(null)}
                            >
                                Remove
                            </button>
                            <img className="w-full h-full object-cover object-center" src={fileUrl()} alt="" />
                        </div>
                    ) : (
                        <div className="text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <p className="mt-1 text-sm text-gray-600">
                                {isDragActive ? (
                                    'Drop the files here'
                                ) : (
                                    <React.Fragment>
                                        <button
                                            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                                            type="button"
                                            onClick={open}
                                        >
                                            Upload a file
                                        </button>
                                        <span className="ml-1">or drag and drop</span>
                                    </React.Fragment>
                                )}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    )}
                </div>
            </div>

            {errors.length > 0 && (
                <p className="mt-2 text-sm text-red-600" id={id + '-error'}>
                    {errors[0]}
                </p>
            )}
        </div>
    );
}
