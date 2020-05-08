import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import Button from '@/backend/Shared/Button';
import ImagePicker from '@/backend/Shared/ImagePicker';
import Layout from '@/backend/Shared/Layouts/Master';
import Select from '@/backend/Shared/Select';
import TextInput from '@/backend/Shared/TextInput';
import useTitle from '@/backend/hooks/useTitle';

export default function Account() {
    const { countries, form, auth } = usePage();
    useTitle('Account Settings');
    const [values, setValues] = useState(omit(auth.user, ['id']));

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

    function handleSubmitProfile(e) {
        e.preventDefault();

        const data = new FormData();

        data.append('job_title', values.job_title || '');
        data.append('company', values.company || '');
        data.append('website', values.website || '');
        data.append('about', values.about || '');

        if (values.avatar) {
            data.append('avatar', values.avatar);
        }

        Inertia.post($route('backend.account.profile'), data);
    }

    function handleSubmitPersonal(e) {
        e.preventDefault();

        Inertia.post(
            $route('backend.account.personal'),
            pick(values, [
                'first_name',
                'last_name',
                'email',
                'country',
                'state',
                'city',
                'street_address',
                'postal_code',
            ]),
        );
    }

    function handleSubmitPassword(e) {
        e.preventDefault();

        Inertia.post($route('backend.account.password'), pick(values, ['old_password', 'new_password']));
        updateValue('new_password', '');
    }

    return (
        <Layout withHeader={false}>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                            <p className="mt-1 text-sm leading-5 text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmitProfile}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextInput
                                                id="job_title"
                                                label="Job title"
                                                value={values.job_title}
                                                onChange={handleChange}
                                                errors={form.errors.job_title}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <TextInput
                                                id="company"
                                                label="Company"
                                                value={values.company}
                                                onChange={handleChange}
                                                errors={form.errors.company}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <TextInput
                                                id="website"
                                                label="Website"
                                                value={values.website}
                                                onChange={handleChange}
                                                errors={form.errors.website}
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <TextInput
                                                id="about"
                                                label="About"
                                                value={values.about}
                                                onChange={handleChange}
                                                description="Write a few sentences about yourself"
                                                errors={form.errors.about}
                                                multiline
                                                rows={3}
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <ImagePicker
                                                id="avatar"
                                                label="Avatar"
                                                description="File can be PNG, JPG, GIF up to 10MB"
                                                onChange={file => updateValue('avatar', file)}
                                                defaultValue={values.avatar_url}
                                                errors={form.errors.avatar}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <span className="inline-flex rounded-md shadow-sm">
                                        <Button type="submit">Save</Button>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>

            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            <p className="mt-1 text-sm leading-5 text-gray-600">
                                Use a permanent address where you can receive mail.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmitPersonal}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <TextInput
                                                id="first_name"
                                                label="First name"
                                                value={values.first_name}
                                                onChange={handleChange}
                                                errors={form.errors.first_name}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <TextInput
                                                id="last_name"
                                                label="Last name"
                                                value={values.last_name}
                                                onChange={handleChange}
                                                errors={form.errors.last_name}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <TextInput
                                                id="email"
                                                label="Email address"
                                                value={values.email}
                                                onChange={handleChange}
                                                errors={form.errors.email}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <Select
                                                id="country"
                                                label="Country / Region"
                                                options={countries.map(country => ({
                                                    value: country.code,
                                                    label: country.name,
                                                }))}
                                                defaultValue={values.country || 'PH'}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <TextInput
                                                id="street_address"
                                                label="Street address"
                                                value={values.street_address}
                                                onChange={handleChange}
                                                errors={form.errors.street_address}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <TextInput
                                                id="city"
                                                label="City"
                                                value={values.city}
                                                onChange={handleChange}
                                                errors={form.errors.city}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <TextInput
                                                id="state"
                                                label="State / Province"
                                                value={values.state}
                                                onChange={handleChange}
                                                errors={form.errors.state}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <TextInput
                                                id="postal_code"
                                                label="ZIP / Postal"
                                                value={values.postal_code}
                                                onChange={handleChange}
                                                errors={form.errors.postal_code}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Button type="submit">Save</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>

            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Password</h3>
                            <p className="mt-1 text-sm leading-5 text-gray-600">
                                New password must be atleast 8 characters.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmitPassword}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-4">
                                            <TextInput
                                                id="old_password"
                                                type="password"
                                                label="Current password"
                                                value={values.old_password}
                                                onChange={handleChange}
                                                errors={form.errors.old_password}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <TextInput
                                                id="new_password"
                                                type="password"
                                                label="New password"
                                                value={values.new_password}
                                                onChange={handleChange}
                                                errors={form.errors.new_password}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Button type="submit">Save</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
