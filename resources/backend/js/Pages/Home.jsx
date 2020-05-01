import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '@backend/Shared/Layouts/Master';
import useTitle from '@backend/hooks/useTitle';

export default function Home() {
    const { auth } = usePage();
    useTitle('Welcome ' + auth.user.first_name);

    return (
        <Layout pageTitle="Dashboard" withHeader={false}>
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </Layout>
    );
}
