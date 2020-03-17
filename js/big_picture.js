'use strict';
(function () {
  var COMMENTS_QUANTITY = 5;
  var COMMENTS_STEP = 5;

  var openedPhotoItem = null;
  var commentLoader = document.querySelector('.comments-loader');
  var pictureCards = document.querySelector('.pictures');
  var currentCommentNumber = document.querySelector('.social__comment-count');

  var changePicture = (function (bigPicture, currentPicture, commentsLength) {
    bigPicture.querySelector('.big-picture__img img').src = currentPicture.url;
    bigPicture.querySelector('.likes-count').textContent = currentPicture.likes;
    bigPicture.querySelector('.comments-count').textContent = currentPicture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = currentPicture.description;

    var commentList = bigPicture.querySelector('.social__comments');
    var commentFragment = document.createDocumentFragment();

    currentCommentNumber.innerHTML = '';
    var renderedCount = document.createElement('span');
    var renderedCountText = document.createTextNode(commentsLength + ' из ');
    var commonCount = document.createElement('span');
    commonCount.className = 'comments-count';
    var commonCountText = document.createTextNode(currentPicture.comments.length + ' комментариев.');
    renderedCount.appendChild(renderedCountText);
    currentCommentNumber.appendChild(renderedCount);
    commonCount.appendChild(commonCountText);
    currentCommentNumber.appendChild(commonCount);

    commentList.innerHTML = '';

    if (currentPicture.comments.length < commentsLength) {
      commentsLength = currentPicture.comments.length;
      commentLoader.classList.add('hidden');
    }

    for (var i = 0; i < commentsLength; i++) {
      var newComment = document.createElement('li');
      newComment.className = 'social__comment';

      var commentImage = document.createElement('img');
      commentImage.className = 'social__picture';
      commentImage.src = currentPicture.comments[i].avatar;
      commentImage.alt = currentPicture.comments[i].autor;
      commentImage.style.width = '35px';
      commentImage.style.height = '35px';
      newComment.appendChild(commentImage);

      var commentText = document.createElement('p');
      commentText.className = 'social__text';
      newComment.appendChild(commentText);

      var textNode = document.createTextNode(currentPicture.comments[i].message);
      commentText.appendChild(textNode);

      commentFragment.appendChild(newComment);
    }
    commentList.appendChild(commentFragment);
  });

  var onCommentsLoaderPress = function () {
    var commentsQuantity = document.querySelectorAll('.social__comment').length + COMMENTS_STEP;
    if (commentsQuantity >= openedPhotoItem.comments.length || openedPhotoItem.comments.length < COMMENTS_QUANTITY) {
      commentsQuantity = openedPhotoItem.comments.length;
      commentLoader.classList.add('hidden');
    }
    changePicture(document.querySelector('.big-picture'), openedPhotoItem, commentsQuantity);
  };

  var onBigPictureOpen = function (evtOpen) {
    if (evtOpen.target && evtOpen.target.matches('.picture__img') || evtOpen.target.matches('.picture')) {
      evtOpen.preventDefault();

      openedPhotoItem = window.filter.currentArr[evtOpen.target.name];

      var bigPicture = document.querySelector('.big-picture');
      var pageBody = document.querySelector('body');
      window.bigPicture.changePicture(bigPicture, openedPhotoItem, COMMENTS_QUANTITY);

      bigPicture.classList.remove('hidden');
      pageBody.classList.add('modal-open');

      var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
      bigPictureCancel.addEventListener('click', onBigPictureClose);
      document.addEventListener('keydown', function (evt) {
        window.utils.isEscEvent(evt, onBigPictureClose);
      });
      commentLoader.addEventListener('click', onCommentsLoaderPress);
    }
  };

  var onBigPictureClose = function () {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    document.querySelector('body').classList.remove('modal-open');

    var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
    bigPictureCancel.addEventListener('click', onBigPictureClose);
    document.removeEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, onBigPictureClose);
    });
    commentLoader.removeEventListener('click', onCommentsLoaderPress);

    openedPhotoItem = null;
  };

  pictureCards.addEventListener('click', onBigPictureOpen);
  document.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, onBigPictureOpen);
  });

  window.bigPicture = {
    changePicture: changePicture
  };

})();
