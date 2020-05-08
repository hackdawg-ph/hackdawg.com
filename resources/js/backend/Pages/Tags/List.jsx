import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import useTitle from '@/backend/hooks/useTitle';
import Button from '@/backend/Shared/Button';
import Layout from '@/backend/Shared/Layouts/Master';
import Table from '@/backend/Shared/Table';

export default function List() {
    const { tags } = usePage();
    useTitle('Tags');

    return (
        <Layout
            title="Tags"
            headerActions={
                <span className="shadow-sm rounded-md">
                    <Button onClick={() => Inertia.visit($route('backend.tags.create'))}>Create</Button>
                </span>
            }
        >
            <div className="flex flex-col">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <Table
                        headings={['Name', 'Description']}
                        collection={tags.data.map(tag => [
                            {
                                type: 'text',
                                text: tag.name,
                            },
                            {
                                type: 'text',
                                text: tag.description,
                            },
                        ])}
                        actions={tags.data.map(tag => [
                            {
                                type: 'edit',
                                action: $route('backend.tags.edit', tag),
                            },
                            {
                                type: 'delete',
                                action: $route('backend.tags.destroy', tag),
                            },
                        ])}
                        pagination={{
                            prevPageUrl: tags.prev_page_url,
                            nextPageUrl: tags.next_page_url,
                            from: tags.from,
                            to: tags.to,
                            total: tags.total,
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
}
