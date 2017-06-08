var MultiHover = function(){ this.init(); };
MultiHover.prototype = {
	constructor: MultiHover,

	init: function(){
		var _this = this;
		
		if( !_this._setVars() ) return;
		
		_this._setEvents();
	},

	_setVars: function(){
		var _this = this;

		_this._links = document.querySelectorAll('.jsMultiHover');
		if( !_this._links ) return false;

		return true;
	},

	_setEvents: function(){
		var _this = this;

		each( _this._links, function(linkK, link){
			link._events = link._events || {};
			link._events.mouseenter = function(e){
				this.addEventListener( 'mouseleave', function elh(e){
					this.removeEventListener( 'mouseleave', elh );
					_this._hover( this, false );
				} );
				_this._hover( this, true );
			};
			link.addEventListener( 'mouseenter', link._events.mouseenter );
		} );
	},

	_hover: function(el, state){
		var _this = this,
			href = el.href;
		
		each( _this._links, function(linkK, link){
			if( link.href == href ){
				if( state ){
					addClass( link, 'hover' );
				}else{
					removeClass( link, 'hover' );
				}
			}
		} );
	}

};