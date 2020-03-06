'use strict';
(function () {
  var pictures = [];
  var imageFilter = document.querySelector('.img-filters');


  var successHandler = function (photos) {
    pictures = photos;
    window.gallery.renderPictures(pictures);
    imageFilter.classList.remove('img-filters--inactive');
    window.data = {
      picturesArr: pictures
    };
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
})();
