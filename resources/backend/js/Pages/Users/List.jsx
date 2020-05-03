import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '@backend/Shared/Layouts/Master';
import Button from '@backend/Shared/Button';
import Table from '@backend/Shared/Table';
import useTitle from '@backend/hooks/useTitle';

export default function List() {
    const { users } = usePage();
    useTitle('Users');

    return (
        <Layout
            title="User List"
            headerActions={
                <span className="shadow-sm rounded-md">
                    <Button onClick={() => Inertia.visit($route('backend.users.create'))}>Create</Button>
                </span>
            }
        >
            <div className="flex flex-col">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <Table
                        headings={['Name', 'Title', 'Status', 'Role']}
                        collection={users.data.map(user => [
                            {
                                type: 'user',
                                user: {
                                    avatarUrl: user.avatar_url,
                                    name: user.name,
                                    email: user.email,
                                },
                            },
                            {
                                type: 'text',
                                text: user.job_title,
                            },
                            {
                                type: 'status',
                                status: {
                                    variant: 'success',
                                    text: 'Active',
                                },
                            },
                            {
                                type: 'text',
                                text: user.role_name,
                            },
                        ])}
                        actions={users.data.map(user => [
                            {
                                type: 'edit',
                                action: $route('backend.users.edit', user),
                            },
                            {
                                type: 'delete',
                                action: $route('backend.users.destroy', user),
                            },
                        ])}
                        pagination={{
                            prevPageUrl: users.prev_page_url,
                            nextPageUrl: users.next_page_url,
                            from: users.from,
                            to: users.to,
                            total: users.total,
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
}
