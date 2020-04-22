import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '@console/Shared/Layouts/Master';

export default function Home() {
    const { auth } = usePage();

    return (
        <Layout title={'Welcome ' + auth.user.name} pageTitle="Dashboard">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
        </Layout>
    );
}