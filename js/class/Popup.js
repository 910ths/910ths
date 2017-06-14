var Popup = function() {

	this.init();

};

Popup.prototype = {

	init: function(){

		var _this = this;
		
		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setVars: function() {

		var _this = this;

		_this._body        = document.body || document.documentElement || document.getElementsByName('body');
		_this._openButtons = document.querySelectorAll('.jsPopup');

		if (!_this._openButtons)
			return false;

		_this._videos    = [];
		_this._scrollTop = 0;

		return true;

	},

	_setEvents: function() {

		var _this = this;

		_this._preparateVideos();

	},

	_preparateVideos: function() {

		var _this = this;

		var max = _this._openButtons.length;

		for (i = 0; i < max; ++i) {

			var id = _this._openButtons[i].getAttribute('data-popup');

			_this._openButtons[i].addEventListener('click', function(event) {

				event.preventDefault();

				_this._openPopup(this.getAttribute('data-popup'));

			});


			if (_this._videos.indexOf(id) >= 0)
				continue;

			_this._videos.push(id);

			_this._moveVideoToBody(id);

		}

	},

	_moveVideoToBody: function(id) {

		var _this = this;

		var popup = document.querySelector('.popup[data-popup=' + id + ']');
		var clone = popup.cloneNode(true);

		_this._body.appendChild(clone);
		popup.remove();

	},

	_openPopup: function(id) {

		var _this = this;

		var popup = document.querySelector('.popup[data-popup=' + id + ']');
		var video = popup.querySelector('.videoBanner__video');

		video.play();

		setTimeout(function() {

			addClass(popup, 'popup--active');

			_this._scrollTop = -_this._body.scrollTop + 'px';

			_this._body.style.position = 'fixed';
			_this._body.style.top      = _this._scrollTop;
			_this._body.style.left     = '0';

		}, 250);


		popup.querySelector('.popup__close').addEventListener('click', function(event) {

			event.preventDefault();

			_this._closePopup(this.parentNode.parentNode.getAttribute('data-popup'));

		});

		document.addEventListener('click', function() {

			_this._closePopup(document.querySelector('.popup.popup--active').getAttribute('data-popup'));

		});

		video.addEventListener('click', function() {

			event.stopPropagation();

		});

	},

	_closePopup: function(id) {

		var _this = this;

		var popup = document.querySelector('.popup[data-popup=' + id + ']');
		var video = popup.querySelector('.videoBanner__video');

		video.pause();

		removeClass(popup, 'popup--active');

		_this._body.style.position = 'static';
		_this._body.style.top      = 'auto';
		_this._body.style.left     = 'auto';

		_this.scrollTop = -parseInt(_this._scrollTop);
		_this._body.scrollTop = _this.scrollTop;

	}

};