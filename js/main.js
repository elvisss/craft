$(function(){
	var height = $( window ).height();
	var border = height/2 + 'px';
	var $float = $('.float-triangle');
	$float.css('border-width', border + ' 220px ' + border + ' 0');

	var $box = $('.float-box');
	var $form = $('.float-form');
	var $body = $('body');

	$('.float-box').on('click', function() {
		$box.addClass('float-hide');
		$form.addClass('float-form-show');
		$body.addClass('modal-open');
	});

	$('.js-close-form').on('click', function() {
		$box.removeClass('float-hide');
		$form.removeClass('float-form-show');
		$body.removeClass('modal-open');
	});

});

$(document).keyup(function(e) {
  if (e.keyCode === 27) $('.js-close-form').click();
});

$( window ).resize(function() {
  var height = $( window ).height();
  var border = height/2 + 'px';
  var $float = $('.float-triangle');
  $float.css('border-width', border + ' 220px ' + border + ' 0');
});