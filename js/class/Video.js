var Video = function() {

	this.init();

};

Video.prototype = {

	init: function(){

		var _this = this;
		
		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setVars: function() {

		var _this = this;

		_this._video = document.querySelector('video.homeBanner__bgVideo');

		if (!_this._video)
			return false;

		return true;

	},

	_setEvents: function() {

		var _this = this;

		if ((_this._video.offsetHeight !== 0) || (_this._video.offsetWidth !== 0)) {

			_this._video.play();

		}

	},

};