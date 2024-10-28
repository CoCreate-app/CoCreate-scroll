import Observer from '@cocreate/observer';
import Actions from '@cocreate/actions';

const CoCreateScroll = {
    delta: 3,
    observer: null,
    timer: null,
    firedEvents: new Map(),

    init: function () {
        let elements = document.querySelectorAll(`[scroll], [scroll-to], [scrollable-x], [scrollable-y]`);
        this.__initIntersectionObserver();
        this.initElements(elements);
    },

    initElements: function (elements) {
        for (let el of elements)
            this.initElement(el);
    },

    initElement: function (element) {
        const self = this;
        const upSize = this.__getSize(element.getAttribute('scroll-up'));
        const downSize = this.__getSize(element.getAttribute('scroll-down'));
        const attrName = element.getAttribute('scroll-attribute') || 'class';
        const targetSelector = element.getAttribute('scroll-selector');
        const scrollSelector = element.getAttribute('scroll-element');
        const intersectValue = element.getAttribute('scroll-intersect');
        const scrollTo = element.getAttribute('scroll-to');

        updateScrollableAttributes(element)


        let values = element.getAttribute('scroll') || element.getAttribute('scroll-value');
        if (values || values === '')
            values = values.split(",").map(x => x.trim());

        let scrollInfo = {
            attrName: attrName,
            values: values,
            upSize: upSize,
            downSize: downSize,
            scrollTop: element.getAttribute('scroll-top'),
            scrollLimbo: element.getAttribute('scroll-limbo'),
            scrollBottom: element.getAttribute('scroll-bottom'),
            scrolling: element.getAttribute('scrolling'),
            scrollTo
        };

        let elements = [element];
        if (targetSelector) {
            elements = document.querySelectorAll(targetSelector);
        }

        elements.forEach(el => {
            el.scrollStatus = { currentPos: 0 };
        });

        // this.__runScrollEvent(element, scrollInfo);		

        let scrollableElements;
        if (scrollSelector)
            scrollableElements = document.querySelectorAll(scrollSelector);
        else if (element.hasAttribute('scroll-element'))
            scrollableElements = [element]

        if (scrollableElements) {
            for (let scrollableEl of scrollableElements) {
                scrollableEl.addEventListener('scroll', function (event) {
                    self._scrollEvent(elements, element, scrollInfo, scrollableEl)
                });
            }
        } else {
            // this.WindowInit = true;
            window.addEventListener('scroll', function (event) {
                self._scrollEvent(elements, element, scrollInfo)
            });
        }

        if (intersectValue && window.IntersectionObserver && this.observer) {
            this.observer.observe(element);
        }

        if (scrollTo) {
            this.setScrollPosition(element, scrollTo)
        }
    },

    _scrollEvent: function (elements, element, scrollInfo, scrollableEl) {
        const self = this;
        if (!element.scrollStatus) return;
        let scrollEl = scrollableEl || window;
        if (Math.abs(scrollEl.scrollTop || scrollEl.scrollY - element.scrollStatus.currentPos) <= self.delta) {
            return;
        }

        let timer = null;
        if (timer != null) {
            clearTimeout(timer);
        }

        elements.forEach((el) => {
            self.__setScrolling(el, scrollInfo, false);
            self.__runScrollEvent(el, scrollInfo, scrollableEl);

        });

        timer = setTimeout(function () {
            elements.forEach((el) => {
                self.__setScrolling(el, scrollInfo, true);
            });
        }, 500);
    },

    setScrollPosition: function (element, scrollTo) {
        if (!scrollTo)
            return
        if (scrollTo.includes('top')) {
            element.scrollTop = 0;
        } else if (scrollTo.includes('bottom')) {
            element.scrollTop = element.scrollHeight;
        }

        if (scrollTo.includes('left')) {
            element.scrollLeft = 0;
        } else if (scrollTo.includes('right')) {
            element.scrollLeft = element.scrollWidth;
        }
    },

    __initIntersectionObserver: function () {
        const self = this;
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                let element = entry.target;
                const attrName = element.getAttribute('scroll-attribute') || 'class';
                const targetSelector = element.getAttribute('scroll-selector');
                const intersectValue = element.getAttribute('scroll-intersect');

                let targetElements = [element];
                if (targetSelector) {
                    targetElements = document.querySelectorAll(targetSelector);
                }
                if (entry.isIntersecting > 0) {
                    targetElements.forEach((el) => self.__addAttributeValue(el, attrName, intersectValue));
                } else {
                    targetElements.forEach((el) => self.__removeAttrbuteValue(el, attrName, intersectValue));
                }
            });
        });
    },

    __setScrolling: function (element, info, stopped = false) {
        const { scrolling, attrName } = info;
        if (stopped) {
            this.__removeAttrbuteValue(element, attrName, scrolling);
        } else {
            this.__addAttributeValue(element, attrName, scrolling);
        }
    },

    __runScrollEvent: function (element, info, scrollableEl) {
        if (!element.scrollStatus) return
        const currentPos = element.scrollStatus.currentPos;
        let scrollY, scrollHeight, innerHeight;
        if (scrollableEl) {
            scrollY = scrollableEl.scrollTop;
            scrollHeight = scrollableEl.scrollHeight
            innerHeight = scrollableEl.clientHeight
        } else {
            scrollY = window.scrollY;
            scrollHeight = document.body.scrollHeight
            innerHeight = window.innerHeight
        }
        const { upSize, downSize, attrName, values, scrollTop, scrollBottom, scrollLimbo } = info;

        let newTime = new Date().getTime()
        if (!info.datetime || (newTime - info.datetime) > 200) {
            info['datetime'] = newTime

            if (upSize <= (currentPos - scrollY)) {
                this.__addAttributeValue(element, attrName, values[0]);
                this.__removeAttrbuteValue(element, attrName, values[1]);
            } else if (downSize <= (scrollY - currentPos)) {
                this.__removeAttrbuteValue(element, attrName, values[0]);
                this.__addAttributeValue(element, attrName, values[1]);
            }
        }

        //. scroll top case
        if (scrollY <= this.delta) {
            this.__removeAttrbuteValue(element, attrName, values[0]);
            this.__removeAttrbuteValue(element, attrName, values[1]);

            this.__addAttributeValue(element, attrName, scrollTop);
        } else {
            this.__removeAttrbuteValue(element, attrName, scrollTop);
        }

        //. scroll bottom case
        // if ((window.innerHeight + scrollY) >= document.body.scrollHeight) {
        if ((innerHeight + scrollY) >= scrollHeight) {
            // this.__removeAttrbuteValue(element, attrName, values[0]);
            // this.__removeAttrbuteValue(element, attrName, values[1]);

            this.__addAttributeValue(element, attrName, scrollBottom);
        } else {
            this.__removeAttrbuteValue(element, attrName, scrollBottom);
        }

        // if (scrollY != 0 && (scrollY + window.innerHeight) != document.body.scrollHeight){
        if (scrollY != 0 && (scrollY + innerHeight) != scrollHeight) {
            this.__addAttributeValue(element, attrName, scrollLimbo);
        } else {
            this.__removeAttrbuteValue(element, attrName, scrollLimbo);
        }

        element.scrollStatus.currentPos = scrollY;
    },

    __addAttributeValue: function (element, attrName, value) {
        if (!value) return;
        let check = new RegExp("(\\s|^)" + value + "(\\s|$)");
        let attrValue = element.getAttribute(attrName) || "";

        if (!check.test(attrValue)) {
            if (attrName === 'class')
                attrValue += " " + value;
            else
                attrValue = value
            element.setAttribute(attrName, attrValue);
        }
    },

    __removeAttrbuteValue: function (element, attrName, value) {
        if (!value) return;
        let check = new RegExp("(\\s|^)" + value + "(\\s|$)");
        let attrValue = element.getAttribute(attrName) || "";

        if (check.test(attrValue)) {
            attrValue = attrValue.replace(check, " ").trim();
            element.setAttribute(attrName, attrValue);
        }
    },

    __getSize: function (attrValue, isWidth) {
        let size = 0;
        if (!attrValue) {
            return 0;
        }

        if (attrValue.includes('%')) {
            size = attrValue.replace('%', '').trim();
            size = Number(size) || 0;

            size = isWidth ? window.innerWidth / size : window.innerHeight / size;

        } else {
            size = attrValue.replace('px', '').trim();
            size = Number(size) || 0;
        }

        return size;
    }

};

