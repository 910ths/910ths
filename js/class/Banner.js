var Banner = function() {

	this.init();

};

Banner.prototype = {

	init: function(){

		var _this = this;
		
		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setVars: function() {

		var _this = this;

		_this._video = document.querySelector('video.stdBanner__video');

		if (!_this._video)
			return false;

		_this._playing = false;

		return true;

	},

	_setEvents: function() {

		var _this = this;

		_this._playVideo();

		window.onresize = function() {

			if (_this._playing)
				return false;

			_this._playVideo();

		};

	},

	_playVideo: function() {

		var _this = this;

		if ((_this._video.offsetHeight !== 0) || (_this._video.offsetWidth !== 0)) {

			_this._playing = true;

			var source = _this._video.querySelector('source');

			source.src = source.getAttribute('data-src');
			_this._video.load();
			_this._video.play();

		}

	}

};