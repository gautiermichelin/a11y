let cookie_path = { "cookiePath": "accessibility" };
let fonts = {
    '.lab-link-default': 'fontfamily_default',
	'.lab-font-inter': 'fontfamily_opensans',
    '.lab-font-opendyslexic': 'fontfamily_opendyslexic'
};

function setFont(fnt) {
    Cookies.set('fontfamily', fonts['.' + fnt], { expires: 7, path: cookie_path.cookiePath });
    jQuery('body').removeClass(Object.values(fonts).join(" ")).addClass(fonts['.' + fnt]);
}


function formatter(value, settings) {
    return value.toFixed(settings.decimals);
}

function onComplete(value) {
    return value;
}

function activateAccessibilityFunctions() {
    let ReadableFontButton = jQuery('.lab-font-readable');
    let font_normal = jQuery('.lab-font-normal');
    let font_larger = jQuery('.lab-font-larger');
    let font_smaller = jQuery('.lab-font-smaller');
    let link_underline = jQuery('.lab-link-underline');
    let reset_all = jQuery('.lab-reset');
    let body = jQuery('body');
	let accessibility_button = jQuery('#accessibility_settings_open_close');

    body.toggleClass('font-readable', Cookies.get('readablefont') === 'yes');
    body.toggleClass('link-underline', Cookies.get('underline') === 'yes');

    let fsCount = 100;
    let cookieFont = Cookies.get('lab-font-size');

    if (cookieFont) {
        fsCount = parseInt(cookieFont);
        if (!body.hasClass('fsize' + fsCount)) {
            body.addClass('fsize' + fsCount);
        }
    } else {
        body.removeClass('fsize70 fsize80 fsize90 fsize100 fsize110 fsize120 fsize130');
    }

    font_larger.click(function(event) {
        event.preventDefault();
        if (fsCount < 130) {
            body.removeClass('fsize' + fsCount);
            fsCount = fsCount + 10;
            body.addClass('fsize' + fsCount);
            Cookies.set('lab-font-size', fsCount, { expires: 7, path: cookie_path.cookiePath });
        }
    });

    font_smaller.click(function(event) {
        event.preventDefault();
        if (fsCount > 70) {
            body.removeClass('fsize' + fsCount);
            fsCount = fsCount - 10;
            body.addClass('fsize' + fsCount);
            Cookies.set('lab-font-size', fsCount, { expires: 7, path: cookie_path.cookiePath });
        }
    });

    font_normal.click(function(event) {
        event.preventDefault();
        fsCount = 100;
        body.removeClass('fsize70 fsize80 fsize90 fsize100 fsize110 fsize120 fsize130 font-readable link-underline');
        Cookies.remove('lab-font-size', { path: cookie_path.cookiePath });
        Cookies.remove('readablefont', { path: cookie_path.cookiePath });
        Cookies.remove('underline', { path: cookie_path.cookiePath });
    });

    ReadableFontButton.click(function(event) {
        event.preventDefault();
        Cookies.set('readablefont', 'yes', { expires: 7, path: cookie_path.cookiePath });
        if (!body.hasClass('font-readable')) {
            body.addClass('font-readable');
        }

        jQuery(window).trigger('resize');
    });

    link_underline.click(function(event) {
        event.preventDefault();
        Cookies.set('underline', 'yes', { expires: 7, path: cookie_path.cookiePath });
        if (!body.hasClass('link-underline')) {
            body.addClass('link-underline');
        }
    });
	accessibility_button.click(function(event) {
		console.log('click accessibility_button');
		body.toggleClass('accessibility-menu-open');
	});

    reset_all.click(function() {
        body.removeClass('fsize70 fsize80 fsize90 fsize100 fsize110 fsize120 fsize130 font-readable link-underline fontfamily_inter fontfamily_andika fontfamily_fsme fontfamily_tiresias fontfamily_opendyslexic');
        fsCount = 100;
        Cookies.remove('lab-font-size', { path: cookie_path.cookiePath });
        Cookies.remove('readablefont', { path: cookie_path.cookiePath });
        Cookies.remove('underline', { path: cookie_path.cookiePath });
        Cookies.remove('fontfamily', { path: cookie_path.cookiePath });
    });

    jQuery(Object.keys(fonts).join(",") + "").click(function(event) {
        event.preventDefault();
        setFont(this.className);
    });

    body.addClass(Cookies.get('fontfamily'));

};

