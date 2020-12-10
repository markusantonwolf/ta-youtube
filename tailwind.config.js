module.exports = {
    purge: {
        enabled: false,
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    theme: {
        fontFamily: {
            sans: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
            mono: ['"Fira Code"', 'Consolas', 'Monaco', 'Andale', 'Mono', '"Ubuntu Mon"', 'monospace'],
        },
        extend: {},
    },
    variants: {},
    plugins: [
        require('./src/plugin/index.js')({
            variants: ["responsive"],
            debug: true,
            export: true,
        }),
    ],
}
