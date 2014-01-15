(function($) {
	$.fn.equalHeights = function(minHeight, maxHeight) {
		tallest = (minHeight) ? minHeight : 0;
		this.each(function() {
			if($(this).height() > tallest) {
				tallest = $(this).height();
			}
		});
		if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
		return this.each(function() {
			$(this).height(tallest).css("overflow","auto");
		});
	}
})(jQuery);

/* jQuery CounTo */

(function(a){a.fn.countTo=function(g){g=g||{};return a(this).each(function(){function e(a){a=b.formatter.call(h,a,b);f.html(a)}var b=a.extend({},a.fn.countTo.defaults,{from:a(this).data("from"),to:a(this).data("to"),speed:a(this).data("speed"),refreshInterval:a(this).data("refresh-interval"),decimals:a(this).data("decimals")},g),j=Math.ceil(b.speed/b.refreshInterval),l=(b.to-b.from)/j,h=this,f=a(this),k=0,c=b.from,d=f.data("countTo")||{};f.data("countTo",d);d.interval&&clearInterval(d.interval);d.interval=
setInterval(function(){c+=l;k++;e(c);"function"==typeof b.onUpdate&&b.onUpdate.call(h,c);k>=j&&(f.removeData("countTo"),clearInterval(d.interval),c=b.to,"function"==typeof b.onComplete&&b.onComplete.call(h,c))},b.refreshInterval);e(c)})};a.fn.countTo.defaults={from:0,to:0,speed:1E3,refreshInterval:100,decimals:0,formatter:function(a,e){return a.toFixed(e.decimals)},onUpdate:null,onComplete:null}})(jQuery);

