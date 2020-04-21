const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        customForms: theme => ({
            default: {
                'input, textarea, multiselect': {
                    boxShadow: theme('boxShadow.sm'),
                    borderRadius: theme('borderRadius.md'),
                    borderColor: theme('colors.gray.300'),
                    '&:focus': {
                        boxShadow: theme('boxShadow.outline-indigo'),
                        borderColor: theme('colors.indigo.500'),
                    }
                }
            },
            danger: {
                'input, textarea, multiselect, checkbox, radio': {
                    borderColor: theme('colors.red.400'),
                    color: theme('colors.red.800'),
                    '&:focus': {
                        boxShadow: theme('boxShadow.outline-red'),
                        borderColor: theme('colors.red.500'),
                    }
                },
            }
        }),
        extend: {
            boxShadow: {
                'outline-red': '0 0 0 3px rgba(229, 62, 62, 0.5)',
                'outline-indigo': '0 0 0 3px rgba(89, 100, 224, 0.5)'
            },
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/ui')
    ],
}
