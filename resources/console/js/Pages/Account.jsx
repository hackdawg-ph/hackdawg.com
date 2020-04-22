import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import pick from 'lodash/pick';
import Button from '@console/Shared/Button';
import Layout from '@console/Shared/Layouts/Master';
import TextInput from '@console/Shared/TextInput';

export default function Account() {
    const { errors, auth } = usePage();

    const [values, setValues] = useState(pick(auth.user, ['name', 'email', 'username', 'about']));

    function handleChange(e) {
        e.persist();

        setValues(values => ({
            ...values,
            [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.patch($route('console.account'), values);
    }

    return (
        <Layout title="Account Settings" white>
            <form onSubmit={handleSubmit} className="md:w-3/4 md:mx-auto">
                <div>
                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                            <p className="mt-1 text-sm leading-5 text-gray-500">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <TextInput
                                    id="username"
                                    label="Username"
                                    addOn="www.hackdawg.com/"
                                    value={values.username}
                                    onChange={handleChange}
                                    errors={errors.username}
                                />
                            </div>

                            <div className="sm:col-span-6">
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

                            <div className="sm:col-span-6">
                                <label htmlFor="photo" className="block text-sm leading-5 font-medium text-gray-700">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center">
                                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                        <svg
                                            className="h-full w-full text-gray-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </span>
                                    <span className="ml-5 rounded-md shadow-sm">
                                        <button
                                            type="button"
                                            className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                                        >
                                            Change
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-8">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm leading-5 text-gray-500">
                                Use a permanent address where you can receive mail.
                            </p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <TextInput
                                    id="name"
                                    label="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    errors={errors.name}
                                />
                            </div>
                            <div className="sm:col-span-4">
                                <TextInput
                                    id="email"
                                    label="Email address"
                                    value={values.email}
                                    onChange={handleChange}
                                    errors={errors.email}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-5">
                    <div className="flex justify-end">
                        <span className="inline-flex rounded-md shadow-sm">
                            <Button variant="secondary">Cancel</Button>
                        </span>
                        <span className="ml-3 inline-flex rounded-md shadow-sm">
                            <Button type="submit">Save</Button>
                        </span>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
