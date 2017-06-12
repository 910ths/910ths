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
			console.log('_preparateVideos()');

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

		}, 250);


		popup.querySelector('.popup__close').addEventListener('click', function(event) {

			event.preventDefault();

			_this._closePopup(this.parentNode.parentNode.getAttribute('data-popup'));

		});

	},

	_closePopup: function(id) {

		var _this = this;

		var popup = document.querySelector('.popup[data-popup=' + id + ']');
		var video = popup.querySelector('.videoBanner__video');


		removeClass(popup, 'popup--active');

		_this._players[id].pauseVideo();

	}

};