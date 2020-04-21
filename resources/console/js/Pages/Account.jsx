import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import pick from 'lodash/pick';
import Button from '@console/Shared/Button';
import Layout from '@console/Shared/Layouts/Master';
import TextInput from '@console/Shared/TextInput';

export default function Account() {
    const { errors, auth } = usePage();

    const [values, setValues] = useState(
        pick(auth.user, ['name', 'email', 'username', 'about']),
    );

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
        Inertia.patch($route('console.account'), values);
    }

    return (
        <Layout>
            <form className="w-full lg:w-2/3 mx-auto" onSubmit={handleSubmit}>
                <div>
                    <h4 className="text-xl font-medium leading-10">Profile</h4>
                    <p className="text-gray-500">
                        This information will be displayed publicly so be
                        careful what you share
                    </p>
                </div>

                <div className="w-2/3 mt-6">
                    <TextInput
                        id="username"
                        label="Username"
                        value={values.username}
                        onChange={handleChange}
                        errors={errors.username}
                    />
                </div>

                <div className="mt-6">
                    <TextInput
                        id="about"
                        label="About"
                        value={values.about}
                        onChange={handleChange}
                        description="Write a few sentences about yourself"
                        errors={errors.about}
                        multiline
                        rows={3}
                    />
                </div>

                <div className="my-8 border-b"></div>

                <div className="mt-6">
                    <h4 className="text-xl font-medium leading-10">
                        Personal Information
                    </h4>
                    <p className="text-gray-500">
                        Use a permanent address where you can recieve email
                    </p>
                </div>

                <div className="w-1/2 mt-6">
                    <TextInput
                        id="name"
                        label="Name"
                        value={values.name}
                        onChange={handleChange}
                        errors={errors.name}
                    />
                </div>

                <div className="w-2/3 mt-6">
                    <TextInput
                        id="email"
                        label="Email address"
                        value={values.email}
                        onChange={handleChange}
                        errors={errors.email}
                    />
                </div>

                <div className="my-8 border-b"></div>

                <div className="flex justify-end">
                    <Button variant="secondary">Cancel</Button>
                    <Button className="ml-3" type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Layout>
    );
}
