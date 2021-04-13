const fnc = require('./functions');
const animations = require('./keyframes.json');

module.exports = (config, e) => {
    var new_utilities = {};

    new_utilities['.ta-pagination'] = {
        '--ta-pagination-item-height': 'unset',
        '--ta-pagination-navigation-height': 'unset',
        '--ta-pagination-anim-right-in': 'ta-pagination-' + config.animation_default + '-right-in',
        '--ta-pagination-anim-right-out':
            'ta-pagination-' + config.animation_default + '-right-out',
        '--ta-pagination-anim-left-in': 'ta-pagination-' + config.animation_default + '-left-in',
        '--ta-pagination-anim-left-out': 'ta-pagination-' + config.animation_default + '-left-out',
        '--ta-pagination-anim-shrink': 'ta-pagination-anim-shrink',
        '--ta-pagination-anim-expand': 'ta-pagination-anim-expand',
        '--ta-pagination-anim-duration': '200ms',
        position: 'relative',
        perspective: '1000px',
        perspectiveOrigin: 'center center',
    };

    new_utilities['.ta-pagination-item'] = {
        position: 'relative',
        height: 'var(--ta-pagination-item-height)',
        animationTimingFunction: 'ease-in-out',
        animationDelay: '0s',
        animationFillMode: 'both',
        animationDuration: 'var(--ta-pagination-anim-duration)',
        backfaceVisibility: 'hidden',
    };

    new_utilities['.ta-pagination-lazy'] = {
        objectFit: 'contain',
    };

    new_utilities['.ta-pagination-navigation'] = {
        height: 'var(--ta-pagination-navigation-height)',
    };

    new_utilities['.ta-pagination-item-hidden'] = {
        display: 'none !important',
    };

    new_utilities['.ta-pagination-item-border::before'] = {
        content: '""',
        position: 'absolute',
        left: '-3rem',
        top: '-1rem',
        bottom: '-1rem',
        borderLeft: '2px dashed rgb(94, 101, 104)',
    };

    for (index = 0; index < config.animations.length; index++) {
        const animation = {
            '--ta-pagination-anim-right-in':
                'ta-pagination-' + config.animations[index] + '-right-in',
            '--ta-pagination-anim-right-out':
                'ta-pagination-' + config.animations[index] + '-right-out',
            '--ta-pagination-anim-left-in':
                'ta-pagination-' + config.animations[index] + '-left-in',
            '--ta-pagination-anim-left-out':
                'ta-pagination-' + config.animations[index] + '-left-out',
        };
        if (typeof animations[config.animations[index]] !== 'undefined') {
            if (typeof animations[config.animations[index]].origin !== 'undefined') {
                animation['--ta-pagination-origin-right-in'] =
                    animations[config.animations[index]].origin.rightIn;
                animation['--ta-pagination-origin-right-out'] =
                    animations[config.animations[index]].origin.rightOut;
                animation['--ta-pagination-origin-left-in'] =
                    animations[config.animations[index]].origin.leftIn;
                animation['--ta-pagination-origin-left-out'] =
                    animations[config.animations[index]].origin.leftOut;
            }
        }
        new_utilities['.ta-pagination-anim-' + config.animations[index]] = animation;
    }

    new_utilities['.ta-pagination-anim-right-in'] = {
        transformOrigin: 'var(--ta-pagination-origin-right-in)',
        animationName: 'var(--ta-pagination-anim-right-in)',
        opacity: 0.2,
    };

    new_utilities['.ta-pagination-anim-right-out'] = {
        transformOrigin: 'var(--ta-pagination-origin-right-out)',
        animationName: 'var(--ta-pagination-anim-right-out)',
        opacity: 1,
    };

    new_utilities['.ta-pagination-anim-left-in'] = {
        transformOrigin: 'var(--ta-pagination-origin-left-in)',
        animationName: 'var(--ta-pagination-anim-left-in)',
        opacity: 0.2,
    };

    new_utilities['.ta-pagination-anim-left-out'] = {
        transformOrigin: 'var(--ta-pagination-origin-left-out)',
        animationName: 'var(--ta-pagination-anim-left-out)',
        opacity: 1,
    };

    new_utilities['.ta-pagination-anim-expand'] = {
        animationName: 'var(--ta-pagination-anim-expand)',
        opacity: 1,
    };

    new_utilities['.ta-pagination-anim-shrink'] = {
        animationName: 'var(--ta-pagination-anim-shrink)',
        opacity: 0.2,
    };

    return new_utilities;
};
