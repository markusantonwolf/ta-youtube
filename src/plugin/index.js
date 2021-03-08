const fs = require('fs')
const plugin = require('tailwindcss/plugin')
const fnc = require('./functions')
const _ = require('lodash')
const utilities = require('./utilities')
const keyframes = require('./keyframes')

const ta_config_defaults = {
    aspect_ratios: [],
    debug: false,
    export: false,
}

const ta_components_defaults = {
    variants: ['responsive'],
    respectPrefix: false,
    respectImportant: true,
}

const aspect_ratios = {
    square: 1 / 1,
    movietone: 6 / 5,
    large: 5 / 4,
    tv: 4 / 3,
    academy: 11 / 8,
    imax: 1.43 / 1,
    classic: 3 / 2,
    still: 3 / 2,
    modern: 14 / 9,
    common: 16 / 10,
    golden: 1.618 / 1,
    super: 5 / 3,
    hd: 16 / 9,
    wide: 1.85 / 1,
}

if (process.env.NODE_ENV === 'test') {
    ;(ta_config_defaults.aspect_ratios = ['classic', 'modern', 'common', 'super', 'hd', 'wide', { instagram: 3 / 5 }]),
        (ta_config = configAspectRatios(ta_config_defaults))

    const new_utilities = {}
    const new_keyframes = {}

    _.merge(new_utilities, utilities(ta_config))
    _.merge(new_keyframes, keyframes())

    fs.writeFile('./ta-youtube-utilities.css', fnc.flattenObject(new_utilities), function (err) {
        if (err) {
            return console.log(err)
        }
    })
    fs.writeFile('./ta-youtube-keyframes.css', fnc.flattenObject(new_keyframes), function (err) {
        if (err) {
            return console.log(err)
        }
    })
    console.info('ta_config', ta_config)
    console.info('new_utilities', new_utilities)
    console.info('new_keyframes', new_keyframes)
}

if (process.env.NODE_ENV === 'production') {
    for (const key in aspect_ratios) {
        if (Object.hasOwnProperty.call(aspect_ratios, key)) {
            ta_config_defaults.aspect_ratios.push(key)
        }
    }
    ta_config = configAspectRatios(ta_config_defaults)

    const new_utilities = {}

    _.merge(new_utilities, utilities(ta_config))
    _.merge(new_utilities, keyframes())

    fs.writeFile('./src/styles/ta-youtube.css', fnc.flattenObject(new_utilities), function (err) {
        if (err) {
            return console.log(err)
        }
    })
}

module.exports = plugin.withOptions((options = {}) => {
    return function ({ addComponents, theme, variants }) {
        const ta_config = configAspectRatios(_.defaultsDeep({}, theme('taYoutube'), ta_config_defaults))
        const ta_components = _.defaultsDeep(options, { variants: variants('taYoutube') }, ta_components_defaults)

        const new_utilities = {}
        const new_keyframes = {}

        _.merge(new_utilities, utilities(ta_config))
        _.merge(new_keyframes, keyframes())

        if (ta_config.debug === true) {
            console.info(new_utilities)
            console.info(new_keyframes)
        }
        if (ta_config.export === true) {
            fs.writeFile('./public/utilities.css', fnc.flattenObject(new_utilities), function (err) {
                if (err) {
                    return console.log(err)
                }
            })
            fs.writeFile('./public/keyframes.css', fnc.flattenObject(new_keyframes), function (err) {
                if (err) {
                    return console.log(err)
                }
            })
        }

        addComponents(new_utilities, ta_components)
        addComponents(new_keyframes, {
            variants: [],
            respectPrefix: ta_components.respectPrefix,
            respectImportant: ta_components.respectImportant,
        })
    }
})

function configAspectRatios(config) {
    let index = 0
    for (index = 0; index < config.aspect_ratios.length; index++) {
        if (typeof config.aspect_ratios[index] === 'string') {
            if (typeof aspect_ratios[config.aspect_ratios[index]] !== 'undefined') {
                config.aspect_ratios[index] = {
                    name: config.aspect_ratios[index],
                    value: aspect_ratios[config.aspect_ratios[index]],
                }
            }
        } else {
            for (const key in config.aspect_ratios[index]) {
                if (Object.hasOwnProperty.call(config.aspect_ratios[index], key)) {
                    config.aspect_ratios[index] = {
                        name: key,
                        value: config.aspect_ratios[index][key],
                    }
                }
            }
        }
    }
    return config
}
