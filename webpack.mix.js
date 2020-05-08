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

mix.js('resources/js/backend/app.js', 'public/js/backend/app.js')
    .postCss('resources/css/backend/app.css', 'public/css/backend/app.css', [tailwindcss('tailwind.backend.js')])
    .webpackConfig({
        output: {
            chunkFilename: 'js/backend/[name].js?id=[chunkhash]',
        },
    })
    .js('resources/js/app.js', 'public/js/app.js')
    .postCss('resources/css/app.css', 'public/css/app.css', [tailwindcss('tailwind.frontend.js')])
    .copy('resources/fonts', 'public/fonts')
    .webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve('resources/js'),
            },
        },
    })
    .version()
    .sourceMaps();
