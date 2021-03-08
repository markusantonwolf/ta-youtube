module.exports = () => {
    const new_keyframes = {}

    new_keyframes['.ta-youtube-anim-rotate'] = {
        animationName: 'youtube-keyframes-rotate',
        transformOrigin: 'center center',
    }

    new_keyframes['@keyframes youtube-keyframes-rotate'] = {
        '0%': {
            transform: 'scale(1.2) rotate3d(0, 1, 0, 0deg)',
        },
        '25%': {
            transform: 'scale(1.3) rotate3d(0, 1, 0, -10deg)',
        },
        '50%': {
            transform: 'scale(1.2) rotate3d(0, 1, 0, 0deg)',
        },
        '75%': {
            transform: 'scale(1.3) rotate3d(0, 1, 0, 10deg)',
        },
        '100%': {
            transform: 'scale(1.2) rotate3d(0, 1, 0, 0deg)',
        },
    }

    new_keyframes['.ta-youtube-anim-toright'] = {
        animationName: 'youtube-keyframes-toright',
        transformOrigin: 'right center',
    }

    new_keyframes['@keyframes youtube-keyframes-toright'] = {
        '0%': {
            transform: 'scale(1.3) translateX(0)',
        },
        '50%': {
            transform: 'scale(1.2) translateX(5rem)',
        },
        '100%': {
            transform: 'scale(1.3) translateX(0rem)',
        },
    }

    new_keyframes['.ta-youtube-anim-toleft'] = {
        animationName: 'youtube-keyframes-toleft',
        transformOrigin: 'left center',
    }

    new_keyframes['@keyframes youtube-keyframes-toleft'] = {
        '0%': {
            transform: 'scale(1.3) translateX(0)',
        },
        '50%': {
            transform: 'scale(1.2) translateX(-5rem)',
        },
        '100%': {
            transform: 'scale(1.3) translateX(0rem)',
        },
    }

    new_keyframes['.ta-youtube-anim-kenburns'] = {
        animationName: 'youtube-keyframes-kenburns',
    }

    new_keyframes['@keyframes youtube-keyframes-kenburns'] = {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(1.1)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    }

    new_keyframes['.ta-youtube-anim-flight'] = {
        animationName: 'youtube-keyframes-flight',
        transformOrigin: 'top center',
    }

    new_keyframes['@keyframes youtube-keyframes-flight'] = {
        '0%': {
            transform: 'scale(1.1) rotate3d(1, 0, 0, 0deg)',
        },
        '50%': {
            transform: 'scale(1.2) rotate3d(1, 0, 0, 25deg)',
        },
        '100%': {
            transform: 'scale(1.1) rotate3d(1, 0, 0, 0deg)',
        },
    }

    return new_keyframes
}
