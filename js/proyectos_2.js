// var portfolioSwiper = "";

// $('body').on('shown.bs.modal', '.modal-portfolio', function() {

//   if (portfolioSwiper == "") {
//     portfolioSwiper = new Swiper('.portfolio-slider', {
//       autoplay: {
//         delay: 3000
//       },
//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true
//       },
//       autoplayDisableOnInteraction: false,
//       loop: true
//     });
//   } else {
//     portfolioSwiper.update();
//   }

// });

// $(function(){

//   $('.navbar-custom li:nth-child(4)').addClass('current-menu-item');
//   $('.navbar').addClass('navbar-dark');
//   $('.menu-logo').addClass('menu-inverse');

//   $('[data-toggle="tooltip"]').tooltip();

//   $('.summary-toggle').on('click', function() {
//     $('.portfolio-description').addClass('hide-description');
//   });

//   $('.project-top').on('click', function() {
//     $('.portfolio-description').removeClass('hide-description');
//   });

// });


'use strict';

var Shuffle = window.Shuffle;

var Demo2 = function (element) {
  this.element = element;

  this.shuffle = new Shuffle(element, {
    itemSelector: '.picture-item',
    sizer: element.querySelector('.my-sizer-element'),
  });

  // Log events.
  this.addShuffleEventListeners();

  this._activeFilters = [];

  this.addFilterButtons();
  this.addSorting();
  this.addSearchFilter();

  this.mode = 'exclusive';
};

Demo2.prototype.toggleMode = function () {
  if (this.mode === 'additive') {
    this.mode = 'exclusive';
  } else {
    this.mode = 'additive';
  }
};

/**
 * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
 * for them like you normally would (with jQuery for example).
 */
Demo2.prototype.addShuffleEventListeners = function () {
  this.shuffle.on(Shuffle.EventType.LAYOUT, function (data) {
    // console.log('layout. data:', data);
  });

  this.shuffle.on(Shuffle.EventType.REMOVED, function (data) {
    // console.log('removed. data:', data);
  });
};

Demo2.prototype.addFilterButtons = function () {
  var options = document.querySelector('.filter-options');

  if (!options) {
    return;
  }

  var filterButtons = Array.from(options.children);

  filterButtons.forEach(function (button) {
    button.addEventListener('click', this._handleFilterClick.bind(this), false);
  }, this);
};

Demo2.prototype._handleFilterClick = function (evt) {
  var btn = evt.currentTarget;
  var isActive = btn.classList.contains('active');
  var btnGroup = btn.getAttribute('data-group');

  // You don't need _both_ of these modes. This is only for the demo.

  // For this custom 'additive' mode in the demo, clicking on filter buttons
  // doesn't remove any other filters.
  if (this.mode === 'additive') {
    // If this button is already active, remove it from the list of filters.
    if (isActive) {
      this._activeFilters.splice(this._activeFilters.indexOf(btnGroup));
    } else {
      this._activeFilters.push(btnGroup);
    }

    console.log(this._activeFilters)

    btn.classList.toggle('active');

    // Filter elements
    this.shuffle.filter(this._activeFilters);

  // 'exclusive' mode lets only one filter button be active at a time.
  } else {
    this._removeActiveClassFromChildren(btn.parentNode);

    var filterGroup;
    if (isActive) {
      btn.classList.remove('active');
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add('active');
      filterGroup = btnGroup;
    }

    console.log(filterGroup)

    this.shuffle.filter(filterGroup);
  }
};

Demo2.prototype._removeActiveClassFromChildren = function (parent) {
  var children = parent.children;
  for (var i = children.length - 1; i >= 0; i--) {
    children[i].classList.remove('active');
  }
};

Demo2.prototype.addSorting = function () {
  var buttonGroup = document.querySelector('.sort-options');

  if (!buttonGroup) {
    return;
  }

  buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
};

Demo2.prototype._handleSortChange = function (evt) {
  // Add and remove `active` class from buttons.
  var wrapper = evt.currentTarget;
  var buttons = Array.from(evt.currentTarget.children);
  buttons.forEach(function (button) {
    if (button.querySelector('input').value === evt.target.value) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  // Create the sort options to give to Shuffle.
  var value = evt.target.value;
  var options = {};

  function sortByDate(element) {
    return element.getAttribute('data-date-created');
  }

  function sortByClient(element) {
    return element.getAttribute('data-name').toLowerCase();
  }

  function sortByArea(element) {
    return element.getAttribute('data-area').toLowerCase();
  }

  function sortByServices(element) {
    return element.getAttribute('data-services').toLowerCase();
  }

  if (value === 'date-created') {
    options = {
      by: sortByDate
    };
  } else if (value === 'name') {
    options = {
      by: sortByClient
    };
  } else if (value === 'area') {
    options = {
      reverse: true,
      by: sortByArea,
    };
  } else if (value === 'services') {
    options = {
      by: sortByServices,
    };
  }

  this.shuffle.sort(options);
};

// Advanced filtering
Demo2.prototype.addSearchFilter = function () {
  var searchInput = document.querySelector('.js-shuffle-search');

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
};

/**
 * Filter the shuffle instance by items with a title that matches the search input.
 * @param {Event} evt Event object.
 */
Demo2.prototype._handleSearchKeyup = function (evt) {
  var searchText = evt.target.value.toLowerCase();

  this.shuffle.filter(function (element, shuffle) {

    // If there is a current filter applied, ignore elements that don't match it.
    if (shuffle.group !== Shuffle.ALL_ITEMS) {
      // Get the item's groups.
      var groups = JSON.parse(element.getAttribute('data-groups'));
      var isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;

      // Only search elements in the current group
      if (!isElementInCurrentGroup) {
        return false;
      }
    }

    var titleElement = element.querySelector('.picture-item__title');
    var titleText = titleElement.textContent.toLowerCase().trim();

    return titleText.indexOf(searchText) !== -1;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  window.demo2 = new Demo2(document.getElementById('grid-portfolio'));
});