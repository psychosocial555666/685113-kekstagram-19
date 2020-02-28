'use strict';
(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var hashtagArr = [];
  var uploadForm = document.querySelector('.img-upload__form');
  var imageEditPopup = document.querySelector('.img-upload__overlay');

  var onUploadBtnSubmit = function (evt) {
    hashtagArr = [];
    hashtagInput.setCustomValidity('');
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
      var tag = hashtagArrLow [i];
      if (tag[0] !== '#') {
        ifItValid = false;
        hashtagInput.setCustomValidity('Хэштег должен начинаться с "#"');
      } else if (tag.length < 2 || tag.length > 20) {
        ifItValid = false;
        hashtagInput.setCustomValidity('Хэштег должен содержать от 2-х до 20-ти символов');
      } else if (hashtagArrLow.length > 5) {
        ifItValid = false;
        hashtagInput.setCustomValidity('Нельзя добавить более пяти хэштегов');
      } else if (!tag.match(/^[#]+[0-9a-zA-ZА-Яа-яЁё\s]+$/)) {
        ifItValid = false;
        hashtagInput.setCustomValidity('Запрещенный символ');
      } else if (tag === hashtagArrLow[i - 1] || tag === hashtagArrLow[i - 2] || tag === hashtagArrLow[i - 3] || tag === hashtagArrLow[i - 4] || tag === hashtagArrLow[i - 5]) {
        evt.preventDefault();
        hashtagInput.setCustomValidity('Хэштеги не должны повторяться');
      } else if (ifItValid === false) {
        evt.preventDefault();
        return false;
      }
    }
    return true;
  };
  uploadForm.addEventListener('submit', function (evt) {
    var successTemplate = document.querySelector('#success').content;
    var main = document.querySelector('main');
    window.upload(new FormData(uploadForm), function () {
      imageEditPopup.classList.add('hidden');
      var successMessage = successTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(successMessage);
      main.appendChild(fragment);
      var successBtn = document.querySelector('.success__button');
      var successPlate = document.querySelector('.success');
      var plateClose = function () {
        successPlate.style.display = 'none';
      }
      successBtn.addEventListener('click', plateClose);
      document.addEventListener('keydown', function (evtClose) {
        window.utils.isEscEvent(evtClose, plateClose);
      });
      successBtn.addEventListener('keydown', function (evtClose) {
        window.utils.isEnterEvent(evtClose, plateClose);
      });
    });
    evt.preventDefault();
  });
  uploadForm.addEventListener('submit', onUploadBtnSubmit);
  hashtagInput.addEventListener('input', onUploadBtnSubmit);
})();
