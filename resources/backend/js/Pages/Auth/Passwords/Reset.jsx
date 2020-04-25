import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Button from '@backend/Shared/Button';
import Layout from '@backend/Shared/Layouts/Auth';
import TextInput from '@backend/Shared/TextInput';

export default function Reset() {
    const { token } = usePage();
    const [values, setValues] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleChange(e) {
        e.persist();

        setValues(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await Inertia.post($route('backend.password.update'), {
            ...values,
            token,
        });
        setValues({ email: '' });
    }

    return (
        <Layout title="Reset Password">
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

                <div className="mt-6">
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        label="Confirm password"
                        value={values.password_confirmation}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div></div>
                    <InertiaLink
                        href={$route('backend.login')}
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                        Back to login
                    </InertiaLink>
                </div>

                <div className="mt-6">
                    <Button className="w-full flex justify-center" type="submit">
                        Reset Password
                    </Button>
                </div>
            </form>
        </Layout>
    );
}
