process.env.NODE_CONFIG_DIR = './.config'

const config = require('config')
const gls = require('gulp-live-server')
const { series, watch, parallel } = require('gulp')
const { clean } = require('./.gulp/clean')
const { copy } = require('./.gulp/copy')
const { styles } = require('./.gulp/styles')
const { scripts } = require('./.gulp/scripts')

const WATCH_STYLES = config.get('watch.styles')
const WATCH_SCRIPTS = config.get('watch.scripts')

const watch_changes = () => {
    var server = gls.static('public', 9999)
    server.start()

    watch(WATCH_STYLES, series(styles, copy))
    watch(WATCH_SCRIPTS, series(scripts, copy))
}

exports.build = series(clean, parallel(styles, scripts), copy)
exports.serve = series(clean, parallel(styles, scripts), copy, watch_changes)
