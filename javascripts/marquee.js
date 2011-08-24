(function($) {

  $.marquee = function(el, options) {
    
    var defaults = {
      classIdPrefix: '_',
      jcarouselSettings: {
        auto: 5,
        visible: 3,
        scroll: 3,
        wrap: 'both'
      }
    };

    var plugin = this;

    plugin.settings = {};

    var init = function() {
      plugin.settings = $.extend({}, defaults, options);
      plugin.el = el;

      plugin.settings.jcarouselSettings.initCallback = function(carousel) {
        carousel.clip.hover(function() {
          carousel.stopAuto();
        }, function() {
          carousel.startAuto();
        });
      };

      var matcher = new RegExp('[\\s"]' + plugin.settings.classIdPrefix + '[^\\s"]*', 'gi');
      $('ul', plugin.el)
        .jcarousel(plugin.settings.jcarouselSettings)
        .delegate('div.logo-image', 'click', function() {
          $('a[href=#our_clients]').click();
          var clsMatch = this.className.match(matcher);
          if(clsMatch !== null) {
            plugin.swapDescription($('div.logo-description.' + clsMatch[0].replace(/^[\s"]/, ''), plugin.el));
          }
        });
    };

    plugin.swapDescription = function($el) {
      var active = $('div.logo-description.active', plugin.el);

      var hide = function(show) {
        active.fadeOut(200, show).removeClass('active');
      };
      var show = function() {
        $el.fadeIn(200).addClass('active');
      };

      var hasActive = active.length !== 0;
      var hasEl = $el !== undefined && $el.length !== 0;

      if(hasActive && hasEl) {
        hide(show);
      } else if(hasActive) {
        hide();
      } else {
        show();
      }
    }

    init();

    plugin.data('marquee', plugin);

    return plugin;
  };

  $.fn.marquee = function(options) {
    return this.each(function(index, el) {
      $.marquee(el, options);
    });
  };

})(jQuery);
