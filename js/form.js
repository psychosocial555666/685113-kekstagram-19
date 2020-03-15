'use strict';
(function () {
  var imageInput = document.querySelector('.img-upload__input');
  var imageEditPopup = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var uploadForm = document.querySelector('.img-upload__form');
  var scaleValue = document.querySelector('.scale__control--value');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelElement = document.querySelector('.effect-level');
  var effectLevelValue = effectLevelElement.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevelElement.querySelector('.effect-level__depth');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  var onInputChange = function () {
    imageEditPopup.classList.remove('hidden');
    scaleValue.value = '100%';
    imagePreview.style.transform = 'scale(1)';
    effectLevelElement.classList.add('hidden');
    window.utils.allEffects.forEach(function (className) {
      imagePreview.classList.remove(className);
    });
    imagePreview.style.filter = '';
    effectLevelPin.style.left = '100%';
    effectLevelValue.value = '100';
    effectLevelDepth. style.width = '100%';
    uploadCancel.addEventListener('click', onUploadPopupClose);
    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, onUploadPopupClose);
    });
  };
  var onUploadPopupClose = function () {
    if (document.activeElement.name === 'hashtags' || document.activeElement.name === 'description') {
      hashtagInput.value = '';
      hashtagInput.setCustomValidity('');
      hashtagInput.style.boxShadow = '';
      commentInput.value = '';
      commentInput.setCustomValidity('');
      commentInput.style.boxShadow = '';
    } else {
      imageEditPopup.classList.add('hidden');
      window.utils.allEffects.forEach(function (className) {
        imagePreview.classList.remove(className);
      });
      uploadCancel.removeEventListener('click', onUploadPopupClose);
      document.removeEventListener('keydown', function (evt) {
        window.utils.isEscEvent(evt, onUploadPopupClose);
      });
      uploadForm.reset();
    }
  };
  var onDataLoad = function (evt) {
    var successTemplate = document.querySelector('#success').content;
    var errorTemplate = document.querySelector('#error').content;
    var main = document.querySelector('main');
    var ifLoadSuccess = function () {
      imageEditPopup.classList.add('hidden');
      uploadForm.reset();
      var successMessage = successTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(successMessage);
      main.appendChild(fragment);
      var successBtn = document.querySelector('.success__button');
      var successPlate = document.querySelector('.success');
      var onPlateClose = function () {
        successPlate.remove();
        successPlate.removeEventListener('click', onInnerClose);
        successBtn.removeEventListener('click', onPlateClose);
        document.removeEventListener('keydown', function (evtClose) {
          window.utils.isEscEvent(evtClose, onPlateClose);
        });
        successBtn.removeEventListener('keydown', function (evtClose) {
          window.utils.isEnterEvent(evtClose, onPlateClose);
        });
      };
      var onInnerClose = function (evtInner) {
        if (evtInner.target && !evtInner.target.matches('.success__inner') && !evtInner.target.matches('.success__title') || evtInner.target.matches('.success__button')) {
          successPlate.remove();
          uploadForm.reset();
          successPlate.removeEventListener('click', onInnerClose);
          successBtn.removeEventListener('click', onPlateClose);
          document.removeEventListener('keydown', function (evtClose) {
            window.utils.isEscEvent(evtClose, onPlateClose);
          });
          successBtn.removeEventListener('keydown', function (evtClose) {
            window.utils.isEnterEvent(evtClose, onPlateClose);
          });
        }
      };
      successPlate.addEventListener('click', onInnerClose);
      successBtn.addEventListener('click', onPlateClose);
      document.addEventListener('keydown', function (evtClose) {
        window.utils.isEscEvent(evtClose, onPlateClose);
      });
      successBtn.addEventListener('keydown', function (evtClose) {
        window.utils.isEnterEvent(evtClose, onPlateClose);
      });
    };
    var ifLoadError = function () {
      imageEditPopup.classList.add('hidden');
      uploadForm.reset();
      var errorMessage = errorTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(errorMessage);
      main.appendChild(fragment);
      var errorBtn = document.querySelector('.error__button');
      var errorPlate = document.querySelector('.error');
      var onPlateClose = function () {
        errorPlate.remove();
        errorPlate.removeEventListener('click', onInnerClose);
        errorBtn.removeEventListener('click', onPlateClose);
        document.removeEventListener('keydown', function (evtClose) {
          window.utils.isEscEvent(evtClose, onPlateClose);
        });
        errorBtn.removeEventListener('keydown', function (evtClose) {
          window.utils.isEnterEvent(evtClose, onPlateClose);
        });
      };
      var onInnerClose = function (evtInner) {
        if (evtInner.target && !evtInner.target.matches('.error__inner') && !evtInner.target.matches('.success__title') || evtInner.target.matches('.success__button')) {
          errorPlate.remove();
          uploadForm.reset();
          errorPlate.removeEventListener('click', onInnerClose);
          errorBtn.removeEventListener('click', onPlateClose);
          document.removeEventListener('keydown', function (evtClose) {
            window.utils.isEscEvent(evtClose, onPlateClose);
          });
          errorBtn.removeEventListener('keydown', function (evtClose) {
            window.utils.isEnterEvent(evtClose, onPlateClose);
          });
        }
      };
      errorPlate.addEventListener('click', onInnerClose);
      errorBtn.addEventListener('click', onPlateClose);
      document.addEventListener('keydown', function (evtClose) {
        window.utils.isEscEvent(evtClose, onPlateClose);
      });
      errorBtn.addEventListener('keydown', function (evtClose) {
        window.utils.isEnterEvent(evtClose, onPlateClose);
      });
    };
    window.upload(new FormData(uploadForm), ifLoadSuccess, ifLoadError);
    evt.preventDefault();
  };
  uploadForm.addEventListener('submit', onDataLoad);

  imageInput.addEventListener('change', onInputChange);
})();
