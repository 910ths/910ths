var ScrollTo = function(){ this.init(); };
ScrollTo.prototype = {
	constructor: ScrollTo,

	_duration: 800,

	_easing: {

		easeInCubic: function(f){
			return f * f * f;
		},

		easeOutCubic: function(f){
			f = 1 - f;
			return 1 - ( f * f * f );
		},

		easeInOutCubic: function(f){
			f *= 2;
			if( f <= 1 ){
				return ( f * f * f ) / 2;
			}else{
				f = 2 - f;
				return 1 - ( ( f * f * f ) / 2 );
			}
		}

	},

	init: function(){
		var _this = this;
		
		if( !_this._setVars() ) return;
		
		_this._setEvents();
	},

	_setVars: function(){
		var _this = this;

		_this._links = document.querySelectorAll('.jsScrollTo');
		if( !_this._links.length ) return false;

		_this._inLoop = false;
		_this._fready = true;
		_this._time = null;

		_this._bTime = null;
		_this._eTime = null;
		_this._bScroll = null;
		_this._dScroll = 0;

		_this._is_safari = /SAFARI/.test( navigator.userAgent.toUpperCase() );

		return true;
	},

	_setEvents: function(){
		var _this = this;

		each( _this._links, function(linkK, link){
			link._events = link._events || {};
			link._events.click = function(e){
				e.preventDefault();
				_this._scrollOnClick( this );
			};
			link.addEventListener( 'click', link._events.click );
		} );

		_this._events = _this._events || {};
		_this._events.wheel = function(e){
			_this._stopLoop();
		};
	},

	_bindOnWheel: function(){
		window.addEventListener( 'wheel', this._events.wheel );
	},

	_unbindOnWheel: function(){
		window.removeEventListener( 'wheel', this._events.wheel );
	},

	_scrollOnClick: function(el){
		var _this = this,
			targetSelector, target;
		
		if( !el ) return;
		targetSelector = el.getAttribute('data-scroll-to');
		if( !targetSelector ) return;
		target = document.querySelector( targetSelector );
		if( !target ) return;

		_this._scrollTo( target );
	},
	
	_scrollTo: function(el){
		if( !el ) return;
		this._animScrollTo( getOffset(el).t - 60 ); // header offset
	},

	_animScrollTo: function( top ){ 

		var _this = this,
			scroll = currentScroll();

		_this._bTime = window.performance.now();
		_this._eTime = _this._bTime + _this._duration;
		_this._bScroll = scroll;
		_this._dScroll = top - scroll;

		_this._startLoop();
	},

	_loop: function(){
		var _this = this;
		_this._raf = window.requestAnimFrame( function(){ _this._loop(); } );
		if( !_this._fready ) return;
		_this._fready = false;
		_this._time = window.performance.now();
		_this._update( _this._time );
		_this._fready = true;
	},

	_startLoop: function(){
		var _this = this;

		if( _this._inLoop ) return;
		_this._bindOnWheel();
		_this._inLoop = true;
		_this._raf = window.requestAnimFrame( function(){ _this._loop(); } );
	},

	_stopLoop: function(){
		var _this = this;
		_this._unbindOnWheel();
		window.cancelRequestAnimFrame( _this._raf );
		_this._raf = null;
		_this._inLoop = false;
	},

	_update: function( t ){
		var _this = this,
			fract;

		if( t > _this._eTime ){
			// complete
			_this._stopLoop();
		}

		fract = ( t - _this._bTime ) / _this._duration;
		fract = _this._easing.easeOutCubic( fract );
		// body.scrollTop = _this._bScroll + fract * _this._dScroll;
    document.body.scrollTop = document.documentElement.scrollTop = _this._bScroll + fract * _this._dScroll

	}

};