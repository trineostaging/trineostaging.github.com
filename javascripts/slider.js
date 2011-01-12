$(document).ready(function() {      
  // set slides to width of window
  function setWidth() {
    windowwidth = $(window).width();
    slidecount = $('.slide').size();
    var minwidth = 1044;
    if (windowwidth > minwidth) {
      slidewidth = windowwidth
      } else {
      slidewidth = minwidth
      };
    $('.slider-canvas').width( slidewidth * slidecount );
    $('.slide').width( slidewidth );
  };
  setWidth();
  $(window).resize(function(){
    setWidth();
    // make sure slide stays pinned to the left
    $.localScroll.hash({
      target:"#intro .slider-bounds",
      duration: 0
    });
  });

  
  // automatic slideshow
  var slideDuration = 10000; // miliseconds
  var slideShowTimeout = null;
  var maxSlides = 7; // set to -1 to continue indefinitely
  var stopped = true;

  function changeSlide(delta, force_stop) {
    if (!delta) delta = 1;

    // find index of .active .slider-nav
    var sliderNavs = $('.slider-nav ul a:not(.previous):not(.next)');
    for (var i=0; i < sliderNavs.size(); i++) {
      if (sliderNavs.eq(i).hasClass('active')) break;
    }
    
    sliderNavs.eq((i + delta) % sliderNavs.size()).trigger('click', false); // click next .slider-nav to perform transition

    // if currently playing, continue to do so
    if (force_stop) stop();
    if (slideShowTimeout) play();
  };
  
  function play() {
    if (stopped) return;
    pause(); // assert multiple timeouts aren't set
    if (maxSlides != 0) {
      maxSlides -= 1;
      slideShowTimeout = setTimeout(changeSlide, slideDuration);
    }
  };
  play();
  
  function pause() {
    clearTimeout(slideShowTimeout);
    slideShowTimeout = null 
  };
  
  function stop() {
    stopped = true;
    pause();
  }
  
  // $('.slider').mouseover(function(){ pause(); });
  // $('.slider').mouseleave(function(){ play(); });
  $('.slider').click(function(e, force_stop) { 
    if (force_stop !== false) stop();
  });
  
  // initialize active class for navigation
  function selectNav(e, force_stop) {
    if (force_stop !== false) stop();

    $(this)
      .parents('ul:first')
        .find('a')
          .removeClass('active')
        .end()
      .end()
      .addClass('active');
  }
  
  // apply active class for clicked nav
  $('.slider-nav ul a:not(.previous):not(.next)').click(selectNav);
  
  $('.slider-nav ul a.previous').click(function(e) {
    e.preventDefault();
    changeSlide(-1, true);
  });

  $('.slider-nav ul a.next').click(function(e) {
    e.preventDefault();
    changeSlide(1, true);
  });

  // apply active class to current url #hash
  if (window.location.hash) {
    var hash = window.location.hash.substr(1);
    var el = $('.slider .slider-nav ul').find('a[href$="' + hash + '"]');
    el.trigger('click', false);
  } else {
    $('.slider-nav ul a:not(.previous):not(.next):first').trigger('click', false);
  }
  
  // configure localscroll
  $.localScroll.defaults.axis = 'x';
  $.localScroll.defaults.duration = '2500';
  // Scroll if there's a #hash in the url 
  $.localScroll.hash({
    target:"#intro .slider-bounds",
    // avoid scrolling and instead jump to correct tab
    duration: 0,
    // scroll to top of page instead of top of #hash, minor flicker
    onBefore:function( e, anchor, $target ){
      setWidth();
      $.scrollTo("body", {duration: 10, axis:"y"})
    },
  })
  // scroll with navigation
  $.localScroll({
    target:"#intro .slider-bounds",
    hash:true,
    onBefore:function( e, anchor, $target ){
     // The 'this' is the settings object, can be modified
     if ($('#intro .slider-nav .active').attr('href') != window.location.hash) {
       // $('#intro .slide .container').delay(50).animate({ opacity: 0.2 }, 150);
     }
    },
    onAfter:function( anchor, settings ){
     // The 'this' contains the scrolled element (#content)
     $(anchor).children(".container").animate({ opacity: 1 }, 150);
    }
  });
});
