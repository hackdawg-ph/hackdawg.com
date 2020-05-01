const mix = require('laravel-mix');
const path = require('path');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/backend/js/app.js', 'public/backend/js/app.js')
    .postCss('resources/backend/css/app.css', 'public/backend/css/app.css', [tailwindcss('tailwind.backend.js')])
    .webpackConfig({
        output: {
            chunkFilename: 'backend/js/[name].js?id=[chunkhash]',
        },
    })
    .js('resources/frontend/js/app.js', 'public/frontend/js')
    .postCss('resources/frontend/css/app.css', 'public/frontend/css', [tailwindcss('tailwind.frontend.js')])
    .copy('resources/frontend/fonts', 'public/frontend/fonts')
    .webpackConfig({
        resolve: {
            alias: {
                '@backend': path.resolve('resources/backend/js'),
                '@frontend': path.resolve('resources/frontend/js'),
            },
        },
    })
    .version()
    .sourceMaps();
