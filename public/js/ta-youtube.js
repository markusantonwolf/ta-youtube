"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
      button: 'button'
    },
    init: function init() {
      var _this = this;

      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // defines video id
      if (id !== '') {
        this.options.id = id;
      } // checks if there are some new options


      if (_typeof(options) !== 'object' || options instanceof Array) {
        console.warn('Options are in wrong type - should be object - options been used');
      } else {
        for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          this.options[key] = value;
        }
      } // checks if options are defined by data


      for (var _i2 = 0, _Object$entries2 = Object.entries(this.$el.dataset); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            _key = _Object$entries2$_i[0],
            _value = _Object$entries2$_i[1];

        if (typeof this.options[_key] !== 'undefined') {
          this.options[_key] = _value;
        }
      }

      if (this.options.source === 'vimeo') {
        this.url = 'https://player.vimeo.com/video/' + this.options.id;
      } else {
        this.url = 'https://www.youtube-nocookie.com/embed/' + this.options.id;
      } // set aspect ratio as CSS custom property


      if (String(this.options.aspect_ratio).toLowerCase() !== 'false') {
        this.$el.style.setProperty("--ta-youtube-aspect-ratio", parseFloat(this.options.aspect_ratio));
      } // define the url without query string for hash


      this.hash = this.hashCode(window.location.href) + '_' + this.hashCode(this.url); // defines the query array for playback options

      var query = []; // check if the video was actived

      if (localStorage.getItem('youtube_' + this.hash) === 'true' && this.options.remember === 'true') {
        this.active = true; // if autoplay true play video by default

        if (this.options.autoplay === 'true') {
          query.push('autoplay=1');
        }
      } else {
        // play video after activation click
        query.push('autoplay=1');
      }

      if (typeof this.$refs[this.options.button] !== 'undefined') {
        this.setButtonHeight(); // event listener to re-define the height of the botton

        window.addEventListener('resize', function () {
          _this.setButtonHeight();
        });
      } // adds start position to video


      if (this.options.start_at !== '') {
        query.push('start=' + this.options.start_at);
      } // adds end position to video


      if (this.options.end_at !== '') {
        query.push('end=' + this.options.end_at);
      } // adds options to the video url


      if (query.length > 0) {
        this.url += '?' + query.join('&');
      }
    },
    show: function show() {
      // activate youtube player
      this.active = true; // if activation should be remembered

      if (this.options.remember) {
        localStorage.setItem('youtube_' + this.hash, 'true');
      }
    },
    setButtonHeight: function setButtonHeight() {
      // defines the height of the playback button as CSS custom property
      var button_height = this.$refs[this.options.button].offsetHeight;
      this.$el.style.setProperty("--ta-youtube-buttonHeight", button_height + 'px');
    },
    hashCode: function hashCode(string) {
      var hash = 0,
          i,
          chr;

      for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }

      return hash;
    }
  };
};