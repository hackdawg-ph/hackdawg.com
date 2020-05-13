import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import useTitle from '@/backend/hooks/useTitle';
import Button from '@/backend/Shared/Button';
import Layout from '@/backend/Shared/Layouts/Master';
import Table from '@/backend/Shared/Table';

export default function List() {
    const { articles } = usePage();
    useTitle('Articles');

    return (
        <Layout
            title="Articles"
            headerActions={
                <span className="shadow-sm rounded-md">
                    <Button onClick={() => Inertia.visit($route('backend.articles.create'))}>Create</Button>
                </span>
            }
        >
            <div className="flex flex-col">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <Table
                        headings={['Title', 'Tags', 'Published']}
                        collection={articles.data.map(article => [
                            {
                                type: 'text',
                                text: article.title,
                            },
                            {
                                type: 'text',
                                text: article.tags.map(tag => tag.name).join(', '),
                            },
                            {
                                type: 'text',
                                text: article.published_since,
                            },
                        ])}
                        actions={articles.data.map(article => [
                            {
                                type: 'edit',
                                action: $route('backend.articles.edit', article.slug),
                            },
                            {
                                type: 'delete',
                                action: $route('backend.articles.destroy', article.slug),
                            },
                        ])}
                        pagination={{
                            prevPageUrl: articles.prev_page_url,
                            nextPageUrl: articles.next_page_url,
                            from: articles.from,
                            to: articles.to,
                            total: articles.total,
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
}
