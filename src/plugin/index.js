const fs = require('fs')
const plugin = require('tailwindcss/plugin')
const _ = require('lodash')
const { paramCase } = require('change-case')

const defaultOptions = {
    variants: ["responsive"],
    debug: false,
    export: false,
}

module.exports = plugin.withOptions((options = {}) => {
    return function ({ addUtilities }) {
        options = _.defaults({}, options, defaultOptions)

        const new_utilities = {}
        const new_keyframes = {}

        _.merge(new_utilities, getTaYoutubeBase())
        _.merge(new_keyframes, getTaYoutubeAnim())

        if (options.debug === true) {
            console.info(new_utilities)
            console.info(new_keyframes)
        }
        if (options.export === true) {
            fs.writeFile('./public/utilities.css', flattenObject(new_utilities), function (err) {
                if (err) {
                    return console.log(err)
                }
            })
            fs.writeFile('./public/keyframes.css', flattenObject(new_keyframes), function (err) {
                if (err) {
                    return console.log(err)
                }
            })
        }

        addUtilities(new_utilities, {
            variants: options.variants,
        })
        addUtilities(new_keyframes)
    }
})

function getTaYoutubeBase() {
    const new_utilities = {}

    new_utilities['.ta-youtube'] = {
        position: 'relative',
        width: '100%',
        height: '0px',
        paddingBottom: 'calc(100% / var(--aspectRatio, 1.78))',
    }

    new_utilities['.ta-youtube-perspective'] = {
        perspective: '1000px',
    }

    new_utilities['.ta-youtube-button'] = {
        width: 'calc(100% / var(--aspectRatio, 1.78) * 0.3)',
        height: 'auto',
    }

    new_utilities['.ta-youtube-title'] = {
        position: 'absolute',
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: 'calc(50% + var(--buttonHeight, 100) / 2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    new_utilities['.ta-youtube-description'] = {
        position: 'absolute',
        left: '0px',
        right: '0px',
        bottom: '0px',
        top: 'calc(50% + var(--buttonHeight, 100) / 2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    new_utilities['.ta-youtube-gradient-dark'] = {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.2) 100%)',
    }

    new_utilities['.ta-youtube-gradient-light'] = {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background:
            'linear-gradient(0deg, rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0) 50%, rgba(255,255,255, 0.6) 100%), linear-gradient(90deg, rgba(255,255,255, 0.2) 0%, rgba(255,255,255, 0) 50%, rgba(255,255,255, 0.2) 100%)',
    }

    new_utilities['.ta-youtube-anim'] = {
        animationTimingFunction: 'ease-in-out',
        animationDelay: '0s',
        animationFillMode: 'both',
        animationDuration: '20s',
        transformOrigin: 'center center',
        animationIterationCount: 'infinite',
        backfaceVisibility: 'hidden',
    }

    return new_utilities
}

function getTaYoutubeAnim() {
    const new_keyframes = {}

    new_keyframes['.ta-youtube-anim-rotate'] = {
        animationName: 'youtube-keyframes-rotate',
        transformOrigin: 'center center',
    }
    
    new_keyframes['@keyframes youtube-keyframes-rotate'] = {
        "0%": {
            transform: 'scale(1.2) rotate3d(0, 1, 0, 0deg)'
        },
        "25%": {
            transform: 'scale(1.3) rotate3d(0, 1, 0, -10deg)'
        },
        "50%": {
            transform: 'scale(1.2) rotate3d(0, 1, 0, 0deg)'
        },
        "75%": {
            transform: 'scale(1.3) rotate3d(0, 1, 0, 10deg)'
        },
        "100%": {
            transform: 'scale(1.2) rotate3d(0, 1, 0, 0deg)'
        },
    }
    
    new_keyframes['.ta-youtube-anim-toleft'] = {
        animationName: 'youtube-keyframes-toright',
        transformOrigin: 'right center',
    }
    
    new_keyframes['@keyframes youtube-keyframes-toright'] = {
        "0%": {
            transform: 'scale(1.3) translateX(0)'
        },
        "50%": {
            transform: 'scale(1.2) translateX(5rem)'
        },
        "100%": {
            transform: 'scale(1.3) translateX(0rem)'
        },
    }
    
    new_keyframes['.ta-youtube-anim-toleft'] = {
        animationName: 'youtube-keyframes-toleft',
        transformOrigin: 'left center',
    }
    
    new_keyframes['@keyframes youtube-keyframes-toleft'] = {
        "0%": {
            transform: 'scale(1.3) translateX(0)'
        },
        "50%": {
            transform: 'scale(1.2) translateX(-5rem)'
        },
        "100%": {
            transform: 'scale(1.3) translateX(0rem)'
        },
    }
    
    new_keyframes['.ta-youtube-anim-kenburns'] = {
        animationName: 'youtube-keyframes-kenburns',
    }
    
    new_keyframes['@keyframes youtube-keyframes-kenburns'] = {
        "0%": {
            transform: 'scale(1)'
        },
        "50%": {
            transform: 'scale(1.1)'
        },
        "100%": {
            transform: 'scale(1)'
        },
    }
    
    new_keyframes['.ta-youtube-anim-flight'] = {
        animationName: 'youtube-keyframes-flight',
        transformOrigin: 'top center',
    }
    
    new_keyframes['@keyframes youtube-keyframes-flight'] = {
        "0%": {
            transform: 'scale(1.1) rotate3d(1, 0, 0, 0deg)'
        },
        "50%": {
            transform: 'scale(1.2) rotate3d(1, 0, 0, 25deg)'
        },
        "100%": {
            transform: 'scale(1.1) rotate3d(1, 0, 0, 0deg)'
        },
    }

    return new_keyframes
}

function flattenObject(ob) {
    var toReturn = ''
    for (var a in ob) {
        toReturn += a + ' '
        if (typeof ob[a] == 'object' && ob[a] !== null) {
            toReturn += '{' + '\n'
            for (var b in ob[a]) {
                var output = ob[a][b]
                if (_.isObject(ob[a][b])) {
                    output = '\t{' + '\n'
                    for (var c in ob[a][b]) {
                        output += '\t\t' + c + ': ' + ob[a][b][c] + ';\n'
                    }
                    output += '\t}' + '\n'
                }
                if (b.substring(0, 2) === '--') {
                    toReturn += '\t' + b + ': ' + output + ';\n'
                } else if (b.indexOf('%') !== -1) {
                    toReturn += '\t' + b + ' ' + output
                } else {
                    toReturn += '\t' + paramCase(b) + ': ' + output + ';\n'
                }
            }
            toReturn += '}' + '\n'
        }
        toReturn += '\n'
    }
    return toReturn
}
