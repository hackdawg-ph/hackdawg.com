import React from 'react';
import Layout from '@/backend/Shared/Layouts/Master';
import useTitle from '@/backend/hooks/useTitle';

export default function List() {
    useTitle('Articles');

    return (
        <Layout title="Articles">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </Layout>
    );
}
