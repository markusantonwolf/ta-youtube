module.exports = (config) => {
    const new_utilities = {}

    new_utilities['.ta-youtube'] = {
        '--ta-youtube-aspect-ratio': '1.78',
        position: 'relative',
        width: '100%',
        maxWidth: 'var(--ta-youtube-width, 100%)',
        height: '0px',
        paddingBottom: 'calc(100% / var(--ta-youtube-aspect-ratio))',
        perspective: '1000px',
    }

    let index = 0
    for (index = 0; index < config.aspect_ratios.length; index++) {
        new_utilities['.ta-youtube-aspect-' + config.aspect_ratios[index].name] = {
            '--ta-youtube-aspect-ratio': Number.parseFloat(config.aspect_ratios[index].value).toFixed(3),
            '--ta-youtube-width': '100%',
            height: '0px',
            paddingBottom: 'calc(100% / var(--ta-youtube-aspect-ratio))',
        }
    }

    new_utilities['.ta-youtube-button'] = {
        width: 'calc(100% / var(--ta-youtube-aspect-ratio) * 0.3)',
        height: 'auto',
    }

    new_utilities['.ta-youtube-title'] = {
        position: 'absolute',
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: 'calc(50% + var(--ta-youtube-buttonHeight, 100) / 2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    new_utilities['.ta-youtube-description'] = {
        position: 'absolute',
        left: '0px',
        right: '0px',
        bottom: '0px',
        top: 'calc(50% + var(--ta-youtube-buttonHeight, 100) / 2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    new_utilities['.ta-youtube-background'] = {
        position: 'absolute',
        left: '0px',
        right: '0px',
        bottom: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '0',
    }

    new_utilities['.ta-youtube-gradient'] = {
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '100%',
    }

    new_utilities['.ta-youtube-gradient-dark'] = {
        background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.2) 100%)',
    }

    new_utilities['.ta-youtube-gradient-light'] = {
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
