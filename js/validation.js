'use strict';
(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  var hashtagArr = [];
  var commentArr = [];
  var uploadForm = document.querySelector('.img-upload__form');

  var onUploadBtnSubmit = function (evt) {
    hashtagArr = [];
    commentArr = [];
    hashtagInput.setCustomValidity('');
    hashtagInput.style.boxShadow = '';
    hashtagArr = hashtagInput.value.split(' ');
    commentInput.setCustomValidity('');
    commentInput.style.boxShadow = '';
    commentArr = commentInput.value.split('');
    if (commentArr.length > 140) {
      evt.preventDefault();
      commentInput.setCustomValidity('Комментарий не должен быть длиннее 140 символов');
      commentInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
    }
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
      var tag = hashtagArrLow [i];
      if (tag[0] !== '#') {
        ifItValid = false;
        hashtagInput.setCustomValidity('Хэштег должен начинаться с "#"');
        hashtagInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
      } else if (tag.length < 2 || tag.length > 20) {
        ifItValid = false;
        hashtagInput.setCustomValidity('Хэштег должен содержать от 2-х до 20-ти символов');
        hashtagInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
      } else if (hashtagArrLow.length > 5) {
        ifItValid = false;
        hashtagInput.setCustomValidity('Нельзя добавить более пяти хэштегов');
        hashtagInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
      } else if (!tag.match(/^[#]+[0-9a-zA-ZА-Яа-яЁё\s]+$/)) {
        ifItValid = false;
        hashtagInput.setCustomValidity('Запрещенный символ');
        hashtagInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
      } else if (tag === hashtagArrLow[i - 1] || tag === hashtagArrLow[i - 2] || tag === hashtagArrLow[i - 3] || tag === hashtagArrLow[i - 4] || tag === hashtagArrLow[i - 5]) {
        ifItValid = false;
        hashtagInput.setCustomValidity('Хэштеги не должны повторяться');
        hashtagInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
      } else if (tag === hashtagArrLow[i - 1] || tag === hashtagArrLow[i - 2] || tag === hashtagArrLow[i - 3] || tag === hashtagArrLow[i - 4] || tag === hashtagArrLow[i - 5]) {
        ifItValid = false;
        hashtagInput.setCustomValidity('Хэштеги не должны повторяться');
        hashtagInput.style.boxShadow = '0px 0px 5px 3px #fc120c inset';
      } else if (ifItValid === false) {
        evt.preventDefault();
        return false;
      }
    }
    return true;
  };
  uploadForm.addEventListener('submit', onUploadBtnSubmit);
  hashtagInput.addEventListener('input', onUploadBtnSubmit);
  commentInput.addEventListener('input', onUploadBtnSubmit);
})();
