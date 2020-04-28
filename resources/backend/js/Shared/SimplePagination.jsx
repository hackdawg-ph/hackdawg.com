import React from 'react';
import PropTypes from 'prop-types';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function SimplePagination({ prevPageUrl = null, nextPageUrl = null, from, to, total }) {
    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:block">
                <p className="text-sm leading-5 text-gray-700">
                    Showing <span className="font-medium">{from + ' '}</span>
                    to <span className="font-medium">{to + ' '}</span>
                    of <span className="font-medium">{total + ' '}</span>
                    results
                </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
                {prevPageUrl !== null && (
                    <InertiaLink
                        href={prevPageUrl}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    >
                        Previous
                    </InertiaLink>
                )}

                {nextPageUrl !== null && (
                    <InertiaLink
                        href={nextPageUrl}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    >
                        Next
                    </InertiaLink>
                )}
            </div>
        </div>
    );
}

SimplePagination.propTypes = {
    prevPageUrl: PropTypes.string,
    nextPageUrl: PropTypes.string,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};
