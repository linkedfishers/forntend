function Heightcarousel() {
  
  // Adjust Slider Height
  var winH    = $(window).height(),
      upperH  = $('.container top').innerHeight(),
      navH    = $('.simplebar-mask').innerHeight();
      navB    = $('.header').innerHeight();

  $('.slider, .carousel-item').height(winH - ( upperH + navH + navB ));
}


