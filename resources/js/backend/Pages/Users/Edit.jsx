import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import pick from 'lodash/pick';
import useTitle from '@/backend/hooks/useTitle';
import Layout from '@/backend/Shared/Layouts/Slave';
import Select from '@/backend/Shared/Select';
import TextInput from '@/backend/Shared/TextInput';

export default function Edit() {
    const {
        countries,
        user,
        form: { errors },
    } = usePage();

    useTitle('Edit User');

    const [values, setValues] = useState(
        pick(user, ['first_name', 'last_name', 'email', 'country', 'state', 'city', 'street_address', 'postal_code']),
    );

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
        return Inertia.patch($route('backend.users.update', user), values);
    }

    return (
        <Layout backUrl={$route('backend.users.index')}>
            <form className="w-full md:w-3/4 lg:w-2/3 mx-auto" onSubmit={handleSubmit}>
                <div className="pb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Edit User</h1>
                    <p className="mt-1 text-sm leading-5 text-gray-600">
                        Use a permanent address where the user can receive mail.
                    </p>
                </div>

                <div>
                    <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <TextInput
                                id="first_name"
                                label="First name"
                                value={values.first_name}
                                onChange={handleChange}
                                errors={errors.first_name}
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <TextInput
                                id="last_name"
                                label="Last name"
                                value={values.last_name}
                                onChange={handleChange}
                                errors={errors.last_name}
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <TextInput
                                type="email"
                                id="email"
                                label="Email address"
                                value={values.email}
                                onChange={handleChange}
                                errors={errors.email}
                            />
                        </div>

                        <div className="sm:col-span-3">
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

                        <div className="sm:col-span-6">
                            <TextInput
                                id="street_address"
                                label="Street address"
                                value={values.street_address}
                                onChange={handleChange}
                                errors={errors.street_address}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <TextInput
                                id="city"
                                label="City"
                                value={values.city}
                                onChange={handleChange}
                                errors={errors.city}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <TextInput
                                id="state"
                                label="State / Province"
                                value={values.state}
                                onChange={handleChange}
                                errors={errors.state}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <TextInput
                                id="postal_code"
                                label="ZIP / Postal"
                                value={values.postal_code}
                                onChange={handleChange}
                                errors={errors.postal_code}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-5">
                    <div className="flex justify-end">
                        <span className="inline-flex rounded-md shadow-sm">
                            <InertiaLink
                                href={$route('backend.users.index')}
                                className="inline-block py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                            >
                                Cancel
                            </InertiaLink>
                        </span>
                        <span className="ml-3 inline-flex rounded-md shadow-sm">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                Update
                            </button>
                        </span>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
