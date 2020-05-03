import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Avatar from '@backend/Shared/Avatar';
import { InertiaLink } from '@inertiajs/inertia-react';
import SimplePagination from '@backend/Shared/SimplePagination';

Table.propTypes = {
    headings: PropTypes.arrayOf(PropTypes.string).isRequired,
    collection: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.oneOf(['user', 'status', 'text']),
                user: PropTypes.shape({
                    avatarUrl: PropTypes.string,
                    name: PropTypes.string,
                    email: PropTypes.string,
                }),
                status: PropTypes.shape({
                    text: PropTypes.string,
                    variant: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
                }),
                text: PropTypes.string,
            }),
        ),
    ).isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.oneOf(['edit', 'delete']),
                editUrl: PropTypes.string,
                onDeleting: PropTypes.func,
            }),
        ),
    ),
    pagination: PropTypes.shape({
        prevPageUrl: PropTypes.number,
        nextPageUrl: PropTypes.number,
        from: PropTypes.number,
        to: PropTypes.number,
        total: PropTypes.number,
    }).isRequired,
};

export default function Table({ headings, collection, actions, pagination }) {
    return (
        <div className="align-middle inline-block min-w-full mt-3 md:mt-5 shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
                <thead>
                    <tr>
                        {headings.map(heading => (
                            <th
                                key={heading}
                                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {heading}
                            </th>
                        ))}
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {collection.map((item, i) => (
                        <tr key={i}>
                            <React.Fragment>
                                {item.map(({ type, user, text, status }, i) => (
                                    <td key={i} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {type === 'user' ? (
                                            <div className="flex items-center">
                                                <Avatar
                                                    className="flex-shrink-0 w-10 h-10"
                                                    url={user.avatarUrl}
                                                    size="custom"
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm leading-5 font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        ) : type === 'status' ? (
                                            <span
                                                className={cx(
                                                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                                    {
                                                        'bg-blue-100 text-blue-800': status.variant === 'info',
                                                        'bg-green-100 text-green-800': status.variant === 'success',
                                                        'bg-yellow-100 text-yellow-800': status.variant === 'warning',
                                                        'bg-red-100 text-red-800': status.variant === 'danger',
                                                    },
                                                )}
                                            >
                                                {status.text}
                                            </span>
                                        ) : type === 'text' ? (
                                            <span className="text-sm leading-5 text-gray-500">{text}</span>
                                        ) : null}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                    {actions[i].map(({ type, editUrl, onDeleting }) => (
                                        <React.Fragment key={type}>
                                            {type === 'delete' ? (
                                                <button
                                                    onClick={onDeleting}
                                                    className="ml-3 text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            ) : type === 'edit' ? (
                                                <InertiaLink
                                                    href={editUrl}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </InertiaLink>
                                            ) : null}
                                        </React.Fragment>
                                    ))}
                                </td>
                            </React.Fragment>
                        </tr>
                    ))}
                </tbody>
            </table>

            <SimplePagination {...pagination} />
        </div>
    );
}
