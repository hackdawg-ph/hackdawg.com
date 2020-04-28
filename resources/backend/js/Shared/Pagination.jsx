import React from 'react';
import PropTypes from 'prop-types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import cx from 'classnames';
import range from 'lodash/range';
import ChevronLeftIcon from '@backend/Shared/Icons/ChevronLeft';
import ChevronRightIcon from '@backend/Shared/Icons/ChevronRight';

export default function Pagination({ prevPageUrl = null, nextPageUrl = null, from, to, currentPage, lastPage, total }) {
    function firstPageLeft() {
        return currentPage > 3 ? currentPage - 2 : 1;
    }

    function firstPageRight() {
        return lastPage - currentPage > 2 ? lastPage - 2 : currentPage + 1;
    }

    function hasMore() {
        return lastPage - currentPage >= 1;
    }

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <InertiaLink
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    href={prevPageUrl}
                >
                    Previous
                </InertiaLink>
                <InertiaLink
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    href={nextPageUrl}
                >
                    Next
                </InertiaLink>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm leading-5 text-gray-700">
                        Showing&nbsp;
                        <span className="font-medium">{from}&nbsp;</span>
                        to&nbsp;
                        <span className="font-medium">{to}&nbsp;</span>
                        of&nbsp;
                        <span className="font-medium">{total}&nbsp;</span>
                        results
                    </p>
                </div>

                {lastPage > 1 && (
                    <div>
                        <span className="relative z-0 inline-flex">
                            {prevPageUrl !== null && (
                                <button
                                    type="button"
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                    onClick={() => Inertia.visit(prevPageUrl)}
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </button>
                            )}

                            {range(firstPageLeft(), firstPageLeft() + 3).map(page => (
                                <button
                                    key={page}
                                    type="button"
                                    className={cx(
                                        '-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150',
                                        {
                                            'text-gray-700 hover:text-gray-500': page !== currentPage,
                                            'text-indigo-600': page === currentPage,
                                        },
                                    )}
                                    onClick={() => Inertia.visit(`${$route()}?page=${page}`)}
                                >
                                    {page}
                                </button>
                            ))}

                            {hasMore() && (
                                <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                    ...
                                </span>
                            )}

                            {hasMore() &&
                                range(firstPageRight(), lastPage + 1).map(page => (
                                    <button
                                        key={page}
                                        type="button"
                                        className={cx(
                                            '-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150',
                                            {
                                                'text-gray-700 hover:text-gray-500': page !== currentPage,
                                                'text-indigo-600': page === currentPage,
                                            },
                                        )}
                                        onClick={() => Inertia.visit(`${$route()}?page=${page}`)}
                                    >
                                        {page}
                                    </button>
                                ))}

                            {nextPageUrl !== null && (
                                <button
                                    type="button"
                                    className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                    onClick={() => Inertia.visit(nextPageUrl)}
                                >
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            )}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

Pagination.propTypes = {
    prevPageUrl: PropTypes.string,
    nextPageUrl: PropTypes.string,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};
