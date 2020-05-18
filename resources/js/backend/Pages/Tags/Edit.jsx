import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import useForm from '@/backend/hooks/useForm';
import useTitle from '@/backend/hooks/useTitle';
import Layout from '@/backend/Shared/Layouts/Slave';
import TextInput from '@/backend/Shared/TextInput';

export default function Edit() {
    const {
        tag,
        form: { errors },
    } = usePage();

    useTitle('Edit Tag');

    const { values, onChange } = useForm({
        name: tag.name,
        description: tag.description,
    });

    function handleSubmit(e) {
        e.preventDefault();
        return Inertia.patch($route('backend.tags.update', tag), values);
    }

    return (
        <Layout backUrl={$route('backend.tags.index')}>
            <form className="w-full md:w-3/4 lg:w-2/3 mx-auto" onSubmit={handleSubmit}>
                <div>
                    <div className="pb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Tag</h1>
                        <p className="mt-1 text-sm leading-5 text-gray-600">
                            These can be associated to an article, tutorials etc.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <TextInput
                                id="name"
                                label="Name"
                                value={values.name}
                                onChange={onChange}
                                errors={errors.name}
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <TextInput
                                id="description"
                                label="Description"
                                value={values.description}
                                onChange={handleChange}
                                errors={errors.description}
                                multiline
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-5">
                    <div className="flex justify-end">
                        <span className="inline-flex rounded-md shadow-sm">
                            <InertiaLink
                                href={$route('backend.tags.index')}
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