(function($) {
    "use strict";

    $.fn.countTo = function(options) {
        options = options || {};

        return $(this).each(function() {
            // set options for current element
            let settings = $.extend({}, $.fn.countTo.defaults, {
                from: $(this).data('from'),
                to: $(this).data('to'),
                speed: $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals: $(this).data('decimals')
            }, options);

            // how many times to update the value, and how much to increment the value on each update
            let loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            let self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};

            $self.data('countTo', data);

            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }

            data.interval = setInterval(updateTimer, settings.refreshInterval);

            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;

                render(value);

                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }

                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;

                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                let formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue + "+");
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 0, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        formatter: formatter, // handler for formatting the value before rendering
        onUpdate: null, // callback method for every time the element is updated
        onComplete: onComplete // callback method for when the element finishes updating
    };

})(jQuery);

$(document).ready(function() {
	$("body").prepend('\
	<nav id="skip-menu" role="navigation" aria-label="Skip Content menu"> \
		<div class="skip-menu"> \
			<ul id="menu-skip-menu" class="menu"> \
				<li class="menu-item"> \
					<a href="#zen-summary">Skip to content</a> \
				</li> \
				<li class="menu-item"> \
					<a href="#block_accessibility">Skip to accessibility menu</a> \
				</li> \
				<li class="menu-item"> \
					<a href="#top-menu">Skip to main menu</a> \
				</li> \
				<li class="menu-item"> \
					<a href="#footer">Skip to footer</a> \
				</li> \
			</ul> \
		</div> \
	</nav> \
	');

	$("body").prepend('\
	<div class="block-accessibility-wrapper"> \
		<div id="block_accessibility" class="block_accessibility_settings"> \
			<a id="accessibility_settings_open_close" tabindex="0"> \
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" width="2em"> \
					<path d="M50 8.1c23.2 0 41.9 18.8 41.9 41.9 0 23.2-18.8 41.9-41.9 41.9C26.8 91.9 8.1 73.2 8.1 50S26.8 8.1 50 8.1M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 11.3c-21.4 0-38.7 17.3-38.7 38.7S28.6 88.7 50 88.7 88.7 71.4 88.7 50 71.4 11.3 50 11.3zm0 8.9c4 0 7.3 3.2 7.3 7.3S54 34.7 50 34.7s-7.3-3.2-7.3-7.3 3.3-7.2 7.3-7.2zm23.7 19.7c-5.8 1.4-11.2 2.6-16.6 3.2.2 20.4 2.5 24.8 5 31.4.7 1.9-.2 4-2.1 4.7-1.9.7-4-.2-4.7-2.1-1.8-4.5-3.4-8.2-4.5-15.8h-2c-1 7.6-2.7 11.3-4.5 15.8-.7 1.9-2.8 2.8-4.7 2.1-1.9-.7-2.8-2.8-2.1-4.7 2.6-6.6 4.9-11 5-31.4-5.4-.6-10.8-1.8-16.6-3.2-1.7-.4-2.8-2.1-2.4-3.9.4-1.7 2.1-2.8 3.9-2.4 19.5 4.6 25.1 4.6 44.5 0 1.7-.4 3.5.7 3.9 2.4.7 1.8-.3 3.5-2.1 3.9z"> \
					</path> \
				</svg> \
			</a> \
			<div class="open-accessibility"> \
				<ul aria-label="Font Family :"> \
					<li> \
						<button class="lab-link-default"> \
							<span>par défaut</span> \
						</button> \
					</li> \
					<li> \
						<button class="lab-font-inter"> \
							<span>Open Sans</span> \
						</button> \
					</li> \
					<li> \
						<button class="lab-font-opendyslexic"> \
							<span>OpenDyslexic</span> \
						</button> \
					</li> \
				</ul> \
				<ul aria-label="Font Settings :"> \
					<li> \
						<button class="font-settings lab-font-smaller"> \
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"> \
								<path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 10 15 L 10 17 L 22 17 L 22 15 Z"></path> \
							</svg> \
							<span>Smaller</span> \
						</button> \
					</li> \
					<li> \
						<button class="font-settings lab-font-larger"> \
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"> \
								<path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z"></path> \
							</svg> \
							<span>Larger</span> \
						</button> \
					</li> \
					<li> \
						<button class="font-settings lab-link-underline"> \
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"> \
								<path d="M 21.75 4 C 20.078125 4 18.492188 4.660156 17.3125 5.84375 L 15.84375 7.3125 C 14.660156 8.496094 14 10.078125 14 11.75 C 14 12.542969 14.152344 13.316406 14.4375 14.03125 L 16.0625 12.40625 C 15.859375 11.109375 16.253906 9.714844 17.25 8.71875 L 18.71875 7.25 C 19.523438 6.445313 20.613281 6 21.75 6 C 22.886719 6 23.945313 6.445313 24.75 7.25 C 26.410156 8.910156 26.410156 11.621094 24.75 13.28125 L 23.28125 14.75 C 22.476563 15.554688 21.386719 16 20.25 16 C 20.027344 16 19.808594 15.976563 19.59375 15.9375 L 17.96875 17.5625 C 18.683594 17.847656 19.457031 18 20.25 18 C 21.921875 18 23.507813 17.339844 24.6875 16.15625 L 26.15625 14.6875 C 27.339844 13.503906 28 11.921875 28 10.25 C 28 8.578125 27.339844 7.027344 26.15625 5.84375 C 24.976563 4.660156 23.421875 4 21.75 4 Z M 19.28125 11.28125 L 11.28125 19.28125 L 12.71875 20.71875 L 20.71875 12.71875 Z M 11.75 14 C 10.078125 14 8.492188 14.660156 7.3125 15.84375 L 5.84375 17.3125 C 4.660156 18.496094 4 20.078125 4 21.75 C 4 23.421875 4.660156 24.972656 5.84375 26.15625 C 7.023438 27.339844 8.578125 28 10.25 28 C 11.921875 28 13.507813 27.339844 14.6875 26.15625 L 16.15625 24.6875 C 17.339844 23.503906 18 21.921875 18 20.25 C 18 19.457031 17.847656 18.683594 17.5625 17.96875 L 15.9375 19.59375 C 16.140625 20.890625 15.746094 22.285156 14.75 23.28125 L 13.28125 24.75 C 12.476563 25.554688 11.386719 26 10.25 26 C 9.113281 26 8.054688 25.554688 7.25 24.75 C 5.589844 23.089844 5.589844 20.378906 7.25 18.71875 L 8.71875 17.25 C 9.523438 16.445313 10.613281 16 11.75 16 C 11.972656 16 12.191406 16.023438 12.40625 16.0625 L 14.03125 14.4375 C 13.316406 14.152344 12.542969 14 11.75 14 Z"></path> \
							</svg> \
							<span>Links Underline</span> \
						</button> \
					</li> \
					<li> \
						<button class="font-settings lab-font-readable"> \
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"> \
								<path d="M 8 6 L 8 8 L 15 8 L 15 22 L 17 22 L 17 8 L 24 8 L 24 6 Z M 10 21.5 L 5.625 25 L 10 28.5 L 10 26 L 22 26 L 22 28.5 L 26.375 25 L 22 21.5 L 22 24 L 10 24 Z"></path> \
							</svg> \
							<span>Readable</span> \
						</button> \
					</li> \
					<li> \
						<button class="font-settings lab-reset"> \
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"> \
								<path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 L 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 C 19.875 5 23.261719 6.984375 25.21875 10 L 20 10 L 20 12 L 28 12 L 28 4 L 26 4 L 26 7.71875 C 23.617188 4.84375 20.019531 3 16 3 Z"></path> \
							</svg> \
							<span>Reset all</span> \
						</button> \
					</li> \
					\
				</ul> \
			</div> \
		</div> \
	</div> \
	');

	setTimeout(function() {
		activateAccessibilityFunctions();
	}, 300);
});