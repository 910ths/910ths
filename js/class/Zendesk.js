var Zendesk = function() {

	this.init();

};

Zendesk.prototype = {

	init: function(){

		var _this = this;
		
		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setVars: function() {

		var _this = this;

		_this._body   = document.body || document.documentElement || document.getElementsByName('body');
		_this._button = document.querySelector('.zendeskButton');
		_this._host   = document.zendeskHost;
		_this._lang   = document.zendeskLang;

		if (!_this._button || !_this._host)
			return false;


		if (/SAFARI/.test(navigator.userAgent.toUpperCase())) {

			_this._bodyScroll = document.body || document.documentElement;

		} else {

			_this._bodyScroll = document.documentElement || document.body;

		}

		_this._label               = _this._button.querySelector('.zendeskButton__label');
		_this._labelDefault        = _this._label.innerHTML;
		_this._labelWaiting        = _this._label.getAttribute('data-waiting');
		_this._locked              = false;
		_this._scriptLoaded        = false;
		_this._toggle              = false;
		_this._waitingScriptLoaded = false;
		_this._currentScrollTop    = _this._bodyScroll.scrollTop;

		return true;

	},

	_setEvents: function() {

		var _this = this;

		document.addEventListener('click', function() {

			_this._closePopup();

		});

		_this._button.addEventListener('click', function(event) {

			event.stopPropagation();

			_this._actionAfterClickOnButton();

		});

		document.addEventListener('scroll', function(event) {

			if (_this._bodyScroll.scrollTop > (_this._currentScrollTop + 100)) {

				addClass(_this._button, 'hidden');

				_this._currentScrollTop = _this._bodyScroll.scrollTop;

			} else if (_this._bodyScroll.scrollTop < _this._currentScrollTop) {

				removeClass(_this._button, 'hidden');

				_this._currentScrollTop = _this._bodyScroll.scrollTop;

			}

		});


	},

	_actionAfterClickOnButton: function() {

		var _this = this;

		if (_this._locked)
			return false;

		if (!_this._scriptLoaded) {

			_this._loadScripts();

		} else {

			_this._openPopup();

		}

	},

	_loadScripts: function() {

		var _this = this;

		_this._scriptLoaded = true;

		_this._label.innerHTML = _this._labelWaiting;

		var scriptTag = document.createElement('script');
		scriptTag.src = 'https://assets.zendesk.com/embeddable_framework/main.js';

		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

		_this._waitForZendesk();

	},

	_waitForZendesk: function() {

		var _this = this;

		_this._waitingScriptLoaded = setInterval(function() {

			var widget = document.querySelector('.zEWidget-launcher');

			if (widget) {

				_this._initZendeskAfterLoad(widget);

				window.clearInterval(_this._waitingScriptLoaded);

			}

		}, 100);

	},

	_initZendeskAfterLoad: function(widget) {

		var _this = this;

		zE.setLocale(_this._lang);


		widget = widget.contentWindow.document.body;

		var styleTag       = document.createElement('style');
		styleTag.innerHTML = '#Embed { display: none !important; }';
		widget.insertBefore(styleTag, widget.firstChild);
		
		_this._openPopup();

	},

	_openPopup: function() {

		var _this = this;

		$zopim(function() {

			$zopim.livechat.window.show();
			$zopim.livechat.button.hide();

		});

		_this._waitForZopim();

	},

	_waitForZopim: function() {

		var _this = this;

		_this._waitingZopimLoaded = setInterval(function() {

			var widget = document.querySelector('.zopim');

			if (widget) {

				_this._label.innerHTML = _this._labelDefault;

				window.clearInterval(_this._waitingZopimLoaded);

			}

		}, 100);

	},

	_closePopup: function() {

		var _this = this;

		console.log('_closePopup');

		$zopim(function() {

			$zopim.livechat.hideAll();

		});

	}

};