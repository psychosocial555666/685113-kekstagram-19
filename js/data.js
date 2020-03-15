'use strict';
(function () {
  var pictures = [];
  var imageFilter = document.querySelector('.img-filters');


  var successHandler = function (photos) {
    pictures.splice(0, pictures.length);
    window.filter.currentArr.splice(0, window.filter.currentArr.length);
    photos.forEach(function (item) {
      pictures.push(item);
      window.filter.currentArr.push(item);
    });
    window.gallery.renderPictures(window.filter.currentArr);
    imageFilter.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  window.data = {
    picturesArr: pictures
  };
})();
