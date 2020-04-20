import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, InertiaLink } from '@inertiajs/inertia-react';
import Layout from '@console/Shared/Layouts/Auth';
import Checkbox from '@console/Shared/Checkbox';
import TextInput from '@console/Shared/TextInput';

export default function Login() {
    const { errors } = usePage();

    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false,
    });

    function handleChange(e) {
        e.persist();

        setValues(values => ({
            ...values,
            [e.target.id]:
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post($route('console.login'), values);
    }

    return (
        <Layout title="Sign in to your account" onSubmit={handleSubmit}>
            <div>
                <TextInput
                    id="email"
                    type="email"
                    label="Email address"
                    errors={errors.email}
                    value={values.email}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-6">
                <TextInput
                    id="password"
                    type="password"
                    label="Password"
                    errors={errors.password}
                    value={values.password}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-6 flex items-center justify-between">
                <Checkbox
                    id="remember"
                    label="Remember me"
                    checked={values.remember}
                    onChange={handleChange}
                />
                <InertiaLink
                    href={$route('console.password.request')}
                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
                >
                    Forgot your password?
                </InertiaLink>
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                >
                    Sign in
                </button>
            </div>
        </Layout>
    );
}
