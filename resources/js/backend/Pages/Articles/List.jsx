import React from 'react';
import useTitle from '@/backend/hooks/useTitle';
import Editor from '@/backend/Shared/Editor/Editor';
import Layout from '@/backend/Shared/Layouts/Master';

export default function List() {
    useTitle('Articles');

    return (
        <Layout title="Articles">
            <Editor />
        </Layout>
    );
}
