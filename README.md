<p align="center">
  <img src="https://github.com/markusantonwolf/ta-youtube/raw/master/public/img/logo-ta-pagination.png" width="400px" />
</p>

# **TA-Pagination** - content, article and product pagination

**A light-weight, responsive and mobile first content, image, article and product pagination for every kind of application.**

TA-Pagination is designed to fit in every project, in every grid and in every flexbox layout. Thanks to Tailwind CSS everything is customizable and it is very easy to add your own transitions to TA-Pagination if you want to. If you are familiar with Tailwind CSS and Alpine JS you might consider using TA-Pagination. so try it out and if you have some feedback - leave me a message: [@markusantonwolf](https://twitter.com/markusantonwolf) / Twitter.

## Documentation and Examples

[Documentation](https://ta-styled-plugins.com/ta-pagination/)

[Getting started](https://ta-styled-plugins.com/ta-pagination/getting-started/)

[Examples](https://ta-styled-plugins.com/ta-pagination/examples/)

## Features

-   Paginate every content - Choose every kind of content, image, text, table or list.
-   Transitions - You can change the transition for every slide.
-   Autoplay mode - Control the pagination the way you want to
-   Responsive - Define the pagination based on breakpoints
-   Unify heights - Smooth transitions and stable heights of all items
-   Based on Alpine JS - Small footprint and Vue JS inspired, like Tailwind for JavaScript
-   100% Tailwind CSS - Rapidly build modern websites without leaving your HTML

## Install

**From npm:** Install the package.

```bash
# Install using npm

npm install --save-dev @markusantonwolf/ta-pagination

# Install using yarn

yarn add -D @markusantonwolf/ta-pagination
```

## Tailwind CSS plugin

**You can find the complete documentation of the plugin on this page: [Tailwind CSS plugin](https://ta-styled-plugins.com/ta-pagination/tailwind-css-plugin/).**

```js
// tailwind.config.js

const ta_pagination_safelist = require('./node_modules/@markusantonwolf/ta-pagination/src/plugin/safelist');

module.exports = {
    purge: {
        // ...
        options: {
            safelist: [...ta_pagination_safelist],
        },
        // ...
    },
    // ...
    theme: {
        // ...
        taPagination: {
            animations: [
                'swing',
                'spin',
                'swipe',
                'fade',
                'slide',
                'rotate',
                'snake',
                'window',
                'scroll',
                'fold'
            ],
            animation_default: 'swing', // default value
        },
        // ...
    },
    // ...
    variants: {
        // ...
        taPagination: ['responsive'], // default value
        extend: {
            // ...
        },
    },
    // ...
    plugins: [
        require('@markusantonwolf/ta-pagination')({
            respectPrefix: true, // respect prefix option in config: true (default) | false 
            respectImportant: true, // respect important option in config: true (default) | false 
        }),
    ]
    // ...
}
```

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

## All TA StyledPlugins

[TA-Styled-Plugins](https://ta-styled-plugins.com/) - Explore all Tailwind CSS and Alpine JS styled plugins and learn how to enhance your website fast and easy.

## Licence

TA Pagination is released under the [MIT license](https://github.com/markusantonwolf/ta-pagination/blob/master/licence.md) & supports modern environments.

## Copyright

© 2021 Markus A. Wolf
<https://www.markusantonwolf.com>

<img src="https://github.com/markusantonwolf/ta-pagination/raw/master/public/img/logo-ta-styled-plugins.png" width="200px" style="padding-top:2rem;" />
