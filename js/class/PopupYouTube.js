var PopupYouTube = function() {

	this.init();

};

PopupYouTube.prototype = {

	init: function(){

		var _this = this;
		
		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setVars: function() {

		var _this = this;

		_this._body        = document.body || document.documentElement || document.getElementsByName('body');
		_this._openButtons = document.querySelectorAll('.jsPopup--YT');

		if (!_this._openButtons || (_this._openButtons.length == 0))
			return false;


		if (/SAFARI/.test(navigator.userAgent.toUpperCase())) {

			_this._bodyScroll = document.body || document.documentElement;

		} else {

			_this._bodyScroll = document.documentElement || document.body;

		}

		_this._videos   = [];
		_this._players  = [];
		_this._lockOpen = true;

		return true;

	},

	_setEvents: function() {

		var _this = this;

		_this._loadAPI();

	},

	_loadAPI: function() {

		var _this = this;

		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		tag.setAttribute('defer', 'defer');
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = function() {

			_this._preparateVideos();

		};

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
		
		_this._initVideo(id);

	},

	_initVideo: function(id) {

		var _this = this;

		var popup = document.querySelector('.popup[data-popup=' + id + ']');
		var video = popup.querySelector('.videoBanner__video');

		_this._players[id] = new YT.Player(video, {
			videoId: video.getAttribute('data-src'),
			playerVars: {
				'controls': 0,
				'rel': 0,
				'showinfo': 0,
				'loop': 1,
            	'origin': window.location.protocol + '//' + window.location.hostname
			},
			events: {
				'onReady': function() { _this._lockOpen = false; }
			}
		});

	},

	_openPopup: function(id) {

		var _this = this;

		if (_this._lockOpen)
			return false;

		var popup = document.querySelector('.popup[data-popup=' + id + ']');
		var video = popup.querySelector('.videoBanner__video');


		_this._players[id].playVideo();

		setTimeout(function() {

			addClass(popup, 'popup--active');

			_this._scrollTop = -_this._bodyScroll.scrollTop + 'px';

			_this._body.style.position = 'fixed';
			_this._body.style.top      = _this._scrollTop;
			_this._body.style.left     = '0';

		}, 250);


		popup.addEventListener('click', function(event) {

			event.preventDefault();

			_this._closePopup();

		});

		video.addEventListener('click', function(event) {

			event.stopPropagation();

		});

	},

	_closePopup: function(id) {

		var _this = this;

		var popup = _this._body.querySelector('.popup--active');
		var id    = popup.getAttribute('data-popup');
		var video = popup.querySelector('.videoBanner__video');


		_this._body.style.position = 'static';
		_this._body.style.top      = 'auto';
		_this._body.style.left     = 'auto';

		_this._scrollTop = -parseInt(_this._scrollTop);
		_this._bodyScroll.scrollTop = _this._scrollTop;

		removeClass(popup, 'popup--active');

		_this._players[id].pauseVideo();

	}

};