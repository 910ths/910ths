var OffersFilter = function() {

	this.init();

};

OffersFilter.prototype = {

	init: function(){

		var _this = this;
		
		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setVars: function() {

		var _this = this;

		_this._filter = document.querySelector('.workGrid__filterSelect');

		if (!_this._filter)
			return false;

		_this._items = document.querySelectorAll('.workGrid__items');

		return true;

	},

	_setEvents: function() {

		var _this = this;

		_this._isotope = new Isotope(
			'.workGrid__items',
			{
				itemSelector: '.workGrid__item',
				layoutMode: 'fitRows',
				filter: '.active'
			}
		);

		_this._filter.addEventListener('change', function(event) {

			_this._isotope.arrange({ filter: '.' + this.value });

		});

	}

};