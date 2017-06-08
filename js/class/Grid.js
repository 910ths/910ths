var Grid = function(el){ this.init(el); };
Grid.prototype = {
	constructor: Grid,

	init: function(el){
		var _this = this;
		
		if( !_this._setVars(el) ) return;
		
		_this.update();
		_this._setEvents();
	},

	_setVars: function(el){
		var _this = this;

		_this._grid = el;
		if( !_this._grid ) return false;

		_this._items = _this._grid.querySelector('.homeGrid__items');
		if( !_this._items ) return false;

		_this._itemsArr = _this._items.children;
		if( !_this._itemsArr.length ) return false;

		_this._sizeItem = _this._itemsArr[0];
		_this._sizeDiv = 1;
		if( hasClass( _this._sizeItem, 'homeGrid__item--horizontal' ) ) _this._sizeDiv = 2;

		return true;
	},

	_setEvents: function(){
		var _this = this;

		_this._resizeTimeout = null;
		_this._events = _this._events || {};
		_this._events.resize = function(e){
			if( _this._resizeTimeout !== null ){
				clearTimeout( _this._resizeTimeout );
				_this._resizeTimeout = null;
			}
			_this._resizeTimeout = setTimeout( function(){
				_this.update();
			}, 200 );
		};
		window.addEventListener( 'resize', _this._events.resize );
	},

	update: function(){
		var _this = this;

		_this._checkContext();
		_this._fillGrid();
	},

	_checkContext: function(){
		var _this = this;

		each( _this._itemsArr, function(key, val){
			val.setAttribute('style', '');
		} );

		_this._unitSize = _this._sizeItem.offsetWidth / _this._sizeDiv;
		_this._colCount = Math.round( _this._items.offsetWidth / _this._unitSize );
	},

	_newRow: function(){
		var _this = this, row = [], i;
		for( i = 0; i < _this._colCount; i++ ){
			row.push(0);
		}
		return row;
	},

	_getCoordinates: function(){
		var _this = this,
			size = {}, gap;
		
		_this._grid = [];
		
		each( _this._itemsArr, function(key, val){
			size.w = 1; size.h = 1;
			if( hasClass( val, 'homeGrid__item--horizontal' ) ) size.w = 2;
			if( hasClass( val, 'homeGrid__item--vertical' ) ) size.h = 2;

			gap = _this._findGap( size, 0, 3 );

			val._xy = gap;

			if( gap !== null ){
				_this._grid[gap.y][gap.x] = 1;

				if( size.w == 2 ){
					_this._grid[gap.y][gap.x+1] = 1;
				}

				if( size.h == 2 ){
					_this._grid[gap.y+1][gap.x] = 1;
				}
			}
		} );
	},

	_fillGrid: function(){
		var _this = this,
			elStyle, elXY;

		_this._getCoordinates();

		each( _this._itemsArr, function(key, val){
			elStyle = val.style;
			elXY = val._xy;
			elStyle.position = 'absolute';
			elStyle.top = _this._unitSize * elXY.y + 'px';
			elStyle.left = _this._unitSize * elXY.x + 'px';
		} );

		_this._items.style.height = _this._unitSize * _this._grid.length + 'px';
	},

	_findGap: function( size, beginInRow, max ){
		var _this = this,
			grid = _this._grid,
			gap = null, tmp;

		if( max === 0 ) return gap;

		each( grid, function(rKey, rVal){ // loop over rows
			if( rKey < beginInRow ) return true;

			each( rVal, function(cKey, cVal){ // loop over cols in rows
				if( cVal === 0 ){

					if( size.w == 1 && size.h == 1 ){ // standard item 1x1

						gap = {
							x: cKey,
							y: rKey
						};
						return false;

					}else{

						if( size.w == 2 ){ // horizontal item 2x1

							tmp = cKey + 1;
							if( tmp < rVal.length && rVal[tmp] === 0 ){
								gap = {
									x: cKey,
									y: rKey
								};
								return false;
							}
							return true;
						}

						if( size.h == 2 ){ // vertical item 1x2

							tmp = rKey + 1;
							if( tmp < grid.length && grid[tmp] && grid[tmp][cKey] === 0 ){
								gap = {
									x: cKey,
									y: rKey
								};
								return false;
							}
							return true;
						}
					}
				}
			} );

			if( gap !== null ){
				return false;
			}

		} );

		if( gap !== null ){
			return gap;
		}

		_this._grid.push( _this._newRow() );
		return _this._findGap( size, beginInRow, max - 1 );
	}

};