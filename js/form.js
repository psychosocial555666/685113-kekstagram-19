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


  var onInputChange = function () {
    imageEditPopup.classList.remove('hidden');
    scaleValue.value = '100%';
    imagePreview.style.transform = 'scale(1)';
    window.utils.allEffects.forEach(function (className) {
      imagePreview.classList.remove(className);
    });
    imagePreview.style.filter = '';
    effectLevelPin.style.left = '100%';
    effectLevelValue.value = '100';
    effectLevelDepth. style.width = '100%';
    uploadCancel.addEventListener('click', uploadPopupClose);
    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, uploadPopupClose);
    });
  };
  var uploadPopupClose = function () {
    imageEditPopup.classList.add('hidden');
    window.utils.allEffects.forEach(function (className) {
      imagePreview.classList.remove(className);
    });
    uploadCancel.removeEventListener('click', uploadPopupClose);
    document.removeEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, uploadPopupClose);
    });
    uploadForm.reset();
  };

  imageInput.addEventListener('change', onInputChange);
})();
