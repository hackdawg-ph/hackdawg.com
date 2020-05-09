const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: {
        content: ['./resources/js/backend/{Pages,Shared}/**/*.jsx', './resources/views/backend/**/*.blade.php'],
        whitelistPatternsChildren: [/nprogress/],
    },
    theme: {
        extend: {
            minWidth: {
                '48': '12rem',
                '56': '14rem',
                '64': '16rem',
            },
            minHeight: {
                '48': '12rem',
                '56': '14rem',
                '64': '16rem',
            },
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/ui')],
};
