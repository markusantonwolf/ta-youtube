<p align="center">
  <img src="https://github.com/markusantonwolf/ta-youtube/raw/master/public/img/logo-ta-youtube.png" width="400px" />
</p>

# TA-YouTube

A light-weight, responsive and mobile first YouTube and Vimeo video wrapper with auto playback and aspect ratio for the video player. Perfect for solving data protection issues in some countries as the YouTube / Vimeo player loads after the visitor presses the play button.

TA-YouTube is based on Alpine JS and Tailwind CSS. 100% customizable and with endless animation options. If you already use Alpine JS and Tailwind CSS in your project you might consider using this video wrapper to avoid autoload the YouTube player and solve privacy issues.

## Demos and documentation

[DEMO](https://ta-youtube.markusantonwolf.com) | [DOCU](https://ta-youtube.markusantonwolf.com) | [REALWORLD](https://www.markusantonwolf.com/en/blog/alpine-js)

For more details about the TA-YouTube take a look at <https://ta-youtube.markusantonwolf.com> and if you want to see a real world example you can find it on my homepage: <https://www.markusantonwolf.com/en/blog/alpine-js>

## Features

-   YouTube video wrapper
-   Vimeo video wrapper
-   No privacy issues because Video player loads after pressing playback button
-   Tailwind CSS plugin
-   Stores playback state
-   Customizable animations - CSS animations
-   Title, description and background images
-   Small file sizes JS = 3,3 kByte
-   CSS + Animation = 1,4 kByte
-   Based on Alpine JS and Tailwind CSS

## Install

**From npm:** Install the package.
```js
npm install @markusantonwolf/ta-youtube
```

**Inside tailwind.config.js:** Add the plugin to your tailwind css config file.
```js
// tailwind.config.js
module.exports = {
    // ...
    plugins: [
        require('@markusantonwolf/ta-youtube')
    ]
}
```

## CDN

### TA-YouTube

```html
<script src="https://cdn.jsdelivr.net/gh/markusantonwolf/ta-youtube@latest/dist/js/ta-youtube.min.js"></script>
```

### Alpine JS + TA-YouTube

```html
<script
    src="https://cdn.jsdelivr.net/gh/markusantonwolf/ta-foodtrucks@latest/dist/scripts/alpine-ta-youtube.min.js"
    defer
></script>
```

## Options

All options you can define

```javascript
// endpoint url - based on Craftplaces Api service
init('2ux2H_Iddvc', {
    
    // source default is youtube - alternative is vimeo
    source: 'youtube',
    
    // store the play state to the local storage
    remember: 'true',
    
    // starts playing right after clicking
    autoplay: 'false',
    
    // aspect ratio of the video
    aspect_ratio: '1.78',
    
    // start position in seconds
    start_at: '',
    
    // end position in seconds
    end_at: '',
    
    // change the default class name for the button
    button: 'button',

})
```

You can define all options as an object inside the init() function - like this example.

```html
<div
    class="ta-youtube ta-youtube-perspective border bg-gray-800 rounded-lg shadow-xl overflow-hidden"
    x-data="taYoutube()"
    x-init="init('2ux2H_Iddvc', {remember:'false',autoplay: 'true',start_at: 10,end_at:220})"
>
    <a
        href="play"
        class="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
        x-on:click.prevent="show()"
        x-show="!active"
    >
        <!-- CONTENT -->
        <template x-if="active">
            <iframe
                class="absolute inset-0 w-full h-full"
                :src="url"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </template>
        <!-- CONTENT -->
    </a>
</div>
```

Alternativly you can define all options as data attributes - like this example.

```html
<div
    class="ta-youtube ta-youtube-perspective border bg-gray-800 rounded-lg shadow-xl overflow-hidden"
    x-data="taYoutube()"
    x-init="init()"
    data-id="51018360"
    data-source="vimeo"
    data-remember="false"
    data-autoplay="true"
>
    <a
        href="play"
        class="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
        x-on:click.prevent="show()"
        x-show="!active"
    >
        <!-- CONTENT -->
        <template x-if="active">
            <iframe
                class="absolute inset-0 w-full h-full"
                :src="url"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </template>
        <!-- CONTENT -->
    </a>
</div>
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

-   [TA-Gallery](https://github.com/markusantonwolf/ta-gallery) - An image gallery with endless animation options.
-   [TA-Pagination](https://github.com/markusantonwolf/ta-pagination) - A content pagination solution.
-   [TA-Youtube](https://github.com/markusantonwolf/ta-youtube) - A YouTube video wrapper with auto playback and aspect ratio for the video player.
-   [TA-Analytics](https://github.com/markusantonwolf/ta-analytics) - A plugin for every website that needs to have an easy and customizable Google Analytics “blocker”.
-   [TA-Foodtrucks](https://github.com/markusantonwolf/ta-foodtrucks) - A plugin to show the next food truck and street food dates in your area.

## Licence

TA YouTube is released under the [MIT license](https://github.com/markusantonwolf/ta-youtube/blob/master/licence.md) & supports modern environments.

## Copyright

© 2020 Markus A. Wolf
<https://www.markusantonwolf.com>

<img src="https://github.com/markusantonwolf/ta-youtube/raw/master/public/img/logo-ta-styled-plugins.png" width="200px" style="padding-top:2rem;" />
