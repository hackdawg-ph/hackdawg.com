import { InertiaApp } from '@inertiajs/inertia-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { $route } from '@console/helpers';

const app = document.getElementById('app');

window.$route = $route;

ReactDOM.render(
    <InertiaApp
        initialPage={JSON.parse(app.dataset.page)}
        resolveComponent={name =>
            import(`./pages/${name}`).then(module => module.default)
        }
    />,
    app,
);
