var portfolioSwiper = "";

$('body').on('shown.bs.modal', '.modal-portfolio', function() {

  if (portfolioSwiper == "") {
    portfolioSwiper = new Swiper('.portfolio-slider', {
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplayDisableOnInteraction: false,
      loop: true
    });
  } else {
    portfolioSwiper.update();
  }

});

$(function(){

  $('.navbar-custom li:nth-child(4)').addClass('current-menu-item');
  $('.navbar').addClass('navbar-dark');
  $('.menu-logo').addClass('menu-inverse');

  $('[data-toggle="tooltip"]').tooltip();

  $('.summary-toggle').on('click', function() {
    $('.portfolio-description').addClass('hide-description');
  });

  $('.project-top').on('click', function() {
    $('.portfolio-description').removeClass('hide-description');
  });

});


'use strict';

var Shuffle = window.Shuffle;

var Demo = function (element) {
  this.categories = Array.from(document.querySelectorAll('.js-categories button'));
  this.services = Array.from(document.querySelectorAll('.js-service li'));
  this.areas = Array.from(document.querySelectorAll('.js-areas li'));
  this.names = document.getElementById('js-names');

  this.shuffle = new Shuffle(element, {
    easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
    sizer: '.the-sizer',
  });

  this.filters = {
    categories: [],
    services: [],
    areas: [],
    names: []
  };

  this._bindEventListeners();
};

/**
 * Bind event listeners for when the filters change.
 */
Demo.prototype._bindEventListeners = function () {
  this._onCategoryChange = this._handleCategoryChange.bind(this);
  this._onServiceChange = this._handleServiceChange.bind(this);
  this._onAreaChange = this._handleAreaChange.bind(this);
  this._onNameChange = this._handleNameChange.bind(this);

  this.categories.forEach(function (button) {
    button.addEventListener('click', this._onCategoryChange);
  }, this);

  this.services.forEach(function (li) {
    li.addEventListener('click', this._onServiceChange);
  }, this);

  this.areas.forEach(function (li) {
    li.addEventListener('click', this._onAreaChange);
  }, this);

  this.names.addEventListener('change', this._onNameChange, false);


};

/**
 * A shape input check state changed, update the current filters and filte.r
 */
Demo.prototype._handleCategoryChange = function (evt) {

  var button = evt.currentTarget;

  // Treat these buttons like radio buttons where only 1 can be selected.
  if (button.classList.contains('active')) {
    button.classList.remove('active');
  } else {
    this.categories.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
  }

  this.filters.categories = this._getCurrentCategoryFilters();
  this.filter();
};

/**
 * A color button was clicked. Update filters and display.
 * @param {Event} evt Click event object.
 */
Demo.prototype._handleServiceChange = function (evt) {

  var li = evt.currentTarget;

  // console.log(li)

  // Treat these buttons like radio buttons where only 1 can be selected.
  if (li.classList.contains('active')) {
    li.classList.remove('active');
  } else {
    this.services.forEach(function (li) {
      li.classList.remove('active');
    });

    li.classList.add('active');
  }

  this.filters.services = this._getCurrentServiceFilters();
  this.filter();
};

/**
 * A color button was clicked. Update filters and display.
 * @param {Event} evt Click event object.
 */
Demo.prototype._handleAreaChange = function (evt) {

  var li = evt.currentTarget;

  // console.log(li)

  // Treat these buttons like radio buttons where only 1 can be selected.
  if (li.classList.contains('active')) {
    li.classList.remove('active');
  } else {
    this.areas.forEach(function (li) {
      li.classList.remove('active');
    });

    li.classList.add('active');
  }

  this.filters.areas = this._getCurrentAreaFilters();
  this.filter();
};

/**
 * A color button was clicked. Update filters and display.
 * @param {Event} evt Click event object.
 */
Demo.prototype._handleNameChange = function (evt) {
  this.filters.names = evt.target.value !== "ALL" ? [evt.target.value] : [];
  this.filter();
};

/**
 * Get the values of each checked input.
 * @return {Array.<string>}
 */
Demo.prototype._getCurrentCategoryFilters = function () {
  return this.categories.filter(function (button) {
    return button.classList.contains('active');
  }).map(function (button) {
    return button.getAttribute('data-value');
  });
};

/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
Demo.prototype._getCurrentServiceFilters = function () {
  return this.services.filter(function (li) {
    return li.classList.contains('active');
  }).map(function (li) {
    console.log(li.getAttribute('data-value'))
    return li.getAttribute('data-value');
  });
};

/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
Demo.prototype._getCurrentAreaFilters = function () {
  return this.areas.filter(function (li) {
    return li.classList.contains('active');
  }).map(function (li) {
    return li.getAttribute('data-value');
  });
};

/**
 * Filter shuffle based on the current state of filters.
 */
Demo.prototype.filter = function () {
  console.log(this.filters)
  if (this.hasActiveFilters()) {
    this.shuffle.filter(this.itemPassesFilters.bind(this));
  } else {
    this.shuffle.filter(Shuffle.ALL_ITEMS);
  }
};

/**
 * If any of the arrays in the `filters` property have a length of more than zero,
 * that means there is an active filter.
 * @return {boolean}
 */
Demo.prototype.hasActiveFilters = function () {
  return Object.keys(this.filters).some(function (key) {
    return this.filters[key].length > 0;
  }, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */
Demo.prototype.itemPassesFilters = function (element) {
  var categories = this.filters.categories;
  var services = this.filters.services;
  var areas = this.filters.areas;
  var names = this.filters.names;
  var category = element.getAttribute('data-category');
  var service = element.getAttribute('data-service');
  var area = element.getAttribute('data-area');
  var name = element.getAttribute('data-name');

  // If there are active shape filters and this shape is not in that array.
  if (categories.length > 0 && !categories.includes(category)) {
    return false;
  }

  // If there are active color filters and this color is not in that array.
  if (services.length > 0 && !services.includes(service)) {
    return false;
  }

  // If there are active color filters and this color is not in that array.
  if (areas.length > 0 && !areas.includes(area)) {
    return false;
  }

  // If there are active color filters and this color is not in that array.
  if (names.length > 0 && !names.includes(name)) {
    return false;
  }

  return true;
};

document.addEventListener('DOMContentLoaded', function () {
  window.demo = new Demo(document.querySelector('.js-shuffle'));
});