function updateScrollableAttributes(element) {
    if (element.hasAttribute('scrollable-y')) {
        if (element.scrollWidth > element.clientWidth)
            element.setAttribute('scrollable-y', 'true');
        else
            element.setAttribute('scrollable-y', 'false');
    }

    if (element.hasAttribute('scrollable-x')) {
        if (element.scrollHeight > element.clientHeight)
            element.setAttribute('scrollable-x', 'true');
        else
            element.setAttribute('scrollable-x', 'false');
    }
}

Observer.init({
    name: 'CoCreateScrollCreate',
    observe: ['addedNodes'],
    target: '[scroll], [scroll-to], [scrollable-x], [scrollable-y]',
    callback: function (mutation) {
        CoCreateScroll.initElement(mutation.target);
    }
});

Observer.init({
    name: 'CoCreateScrollAttributes',
    observe: ['attributes'],
    attributeName: ['scroll-to'],
    // target: selector, // blocks mutations when applied
    callback: function (mutation) {
        CoCreateScroll.setScrollPosition(mutation.target, mutation.target.getAttribute('scroll-to'))
    }
});
Observer.init({
    name: 'CoCreateScrollAttributes',
    observe: ['attributes'],
    attributeName: ['scrollable-x', 'scrollable-y'],
    // target: selector, // blocks mutations when applied
    callback: function (mutation) {
        if (mutation.oldValue !== mutation.target.getAttribute(mutation.attributeName))
            updateScrollableAttributes(mutation.target)
    }
});

Actions.init({
    name: "scroll-to",
    callback: (action) => {
        // CoCreateScroll.setScrollPosition(mutation.target)
    }
});

CoCreateScroll.init();

export default CoCreateScroll;
