window.taPagination = () => {
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
            classLazy: 'ta-pagination-lazy',
        },
        init(options) {
            // checks if there are some new options
            if (typeof options !== 'undefined') {
                for (let [key, value] of Object.entries(options)) {
                    this.options[key] = value;
                }
            }

            // checks if options are defined by data
            for (let [key, value] of Object.entries(this.$el.dataset)) {
                if (typeof this.options[key] !== 'undefined') {
                    this.options[key] = value;
                }
            }

            // convert into integer
            this.options.pagination = parseInt(this.options.pagination);
            this.options.page = parseInt(this.options.page);
            this.options.duration = parseInt(this.options.duration);
            this.options.unify = String(this.options.unify).toLowerCase() === 'true';
            this.options.border = String(this.options.border).toLowerCase() === 'true';
            this.options.autoplay = String(this.options.autoplay).toLowerCase() === 'true';
            this.options.interval = parseInt(this.options.interval);
            this.options.pauseonhover = String(this.options.pauseonhover).toLowerCase() === 'true';

            // const checkedBreakpoints = [];
            if (typeof this.options.breakpoints === 'string') {
                if (this.options.breakpoints.length > 0) {
                    try {
                        const parsedBreakpoints = JSON.parse(this.options.breakpoints);
                        this.options.breakpoints = [];
                        for (let i = 0; i < parsedBreakpoints.length; i++) {
                            var unified = this.options.unify;
                            if (typeof parsedBreakpoints[i].unify !== 'undefined') {
                                unified =
                                    String(parsedBreakpoints[i].unify).toLowerCase() === 'true';
                            }
                            this.options.breakpoints.push({
                                width: parseInt(parsedBreakpoints[i].width),
                                pagination: parseInt(parsedBreakpoints[i].pagination),
                                unify: unified,
                            });
                        }
                    } catch (error) {
                        console.warn(
                            'TA-Pagination error: breakpoints are not valid JSON:',
                            this.options.breakpoints
                        );
                        this.options.breakpoints = [];
                    }
                } else {
                    this.options.breakpoints = [];
                }
            }

            // this.options.breakpoints = checkedBreakpoints;

            this.options.breakpoints.push({
                width: 1,
                pagination: this.options.pagination,
                unify: this.options.unify,
            });

            // order breakpoints ASC
            var compare = function (a, b) {
                if (parseInt(a.width) < parseInt(b.width)) return 1;
                if (parseInt(b.width) < parseInt(a.width)) return -1;
                return 0;
            };
            this.options.breakpoints.sort(compare);

            // use the default values
            this.page = this.options.page;
            this.pagination = this.options.pagination;
            this.unify = this.options.unify;

            // get all visible elements for the actual setting
            this.visible = this.getVisibleElements();

            // initialize all elements and set the not visible ones to hidden
            var elements = this.$refs[this.options.content].querySelectorAll(
                '.' + this.options.classItem
            );
            if (elements.length === 0) {
                // if there is no default class found - use the children
                elements = this.$refs[this.options.content].children;
            }
            for (let index = 0; index < elements.length; index++) {
                if (!this.visible.includes(index)) {
                    elements[index].classList.add(this.options.classHidden);
                }
                if (index % this.pagination !== 0 && this.options.border) {
                    elements[index].classList.add(this.options.classBorder);
                }
                this.elements.push(elements[index]);
            }

            this.$el.style.setProperty(
                `--ta-pagination-anim-duration`,
                this.options.duration + 'ms'
            );

            // event listener to re-define the height of the elements
            window.addEventListener('resize', () => {
                // this.$el.style.setProperty(`--ta-pagination-item-height`, 'unset');
                // this.$el.style.setProperty(`--ta-pagination-navigation-height`, 'unset');
                this.checkWindowWidth();
                this.checkMaxHeight();
                this.defineVisibleElements();
            });

            // watch animation prop if there is an animation running - hide buttons during animation
            this.$watch('animating', (value) => {
                if (value === false) {
                    this.checkExpand();
                    this.checkNavigation();
                }
            });

            // define default values
            this.checkExpand();
            this.checkWindowWidth();
            this.checkNavigation();
            this.defineVisibleElements();
            this.checkLazyLoading();

            // get the max height of all elements and write it to a CSS custom property
            this.$nextTick(() => {
                setTimeout(() => {
                    // init max height
                    this.checkMaxHeight();

                    // start auto play
                    if (this.options.autoplay) {
                        this.setAutoplay();
                    }
                }, this.options.duration);

                // set pagination script to initialized
                this.initialized = true;
            });
        },
        getVisibleElements() {
            // return all visible element keys for the actual setup
            var visible_elements = [];
            for (let index = 0; index < this.pagination; index++) {
                var value = (this.page - 1) * this.pagination + index;
                visible_elements.push(value);
            }
            return visible_elements;
        },
        setAutoplay() {
            this.autoplay = true;
            this.interval = setInterval(() => {
                if (this.autoplay === false) {
                    return;
                }
                this.timing += 1000;
                if (this.timing >= this.options.interval) {
                    this.timing = 0;
                    this.next();
                }
            }, 1000);
            if (this.options.pauseonhover) {
                this.$el.addEventListener('mouseover', () => {
                    if (this.is_shrink) {
                        this.autoplay = false;
                    }
                });
                this.$el.addEventListener('mouseout', () => {
                    if (!this.focusIsChild() && this.is_shrink) {
                        this.autoplay = true;
                    }
                });
            }
            window.addEventListener('focus', () => {
                if (!this.focusIsChild() && this.is_shrink) {
                    this.autoplay = true;
                }
            });
            window.addEventListener('blur', () => {
                if (this.is_shrink) {
                    this.autoplay = false;
                }
            });
        },
        checkMaxHeight() {
            // if unify height is unset generally
            if (this.unify === false) {
                this.$el.style.setProperty(`--${this.options.classItem}-height`, 'unset');
                return;
            }

            // get height of navigation and set CSS custom property
            var navigation_height = 0;
            if (typeof this.$refs[this.options.navigation] !== 'undefined') {
                navigation_height = this.$refs[this.options.navigation].offsetHeight;
                this.$el.style.setProperty(
                    `--ta-pagination-navigation-height`,
                    `${navigation_height}px`
                );
            }

            // get the max height of all elements in the pagination - define CSS custom property
            var element_max_height = 0;
            this.elements.forEach((item) => {
                if (element_max_height < item.offsetHeight) {
                    element_max_height = item.offsetHeight;
                }
            });
            this.$el.style.setProperty(
                `--${this.options.classItem}-height`,
                `${element_max_height}px`
            );

            // this.$el.style.setProperty(`--ta-pagination-item-height`, `${element_max_height}px`);
        },
        checkLazyLoading() {
            // check if there is any image usong lazy loading
            this.elements.forEach((item) => {
                var images = item.getElementsByTagName('img');
                for (let i = 0; i < images.length; i++) {
                    if (typeof images[i].dataset.src === 'undefined') {
                        continue;
                    }
                    // define virtual image and load src - remove class and switch src
                    var image_virtual = new Image();
                    image_virtual.onload = (event) => {
                        images[i].src = images[i].dataset.src;
                        images[i].classList.remove(this.options.classLazy);
                    };
                    image_virtual.src = images[i].dataset.src;
                }
            });
        },
        checkWindowWidth() {
            // use breakpoints to reduce the amount of elements shown on the screen
            if (this.options.breakpoints.length === 0) return false;
            var breakpoints = this.options.breakpoints;

            for (let i = 0; i < breakpoints.length; i++) {
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
            for (let index = 0; index < this.elements.length; index++) {
                if (index % this.pagination !== 0) {
                    this.elements[index].classList.add(this.options.classBorder);
                } else {
                    this.elements[index].classList.remove(this.options.classBorder);
                }
            }
        },
        defineVisibleElements() {
            // define the default visible elements based on the settings
            this.visible = this.getVisibleElements();
            this.elements.forEach((item, index) => {
                if (!this.visible.includes(index)) {
                    item.classList.add(this.options.classHidden);
                } else {
                    item.classList.remove(this.options.classHidden);
                }
            });
        },
        startExpand() {
            // store the actual visible elements
            var visible_old = this.visible;

            // define the animation class name
            var animation_class = this.options.classAnimation + '-expand';

            this.animating = true;

            // go through all elements and if hidden -> show it
            this.elements.forEach((item, index) => {
                if (!visible_old.includes(index)) {
                    item.classList.remove(this.options.classHidden);
                    item.classList.add(animation_class);
                    item.addEventListener(
                        'animationend',
                        (event) => {
                            event.target.classList.remove(animation_class);
                            this.animating = false;
                            this.is_expand = true;
                            this.is_shrink = false;
                        },
                        { once: true }
                    );
                }
            });
        },
        focusIsChild() {
            return this.$el.contains(document.activeElement);
        },
        startShrink() {
            this.checkWindowWidth();

            // define all visible elements for the actual setup
            this.visible = this.getVisibleElements();

            // define the animation class name
            var animation_class = this.options.classAnimation + '-shrink';

            // go through all elements and add animation
            var counter = 0;
            this.elements.forEach((item, index) => {
                if (!this.visible.includes(counter)) {
                    item.classList.add(animation_class);
                    this.animating = true;
                    item.addEventListener(
                        'animationend',
                        (event) => {
                            this.animationEnd(event.target, 'hide', animation_class);
                            this.animating = false;
                            this.is_shrink = true;
                            this.is_expand = false;
                        },
                        { once: true }
                    );
                }
                counter++;
            });
        },
        startOut(direction) {
            // store the actual visible elements
            var visible_old = this.visible;

            // define all visible elements for the actual setup
            this.visible = this.getVisibleElements();

            // define the animation class name
            var animation_class = this.options.classAnimation + '-' + direction + '-out';

            // go through all elements and add animation
            this.elements.forEach((item, index) => {
                if (visible_old.includes(index)) {
                    this.animating = true;
                    item.classList.add(animation_class);
                    item.addEventListener(
                        'animationend',
                        (event) => {
                            this.animationEnd(event.target, 'hide', animation_class);

                            // if animation has ended start the next animation
                            this.startIn(direction);
                        },
                        { once: true }
                    );
                }
            });
        },
        startIn(direction) {
            // define the animation class name
            var animation_class = this.options.classAnimation + '-' + direction + '-in';

            // go through all elements and add animation
            this.elements.forEach((item, index) => {
                if (this.visible.includes(index)) {
                    item.classList.remove(this.options.classHidden);
                    item.classList.add(animation_class);
                    item.addEventListener(
                        'animationend',
                        (event) => {
                            this.animationEnd(event.target, 'show', animation_class);
                        },
                        { once: true }
                    );
                }
            });
        },
        animationEnd(item, action, class_name) {
            // general function for the animationend event handler
            item.classList.remove(class_name);
            if (action === 'show') {
                this.animating = false;
            }
            if (action === 'hide') {
                // item.classList.remove(this.options.classVisible);
                item.classList.add(this.options.classHidden);
            } else {
                item.classList.remove(this.options.classHidden);
                // item.classList.add(this.options.classVisible);
            }
        },
        checkNavigation() {
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
        checkExpand() {
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
        next() {
            // do not navigate if animation is running
            if (this.animating) {
                return;
            }
            // check if there is a next page - define next page
            if (this.has_next) {
                this.page++;
            } else {
                this.page = 1;
            }
            // start animation to the right
            this.startOut('right');
        },
        end() {
            // do not navigate if animation is running
            if (this.animating) {
                return;
            }
            // define last page and start animation to the last page
            this.page = Math.ceil(this.elements.length / this.pagination);
            this.startOut('right');
        },
        previous() {
            // do not navigate if animation is running
            if (this.animating) {
                return;
            }
            // check if there is a previous page - define previous page
            if (this.has_previous) {
                this.page--;
            } else {
                this.page = Math.ceil(this.elements.length / this.pagination);
            }
            // start animation to the left
            this.startOut('left');
        },
        start() {
            // do not navigate if animation is running
            if (this.animating) {
                return;
            }
            // define first page and start animation to the first page
            this.page = 1;
            this.startOut('left');
        },
        expand() {
            // do not navigate if animation is running
            if (this.animating) {
                return;
            }

            // check if autoplay is running
            if (this.options.autoplay === true) {
                this.autoplay = false;
            }

            // sets props to expanded
            this.page = 1;
            this.pagination = this.elements.length;
            this.startExpand();
        },
        shrink() {
            // do not navigate if animation is running
            if (this.animating) {
                return;
            }

            // check if autoplay is configured
            if (this.options.autoplay === true) {
                this.autoplay = true;
            }

            // sets props to shrinked and defines start page
            this.page = 1;
            this.pagination = this.options.pagination;
            this.startShrink();
        },
    };
};
