import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import pick from 'lodash/pick';
import Button from '@console/Shared/Button';
import ImagePicker from '@console/Shared/ImagePicker';
import Layout from '@console/Shared/Layouts/Master';
import TextInput from '@console/Shared/TextInput';

export default function Account() {
    const { errors, auth } = usePage();

    const [values, setValues] = useState(pick(auth.user, ['username', 'about', 'avatarUrl', 'name', 'email']));

    function updateValue(key, value) {
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    function handleChange(e) {
        e.persist();
        updateValue(e.target.id, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();

        for (let key in values) {
            data.append(key, values[key]);
        }

        Inertia.post($route('console.account'), data);
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
                                <ImagePicker
                                    id="avatar"
                                    label="Avatar"
                                    description="File can be PNG, JPG, GIF up to 10MB"
                                    onChange={file => updateValue('avatar', file)}
                                    defaultValue={values.avatarUrl}
                                    errors={errors.avatar}
                                />
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="cover_photo"
                                    className="block text-sm leading-5 font-medium text-gray-700"
                                >
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <p className="mt-1 text-sm text-gray-600">
                                            <button
                                                type="button"
                                                className="mr-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                                            >
                                                Upload a file
                                            </button>
                                            or drag and drop
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
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
