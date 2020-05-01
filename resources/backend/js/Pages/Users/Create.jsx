import React from 'react';
import Layout from '@backend/Shared/Layouts/Slave';
import useTitle from '@backend/hooks/useTitle';

export default function Create() {
    useTitle('Create User');

    return (
        <Layout>
            <h2>Create user</h2>
        </Layout>
    );
}
