function youtube() {
    return {
        active: false,
        url: '',
        hash: '',
        default: {
            base_url: 'https://www.youtube-nocookie.com/embed/',
            remember: true,
            autoplay: false,
            aspect_ratio: '1.78',
            start_at: '',
            button: 'button',
        },
        init: function (id, options) {
            // checks if there are some new options
            if (typeof options !== 'undefined') {
                for (let [key, value] of Object.entries(options)) {
                    this.default[key] = value
                }
            }

            // set aspect ratio as CSS custom property
            this.$el.style.setProperty(`--aspectRatio`, parseFloat(this.default.aspect_ratio))

            // define the url without query string for hash
            this.url = this.default.base_url + id
            this.hash = this.hashCode(window.location.href) + '_' + this.hashCode(this.url)

            // check if the video was actived
            if (localStorage.getItem('youtube_' + this.hash) === 'true' && this.default.remember) {
                this.active = true
                // if autoplay true play video by default
                if (this.default.autoplay) {
                    this.url += '?autoplay=1'
                }
            } else {
                // play video after activation click
                this.url += '?autoplay=1'
            }
            if (typeof this.$refs[this.default.button] !== 'undefined') {
                this.setButtonHeight()

                // event listener to re-define the height of the elements
                window.addEventListener('resize', () => {
                    this.setButtonHeight()
                })
            }
        },
        show() {
            // activate youtube player
            this.active = true

            // if activation should be remembered
            if (this.default.remember) {
                localStorage.setItem('youtube_' + this.hash, 'true')
            }
        },
        setButtonHeight() {
            // defines the height of the playback button as CSS custom property
            const button_height = this.$refs[this.default.button].offsetHeight
            this.$el.style.setProperty(`--buttonHeight`, button_height + 'px')
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
