import observer from '@cocreate/observer';

const CoCreateScroll = {
	delta: 3,
	observer: null,
	init: function() {
		let elements = document.querySelectorAll(`[scroll]`);
		this.__initIntersectionObserver();
		this.initElements(elements);
	},

	initElements: function(elements) {
		for (let el of elements)
			this.initElement(el);
	},

	initElement: function(element) {
		const self = this;
		const upSize = this.__getSize(element.getAttribute('scroll-up'));
		const downSize = this.__getSize(element.getAttribute('scroll-down'));
		const attrName = element.getAttribute('scroll-attribute') || 'class';
		const targetSelector = element.getAttribute('scroll-target');
		const intersectValue = element.getAttribute('scroll-intersect');

		let values = element.getAttribute('scroll') || "";
		values = values.split(",").map(x => x.trim());

		let scrollInfo = {
			attrName: attrName,
			values: values,
			upSize: upSize,
			downSize: downSize,
			scrollTop: element.getAttribute('scroll-top'),
			scrollLimbo: element.getAttribute('scroll-limbo'),
			scrollBottom: element.getAttribute('scroll-bottom'),
			scrolling: element.getAttribute('scrolling')
		};

		let elements = [element];
		if (targetSelector) {
			elements = document.querySelectorAll(targetSelector);
		}

		elements.forEach(el => {
			el.scrollStatus = { currentPos: 0 };
		});
		
		this.__runScrollEvent(element, scrollInfo);		

		let timer = null;
		window.addEventListener('scroll', function(event) {
			if (!element.scrollStatus) return;
			if (Math.abs(window.scrollY - element.scrollStatus.currentPos) <= self.delta) {
				return;
			}

			if (timer != null) {
				clearTimeout(timer);
			}

			elements.forEach((el) => {
				self.__runScrollEvent(el, scrollInfo);
				self.__setScrolling(el, scrollInfo, false);
			});

			timer = setTimeout(function() {
				elements.forEach((el) => {
					self.__setScrolling(el, scrollInfo, true);
				});
			}, 500);
		});
		if (intersectValue && window.IntersectionObserver && this.observer) {
			this.observer.observe(element);
		}
	},

	__initIntersectionObserver: function() {
		const self = this;
		this.observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				let element = entry.target;
				const attrName = element.getAttribute('scroll-attribute') || 'class';
				const targetSelector = element.getAttribute('scroll-target');
				const intersectValue = element.getAttribute('scroll-intersect');

				let targetElements = [element];
				if (targetSelector) {
					targetElements = document.querySelectorAll(targetSelector);
				}
				if (entry.isIntersecting > 0) {
					targetElements.forEach((el) => self.__addAttributeValue(el, attrName, intersectValue));
				}
				else {
					targetElements.forEach((el) => self.__removeAttrbuteValue(el, attrName, intersectValue));
				}
			});
		});
	},

	__setScrolling: function(element, info, stopped = false) {
		const { scrolling, attrName } = info;
		if (stopped) {
			this.__removeAttrbuteValue(element, attrName, scrolling);
		}
		else {
			this.__addAttributeValue(element, attrName, scrolling);
		}
	},

	__runScrollEvent: function(element, info) {

		const currentPos = element.scrollStatus.currentPos;
		const scrollY = window.scrollY;
		const { upSize, downSize, attrName, values, scrollTop, scrollBottom, scrollLimbo } = info;

		if (upSize < (currentPos - scrollY)) {
			this.__addAttributeValue(element, attrName, values[0]);
			this.__removeAttrbuteValue(element, attrName, values[1]);
		}
		else if (downSize < (scrollY - currentPos)) {
			this.__removeAttrbuteValue(element, attrName, values[0]);
			this.__addAttributeValue(element, attrName, values[1]);
		}

		//. scroll top case
		if (scrollY <= this.delta) {
			this.__removeAttrbuteValue(element, attrName, values[0]);
			this.__removeAttrbuteValue(element, attrName, values[1]);

			this.__addAttributeValue(element, attrName, scrollTop);
		}
		else {
			this.__removeAttrbuteValue(element, attrName, scrollTop);
		}

		//. scroll bottom case
		if ((window.innerHeight + scrollY) >= document.body.scrollHeight) {
			// this.__removeAttrbuteValue(element, attrName, values[0]);
			// this.__removeAttrbuteValue(element, attrName, values[1]);

			this.__addAttributeValue(element, attrName, scrollBottom);
		}
		else {
			this.__removeAttrbuteValue(element, attrName, scrollBottom);
		}
		
		if (scrollY != 0 && (scrollY + window.innerHeight) != document.body.scrollHeight){
			this.__addAttributeValue(element, attrName, scrollLimbo);
		}
		else {
			this.__removeAttrbuteValue(element, attrName, scrollLimbo);
		}

		element.scrollStatus.currentPos = scrollY;
	},

	__addAttributeValue: function(element, attrName, value) {
		if (!value) return;
		let check = new RegExp("(\\s|^)" + value + "(\\s|$)");
		let attrValue = element.getAttribute(attrName) || "";

		if (!check.test(attrValue)) {
			attrValue += " " + value;
			element.setAttribute(attrName, attrValue);
		}
	},

	__removeAttrbuteValue: function(element, attrName, value) {
		if (!value) return;
		let check = new RegExp("(\\s|^)" + value + "(\\s|$)");
		let attrValue = element.getAttribute(attrName) || "";

		if (check.test(attrValue)) {
			attrValue = attrValue.replace(check, " ").trim();
			element.setAttribute(attrName, attrValue);
		}
	},

	__getSize: function(attrValue, isWidth) {
		let size = 0;
		if (!attrValue) {
			return 0;
		}

		if (attrValue.includes('%')) {
			size = attrValue.replace('%', '').trim();
			size = Number(size) || 0;

			size = isWidth ? window.innerWidth / size : window.innerHeight / size;

		}
		else {
			size = attrValue.replace('px', '').trim();
			size = Number(size) || 0;
		}

		return size;
	}



};

CoCreateScroll.init();

observer.init({
	name: 'CoCreateScrollCreate',
	observe: ['addedNodes'],
	target: '[scroll]',
	callback: function(mutation) {

		CoCreateScroll.initElement(mutation.target);
	}
});

export default CoCreateScroll;
