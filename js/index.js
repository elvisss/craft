var mainSwiper = new Swiper('#main-slider', {
  paginationClickable: true,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  // autoplay: 3000,
  autoplayDisableOnInteraction: false,
  loop: true
});

$(function(){
  $('.navbar-custom li:nth-child(1)').addClass('current-menu-item');
});
