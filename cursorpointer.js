/**
 * @overview A JavaScript module, providing functionality to always point the mouse cursor pointer at the desired HTML element.
 * @author Tim Scott Long
 * @copyright Tim Scott Long 2017
 * @license Available for use under the MIT License
 */
;var CursorPointer = (function(){
	var exports = {},
		isPointing = false,
		images = {
			"up-left": new Image(),
			"up-right": new Image(),
			"down-left": new Image(),
			"down-right": new Image()
		},
		elementDetails = {
			x: 0,
			y: 0,
			outerWidth: 0,
			outerHeight: 0
		},
		mousePos = {
			x: 0,
			y: 0
		},
		elementsHolder = document.documentElement || document.getElementsByTagName("html")[0] || document.body,
		element = elementsHolder,
		storedCursor = window.getComputedStyle(elementsHolder).getPropertyValue("cursor");

	for(var name in images) {
		images[name].src = "images/pointer-" + name + ".png";
	}

	/**
	 * @description Starts the module process, pointing at the element.
	 * @param {Object} elm - The HTML element to be pointed at.
	 */
	exports.pointAt = function(elm) {
		// Use the last element pointed at if none is referenced.
		if(!elm) {
			elm = element;
		}

		// For browsers that don't support this method, don't apply the module.
		if(!window.getComputedStyle || !elm.getBoundingClientRect) {
			return;
		}

		if(isPointing) {
			this.stop();
			isPointing = false;
		}

		if(elm.length) {
			element = elm[0];
		} else {
			element = elm;
		}

		elementsHolder.addEventListener("mousemove", setCursorFromMouseXY, false);
		isPointing = true;
	}; // End pointAt()

	/**
	 * @description Ends CursorPointer processes that update the cursor image.
	 */
	exports.stop = function() {
		if(isPointing) {
			elementsHolder.removeEventListener("mousemove", setCursorFromMouseXY, false);
			elementsHolder.style.cursor = storedCursor;
		}
	}; // End stop()

	/**
	 * @description Returns the HTML element currently being pointed at.
	 * @return {Object}
	 */
	exports.getElement = function() {
		if(isPointing) {
			return element;
		} else {
			return elementsHolder;
		}
	}; // End getElement()
	
	/**
	 * @description 
	 * @param {Object} - The mousemove event.
	 */
	var setCursorFromMouseXY = function(e) {
		mousePos.x = e.clientX,
		mousePos.y = e.clientY;

		if(pointerIsAbove()) { // Need to point down.
			if(pointerIsLeft()) { // Need to point right.
				elementsHolder.style.cursor = 'url(' + images["down-right"].src + ') 10 15, pointer';
				element.style.cursor = 'url(' + images["down-right"].src + ') 10 15, pointer';
			} else { // Need to point left.
				elementsHolder.style.cursor = 'url(' + images["down-left"].src + ') 0 15, pointer';
				element.style.cursor = 'url(' + images["down-left"].src + ') 0 15, pointer';
			}
		} else { // Need to point up.
			if(pointerIsLeft()) { // Need to point right.
				elementsHolder.style.cursor = 'url(' + images["up-right"].src + ') 10 0, pointer';
				element.style.cursor = 'url(' + images["up-right"].src + ') 10 0, pointer';
			} else { // Need to point left.
				elementsHolder.style.cursor = 'url(' + images["up-left"].src + ') 0 0, pointer';
				element.style.cursor = 'url(' + images["up-left"].src + ') 0 0, pointer';
			}
		}
	}; // End setCursorFromMouseXY()

	/**
	 * @description Determines whether or not the cursor pointer's hot spot is to the above the defined element's center.
	 * @returns {boolean}
	 */
	var pointerIsAbove = function() {
		var rect = element.getBoundingClientRect(),
			styles = window.getComputedStyle(element),
			topBuffer = parseInt(styles.getPropertyValue("margin-top"), 10) + parseInt(styles.getPropertyValue("border-top"), 10) + parseInt(styles.getPropertyValue("padding-top"), 10) + parseInt(window.getComputedStyle(element).height, 10) / 2;

		if(mousePos.y < rect.top + topBuffer) {
			return true;
		} else {
			return false;
		}
	}; // End pointerIsAbove()
	
	/**
	 * @description Determines whether or not the cursor pointer's hot spot is to the left of the defined element's center.
	 * @returns {boolean}
	 */
	var pointerIsLeft = function() {
		var rect = element.getBoundingClientRect(),
			styles = window.getComputedStyle(element),
			leftBuffer = parseInt(styles.getPropertyValue("margin-left"), 10) + parseInt(styles.getPropertyValue("border-left"), 10) + parseInt(styles.getPropertyValue("padding-left"), 10) + parseInt(window.getComputedStyle(element).width, 10) / 2;

		if(mousePos.x < rect.left + leftBuffer) {
			return true;
		} else {
			return false;
		}
	}; // End pointerIsLeft()
	
	return exports;
}());