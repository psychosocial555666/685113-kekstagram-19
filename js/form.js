'use strict';
(function () {
  var imageInput = document.querySelector('.img-upload__input');
  var imageEditPopup = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var imagePreview = document.querySelector('.img-upload__preview img');
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

  imageInput.addEventListener('change', onInputChange);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onEditPopupEscPress);
})();
