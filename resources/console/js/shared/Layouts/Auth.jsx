import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Auth({
    title,
    onSubmit,
    children,
    className,
    ...props
}) {
    return (
        <div
            className={cx(
                'min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8',
                className,
            )}
            {...props}
        >
            <div className="max-w-md w-full">
                <div>
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        {title}
                    </h2>
                </div>

                <form
                    className="mt-8 p-10 bg-white shadow rounded-lg"
                    onSubmit={onSubmit}
                >
                    {children}
                </form>
            </div>
        </div>
    );
}

Auth.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
