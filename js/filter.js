'use strict';
(function () {
  var RANDOM_PHOTOS_NUM = 10;
  var BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
  var filterMethod = null;
  var currentArr = [];

  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersButtons = imgFilters.querySelectorAll('.img-filters__button');

  var pictureFilters = {
    getDefaultPictures: function (arr) {
      return arr;
    },
    getRandomPictures: function (arr, randomPhotoNum) {
      randomPhotoNum = RANDOM_PHOTOS_NUM;
      if (randomPhotoNum > arr.length) {
        randomPhotoNum = arr.length;
      }
      var copyArray = arr.slice();
      var resultArray = [];
      for (var i = 0; i < randomPhotoNum; i++) {
        resultArray.push(copyArray.splice(window.random.getRandomNumber(0, copyArray.length - 1), 1)[0]);
      }

      return resultArray;
    },
    getDiscussedPictures: function (arr) {
      var resultArray = arr.slice();
      resultArray.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        } else if (a.comments.length > b.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      return resultArray;
    }
  };
  var getThisFilter = function (button) {
    return button.getAttribute('id').split('-')[1];
  };

  var switchClass = function (allElements, activeElement, className) {
    allElements.forEach(function (item) {
      item.classList.remove(className);
    });
    activeElement.classList.add(className);
  };

  var onImgFiltersButtonsClick = function (evt) {
    var button = evt.target;
    var filter = getThisFilter(button);
    var currentFilter = getThisFilter(document.querySelector('.img-filters__button--active'));

    if (currentFilter === filter) {
      return;
    }

    switch (filter) {
      case 'random':
        filterMethod = pictureFilters.getRandomPictures;
        break;
      case 'discussed':
        filterMethod = pictureFilters.getDiscussedPictures;
        break;
      default:
        filterMethod = pictureFilters.getDefaultPictures;
    }
    window.utils.debounce(function () {
      document.querySelectorAll('.picture').forEach(function (item) {
        item.remove();
      });
      window.gallery.renderPictures(filterMethod(window.data.picturesArr));
    });
    switchClass(imgFiltersButtons, button, BUTTON_ACTIVE_CLASS);
    currentArr = filterMethod(window.data.picturesArr);
    window.filter = {
      currentArr: currentArr
    };
  };
  imgFiltersButtons.forEach(function (item) {
    item.addEventListener('click', onImgFiltersButtonsClick);
  });
})();