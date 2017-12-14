$(function(){
  $('.navbar-custom li:nth-child(3)').addClass('current-menu-item');
});

$('#services-process').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  // fade: true,
  asNavFor: '#services-process-nav',
  // autoplay: true,
  // autoplaySpeed: 1000
});

$('#services-process-nav').slick({
  slidesToShow: 10,
  slidesToScroll: 1,
  asNavFor: '#services-process',
  dots: false,
  arrows: false,
  // loop: true,
  // centerMode: true,
  focusOnSelect: true,
  autoplay: true,
  autoplaySpeed: 1000
});