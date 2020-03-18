'use strict';
(function () {

  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_QUANTITY = 5;
  var MAX_COMMENT_LENGTH = 140;
  var WRONG_SIMBOL_MATCH = /^[#]+[0-9a-zA-ZА-Яа-яЁё\s]+$/;

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  var hashtagArr = [];
  var commentArr = [];

  var uploadForm = document.querySelector('.img-upload__form');
  var imageInput = document.querySelector('.img-upload__input');

  var setValidityMessage = function (ifItValid, validityMessage) {
    ifItValid = false;
    hashtagInput.setCustomValidity(validityMessage);
    hashtagInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
  };

  var setHashtagValidity = function (evt) {
    hashtagArr = [];

    hashtagInput.setCustomValidity('');
    hashtagInput.style.boxShadow = '';
    hashtagArr = hashtagInput.value.split(' ');

    var ifItValid = true;

    var hashtagArrLow = [];

    var getLow = function () {
      for (var j = 0; j < hashtagArr.length; j++) {
        var itmLow = hashtagArr[j].toLowerCase();
        if (itmLow !== '') {
          hashtagArrLow.push(itmLow);
        }
      }
      return hashtagArrLow;
    };

    getLow();

    for (var i = 0; i < hashtagArrLow.length; i++) {
      var tag = hashtagArrLow[i];
      if (tag[0] !== '#') {
        setValidityMessage(ifItValid, 'Хэштег должен начинаться с "#"');
      } else if (tag.length < MIN_HASHTAG_LENGTH || tag.length > MAX_HASHTAG_LENGTH) {
        setValidityMessage(ifItValid, 'Хэштег должен содержать от 2-х до 20-ти символов');
      } else if (hashtagArrLow.length > MAX_HASHTAG_QUANTITY) {
        setValidityMessage(ifItValid, 'Нельзя добавить более пяти хэштегов');
      } else if (!tag.match(WRONG_SIMBOL_MATCH)) {
        setValidityMessage(ifItValid, 'Запрещенный символ');
      } else if (tag === hashtagArrLow[i - 1] || tag === hashtagArrLow[i - 2] || tag === hashtagArrLow[i - 3] || tag === hashtagArrLow[i - 4] || tag === hashtagArrLow[i - 5]) {
        setValidityMessage(ifItValid, 'Хэштеги не должны повторяться');
      } else if (ifItValid === false) {
        evt.preventDefault();
        return false;
      }
    }
    return true;
  };

  var setCommentValidity = function (evt) {
    commentArr = [];

    commentInput.setCustomValidity('');
    commentInput.style.boxShadow = '';
    commentArr = commentInput.value.split('');

    if (commentArr.length > MAX_COMMENT_LENGTH) {
      evt.preventDefault();
      commentInput.setCustomValidity('Комментарий не должен быть длиннее 140 символов');
      commentInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
    }
  };

  var onUploadBtnSubmit = function (evt) {
    setHashtagValidity(evt);
    setCommentValidity(evt);
  };

  imageInput.addEventListener('change', onUploadBtnSubmit);
  uploadForm.addEventListener('submit', onUploadBtnSubmit);
  hashtagInput.addEventListener('input', onUploadBtnSubmit);
  hashtagInput.addEventListener('change', onUploadBtnSubmit);
  commentInput.addEventListener('input', onUploadBtnSubmit);
})();
