'use strict';
(function () {
  var imageInput = document.querySelector('.img-upload__input');
  var imageEditPopup = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectList = document.querySelector('.effects__list');
  var effectLevelValue = document.querySelector('.effect-level__value').value;
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var uploadForm = document.querySelector('.img-upload__form');
  var scaleValue = document.querySelector('.scale__control--value');
  var ESC_KEY = 'Escape';

  var onInputChange = function () {
    imageEditPopup.classList.remove('hidden');
    scaleValue.value = '100%';
    imagePreview.style.transform = 'scale(1)';
  };

  var onUploadCancelClick = function () {
    imageEditPopup.classList.add('hidden');
    imagePreview.classList.remove('effects__preview--none');
    imagePreview.classList.remove('effects__preview--chrome');
    imagePreview.classList.remove('effects__preview--sepia');
    imagePreview.classList.remove('effects__preview--marvin');
    imagePreview.classList.remove('effects__preview--phobos');
    imagePreview.classList.remove('effects__preview--heat');
    uploadForm.reset();
  };

  var onEditPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      imageEditPopup.classList.add('hidden');
      imagePreview.classList.remove('effects__preview--none');
      imagePreview.classList.remove('effects__preview--chrome');
      imagePreview.classList.remove('effects__preview--sepia');
      imagePreview.classList.remove('effects__preview--marvin');
      imagePreview.classList.remove('effects__preview--phobos');
      imagePreview.classList.remove('effects__preview--heat');
    }
  };

  var onEffectChgange = function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      imagePreview.style.filter = '';
      imagePreview.classList.remove('effects__preview--none');
      imagePreview.classList.remove('effects__preview--chrome');
      imagePreview.classList.remove('effects__preview--sepia');
      imagePreview.classList.remove('effects__preview--marvin');
      imagePreview.classList.remove('effects__preview--phobos');
      imagePreview.classList.remove('effects__preview--heat');
      imagePreview.classList.add('effects__preview--' + evt.target.value);
    }
  };

  var onLevelPinMouseUp = function () {
    if (imagePreview.classList.contains('effects__preview--chrome')) {
      imagePreview.style.filter = 'grayscale(' + effectLevelValue / 100 + ')';
    } else if (imagePreview.classList.contains('effects__preview--sepia')) {
      imagePreview.style.filter = 'sepia(' + effectLevelValue / 100 + ')';
    } else if (imagePreview.classList.contains('effects__preview--marvin')) {
      imagePreview.style.filter = 'invert(' + effectLevelValue + '%)';
    } else if (imagePreview.classList.contains('effects__preview--phobos')) {
      imagePreview.style.filter = 'blur(' + 3 * effectLevelValue / 100 + 'px)';
    } else if (imagePreview.classList.contains('effects__preview--heat')) {
      imagePreview.style.filter = 'brightness(' + 3 * effectLevelValue / 100 + ')';
    }
  };

  effectLevelPin.addEventListener('mouseup', onLevelPinMouseUp);
  effectList.addEventListener('change', onEffectChgange);
  imageInput.addEventListener('change', onInputChange);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onEditPopupEscPress);
})();
