window.taYoutube = function () {
    return {
        active: false,
        url: '',
        hash: '',
        options: {
            id: '',
            source: 'youtube',
            remember: 'true',
            autoplay: 'false',
            aspect_ratio: 'false',
            start_at: '',
            end_at: '',
            button: 'button',
        },
        init: function (id = '', options = {}) {
            // defines video id
            if (id !== '') {
                this.options.id = id
            }

            // checks if there are some new options
            if (typeof options !== 'object' || options instanceof Array) {
                console.warn('Options are in wrong type - should be object - options been used')
            } else {
                for (let [key, value] of Object.entries(options)) {
                    this.options[key] = value
                }
            }

            // checks if options are defined by data
            for (let [key, value] of Object.entries(this.$el.dataset)) {
                if (typeof this.options[key] !== 'undefined') {
                    this.options[key] = value
                }
            }

            if (this.options.source === 'vimeo') {
                this.url = 'https://player.vimeo.com/video/' + this.options.id
            } else {
                this.url = 'https://www.youtube-nocookie.com/embed/' + this.options.id
            }

            // set aspect ratio as CSS custom property
            if (String(this.options.aspect_ratio).toLowerCase() !== 'false' ) {
                this.$el.style.setProperty(`--ta-youtube-aspect-ratio`, parseFloat(this.options.aspect_ratio))
            }

            // define the url without query string for hash
            this.hash = this.hashCode(window.location.href) + '_' + this.hashCode(this.url)

            // defines the query array for playback options
            const query = []

            // check if the video was actived
            if (localStorage.getItem('youtube_' + this.hash) === 'true' && this.options.remember === 'true') {
                this.active = true
                // if autoplay true play video by default
                if (this.options.autoplay === 'true') {
                    query.push('autoplay=1')
                }
            } else {
                // play video after activation click
                query.push('autoplay=1')
            }
            if (typeof this.$refs[this.options.button] !== 'undefined') {
                this.setButtonHeight()

                // event listener to re-define the height of the botton
                window.addEventListener('resize', () => {
                    this.setButtonHeight()
                })
            }

            // adds start position to video
            if (this.options.start_at !== '') {
                query.push('start=' + this.options.start_at)
            }

            // adds end position to video
            if (this.options.end_at !== '') {
                query.push('end=' + this.options.end_at)
            }

            // adds options to the video url
            if (query.length > 0) {
                this.url += '?' + query.join('&')
            }
        },
        show() {
            // activate youtube player
            this.active = true

            // if activation should be remembered
            if (this.options.remember) {
                localStorage.setItem('youtube_' + this.hash, 'true')
            }
        },
        setButtonHeight() {
            // defines the height of the playback button as CSS custom property
            const button_height = this.$refs[this.options.button].offsetHeight
            this.$el.style.setProperty(`--ta-youtube-buttonHeight`, button_height + 'px')
        },
        hashCode(string) {
            var hash = 0,
                i,
                chr
            for (i = 0; i < string.length; i++) {
                chr = string.charCodeAt(i)
                hash = (hash << 5) - hash + chr
                hash |= 0
            }
            return hash
        },
    }
}
