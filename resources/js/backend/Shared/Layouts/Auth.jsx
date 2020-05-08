import React from 'react';
import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/inertia-react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Alert from '@/backend/Shared/Alert';

Auth.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default function Auth({ title, children, className, ...props }) {
    const {
        form: { status, errors },
    } = usePage();

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
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {status && (
                            <Alert
                                message={{
                                    title: 'Success!',
                                    body: status,
                                    variant: 'success',
                                }}
                            />
                        )}
                        {!isEmpty(errors) && (
                            <Alert
                                message={{
                                    title: `There were ${Object.values(errors).length} errors with your submission`,
                                    body: (
                                        <ul className="list-disc pl-5">
                                            {Object.values(errors).map((error, key) => (
                                                <li key={`error-item-${key}`}>{error}</li>
                                            ))}
                                        </ul>
                                    ),
                                    variant: 'danger',
                                }}
                            />
                        )}
                        <div className="mt-4">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
