import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Layout({ children }) {
    return (
        <main>
            <header>
                <nav>
                    <InertiaLink href="/">Home</InertiaLink>
                    <InertiaLink href="/users">Users</InertiaLink>
                </nav>
            </header>
            {children}
            <footer></footer>
        </main>
    );
}
