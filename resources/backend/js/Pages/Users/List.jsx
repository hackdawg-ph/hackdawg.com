import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Avatar from '@backend/Shared/Avatar';
import Layout from '@backend/Shared/Layouts/Master';
import SimplePagination from '@backend/Shared/SimplePagination';
import Button from '@backend/Shared/Button';
import useTitle from '@backend/hooks/useTitle';

export default function List() {
    const { users } = usePage();
    useTitle('Users');

    return (
        <Layout
            pageTitle="User List"
            headerActions={
                <span className="shadow-sm rounded-md">
                    <Button onClick={() => Inertia.visit($route('backend.users.create'))}>Create</Button>
                </span>
            }
        >
            <div className="flex flex-col">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block min-w-full mt-3 md:mt-5 shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {users.data.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
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
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">Director</div>
                                            <div className="text-sm leading-5 text-gray-500">Human Resources</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                            Owner
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <SimplePagination
                            prevPageUrl={users.prev_page_url}
                            nextPageUrl={users.next_page_url}
                            from={users.from}
                            to={users.to}
                            total={users.total}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
