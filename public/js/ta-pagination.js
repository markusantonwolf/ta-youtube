"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

window.taPagination = function () {
  return {
    page: 1,
    pagination: 5,
    unify: false,
    autoplay: false,
    interval: false,
    timing: 0,
    elements: [],
    visible: [],
    initialized: false,
    is_expand: false,
    is_shrink: false,
    has_next: false,
    has_previous: false,
    animating: false,
    options: {
      page: 1,
      pagination: 1,
      duration: 200,
      unify: true,
      border: false,
      autoplay: false,
      interval: 5000,
      pauseonhover: true,
      content: 'content',
      navigation: 'navigation',
      breakpoints: [],
      classAnimation: 'ta-pagination-anim',
      classItem: 'ta-pagination-item',
      classBorder: 'ta-pagination-item-border',
      classHidden: 'ta-pagination-item-hidden',
      classLazy: 'ta-pagination-lazy'
    },
    init: function init(options) {
      var _this = this;

      // checks if there are some new options
      if (typeof options !== 'undefined') {
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
      } // convert into integer


      this.options.pagination = parseInt(this.options.pagination);
      this.options.page = parseInt(this.options.page);
      this.options.duration = parseInt(this.options.duration);
      this.options.unify = String(this.options.unify).toLowerCase() === 'true';
      this.options.border = String(this.options.border).toLowerCase() === 'true';
      this.options.autoplay = String(this.options.autoplay).toLowerCase() === 'true';
      this.options.interval = parseInt(this.options.interval);
      this.options.pauseonhover = String(this.options.pauseonhover).toLowerCase() === 'true'; // const checkedBreakpoints = [];

      if (typeof this.options.breakpoints === 'string') {
        if (this.options.breakpoints.length > 0) {
          try {
            var parsedBreakpoints = JSON.parse(this.options.breakpoints);
            this.options.breakpoints = [];

            for (var i = 0; i < parsedBreakpoints.length; i++) {
              var unified = this.options.unify;

              if (typeof parsedBreakpoints[i].unify !== 'undefined') {
                unified = String(parsedBreakpoints[i].unify).toLowerCase() === 'true';
              }

              this.options.breakpoints.push({
                width: parseInt(parsedBreakpoints[i].width),
                pagination: parseInt(parsedBreakpoints[i].pagination),
                unify: unified
              });
            }
          } catch (error) {
            console.warn('TA-Pagination error: breakpoints are not valid JSON:', this.options.breakpoints);
            this.options.breakpoints = [];
          }
        } else {
          this.options.breakpoints = [];
        }
      } // this.options.breakpoints = checkedBreakpoints;


      this.options.breakpoints.push({
        width: 1,
        pagination: this.options.pagination,
        unify: this.options.unify
      }); // order breakpoints ASC

      var compare = function compare(a, b) {
        if (parseInt(a.width) < parseInt(b.width)) return 1;
        if (parseInt(b.width) < parseInt(a.width)) return -1;
        return 0;
      };

      this.options.breakpoints.sort(compare); // use the default values

      this.page = this.options.page;
      this.pagination = this.options.pagination;
      this.unify = this.options.unify; // get all visible elements for the actual setting

      this.visible = this.getVisibleElements(); // initialize all elements and set the not visible ones to hidden

      var elements = this.$refs[this.options.content].querySelectorAll('.' + this.options.classItem);

      if (elements.length === 0) {
        // if there is no default class found - use the children
        elements = this.$refs[this.options.content].children;
      }

      for (var index = 0; index < elements.length; index++) {
        if (!this.visible.includes(index)) {
          elements[index].classList.add(this.options.classHidden);
        }

        if (index % this.pagination !== 0 && this.options.border) {
          elements[index].classList.add(this.options.classBorder);
        }

        this.elements.push(elements[index]);
      }

      this.$el.style.setProperty("--ta-pagination-anim-duration", this.options.duration + 'ms'); // event listener to re-define the height of the elements

      window.addEventListener('resize', function () {
        // this.$el.style.setProperty(`--ta-pagination-item-height`, 'unset');
        // this.$el.style.setProperty(`--ta-pagination-navigation-height`, 'unset');
        _this.checkWindowWidth();

        _this.checkMaxHeight();

        _this.defineVisibleElements();
      }); // watch animation prop if there is an animation running - hide buttons during animation

      this.$watch('animating', function (value) {
        if (value === false) {
          _this.checkExpand();

          _this.checkNavigation();
        }
      }); // define default values

      this.checkExpand();
      this.checkWindowWidth();
      this.checkNavigation();
      this.defineVisibleElements();
      this.checkLazyLoading(); // get the max height of all elements and write it to a CSS custom property

      this.$nextTick(function () {
        setTimeout(function () {
          // init max height
          _this.checkMaxHeight(); // start auto play


          if (_this.options.autoplay) {
            _this.setAutoplay();
          }
        }, _this.options.duration); // set pagination script to initialized

        _this.initialized = true;
      });
    },
    getVisibleElements: function getVisibleElements() {
      // return all visible element keys for the actual setup
      var visible_elements = [];

      for (var index = 0; index < this.pagination; index++) {
        var value = (this.page - 1) * this.pagination + index;
        visible_elements.push(value);
      }

      return visible_elements;
    },
    setAutoplay: function setAutoplay() {
      var _this2 = this;

      this.autoplay = true;
      this.interval = setInterval(function () {
        if (_this2.autoplay === false) {
          return;
        }

        _this2.timing += 1000;

        if (_this2.timing >= _this2.options.interval) {
          _this2.timing = 0;

          _this2.next();
        }
      }, 1000);

      if (this.options.pauseonhover) {
        this.$el.addEventListener('mouseover', function () {
          if (_this2.is_shrink) {
            _this2.autoplay = false;
          }
        });
        this.$el.addEventListener('mouseout', function () {
          if (!_this2.focusIsChild() && _this2.is_shrink) {
            _this2.autoplay = true;
          }
        });
      }

      window.addEventListener('focus', function () {
        if (!_this2.focusIsChild() && _this2.is_shrink) {
          _this2.autoplay = true;
        }
      });
      window.addEventListener('blur', function () {
        if (_this2.is_shrink) {
          _this2.autoplay = false;
        }
      });
    },
    checkMaxHeight: function checkMaxHeight() {
      // if unify height is unset generally
      if (this.unify === false) {
        this.$el.style.setProperty("--".concat(this.options.classItem, "-height"), 'unset');
        return;
      } // get height of navigation and set CSS custom property


      var navigation_height = 0;

      if (typeof this.$refs[this.options.navigation] !== 'undefined') {
        navigation_height = this.$refs[this.options.navigation].offsetHeight;
        this.$el.style.setProperty("--ta-pagination-navigation-height", "".concat(navigation_height, "px"));
      } // get the max height of all elements in the pagination - define CSS custom property


      var element_max_height = 0;
      this.elements.forEach(function (item) {
        if (element_max_height < item.offsetHeight) {
          element_max_height = item.offsetHeight;
        }
      });
      this.$el.style.setProperty("--".concat(this.options.classItem, "-height"), "".concat(element_max_height, "px")); // this.$el.style.setProperty(`--ta-pagination-item-height`, `${element_max_height}px`);
    },
    checkLazyLoading: function checkLazyLoading() {
      var _this3 = this;

      // check if there is any image usong lazy loading
      this.elements.forEach(function (item) {
        var images = item.getElementsByTagName('img');

        var _loop = function _loop(i) {
          if (typeof images[i].dataset.src === 'undefined') {
            return "continue";
          } // define virtual image and load src - remove class and switch src


          image_virtual = new Image();

          image_virtual.onload = function (event) {
            images[i].src = images[i].dataset.src;
            images[i].classList.remove(_this3.options.classLazy);
          };

          image_virtual.src = images[i].dataset.src;
        };

        for (var i = 0; i < images.length; i++) {
          var image_virtual;

          var _ret = _loop(i);

          if (_ret === "continue") continue;
        }
      });
    },
    checkWindowWidth: function checkWindowWidth() {
      // use breakpoints to reduce the amount of elements shown on the screen
      if (this.options.breakpoints.length === 0) return false;
      var breakpoints = this.options.breakpoints;

      for (var i = 0; i < breakpoints.length; i++) {
        if (window.innerWidth > parseInt(breakpoints[i].width)) {
          if (typeof breakpoints[i].pagination !== 'undefined') {
            this.pagination = parseInt(breakpoints[i].pagination);
          }

          if (typeof breakpoints[i].unify !== 'undefined') {
            this.unify = String(breakpoints[i].unify).toLowerCase() === 'true';
          }

          break; // mobile first
        }
      }

      if (!this.options.border) {
        return;
      }

      for (var index = 0; index < this.elements.length; index++) {
        if (index % this.pagination !== 0) {
          this.elements[index].classList.add(this.options.classBorder);
        } else {
          this.elements[index].classList.remove(this.options.classBorder);
        }
      }
    },
    defineVisibleElements: function defineVisibleElements() {
      var _this4 = this;

      // define the default visible elements based on the settings
      this.visible = this.getVisibleElements();
      this.elements.forEach(function (item, index) {
        if (!_this4.visible.includes(index)) {
          item.classList.add(_this4.options.classHidden);
        } else {
          item.classList.remove(_this4.options.classHidden);
        }
      });
    },
    startExpand: function startExpand() {
      var _this5 = this;

      // store the actual visible elements
      var visible_old = this.visible; // define the animation class name

      var animation_class = this.options.classAnimation + '-expand';
      this.animating = true; // go through all elements and if hidden -> show it

      this.elements.forEach(function (item, index) {
        if (!visible_old.includes(index)) {
          item.classList.remove(_this5.options.classHidden);
          item.classList.add(animation_class);
          item.addEventListener('animationend', function (event) {
            event.target.classList.remove(animation_class);
            _this5.animating = false;
            _this5.is_expand = true;
            _this5.is_shrink = false;
          }, {
            once: true
          });
        }
      });
    },
    focusIsChild: function focusIsChild() {
      return this.$el.contains(document.activeElement);
    },
    startShrink: function startShrink() {
      var _this6 = this;

      this.checkWindowWidth(); // define all visible elements for the actual setup

      this.visible = this.getVisibleElements(); // define the animation class name

      var animation_class = this.options.classAnimation + '-shrink'; // go through all elements and add animation

      var counter = 0;
      this.elements.forEach(function (item, index) {
        if (!_this6.visible.includes(counter)) {
          item.classList.add(animation_class);
          _this6.animating = true;
          item.addEventListener('animationend', function (event) {
            _this6.animationEnd(event.target, 'hide', animation_class);

            _this6.animating = false;
            _this6.is_shrink = true;
            _this6.is_expand = false;
          }, {
            once: true
          });
        }

        counter++;
      });
    },
    startOut: function startOut(direction) {
      var _this7 = this;

      // store the actual visible elements
      var visible_old = this.visible; // define all visible elements for the actual setup

      this.visible = this.getVisibleElements(); // define the animation class name

      var animation_class = this.options.classAnimation + '-' + direction + '-out'; // go through all elements and add animation

      this.elements.forEach(function (item, index) {
        if (visible_old.includes(index)) {
          _this7.animating = true;
          item.classList.add(animation_class);
          item.addEventListener('animationend', function (event) {
            _this7.animationEnd(event.target, 'hide', animation_class); // if animation has ended start the next animation


            _this7.startIn(direction);
          }, {
            once: true
          });
        }
      });
    },
    startIn: function startIn(direction) {
      var _this8 = this;

      // define the animation class name
      var animation_class = this.options.classAnimation + '-' + direction + '-in'; // go through all elements and add animation

      this.elements.forEach(function (item, index) {
        if (_this8.visible.includes(index)) {
          item.classList.remove(_this8.options.classHidden);
          item.classList.add(animation_class);
          item.addEventListener('animationend', function (event) {
            _this8.animationEnd(event.target, 'show', animation_class);
          }, {
            once: true
          });
        }
      });
    },
    animationEnd: function animationEnd(item, action, class_name) {
      // general function for the animationend event handler
      item.classList.remove(class_name);

      if (action === 'show') {
        this.animating = false;
      }

      if (action === 'hide') {
        // item.classList.remove(this.options.classVisible);
        item.classList.add(this.options.classHidden);
      } else {
        item.classList.remove(this.options.classHidden); // item.classList.add(this.options.classVisible);
      }
    },
    checkNavigation: function checkNavigation() {
      // check all the navigation props - define it for usage in HTML
      var index = (this.page - 1) * this.pagination + this.pagination;

      if (index >= this.elements.length) {
        this.has_next = false;
      } else {
        this.has_next = true;
      }

      if (this.page <= 1) {
        this.has_previous = false;
      } else {
        this.has_previous = true;
      }
    },
    checkExpand: function checkExpand() {
      // check and define props if elements are expanded or shrinked
      if (this.pagination === this.elements.length) {
        this.is_expand = true;
        this.is_shrink = false;
      } else if (this.pagination >= this.elements.length) {
        this.is_expand = false;
        this.is_shrink = false;
      } else {
        this.is_expand = false;
        this.is_shrink = true;
      }
    },
    next: function next() {
      // do not navigate if animation is running
      if (this.animating) {
        return;
      } // check if there is a next page - define next page


      if (this.has_next) {
        this.page++;
      } else {
        this.page = 1;
      } // start animation to the right


      this.startOut('right');
    },
    end: function end() {
      // do not navigate if animation is running
      if (this.animating) {
        return;
      } // define last page and start animation to the last page


      this.page = Math.ceil(this.elements.length / this.pagination);
      this.startOut('right');
    },
    previous: function previous() {
      // do not navigate if animation is running
      if (this.animating) {
        return;
      } // check if there is a previous page - define previous page


      if (this.has_previous) {
        this.page--;
      } else {
        this.page = Math.ceil(this.elements.length / this.pagination);
      } // start animation to the left


      this.startOut('left');
    },
    start: function start() {
      // do not navigate if animation is running
      if (this.animating) {
        return;
      } // define first page and start animation to the first page


      this.page = 1;
      this.startOut('left');
    },
    expand: function expand() {
      // do not navigate if animation is running
      if (this.animating) {
        return;
      } // check if autoplay is running


      if (this.options.autoplay === true) {
        this.autoplay = false;
      } // sets props to expanded


      this.page = 1;
      this.pagination = this.elements.length;
      this.startExpand();
    },
    shrink: function shrink() {
      // do not navigate if animation is running
      if (this.animating) {
        return;
      } // check if autoplay is configured


      if (this.options.autoplay === true) {
        this.autoplay = true;
      } // sets props to shrinked and defines start page


      this.page = 1;
      this.pagination = this.options.pagination;
      this.startShrink();
    }
  };
};