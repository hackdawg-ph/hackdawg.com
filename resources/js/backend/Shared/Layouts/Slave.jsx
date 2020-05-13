import React from 'react';
import PropTypes from 'prop-types';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import isEmpty from 'lodash/isEmpty';
import ArrowNarrowLeftOutlineIcon from '@/backend/Shared/Icons/ArrowNarrowLeftOutline';
import Notification from '@/backend/Shared/Notification';

Slave.propTypes = {
    backUrl: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default function Slave({ backUrl = '/home', children }) {
    const {
        message,
        form: { errors },
    } = usePage();

    return (
        <div>
            <div className="h-16 md:h-24 px-4 sm:px-6 md:px-8">
                <nav className="h-full flex items-center justify-between">
                    <InertiaLink
                        href={backUrl}
                        className="inline-block p-1 md:p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
                        aria-label="Notifications"
                    >
                        <ArrowNarrowLeftOutlineIcon className="w-6 md:w-8 h-6 md:h-8" />
                    </InertiaLink>

                    <InertiaLink href={$route('backend.home')}>
                        <img className="w-auto h-12 mr-2" src="/png/logos/indigo-circle.png" alt="Hackdawg" />
                    </InertiaLink>
                </nav>
            </div>

            <main className="pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
            </main>

            {message && <Notification message={message} />}
            {!isEmpty(errors) && (
                <Notification
                    message={{
                        title: 'Whooops?!',
                        body: 'Check the fields and try again.',
                        variant: 'error',
                    }}
                />
            )}
        </div>
    );
}