/*
* hoverFlow - A Solution to Animation Queue Buildup in jQuery
* Version 1.00
*
* Copyright (c) 2009 Ralf Stoltze, http://www.2meter3.de/code/hoverFlow/
* Dual-licensed under the MIT and GPL licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/
(function($){$.fn.hoverFlow=function(c,d,e,f,g){if($.inArray(c,['mouseover','mouseenter','mouseout','mouseleave'])==-1){return this}var h=typeof e==='object'?e:{complete:g||!g&&f||$.isFunction(e)&&e,duration:e,easing:g&&f||f&&!$.isFunction(f)&&f};h.queue=false;var i=h.complete;h.complete=function(){$(this).dequeue();if($.isFunction(i)){i.call(this)}};return this.each(function(){var b=$(this);if(c=='mouseover'||c=='mouseenter'){b.data('jQuery.hoverFlow',true)}else{b.removeData('jQuery.hoverFlow')}b.queue(function(){var a=(c=='mouseover'||c=='mouseenter')?b.data('jQuery.hoverFlow')!==undefined:b.data('jQuery.hoverFlow')===undefined;if(a){b.animate(d,h)}else{b.queue([])}})})}})(jQuery);

var generateCarousel = function() {
	if(jQuery().carouFredSel) {
		jQuery('.clients-carousel').each(function() {
			jQuery(this).find('ul').carouFredSel({
				auto: false,
				prev: jQuery(this).find('.es-nav-prev'),
				next: jQuery(this).find('.es-nav-next'),
				width: '100%',
			});
		});

		jQuery('.es-carousel-wrapper').each(function() {
			jQuery(this).find('ul').carouFredSel({
				auto: false,
				prev: jQuery(this).find('.es-nav-prev'),
				next: jQuery(this).find('.es-nav-next'),
				width: '100%',
			});
		});

		jQuery('.products-slider').each(function() {
			var carousel = jQuery(this).find('ul');
			carousel.carouFredSel({
				auto: false,
				prev: jQuery(this).find('.es-nav-prev'),
				next: jQuery(this).find('.es-nav-next'),
				align: 'left',
				left: 0,
				width: '100%',
				height: 'variable',
				responsive: true,
				scroll: {
					items: 1
				},
				items: {
					width: 500,
					height: 'variable',
					visible: {
						min: 1,
						max: 30
					}
				}
			});
		});
	}
};

jQuery(window).load(function() {
	jQuery('.progress-bar').each(function() {
		var percentage = jQuery(this).find('.progress-bar-content').data('percentage');
		jQuery(this).find('.progress-bar-content').css('width', '0%');
		jQuery(this).find('.progress-bar-content').animate({
			width: percentage+'%'
		}, 'slow');
	});

	if(jQuery().waypoint) {
		jQuery('#progress-bars').waypoint(function() {
			jQuery('.progress-bar').each(function() {
				var percentage = jQuery(this).find('.progress-bar-content').data('percentage');
				jQuery(this).find('.progress-bar-content').css('width', '0%');
				jQuery(this).find('.progress-bar-content').animate({
					width: percentage+'%'
				}, 'slow');
			});
		}, {
			triggerOnce: true,
			offset: '100%'
		});
	}

	jQuery('.display-percentage').each(function() {
		var percentage = jQuery(this).data('percentage');
		jQuery(this).countTo({from: 0, to: percentage, speed: 900});
	});

	if(jQuery().waypoint) {
		jQuery('.counters-box').waypoint(function() {
			jQuery(this).find('.display-percentage').each(function() {
				var percentage = jQuery(this).data('percentage');
				jQuery(this).countTo({from: 0, to: percentage, speed: 900});
			});
		}, {
			triggerOnce: true,
			offset: '100%'
		});
	}

	jQuery('.simple-products-slider .product-buttons a').text('');

	generateCarousel();
});
jQuery(document).ready(function($) {
	if(jQuery('.sticky-header').length >= 1) {
		jQuery(window).scroll(function() {
		     var header = jQuery(document).scrollTop();
		     var headerHeight = jQuery('.header-social').height();

		     if(!headerHeight) {
		     	headerHeight = 10;
		     }

		     if(header > headerHeight) {
		     	//jQuery('.header-v1,.header-v2,.header-v3,.header-v4,.header-v5').hide();
		     	jQuery('.sticky-header').addClass('sticky');
		     	jQuery('.sticky-header').fadeIn();
		     	jQuery('#small-nav').css('visibility', 'hidden');
		     } else {
		     	//jQuery('.header-v1,.header-v2,.header-v3,.header-v4,.header-v5').show();
		     	jQuery('.sticky-header').removeClass('sticky');
		     	jQuery('.sticky-header').hide();
		     	jQuery('#small-nav').css('visibility', 'visible');
		     }
		});
	}

	var special_titles_width = [];

	jQuery('.title').each(function(index) {
		special_titles_width[index] = jQuery(this).width();
		if(jQuery(this).find('h1,h2,h3,h4,h5,h6').width() > jQuery(this).parent().width()) {
			jQuery(this).addClass('border-below-title');
		}
	});
	
	jQuery(window).on('resize', function() {
		jQuery('.title').each(function(index) {
			//console.log(jQuery(this).text()+'-'+special_titles_width[index]+'-'+jQuery(this).parent().width());
			if(special_titles_width[index] > jQuery(this).parent().width()) {
				jQuery(this).addClass('border-below-title');
			} else {
				jQuery(this).removeClass('border-below-title');
			}
		});
	});

	// Tabs
	//When page loads...
	jQuery('.tabs-wrapper').each(function() {
		jQuery(this).find(".tab_content").hide(); //Hide all content
		if(document.location.hash && jQuery(this).find("ul.tabs li a[href='"+document.location.hash+"']").length >= 1) {
			jQuery(this).find("ul.tabs li a[href='"+document.location.hash+"']").parent().addClass("active").show(); //Activate first tab
			jQuery(this).find(document.location.hash+".tab_content").show(); //Show first tab content
		} else {
			jQuery(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
			jQuery(this).find(".tab_content:first").show(); //Show first tab content
		}
	});
	
	//On Click Event
	jQuery("ul.tabs li").click(function(e) {
		jQuery(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
		jQuery(this).addClass("active"); //Add "active" class to selected tab
		jQuery(this).parents('.tabs-wrapper').find(".tab_content").hide(); //Hide all tab content

		var activeTab = jQuery(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		jQuery(this).parents('.tabs-wrapper').find(activeTab).fadeIn(); //Fade in the active ID content
		
		jQuery('.portfolio-wrapper').isotope('reLayout');
		
		e.preventDefault();
	});
	
	jQuery("ul.tabs li a").click(function(e) {
		e.preventDefault();
	})

	jQuery('.project-content .tabs-horizontal .tabset,.post-content .tabs-horizontal .tabset').each(function() {
		var menuWidth = jQuery(this).width();
	    var menuItems = jQuery(this).find('li').size();
	    var menuItemsExcludingLast = jQuery(this).find('li:not(:last)');
	    var menuItemsExcludingLastSize = jQuery(this).find('li:not(:last)').size();

		if(menuItems%2 == 0) {
			var itemWidth = Math.ceil(menuWidth/menuItems)-2;
		} else {
			var itemWidth = Math.ceil(menuWidth/menuItems)-1;
		}

	    jQuery(this).css({'width': menuWidth +'px'});
	    jQuery(this).find('li').css({'width': itemWidth +'px'});

	    /*if(jQuery('body').hasClass('dark')) {
	    	var menuItemsExcludingLastWidth = ((menuItemsExcludingLast.width() + 1) * menuItemsExcludingLastSize);
	    } else {*/
	    	var menuItemsExcludingLastWidth = ((menuItemsExcludingLast.width() + 1) * menuItemsExcludingLastSize);
		//}
	    var lastItemSize = menuWidth - menuItemsExcludingLastWidth;

	    jQuery(this).find('li:last').css({'width': lastItemSize +'px'});
	});

	jQuery('#sidebar .tabset').each(function() {
		var menuWidth = jQuery(this).width();
	    var menuItems = jQuery(this).find('li').size();
	    var itemWidth = (menuWidth/menuItems)-1;
	   	var menuItemsExcludingLast = jQuery(this).find('li:not(:last)');
	    var menuItemsExcludingLastSize = jQuery(this).find('li:not(:last)').size();

	    jQuery(this).css({'width': menuWidth +'px'});
	    jQuery(this).find('li').css({'width': itemWidth +'px'});

	    var menuItemsExcludingLastWidth = ((menuItemsExcludingLast.width() + 1) * menuItemsExcludingLastSize);
	    var lastItemSize = menuWidth - menuItemsExcludingLastWidth;

	    //jQuery(this).find('li:last').css({'width': lastItemSize +'px'});
	});
	
	jQuery('.tooltip-shortcode, #footer .social-networks li, .footer-area .social-networks li, #sidebar .social-networks li, .social_links_shortcode li, .share-box li, .social-icon, .social li').mouseenter(function(e){
		jQuery(this).find('.popup').hoverFlow(e.type, {
			'opacity' :'show'
		});
	});

	jQuery('.tooltip-shortcode, #footer .social-networks li, .footer-area .social-networks li, #sidebar .social-networks li, .social_links_shortcode li, .share-box li, .social-icon, .social li').mouseleave(function(e){
		jQuery(this).find('.popup').hoverFlow(e.type, {
			'opacity' :'hide'
		});
	});

	jQuery('.portfolio-tabs a').click(function(e){
		e.preventDefault();

		var selector = jQuery(this).attr('data-filter');
		jQuery(this).parents('.portfolio').find('.portfolio-wrapper').isotope({ filter: selector });

		jQuery(this).parents('ul').find('li').removeClass('active');
		jQuery(this).parent().addClass('active');
	});

	jQuery('.faq-tabs a').click(function(e){
		e.preventDefault();

		var selector = jQuery(this).attr('data-filter');

		jQuery('.faqs .portfolio-wrapper .faq-item').fadeOut();
		jQuery('.faqs .portfolio-wrapper .faq-item'+selector).fadeIn();

		jQuery(this).parents('ul').find('li').removeClass('active');
		jQuery(this).parent().addClass('active');
	});

	jQuery('.toggle-content').each(function() {
		if(!jQuery(this).hasClass('default-open')){
			jQuery(this).hide();
		}
	});

	jQuery("h5.toggle").click(function(){
		if(jQuery(this).parents('.accordian').length >=1){
			var accordian = jQuery(this).parents('.accordian');

			if(jQuery(this).hasClass('active')){
				jQuery(accordian).find('h5.toggle').removeClass('active');
				jQuery(accordian).find(".toggle-content").slideUp();
			} else {
				jQuery(accordian).find('h5.toggle').removeClass('active');
				jQuery(accordian).find(".toggle-content").slideUp();

				jQuery(this).addClass('active');
				jQuery(this).next(".toggle-content").slideToggle();
			}
		} else {
			if(jQuery(this).hasClass('active')){
				jQuery(this).removeClass("active");
			}else{
				jQuery(this).addClass("active");
			}
		}

		return false;
	});

	jQuery("h5.toggle").click(function(){
		if(!jQuery(this).parents('.accordian').length >=1){
			jQuery(this).next(".toggle-content").slideToggle();
		}
	});

	function isScrolledIntoView(elem)
	{
	    var docViewTop = jQuery(window).scrollTop();
	    var docViewBottom = docViewTop + jQuery(window).height();

	    var elemTop = jQuery(elem).offset().top;
	    var elemBottom = elemTop + jQuery(elem).height();

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

	jQuery('.toggle-alert').live('click', function(e) {
		e.preventDefault();

		jQuery(this).parent().slideUp();
	});
		
	// Create the dropdown base
	jQuery('<select />').appendTo('.header-wrapper .nav-holder');

	// Create default option 'Go to...'
	jQuery('<option />', {
		'selected': 'selected',
		'value'   : '',
		'text'    : 'Go to...'
	}).appendTo('.header-wrapper .nav-holder select');

	// Populate dropdown with menu items
	jQuery('.header-wrapper .nav-holder a').each(function() {
		var el = jQuery(this);

		if(jQuery(el).parents('.sub-menu .sub-menu').length >= 1) {
			jQuery('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : '-- ' + el.text()
			}).appendTo('.header-wrapper .nav-holder select');
		}
		else if(jQuery(el).parents('.sub-menu').length >= 1) {
			jQuery('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : '- ' + el.text()
			}).appendTo('.header-wrapper .nav-holder select');
		}
		else {
			jQuery('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : el.text()
			}).appendTo('.header-wrapper .nav-holder select');
		}
	});

	jQuery('.header-wrapper .nav-holder select').ddslick({
		width: '100%',
	    onSelected: function(selectedData){
	    	if(selectedData.selectedData.value != '') {
	        	window.location = selectedData.selectedData.value;
	    	}
	    }   
	});

	// Create the dropdown base
	jQuery('<select />').appendTo('.top-menu');

	// Create default option 'Go to...'
	jQuery('<option />', {
		'selected': 'selected',
		'value'   : '',
		'text'    : 'Go to...'
	}).appendTo('.top-menu select');

	// Populate dropdown with menu items
	jQuery('.top-menu a').each(function() {
		var el = jQuery(this);
		
		if(jQuery(el).parents('.sub-menu .sub-menu').length >= 1) {
			jQuery('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : '-- ' + el.text()
			}).appendTo('.top-menu select');
		}
		else if(jQuery(el).parents('.sub-menu').length >= 1) {
			jQuery('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : '- ' + el.text()
			}).appendTo('.top-menu select');
		}
		else {
			jQuery('<option />', {
			 'value'   : el.attr('href'),
			 'text'    : el.text()
			}).appendTo('.top-menu select');
		}
	});

	jQuery('.top-menu select').ddslick({
		width: '100%',
	    onSelected: function(selectedData){
	    	if(selectedData.selectedData.value != '') {
	        	window.location = selectedData.selectedData.value;
	    	}
	    }   
	});

	jQuery('.side-nav li').each(function() {
		if(jQuery(this).find('> .children').length >=1) {
			jQuery(this).find('> a').append('<span class="arrow"></span>');
		}
	});

	jQuery('.side-nav .current_page_item').each(function() {
		if(jQuery(this).find('.children').length >= 1){
			jQuery(this).find('.children').show('slow');
		}
	});

	jQuery('.side-nav .current_page_item').each(function() {
		if(jQuery(this).parent().hasClass('side-nav')) {
			jQuery(this).find('ul').show('slow');
		}
		
		if(jQuery(this).parent().hasClass('children')){
			jQuery(this).parents('ul').show('slow');
		}
	});

	jQuery('.content-boxes').each(function() {
		var cols = jQuery(this).find('.col').length;
		jQuery(this).addClass('columns-'+cols);
	});

	jQuery('.columns-3 .col:nth-child(3n), .columns-4 .col:nth-child(4n)').css('margin-right', '0px');

	jQuery('input, textarea').placeholder();

	jQuery('.content-boxes-icon-boxed').each(function() {
		jQuery(this).find('.col').equalHeights();
	});

	function checkForImage(url) {
	    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	}

	if(Modernizr.mq('only screen and (max-width: 479px)')) {
		jQuery('.overlay-full.layout-text-left .slide-excerpt p').each(function () {
			var excerpt = jQuery(this).html();
		    var wordArray = excerpt.split(/[\s\.\?]+/); //Split based on regular expression for spaces
		    var maxWords = 10; //max number of words
		    var total_words = wordArray.length; //current total of words
		    var newString = "";
		    //Roll back the textarea value with the words that it had previously before the maximum was reached
		    if (total_words > maxWords+1) {
		         for (var i = 0; i < maxWords; i++) {
		            newString += wordArray[i] + " ";
		        }
		        jQuery(this).html(newString);
		    }
		});

		jQuery('.portfolio .gallery-icon').each(function () {
			var img = jQuery(this).attr('href');

			if(checkForImage(img) == true) {
				jQuery(this).parents('.image').find('> img').attr('src', img).attr('width', '').attr('height', '');
			}
			jQuery(this).parents('.portfolio-item').css('width', 'auto');
			jQuery(this).parents('.portfolio-item').css('height', 'auto');
			jQuery(this).parents('.portfolio-one:not(.portfolio-one-text)').find('.portfolio-item').css('margin', '0');
		});

		if(jQuery('.portfolio').length >= 1) {
			jQuery('.portfolio-wrapper').isotope('reLayout');
		}

		/*jQuery('.title').each(function() {
			var title = jQuery(this).find('h1,h2,h3,h4,h5,h6').html();

			if(title.length >= 35) {
				jQuery(this).find('h1,h2,h3,h4,h5,h6').css('white-space', 'normal');
				jQuery(this).find('.title-sep-container').css('width', '20%');
			}
		});*/
	}

	if(Modernizr.mq('only screen and (max-width: 800px)')) {
		jQuery('.tabs-vertical').addClass('tabs-horizontal').removeClass('tabs-vertical');
	}

	jQuery(window).on('resize', function() {
		if(Modernizr.mq('only screen and (max-width: 800px)')) {
			jQuery('.tabs-vertical').addClass('tabs-original-vertical');
			jQuery('.tabs-vertical').addClass('tabs-horizontal').removeClass('tabs-vertical');
		} else {
			jQuery('.tabs-original-vertical').removeClass('tabs-horizontal').addClass('tabs-vertical');
		}
	});

	generateCarousel();

	// Woocommerce
	jQuery('.catalog-ordering .orderby .current-li a').html(jQuery('.catalog-ordering .orderby ul li.current a').html());
	jQuery('.catalog-ordering .sort-count .current-li a').html(jQuery('.catalog-ordering .sort-count ul li.current a').html());

	if(jQuery('body #sidebar').is(':visible')) {
		jQuery('body').addClass('has-sidebar');
	}

	if(jQuery('body.archive.woocommerce #sidebar').is(':visible')) {
		jQuery('#main ul.products').removeClass('products-1');
		jQuery('#main ul.products').removeClass('products-2');
		jQuery('#main ul.products').removeClass('products-4').addClass('products-3');
	}

	if(jQuery('body.single.woocommerce #sidebar').is(':visible')) {
		jQuery('.upsells.products ul.products,.related.products ul.products').removeClass('products-1');
		jQuery('.upsells.products ul.products,.related.products ul.products').removeClass('products-2');
		jQuery('.upsells.products ul.products,.related.products ul.products').removeClass('products-4').addClass('products-3');
		jQuery('.upsells.products ul.products').html(jQuery('.upsells.products ul.products li').slice(0, 3));
		jQuery('.related.products ul.products').html(jQuery('.related.products ul.products li').slice(0, 3));
	}

	jQuery('#sidebar .products,.footer-area .products').each(function() {
		jQuery(this).removeClass('products-4');
		jQuery(this).removeClass('products-3');
		jQuery(this).removeClass('products-2');
		jQuery(this).addClass('products-1');
	});

	jQuery('.gform_wrapper select').each(function() {
		jQuery(this).wrap('<div class="custom_select_box"></div>');
		var gWidth = jQuery(this).width();
		jQuery(this).ddslick({
			width: gWidth
		});
	});

	jQuery('.wpcf7-select,.address-change select').each(function() {
		jQuery(this).wrap('<div class="custom_select_box"></div>');
	})

	jQuery('.custom_select_box select').each(function() {
		jQuery(this).ddslick({
			width: '100%'
		});
	});

	jQuery('.gform_wrapper select').each(function() {
		jQuery(this).wrap('<div class="custom_select_box"></div>');
	});

	jQuery('.woocommerce-checkout-nav a,.continue-checkout').click(function(e) {
		e.preventDefault();

		var name = $(this).attr('href');

		jQuery('form.checkout #shipping, form.checkout #billing, form.checkout #payment-container').hide();
		jQuery('form.checkout').find(name).fadeIn();

		jQuery('.woocommerce-checkout-nav li').removeClass('active');
		jQuery('.woocommerce-checkout-nav').find('a[href='+name+']').parent().addClass('active');		
	});

	jQuery('a.add_to_cart_button').click(function(e) {
		var link = this;
		jQuery(link).parents('.product').find('.cart-loading').find('i').removeClass('icon-check').addClass('icon-spinner');
		jQuery(this).parents('.product').find('.cart-loading').fadeIn();
		setTimeout(function(){
			jQuery(link).parents('.product').find('.product-images img').animate({opacity: 0.75});
			jQuery(link).parents('.product').find('.cart-loading').find('i').hide().removeClass('icon-spinner').addClass('icon-check').fadeIn();

			setTimeout(function(){
				jQuery(link).parents('.product').find('.cart-loading').fadeOut().parents('.product').find('.product-images img').animate({opacity: 1});;
			}, 2000);
		}, 2000);
	});

	jQuery('li.product').mouseenter(function() {
		if(jQuery(this).find('.cart-loading').find('i').hasClass('icon-check')) {
			jQuery(this).find('.cart-loading').fadeIn();
		}
	}).mouseleave(function() {
		if(jQuery(this).find('.cart-loading').find('i').hasClass('icon-check')) {
			jQuery(this).find('.cart-loading').fadeOut();
		}		
	});

	jQuery('.sep-boxed-pricing,.full-boxed-pricing').each(function() {
		jQuery(this).addClass('columns-'+jQuery(this).find('.column').length);
	});
});