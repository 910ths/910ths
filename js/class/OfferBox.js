var OfferBox = function() {

	this.init();

};

OfferBox.prototype = {

	init: function(){

		var _this = this;
		
		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setVars: function() {

		var _this = this;

		_this._box = document.querySelector('.offerBox');

		if (!_this._box)
			return false;

		if (/SAFARI/.test(navigator.userAgent.toUpperCase())) {
			_this._bodyScroll = document.body || document.documentElement;
		} else {
			_this._bodyScroll = document.documentElement || document.body;
		}

		_this._wrap        = document.querySelector('.offerBoxWrap');
		_this._nextSection = document.querySelector('.stdBanner');
		_this._offset      =  {
			top  : _this._wrap.getBoundingClientRect().top + window.pageYOffset,
			left : _this._wrap.getBoundingClientRect().left + window.pageXOffset
		};
		_this._maxOffset   = _this._nextSection.getBoundingClientRect().top + window.pageYOffset - _this._box.clientHeight - 100 - 28;

		return true;

	},

	_setEvents: function() {

		var _this = this;

		document.addEventListener('scroll', function() {

			if ((_this._bodyScroll.scrollTop + 100) >= _this._offset.top) {

				addClass(_this._box, 'sticky');
				_this._box.style.top   = '100px';
				_this._box.style.left  = _this._offset.left;
				_this._box.style.width = _this._wrap.clientWidth + 'px';

				if (_this._bodyScroll.scrollTop >= _this._maxOffset) {

					_this._box.style.top = (100 - (_this._bodyScroll.scrollTop - _this._maxOffset)) + 'px';

				}

			} else {

				removeClass(_this._box, 'sticky');
				_this._box.style.top   = 'auto';
				_this._box.style.left  = 'auto';
				_this._box.style.width = 'auto';

			}

		});

		window.onresize = function() {

			console.log('resize');

			_this._offset    =  {
				top  : _this._wrap.getBoundingClientRect().top + window.pageYOffset,
				left : _this._wrap.getBoundingClientRect().left + window.pageXOffset
			};
			_this._maxOffset = _this._nextSection.getBoundingClientRect().top + window.pageYOffset - _this._box.clientHeight - 100 - 28;

		};

	}

};