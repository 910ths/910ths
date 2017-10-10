'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollCore = function () {
  function ScrollCore() {
    var _this = this;

    _classCallCheck(this, ScrollCore);

    this._isMobileChrome = this.isChromeOnAndroid();
    this._touchStart = false;
    this._scrollY = 0;

    this._actionTouch = function (e) {
      _this.setTouchStart(e);
    };
    this._actionScroll = function (e) {
      _this.autoScroll(e);
    };
  }

  /* ---
    Events
  --- */

  _createClass(ScrollCore, [{
    key: 'setTouchStart',
    value: function setTouchStart(event) {

      this._touchStart = event.touches[0].clientX;
    }
  }, {
    key: 'autoScroll',
    value: function autoScroll(event) {

      window.scroll(0, this._scrollY);
    }

    /* ---
      Lock scroll
    --- */

  }, {
    key: 'lock',
    value: function lock() {

      this._scrollY = window.scrollY;

      if (this._isMobileChrome) {

        document.body.style.position = 'fixed';
        document.body.style.top = -this._scrollY + 'px';
        document.body.style.left = '0';
        document.body.style.width = window.innerWidth + 'px';
        document.body.style.boxSizing = 'border-box';
      } else {

        window.addEventListener('mousewheel', this.findScrollableElementInside);
        window.addEventListener('touchmove', this.findScrollableElementInside);
        window.addEventListener('touchstart', this._actionTouch);
      }

      window.addEventListener('scroll', this._actionScroll);
    }

    /* ---
      Unlock scroll
    --- */

  }, {
    key: 'unlock',
    value: function unlock() {

      if (this._isMobileChrome) {

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.boxSizing = '';

        window.scroll(0, this._scrollY);
      } else {

        window.removeEventListener('mousewheel', this.findScrollableElementInside);
        window.removeEventListener('touchmove', this.findScrollableElementInside);
        window.removeEventListener('touchstart', this._actionTouch);
      }

      window.removeEventListener('scroll', this._actionScroll);
    }

    /* ---
      Check navigator
    --- */

  }, {
    key: 'isChromeOnAndroid',
    value: function isChromeOnAndroid() {

      var navigator = window.navigator.userAgent.toLowerCase();

      if (navigator.indexOf('android') > -1 && navigator.indexOf('chrome') > -1) return true;

      return false;
    }

    /* ---
      Find scrollable element inside
    --- */

  }, {
    key: 'findScrollableElementInside',
    value: function findScrollableElementInside(event, touchStart) {

      var element = event.target;
      var touchStart = touchStart !== undefined ? touchStart : 0;

      if (element === document) {

        event.preventDefault();
        return false;
      }

      while (element.nodeName.toLowerCase() != 'body') {

        var overflowY = window.getComputedStyle(element, null).getPropertyValue('overflow-y');
        var direction = !event.wheelDelta ? event.touches[0].clientX - touchStart : -event.wheelDelta;

        if (overflowY == 'scroll' || overflowY == 'auto') {

          if (direction > 0 && element.scrollTop < element.scrollHeight - element.clientHeight) {

            return true;
          } else if (direction < 0 && element.scrollTop > 0) {

            return true;
          }
        }

        element = element.parentNode;
      }

      event.preventDefault();
      return false;
    }
  }]);

  return ScrollCore;
}();

var Scroll = new ScrollCore();