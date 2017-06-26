var EventMap = function() {

	this.init();

};

EventMap.prototype = {

	init: function(){

		var _this = this;
		
		if (!_this._setVars())
			return;

		_this._setEvents();

	},

	_setVars: function() {

		var _this = this;

		_this._map = document.querySelectorAll('.google__map')[0];

		if (!_this._map)
			return false;

		_this._lat    = parseFloat(_this._map.getAttribute('data-lat'));
		_this._lng    = parseFloat(_this._map.getAttribute('data-lng'));
		_this._marker = _this._map.getAttribute('data-marker');

		if (!_this._map)
			return false;

		return true;

	},

	_setEvents: function() {

		var _this = this;

		_this._initMap();

	},

	_initMap: function() {

		var _this = this;

		_this._googleMap = new google.maps.Map(_this._map, {
			zoom: 14,
			center: {
				lat: _this._lat,
				lng: _this._lng
			},
			styles: [{"featureType": "water","elementType": "geometry","stylers": [{"color": "#e9e9e9"},{"lightness": 17}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#f5f5f5"},{"lightness": 20}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#ffffff"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#ffffff"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#ffffff"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#ffffff"},{"lightness": 16}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#f5f5f5"},{"lightness": 21}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#dedede"},{"lightness": 21}]},{"elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#ffffff"},{"lightness": 16}]},{"elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#333333"},{"lightness": 40}]},{"elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#f2f2f2"},{"lightness": 19}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#fefefe"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#fefefe"},{"lightness": 17},{"weight": 1.2}]}],
			mapTypeControl: false,
			streetViewControl: false,
			scrollwheel: false,
			
		});

		_this._setMarker();

	},

	_setMarker: function() {

		var _this = this;

		_this._marker = new google.maps.Marker({
			position: {
				lat: _this._lat,
				lng: _this._lng
			},
			icon: _this._marker
		});

		_this._marker.setMap(_this._googleMap);

	},

};