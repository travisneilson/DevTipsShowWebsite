$(function(){

  menuToggle();
  carousel();

});

function menuToggle(){
  $('.menu-plate').on('click', function(e){
    e.stopPropagation();
  });

  $('.menu-close, header .menu-svg, .menu-overlay').on('click', function(){
    $('html').toggleClass('menu-open');
  });
}

function carousel(){

  var $carouselWrap = $('.carousel-wrap'),
      $carouselUnits = $carouselWrap.find('.carousel-unit'),
      unitCount = $carouselUnits.length,
      tallestUnitHeight = getTallestUnitHeight(),
      $carouselNav = $('.carousel-nav');

  function getTallestUnitHeight(){
    var heights = [];
    for (var i = 0; i < unitCount; i++) {
      var height = $carouselUnits.eq(i).height();
      heights.push(height);
    }
    var tallest = Math.max.apply(Math, heights);
    return tallest;
  }

  function initCarousel(){
    $carouselUnits.height(tallestUnitHeight).first().addClass('is-current');
    $carouselWrap.height(tallestUnitHeight);
  }
  initCarousel();

  function nextTestimonial(){
    if ($carouselUnits.filter('.is-current').index() < unitCount-1) {
        $carouselUnits.filter('.is-current').next().addClass('is-current').siblings().removeClass('is-current');
    }
    else {
      $carouselUnits.first().addClass('is-current').siblings().removeClass('is-current');
    }
  }

  function prevTestimonial(){
    if ($carouselUnits.filter('.is-current').index() === 0) {
      $carouselUnits.last().addClass('is-current').siblings().removeClass('is-current');
    }
    else {
      $carouselUnits.filter('.is-current').prev().addClass('is-current').siblings().removeClass('is-current');
    }
  }

  var carouselInterval = setInterval(function(){ nextTestimonial() }, 4500);

  $carouselNav.children('svg').on('click', function(){
    clearInterval(carouselInterval);
    if ($(this).index() === $carouselNav.length) {
      nextTestimonial();
    } else {
      prevTestimonial();
    }
  });

}
