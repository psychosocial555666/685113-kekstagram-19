'use strict';
(function () {
  var changePicture = function (bigPicture, firstPicture) {

    bigPicture.querySelector('.big-picture__img img').src = firstPicture.url;
    bigPicture.querySelector('.likes-count').textContent = firstPicture.likes;
    bigPicture.querySelector('.comments-count').textContent = firstPicture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = firstPicture.description;

    var commentList = bigPicture.querySelector('.social__comments');
    var commentFragment = document.createDocumentFragment();

    commentList.innerHTML = '';

    for (var i = 0; i < firstPicture.comments.length; i++) {
      var newComment = document.createElement('li');
      newComment.className = 'social__comment';
      var commentImage = document.createElement('img');
      newComment.appendChild(commentImage);
      commentImage.className = 'social__picture';
      commentImage.src = firstPicture.comments[i].avatar;
      commentImage.alt = firstPicture.comments[i].autor;
      commentImage.style.width = '35px';
      commentImage.style.height = '35px';
      var commentText = document.createElement('p');
      newComment.appendChild(commentText);
      commentText.className = 'social__text';
      var textNode = document.createTextNode(firstPicture.comments[i].message);
      commentText.appendChild(textNode);
      commentFragment.appendChild(newComment);
    }
    commentList.appendChild(commentFragment);
  };

  var pictureCards = document.querySelector('.pictures');

  var bigPictureOpen = function (evtOpen) {
    if (evtOpen.target && evtOpen.target.matches('.picture__img') || evtOpen.target.matches('.picture')) {
      evtOpen.preventDefault();
      var photoItem = window.photoArr.photoElementsArr[evtOpen.target.name];
      var bigPicture = document.querySelector('.big-picture');
      var commentCounter = bigPicture.querySelector('.social__comment-count');
      var commentLoader = bigPicture.querySelector('.comments-loader');
      var pageBody = document.querySelector('body');
      window.bigPicture.changePicture(bigPicture, photoItem);
      bigPicture.classList.remove('hidden');
      commentCounter.classList.add('hidden');
      commentLoader.classList.add('hidden');
      pageBody.classList.add('modal-open');
      var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
      bigPictureCancel.addEventListener('click', bigPictureClose);
      document.addEventListener('keydown', function (evt) {
        window.utils.isEscEvent(evt, bigPictureClose);
      });
    }
  };

  var bigPictureClose = function (evtClose) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
    bigPicture.querySelector('.comments-loader').classList.remove('hidden');
    document.querySelector('body').classList.remove('modal-open');
    evtClose.target.removeEventListener(bigPictureClose);
    evtClose.target.removeEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, bigPictureClose);
    });
  };

  pictureCards.addEventListener('click', bigPictureOpen);
  document.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, bigPictureOpen);
  });

  window.bigPicture = {
    changePicture: changePicture
  };
})();
