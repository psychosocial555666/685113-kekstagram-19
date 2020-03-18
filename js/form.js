'use strict';
(function () {
  var uploadForm = document.querySelector('.img-upload__form');

  var imageInput = uploadForm.querySelector('.img-upload__input');
  var imageEditPopup = uploadForm.querySelector('.img-upload__overlay');
  var uploadCancel = uploadForm.querySelector('.img-upload__cancel');
  var imagePreview = uploadForm.querySelector('.img-upload__preview img');
  var scaleValue = uploadForm.querySelector('.scale__control--value');
  var effectLevelPin = uploadForm.querySelector('.effect-level__pin');
  var effectLevelElement = uploadForm.querySelector('.effect-level');
  var effectLevelValue = effectLevelElement.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevelElement.querySelector('.effect-level__depth');
  var hashtagInput = uploadForm.querySelector('.text__hashtags');
  var commentInput = uploadForm.querySelector('.text__description');

  var onPopupEscKeydown = function (evt) {
    window.utils.isEscEvent(evt, onUploadPopupClose);
  };

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
    document.addEventListener('keydown', onPopupEscKeydown);
  };

  var onUploadPopupClose = function () {
    if (document.activeElement.name === 'hashtags' || document.activeElement.name === 'description') {
      window.utils.resetValidation(hashtagInput);
      window.utils.resetValidation(commentInput);
    } else {
      imageEditPopup.classList.add('hidden');
      window.utils.allEffects.forEach(function (className) {
        imagePreview.classList.remove(className);
      });

      uploadCancel.removeEventListener('click', onUploadPopupClose);
      document.removeEventListener('keydown', onPopupEscKeydown);
      uploadForm.reset();
    }
  };

  var onDataLoad = function (evt) {
    var successTemplate = document.querySelector('#success').content;
    var errorTemplate = document.querySelector('#error').content;
    var main = document.querySelector('main');

    var ifLoadSuccess = function () {
      var onPlateEscKeydown = function (evtClose) {
        window.utils.isEscEvent(evtClose, onPlateClose);
      };
      var onPlateEnterKeydown = function (evtClose) {
        window.utils.isEnterEvent(evtClose, onPlateClose);
      };

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
        document.removeEventListener('keydown', onPlateEscKeydown);
        successBtn.removeEventListener('keydown', onPlateEnterKeydown);
      };

      var onInnerClose = function (evtInner) {
        if (evtInner.target && !evtInner.target.matches('.success__inner') && !evtInner.target.matches('.success__title') || evtInner.target.matches('.success__button')) {
          successPlate.remove();
          uploadForm.reset();
          successPlate.removeEventListener('click', onInnerClose);
          successBtn.removeEventListener('click', onPlateClose);
          document.removeEventListener('keydown', onPlateEscKeydown);
          successBtn.removeEventListener('keydown', onPlateEnterKeydown);
        }
      };
      successPlate.addEventListener('click', onInnerClose);
      successBtn.addEventListener('click', onPlateClose);
      document.addEventListener('keydown', onPlateEscKeydown);
      successBtn.addEventListener('keydown', onPlateEnterKeydown);
    };

    var ifLoadError = function () {
      var onPlateEscKeydown = function (evtClose) {
        window.utils.isEscEvent(evtClose, onPlateClose);
      };
      var onPlateEnterKeydown = function (evtClose) {
        window.utils.isEnterEvent(evtClose, onPlateClose);
      };

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
        document.removeEventListener('keydown', onPlateEscKeydown);
        errorBtn.removeEventListener('keydown', onPlateEnterKeydown);
      };
      var onInnerClose = function (evtInner) {
        if (evtInner.target && !evtInner.target.matches('.error__inner') && !evtInner.target.matches('.success__title') || evtInner.target.matches('.success__button')) {
          errorPlate.remove();
          uploadForm.reset();
          errorPlate.removeEventListener('click', onInnerClose);
          errorBtn.removeEventListener('click', onPlateClose);
          document.removeEventListener('keydown', onPlateEscKeydown);
          errorBtn.removeEventListener('keydown', onPlateEnterKeydown);
        }
      };
      errorPlate.addEventListener('click', onInnerClose);
      errorBtn.addEventListener('click', onPlateClose);
      document.addEventListener('keydown', onPlateEscKeydown);
      errorBtn.addEventListener('keydown', onPlateEnterKeydown);
    };

    window.backend.upload(ifLoadSuccess, ifLoadError, new FormData(uploadForm));
    evt.preventDefault();
  };

  uploadForm.addEventListener('submit', onDataLoad);

  imageInput.addEventListener('change', onInputChange);
})();

