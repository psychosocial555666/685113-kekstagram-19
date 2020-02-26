'use strict';
(function () {

  var scalePlus = document.querySelector('.scale__control--bigger');
  var scaleMinus = document.querySelector('.scale__control--smaller');
  var scaleValue = document.querySelector('.scale__control--value');
  var imagePreview = document.querySelector('.img-upload__preview img');
  scaleValue.value = '100%';

  var onScalePlusClick = function () {
    if (scaleValue.value === '25%') {
      scaleValue.value = '50%';
      imagePreview.style.transform = 'scale(0.5)';
    } else if (scaleValue.value === '50%') {
      scaleValue.value = '75%';
      imagePreview.style.transform = 'scale(0.75)';
    } else if (scaleValue.value === '75%') {
      scaleValue.value = '100%';
      imagePreview.style.transform = 'scale(1)';
    }
  };

  var onScaleMinusClick = function () {
    if (scaleValue.value === '100%') {
      scaleValue.value = '75%';
      imagePreview.style.transform = 'scale(0.75)';
    } else if (scaleValue.value === '75%') {
      scaleValue.value = '50%';
      imagePreview.style.transform = 'scale(0.5)';
    } else if (scaleValue.value === '50%') {
      scaleValue.value = '25%';
      imagePreview.style.transform = 'scale(0.25)';
    }
  };

  scalePlus.addEventListener('click', onScalePlusClick);
  scaleMinus.addEventListener('click', onScaleMinusClick);
})();
