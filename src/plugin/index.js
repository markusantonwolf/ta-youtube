const plugin = require('tailwindcss/plugin');
const fnc = require('./functions');
const utilities = require('./utilities');
const keyframes = require('./keyframes');
const fs = require('fs');
const _ = require('lodash');

const ta_config_defaults = {
    animations: [
        'swing',
        'spin',
        'swipe',
        'fade',
        'slide',
        'rotate',
        'snake',
        'window',
        'scroll',
        'fold',
    ],
    animation_default: 'swing',
    debug: false,
    export: false,
};

const ta_plugin_defaults = {
    variants: ['responsive'],
    respectPrefix: false,
    respectImportant: true,
};

if (process.env.NODE_ENV === 'test') {
    const new_utilities = {};
    const new_keyframes = {};

    _.merge(new_utilities, utilities(ta_config_defaults));
    _.merge(new_keyframes, keyframes(ta_config_defaults));
    fs.writeFile('./ta-pagination-utilities.css', fnc.flattenObject(new_utilities), function (err) {
        if (err) {
            return console.log(err);
        }
    });
    fs.writeFile('./ta-pagination-keyframes.css', fnc.flattenObject(new_keyframes), function (err) {
        if (err) {
            return console.log(err);
        }
    });
    console.info('new_utilities', new_utilities);
    console.info('new_keyframes', new_keyframes);
}

if (process.env.NODE_ENV === 'production') {
    const new_utilities = {};

    _.merge(new_utilities, utilities(ta_config_defaults));
    _.merge(new_utilities, keyframes(ta_config_defaults));

    fs.writeFile(
        './src/styles/ta-pagination.css',
        fnc.flattenObject(new_utilities),
        function (err) {
            if (err) {
                return console.log(err);
            }
        }
    );
}

module.exports = plugin.withOptions((options = {}) => {
    return function ({ addComponents, theme, variants, config, postcss }) {
        const ta_config = _.defaultsDeep({}, theme('taPagination'), ta_config_defaults);
        const ta_plugin = _.defaultsDeep(
            options,
            { variants: variants('taPagination') },
            ta_plugin_defaults
        );

        const new_utilities = {};
        const new_keyframes = {};

        _.merge(new_utilities, utilities(ta_config));
        _.merge(new_keyframes, keyframes(ta_config));

        addComponents(new_utilities, ta_plugin);
        addComponents(new_keyframes, {
            variants: [],
            respectPrefix: ta_plugin.respectPrefix,
            respectImportant: ta_plugin.respectImportant,
        });
    };
});
