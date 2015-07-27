/*!
 * enquire.js v2.1.0 - Awesome Media Queries in JavaScript
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

//(function(t,i,n){var e=i.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=n(e):"function"==typeof define&&define.amd?define(function(){return i[t]=n(e)}):i[t]=n(e)})("enquire",this,function(t){"use strict";function i(t,i){var n,e=0,s=t.length;for(e;s>e&&(n=i(t[e],e),n!==!1);e++);}function n(t){return"[object Array]"===Object.prototype.toString.apply(t)}function e(t){return"function"==typeof t}function s(t){this.options=t,!t.deferSetup&&this.setup()}function o(i,n){this.query=i,this.isUnconditional=n,this.handlers=[],this.mql=t(i);var e=this;this.listener=function(t){e.mql=t,e.assess()},this.mql.addListener(this.listener)}function r(){if(!t)throw Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!t("only all").matches}return s.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},o.prototype={addHandler:function(t){var i=new s(t);this.handlers.push(i),this.matches()&&i.on()},removeHandler:function(t){var n=this.handlers;i(n,function(i,e){return i.equals(t)?(i.destroy(),!n.splice(e,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){i(this.handlers,function(t){t.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var t=this.matches()?"on":"off";i(this.handlers,function(i){i[t]()})}},r.prototype={register:function(t,s,r){var h=this.queries,u=r&&this.browserIsIncapable;return h[t]||(h[t]=new o(t,u)),e(s)&&(s={match:s}),n(s)||(s=[s]),i(s,function(i){h[t].addHandler(i)}),this},unregister:function(t,i){var n=this.queries[t];return n&&(i?n.removeHandler(i):(n.clear(),delete this.queries[t])),this}},new r});


var app = (function() {

	'use strict';

	return {
		init: function() {
			var	global = this;

			$('input[name="position"]').on('click', function() {
				var position = $('input[name="position"]:checked').val();
				$('.pure-drawer').attr('data-position', position);
				$('.pure-toggle').attr('data-toggle', position);
				$('.pure-toggle').attr('id', 'pure-toggle-' + position);
				$('.pure-toggle-label').attr('data-toggle-label', position);
				$('.pure-toggle-label').attr('for', 'pure-toggle-' + position);
				/*if(position === 'top') {
					$('.no-top').addClass("disabled");
					$('.notice').show();
				} else {
					$('.no-top').removeClass("disabled");
					$('.notice').hide();
				}*/
			});

			var target = 'left';
			$('input[name="target"]').on('click', function() {
				target = $('input[name="target"]:checked').val();
			});

			$('.nav-position li:first-child input[name="position"]').trigger('click');
			
			$('select#pure-effect').on('change', function(e) {
				e.preventDefault();
				var effect = $(this).val(),
					position = $('input[name="position"]:checked').val();

				$('.pure-container').attr('data-effect', effect);
				if(!$('input[name="target"]').length) {
					$('.pure-overlay').attr('data-overlay', position);
					$('.pure-overlay').attr('for', 'pure-toggle-' + position);
				} 

				setTimeout(function(){
					if(!$('input[name="target"]').length) {
						$('.pure-toggle-label[data-toggle-label="' + position + '"]').trigger('click');
					} else {
						$('.pure-toggle-label[data-toggle-label="' + target + '"]').trigger('click');
					}
				}, 500);
			});

			$('.button[data-effect]').not('.disabled').on('click', function(e) {
				e.preventDefault();
				var effect = $(this).attr('data-effect'),
					position = $('input[name="position"]:checked').val();

				$('.button').removeClass('active');
				$(this).addClass('active');

				$('.pure-container').attr('data-effect', effect);
				if(!$('input[name="target"]').length) {
					$('.pure-overlay').attr('data-overlay', position);
					$('.pure-overlay').attr('for', 'pure-toggle-' + position);
				} 

				setTimeout(function(){
					if(!$('input[name="target"]').length) {
						$('.pure-toggle-label[data-toggle-label="' + position + '"]').trigger('click');
					} else {
						$('.pure-toggle-label[data-toggle-label="' + target + '"]').trigger('click');
					}
				}, 500);
			});
			$('.icon-cross').on('click', function(e) {
				$(this).parent().fadeOut();
			});
			$('.pure-pusher').stellar({ 
				horizontalScrolling: false 
			});
			$('.icon-browser').on('click', function(e) {
				e.preventDefault();
				var scrollTo = $('#demo').offset().top;
				$('.pure-pusher').animate({
				    scrollTop: scrollTo
				}, 1000);
			});
			$('.nav-documentation a').on('click', function(e) {
				e.preventDefault();
				var id = $(this).attr('href').substr(1, $(this).attr('href').length),
					scrollTo = $('#' + id).offset().top;
				$('.pure-pusher').animate({
				    scrollTop: scrollTo
				}, 1000);
			});
			$.scrollIt();
			
			new WOW().init();
		}
	};

})();

(function() {

	'use strict';

	app.init();

})();
