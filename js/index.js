var mainSwiper = new Swiper('#main-slider', {
  paginationClickable: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // autoplay: 3000,
  autoplayDisableOnInteraction: false,
  loop: true
});

var brandsSwiper = new Swiper('#brands-slider', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // autoplay: 3000,
  autoplayDisableOnInteraction: false,
  loop: true,
  slidesPerView: 5,
  // spaceBetween: 40,
  centeredSlides: true,
  breakpoints: {
    // when window width is <= 768px
    768: {
      slidesPerView: 3
      // spaceBetween: 30
    }
  }
});

var comunnitySwiper = new Swiper('#comunnity-slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  slidesPerView: 1
  // autoplay: 3000,
  // autoplayDisableOnInteraction: false,
  // loop: true
});

$(function(){
  $('.navbar-custom li:nth-child(1)').addClass('current-menu-item');
});

// The latitude and longitude of your business / place
var position = [27.1959739, 78.02423269999997];

function showGoogleMaps() {

    var latLng = new google.maps.LatLng(position[0], position[1]);

    var mapOptions = {
        zoom: 16, // initialize zoom level - the max value is 21
        streetViewControl: false, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('googlemaps'),
        mapOptions);

    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);
