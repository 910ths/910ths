var Banner = function() {

	this.init();

};

Banner.prototype = {

	init: function(){

		var _this = this;
		
		_this._setBannerHeight();

		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setBannerHeight: function(){
		var maxScreenSize, banner, bg;
		
		banner = document.querySelector('.homeBanner');
		if( !banner ) return;

		bgMobile = document.querySelector('.homeBanner__bgMobile');
		if( !bgMobile ) return;

		maxScreenSize = window.innerHeight;
		
		banner.style.maxHeight = maxScreenSize + 'px';
		bgMobile.style.maxHeight = maxScreenSize + 'px';
	},

	_setVars: function() {

		var _this = this;

		_this._video = document.querySelector('video.stdBanner__video');

		if (!_this._video)
			return false;


		if (/SAFARI/.test(navigator.userAgent.toUpperCase())) {

			_this._bodyScroll = document.body || document.documentElement;

		} else {

			_this._bodyScroll = document.documentElement || document.body;

		}

		_this._content = document.querySelector('.homeBanner__content');
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

		document.addEventListener('scroll', function() {

			var windowHeight  = (window.innerHeight / 2);
			var currentScroll = _this._bodyScroll.scrollTop;
			var percent       = 1;

			if (currentScroll > 0) {

				percent = currentScroll / windowHeight;

				if (percent > 1) {

					percent = 1;

				}

				percent = 1 - percent;

			}

			_this._content.style.opacity = percent;

		});

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

	},

	_opacityContent: function() {

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