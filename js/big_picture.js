'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var changePicture = function (bigPicture, firstPicture) {

    bigPicture.querySelector ('.big-picture__img img').src = firstPicture.url;
    bigPicture.querySelector ('.likes-count').textContent = firstPicture.likes;
    bigPicture.querySelector ('.comments-count').textContent = firstPicture.comments.length;
    bigPicture.querySelector ('.social__caption').textContent = firstPicture.description;

    var commentList = bigPicture.querySelector ('.social__comments');
    var commentFragment = document.createDocumentFragment();

    commentList.innerHTML = '';

    for (var i = 0; i < firstPicture.comments.length; i++) {
      var newComment = document.createElement ('li');
      newComment.className = 'social__comment';
      newComment.innerHTML = '<img class="social__picture" src="'
        + firstPicture.comments[i].avatar
        + '"alt="'
        + firstPicture.comments[i].autor
        + '"width="35" height="35"> <p class="social__text">'
        + firstPicture.comments[i].message
        + '</p>'
      commentFragment.appendChild(newComment);
    }
    commentList.appendChild(commentFragment);
  }

  var pictureCards = document.querySelector('.pictures');

  var onPictureEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      var bigPicture = document.querySelector ('.big-picture')
      bigPicture.classList.add('hidden');
      bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
      bigPicture.querySelector('.comments-loader').classList.remove('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  }

  var onPictureClick = function (evt) {
    if (evt.target && evt.target.matches('.picture__img')){
      evt.preventDefault();
      var photoItem = window.photoArr.photoElementsArr[evt.target.name];
      var bigPicture = document.querySelector ('.big-picture');
      var commentCounter = bigPicture.querySelector('.social__comment-count');
      var commentLoader = bigPicture.querySelector('.comments-loader');
      var pageBody = document.querySelector('body');
      window.bigPicture.changePicture (bigPicture, photoItem);
      bigPicture.classList.remove('hidden');
      commentCounter.classList.add('hidden');
      commentLoader.classList.add('hidden');
      pageBody.classList.add('modal-open');
      var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
      bigPictureCancel.addEventListener ('click', onCancelClick);
    }
  }

  var onPictureEnterPress = function (evt) {
    if (evt.target && evt.target.matches('.picture') && evt.key === 'Enter'){
      evt.preventDefault();
      var photoItem = window.photoArr.photoElementsArr[evt.target.name];
      var bigPicture = document.querySelector ('.big-picture');
      var commentCounter = bigPicture.querySelector('.social__comment-count');
      var commentLoader = bigPicture.querySelector('.comments-loader');
      var pageBody = document.querySelector('body');
      window.bigPicture.changePicture (bigPicture, photoItem);
      bigPicture.classList.remove('hidden');
      commentCounter.classList.add('hidden');
      commentLoader.classList.add('hidden');
      pageBody.classList.add('modal-open');
      var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
      bigPictureCancel.addEventListener ('click', onCancelClick);
    }
  }

  var onCancelClick = function (evt) {
    var bigPicture = evt.target.parentElement.parentElement;
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    document.querySelector('body').classList.remove('modal-open');
    evt.target.removeEventListener(onCancelClick);
  }

  pictureCards.addEventListener ('click', onPictureClick);
  document.addEventListener ('keydown', onPictureEnterPress);

  document.addEventListener ('keydown', onPictureEscPress);
  window.bigPicture = {
    changePicture: changePicture
  }
})()
