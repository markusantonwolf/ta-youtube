const { colors } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
    purge: false,
    theme: {
        fontFamily: {
            sans: ['"Raleway"', 'sans-serif'],
        },
        container: {
            center: true,
        },
        height: (theme) => ({
            auto: 'auto',
            ...theme('spacing'),
            full: '100%',
            screen: 'calc(var(--vh) * 100)',
        }),
        minHeight: (theme) => ({
            '0': '0',
            ...theme('spacing'),
            full: '100%',
            screen: 'calc(var(--vh) * 100)',
        }),
        extend: {
            colors: {
                primary: colors.pink[800],
                secondary: colors.blue[800],
                copy: colors.gray[800],
            },
            fontSize: {
                '5xl': '2.5rem',
                '6xl': '2.75rem',
                '7xl': '3rem',
                '8xl': '3.5rem',
            },
            zIndex: {
                '-1': '-1',
            },
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    },
    plugins: [
        require('@tailwindcss/ui'),
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.text-shadow': {
                    textShadow: '1px 1px 0px rgba(0,0,0, 0.6), -1px -1px 0px rgba(0,0,0, 0.2)',
                },
                '.text-shadow-blur': {
                    textShadow: '1px 1px 5px rgba(0,0,0, 0.6), -1px -1px 5px rgba(0,0,0, 0.2)',
                },
                '.text-glow': {
                    textShadow: '1px 1px 1px rgba(255, 255, 255, 0.6), -1px -1px 1px rgba(255, 255, 255, 0.2)',
                },
                '.filter-blur': {
                    filter: 'blur(10px)',
                },
                '.backdrop-blur': {
                    backdropFilter: 'blur(4px)',
                },
            }
            addUtilities(newUtilities, ['responsive', 'hover'])
        }),
    ],
}
