const cssImport = require('postcss-import')
const cssNesting = require('postcss-nesting')
const mix = require('laravel-mix')
const path = require('path')
const purgecss = require('@fullhuman/postcss-purgecss')
const tailwindcss = require('tailwindcss')

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

mix.js('resources/console/js/app.js', 'public/console/js/app.js')
    .postCss('resources/console/css/app.css', 'public/console/css/app.css')
    .js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css')
    .options({
        postCss: [
            cssImport(),
            cssNesting(),
            tailwindcss('tailwind.config.js'),
            ...mix.inProduction() ? [
                purgecss({
                    content: [
                        './resources/console/js/Pages/**/*.jsx',
                        './resources/console/views/**/*.blade.php',
                        './resources/views/**/*.blade.php',
                    ],
                    defaultExtractor: content => content.match(/[\w-/:.]+(?<!:)/g) || [],
                    whitelistPatternsChildren: [/nprogress/],
                }),
            ] : [],
        ]
    })
    .webpackConfig({
        resolve: {
            alias: {
                '@console': path.resolve('resources/console/js'),
                '@': path.resolve('resources/js'),
            },
        },
    })
    .version()
    .sourceMaps()
