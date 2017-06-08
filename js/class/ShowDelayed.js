var ShowDelayed = function(){ this.init(); };
ShowDelayed.prototype = {
	constructor: ShowDelayed,

	init: function(){
		var _this = this;
		
		if( !_this._setVars() ) return;
		
		_this._initState();
		_this._checkAll();
		_this._setEvents();
	},

	_setVars: function(){
		var _this = this;

		_this._boxes = document.querySelectorAll('.jsShowDelayed');
		if( !_this._boxes ) return false;

		return true;
	},

	_initState: function(){
		var _this = this, random;

		each( _this._boxes, function(boxK, box){
			box._randomShow = box.getAttribute('data-random-show') ? true : false;
			each( box.children, function(itemK, item){
				addClass( item, 'transparent' ); // opacity 0
				addClass( item, 'animTransparent' ); // transition opacity
			} );
			box._delayedShown = false;
		} );
	},

	_setEvents: function(){
		var _this = this,
			scroll;

		_this._events = _this._events || {};
		_this._events.scroll = function(e){
			_this._checkAll();
		};
		window.addEventListener( 'scroll', _this._events.scroll );
	},

	_checkAll: function(){
		var _this = this,
			scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			
		scroll += window.innerHeight * 0.75; // trigger offset

		each( _this._boxes, function(boxK, box){
			_this._check( scroll, box );
		} );
	},

	_check: function(scroll, el){
		var _this = this, elTop, delayArr;

		if( el._delayedShown ) return;

		elTop = getOffset(el).t;
		if( scroll > elTop ){
			el._delayedShown = true;

			delayArr = [];
			each( el.children, function(itemK, item){
				delayArr.push( itemK * 160 ); // item delay
			} );

			if( el._randomShow ) delayArr = _this._shuffle( delayArr );
			
			each( el.children, function(itemK, item){
				setTimeout( function(){
					removeClass( item, 'transparent' );
				}, delayArr[itemK] ); // item delay
			} );
		}

	},

	_shuffle: function(arr){
		var i, j, tmp;
		for( i = arr.length; i; i-- ){
			j = Math.floor( Math.random() * i );
			tmp = arr[i - 1];
			arr[i - 1] = arr[j];
			arr[j] = tmp;
		}
		return arr;
	}

};