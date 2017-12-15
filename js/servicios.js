$(function(){
  $('.navbar-custom li:nth-child(3)').addClass('current-menu-item');
  $('.navbar-custom').addClass('navbar-dark');

  $('.box-service-toggle').on('click', function() {
    var section = $(this).data('section');
    $('.boxes-services').toggleClass('' + section + '-animate');
    $(this).toggleClass('show').parents('.box-service').find('.box-service-opened').toggleClass('show');
  });

  $('.service-back').on('click', function(e) {
    e.preventDefault();
    var section = $(this).data('section');
    $('.boxes-services').toggleClass('' + section + '-animate');
    $(this).parents('.box-service').find('.box-service-toggle').toggleClass('show');
    $(this).parents('.box-service').find('.box-service-opened').toggleClass('show')
  });

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