import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Auth({ title, children, className, ...props }) {
    return (
        <div
            className={cx(
                'min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8',
                className,
            )}
            {...props}
        >
            <div className="msm:mx-auto sm:w-full sm:max-w-md">
                <div>
                    <img className="mx-auto w-auto h-16" src="/png/logos/indigo.png" alt="Hackdawg" />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">{title}</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
                </div>
            </div>
        </div>
    );
}

Auth.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
