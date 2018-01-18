// Polyfill for IE compatibility
if (!('remove' in Element.prototype)) {
    console.log('...You are using internet expoler. Please use another browser');
    Element.prototype.remove = function() {
        if (this.parentNode && this.parentNode.removeChild) {
            this.parentNode.removeChild(this);
        }
    };
}

// Global JS

var currentScroll = function() {

  var scroll = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;

  if (document.body.style.position == 'fixed')
    scroll = -parseInt(document.body.style.top);

  return scroll;

}

function getOffset(el, relEl){
	if( !el || el === relEl ) return { l: 0, t: 0 };
	var eOff = { l: el.offsetLeft, t: el.offsetTop };
	var pOff = getOffset( el.offsetParent, relEl );
	return { l: eOff.l + pOff.l, t: eOff.t + pOff.t };
}

function addClass(el, className){
	if( el.classList ){
		el.classList.add( className );
	}else{
		el.className += ' ' + className;
	}
}

function removeClass(el, className){
	if( el.classList ){
		el.classList.remove( className );
	}else{
		el.className = el.className.replace( new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ' );
		// el.className = ( ' ' + el.className + ' ' ).replace( ( ' ' + className + ' ' ), ' ' ).trim();
	}
}

function hasClass(el, className){
	if( el.classList ){
		return el.classList.contains( className );
	}else{
		// return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
		return ( ( el.className.split(' ') ).indexOf( className ) >= 0 );
	}
}

function each(arr, fn){
	if( !arr || !arr.length || typeof( fn ) != 'function' ) return;
	var i, l = arr.length, result;
	for( i = 0; i < l; i++ ){
		result = fn( i, arr[i] );
		if( result !== undefined ){
			if( result ) continue;
			else break;
		}
	}
}

function addCSS(src, id, onload){
	var el;
	if( id ) el = document.getElementById(id);
	if( !el ){
		el = document.createElement('link');
		if( id ) el.id = id;
		el.type = 'text/css';
		el.rel = 'stylesheet';
	}else{
		el.parent.removeChild( el );
	}
	if( onload ) el.onload = onload;
	el.href = src;
	document.head.appendChild( el );
}

function addJS(src, id, onload){
	var el;
	if( id ) el = document.getElementById(id);
	if( !el ){
		el = document.createElement('script');
		if( id ) el.id = id;
		el.type = 'text/javascript';
	}else{
		el.parent.removeChild( el );
	}
	if( onload ) el.onload = onload;
	el.src = src;
	document.head.appendChild( el );
}

function getStyle(el, prop){
  return window.document.defaultView.getComputedStyle(el).getPropertyValue(prop);
}

function indexOf(el){
	var i, nodes = el.parentElement.children;
	for( i = 0; i < nodes.length; i++ ){
		if( nodes[i] === el ) return i;
	}
	return -1;
}

function inClass(el, className){
	if( !el ) return false;
	if( hasClass( el, className ) ) return true;
	return inClass( el.offsetParent, className );
}

function doCallback(cb){
	if( typeof cb == 'function' ){
		cb();
	}
}

function debug(str){
	var debugBox = document.getElementById('debugBox');

	if( !debugBox ){
		debugBox = document.createElement('div');
		debugBox.id = 'debugBox';
		debugBox.style.zIndex = 2000;
		debugBox.style.position = 'absolute';
		debugBox.style.top = 0;
		debugBox.style.right = 0;
		debugBox.style.width = '320px';
		debugBox.style.height = '240px';
		debugBox.style.overflow = 'auto';
		debugBox.style.backgroundColor = '#000';
		debugBox.style.border = '1px solid #f00';
		debugBox.style.color = '#fff';
		debugBox.style.fontFamily = 'consolas';
		debugBox.style.fontSize = '12px';
		debugBox.style.lineHeight = '14px';

		document.body.appendChild( debugBox );
	}

	var debugLog = document.createElement('div');
	debugLog.style.padding = '2px 10px';
	debugLog.innerText = str;

	debugBox.appendChild( debugLog );
	debugBox.scrollTop = debugBox.scrollHeight;
}

/* requestAnimFrame */
window.requestAnimFrame = ( function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( cb ){
			return window.setTimeout( cb, 1000 / 60 );
		};
} )();

/* cancelRequestAnimFrame */
window.cancelRequestAnimFrame = ( function(){
	return window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		clearTimeout;
} )();

/* performance.now */
window.performance = window.performance = {};
window.performance.now = ( function(){
	return window.performance.now ||
		function(){
			return new Date().getTime();
		};
} )();
