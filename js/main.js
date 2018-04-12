$(function(){
	var height = $( window ).height();
	var border = height/2 + 'px';
	var $float = $('.float-triangle');
	$float.css('border-width', border + ' 220px ' + border + ' 0');

	$('.float-box').on('click', function() {
		var $box = $('.float-box');
		var $form = $('.float-form');

		$box.toggleClass('float-hide');
		$form.toggleClass('float-form-show');
	});

});

$( window ).resize(function() {
  var height = $( window ).height();
  var border = height/2 + 'px';
  var $float = $('.float-triangle');
  $float.css('border-width', border + ' 220px ' + border + ' 0');
});