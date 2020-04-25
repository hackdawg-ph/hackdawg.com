import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import Button from '@backend/Shared/Button';
import Layout from '@backend/Shared/Layouts/Auth';
import Checkbox from '@backend/Shared/Checkbox';
import TextInput from '@backend/Shared/TextInput';

export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false,
    });

    function handleChange(e) {
        e.persist();

        setValues(values => ({
            ...values,
            [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post($route('backend.login'), values);
    }

    return (
        <Layout title="Sign in to your account">
            <form onSubmit={handleSubmit}>
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        label="Email address"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-6">
                    <TextInput
                        id="password"
                        type="password"
                        label="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <Checkbox id="remember" label="Remember me" checked={values.remember} onChange={handleChange} />
                    <InertiaLink
                        href={$route('backend.password.request')}
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        Forgot your password?
                    </InertiaLink>
                </div>

                <div className="mt-6">
                    <Button className="w-full flex justify-center" type="submit">
                        Sign in
                    </Button>
                </div>
            </form>
        </Layout>
    );
}
