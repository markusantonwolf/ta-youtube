const animations = require('./keyframes.json');

module.exports = (config) => {
    var new_keyframes = {};

    for (const property in animations) {
        if (config.animations.indexOf(property) !== -1) {
            new_keyframes['@keyframes ta-pagination-' + property + '-right-in'] = {
                from: {
                    opacity: '0',
                    ...animations[property].rightIn,
                },
                to: {
                    opacity: '1',
                    ...animations[property].default,
                },
            };
            new_keyframes['@keyframes ta-pagination-' + property + '-right-out'] = {
                from: {
                    opacity: '1',
                    ...animations[property].default,
                },
                to: {
                    opacity: '0',
                    ...animations[property].rightOut,
                },
            };
            new_keyframes['@keyframes ta-pagination-' + property + '-left-in'] = {
                from: {
                    opacity: '0',
                    ...animations[property].leftIn,
                },
                to: {
                    opacity: '1',
                    ...animations[property].default,
                },
            };
            new_keyframes['@keyframes ta-pagination-' + property + '-left-out'] = {
                from: {
                    opacity: '1',
                    ...animations[property].default,
                },
                to: {
                    opacity: '0',
                    ...animations[property].leftOut,
                },
            };
        }
    }

    new_keyframes['@keyframes ta-pagination-anim-expand'] = {
        from: {
            opacity: '0',
            transform: 'scale(0.8) rotate3d(1, 0, 0, -180deg) translateZ(0) translateY(-2rem)',
        },
        to: {
            opacity: '1',
            transform: 'scale(1) rotate3d(1, 0, 0, 0deg) translateZ(0) translateY(0rem)',
        },
    };

    new_keyframes['@keyframes ta-pagination-anim-shrink'] = {
        from: {
            opacity: '1',
            transform: 'scale(1) rotate3d(1, 0, 0, 0deg) translateZ(0) translateY(0rem)',
        },
        to: {
            opacity: '0',
            transform: 'scale(0.8) rotate3d(1, 0, 0, -180deg) translateZ(0) translateY(-2rem)',
        },
    };

    return new_keyframes;
};
