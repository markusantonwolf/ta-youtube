<p align="center">
  <img src="https://github.com/markusantonwolf/ta-youtube/raw/master/public/img/logo-ta-youtube.png" width="400px" />
</p>

# **TA-YouTube** - mobile first video wrapper with aspect ratio

**A light-weight, responsive and mobile first YouTube / Vimeo video wrapper with auto playback and aspect ratio for the video player.**

## Demos, Documentation and Examples

[Documentation](https://ta-styled-plugins.com/ta-youtube/)

[Getting started](https://ta-styled-plugins.com/ta-youtube/getting-started/)

[Examples](https://ta-styled-plugins.com/ta-youtube/examples/)

[Configuration](https://ta-styled-plugins.com/ta-youtube/configuration/)

[Tailwind CSS plugin](https://ta-styled-plugins.com/ta-youtube/tailwind-css-plugin/)

## Features

-   No privacy issues - User has to click before video plays
-   Remembers visitor - Stores if visitor clicked to accept
-   Transitions - You can use a great animated preview image
-   Autoplay mode - Optional and if user already accepted
-   Based on Alpine JS - Small footprint and Vue JS inspired, like Tailwind for JavaScript
-   100% Tailwind CSS - Rapidly build modern websites without leaving your HTML

## Install

**From npm:** Install the package.

```bash

# Install using npm

npm install --save-dev @markusantonwolf/ta-gallery

# Install using yarn

yarn add -D @markusantonwolf/ta-gallery
```

**Inside tailwind.config.js:** Add the plugin to your tailwind css config file.

```js
// tailwind.config.js

const ta_youtube_safelist = require('./node_modules/@markusantonwolf/ta-youtube/src/plugin/safelist')

module.exports = {
    purge: {
        // ...
        options: {
            safelist: [...ta_youtube_safelist],
        },
        // ...
    },
    // ...
    theme: {
        // ...
        taYoutube: {
            debug: false, // shows the new component classes in the console while building
            export: false, // writes the new component classes into files ./public/utilities.css & /public/keyframes.css
        },
        // ...
    },
    variants: {
        // ...
        taYoutube: ['responsive'], // empty the array if you don't need a responsive variant
        // ...
    },
    // ...
    plugins: [
        require('@markusantonwolf/ta-youtube')({
            respectPrefix: true, // respect prefix option in config: true (default) | false
            respectImportant: true, // respect important option in config: true (default) | false
        }),
    ],
}
```

## More TA-Styled-Plugins

-   [TA-Styled-Plugins](https://ta-styled-plugins.com/) - Explore all Tailwind CSS and Alpine JS styled plugins and learn how to enhance your website fast and easy.

## Local development

```
// To install dev dependencies run:

npm install

// To start the development server run and go to http://localhost:8888/:

npm run serve

// To make a development build run:

npm run develop

// To make a production build run:

npm run build
```

## Copyright

© 2021 Markus A. Wolf
<https://www.markusantonwolf.com>

<p>
<img src="./public/img/logo-ta-styled-plugins.png" width="160px" style="display:block;padding-top:4rem;" />
</p>
