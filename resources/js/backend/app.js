import { InertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import ReactDOM from 'react-dom';

const app = document.getElementById('app');

window.$route = (...args) => route(...args).url();

ReactDOM.render(
    <InertiaApp
        initialPage={JSON.parse(app.dataset.page)}
        resolveComponent={name => import(`./Pages/${name}`).then(module => module.default)}
    />,
    app,
);
