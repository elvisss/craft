function showGoogleMaps(){var e=new google.maps.LatLng(position[0],position[1]),t={zoom:16,streetViewControl:!1,scaleControl:!0,mapTypeId:google.maps.MapTypeId.ROADMAP,center:e,styles:gmapStyle};map=new google.maps.Map(document.getElementById("googlemaps"),t)}var mainSwiper=new Swiper("#main-slider",{paginationClickable:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoplay:{delay:3e3},autoplayDisableOnInteraction:!1,loop:!0}),brandsSwiper=new Swiper("#brands-slider",{navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoplay:{delay:3e3},autoplayDisableOnInteraction:!1,loop:!0,slidesPerView:5,breakpoints:{768:{slidesPerView:2}}}),comunnitySwiper=new Swiper("#comunnity-slider",{pagination:{el:".swiper-pagination",clickable:!0},slidesPerView:1,autoplay:{delay:3e3}});$(function(){$(".navbar-custom li:nth-child(1)").addClass("current-menu-item")});var gmapStyle=[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#333333"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#ffffff"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#fefefe"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#fefefe"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#f5f5f5"},{lightness:20}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#f5f5f5"},{lightness:21}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#dedede"},{lightness:21}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#ffffff"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#ffffff"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#ffffff"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#ffffff"},{lightness:16}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#f2f2f2"},{lightness:19}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#e9e9e9"},{lightness:17}]}],position=[27.1959739,78.02423269999997];google.maps.event.addDomListener(window,"load",showGoogleMaps);