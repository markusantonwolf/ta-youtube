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
        taYoutube: {
            debug: false,
            aspect_ratios: ['tv', 'wide', 'hd', 'super', 'common', 'modern'],
        },
        extend: {},
    },
    variants: {
        taYoutube: ['responsive'],
    },
    plugins: [require('./src/plugin/index.js')],
}
