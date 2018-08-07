var Core = function(){ this.init(); };
Core.prototype = {
	constructor: Core,

	init: function(){
		document._910ths = document._910ths || {};
		this.run();
	},

	run: function(){
		document._910ths.grid = new Grid( document.getElementById('homeGrid') );
		document._910ths.showDelayed = new ShowDelayed();
		document._910ths.multiHover = new MultiHover();
		document._910ths.scrollTo = new ScrollTo();
		document._910ths.EventMap = new EventMap();
		document._910ths.video = new Video();
		document._910ths.offersFilter = new OffersFilter();

		document._910ths.popupVideo   = new PopupVideo();
		document._910ths.popupYouTube = new PopupYouTube();
		// document._910ths.zendesk      = new Zendesk();
		document._910ths.banner       = new Banner();
		document._910ths.offerBox     = new OfferBox();
	}

};