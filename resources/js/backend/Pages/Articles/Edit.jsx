import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import useTitle from '@/backend/hooks/useTitle';
import Editor from '@/backend/Shared/Editor/Editor';
import Layout from '@/backend/Shared/Layouts/Slave';
import MultipleInput from '@/backend/Shared/MultipleInput';
import TextInput from '@/backend/Shared/TextInput';

export default function Edit() {
    const {
        article,
        tags = [],
        form: { errors },
    } = usePage();

    useTitle('Edit Article');

    const [values, setValues] = useState({
        title: article.title,
        body: article.body,
        tags: article.tags.map(tag => tag.id),
    });

    function updateValue(key, value) {
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    function handleChange(e) {
        e.persist();
        updateValue(e.target.id, e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        return Inertia.patch($route('backend.articles.update', article.slug), values);
    }

    return (
        <Layout backUrl={$route('backend.tags.index')}>
            <form className="w-full md:w-3/4 lg:w-2/3 mx-auto" onSubmit={handleSubmit}>
                <div>
                    <div className="pb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Article</h1>
                        <p className="mt-1 text-sm leading-5 text-gray-600">
                            Assign tags so that the article can have an improved search rankings.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <TextInput
                                id="title"
                                label="Title"
                                value={values.title}
                                onChange={handleChange}
                                errors={errors.title}
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <Editor
                                id="body"
                                label="Body"
                                defaultValue={values.body}
                                onChange={value => updateValue('body', value)}
                                errors={errors.body}
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <MultipleInput
                                id="tags"
                                label="Tags"
                                dataset={tags.map(tag => ({
                                    key: tag.id,
                                    name: tag.name,
                                }))}
                                defaultValue={values.tags}
                                onChange={value => updateValue('tags', value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-5">
                    <div className="flex justify-end">
                        <span className="inline-flex rounded-md shadow-sm">
                            <InertiaLink
                                href={$route('backend.articles.index')}
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
