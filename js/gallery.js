'use strict';
(function () {
  var userPictureTemplate = document.querySelector('#picture').content;
  var userPicture = document.querySelector('.pictures');

  var renderPhoto = function (userPhoto, itemIndex) {
    var photoItem = userPictureTemplate.cloneNode(true);
    photoItem.querySelector('.picture__img').src = userPhoto.url;
    photoItem.querySelector('.picture__likes').textContent = userPhoto.likes;
    photoItem.querySelector('.picture__comments').textContent = userPhoto.comments.length;
    photoItem.querySelector('.picture').name = itemIndex;
    photoItem.querySelector('.picture__img').name = itemIndex;

    return photoItem;
  };
  var renderPictures = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (item, i) {
      var photoElement = renderPhoto(item, i);
      fragment.appendChild(photoElement);
    });
    userPicture.appendChild(fragment);
  };
  window.gallery = {
    renderPictures: renderPictures
  };
})();
