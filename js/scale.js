'use strict';
(function () {

  var SCALE_MIN = 25;
  var SCALE_MAX = 100;
  var SCALE_STEP = 25;
  var SCALE_DEFAULT = 100;

  var scalePlus = document.querySelector('.scale__control--bigger');
  var scaleMinus = document.querySelector('.scale__control--smaller');
  var scaleValue = document.querySelector('.scale__control--value');
  var imagePreview = document.querySelector('.img-upload__preview img');

  scaleValue.value = SCALE_DEFAULT + '%';

  var onScalePlusClick = function () {
    if (scaleValue.value === SCALE_MAX + '%') {
      scaleValue.value = SCALE_MAX + '%';
      imagePreview.style.transform = 'scale(' + SCALE_MAX / 100 + ')';
    } else {
      scaleValue.value = (parseInt(scaleValue.value)) + SCALE_STEP + '%';
      imagePreview.style.transform = 'scale(' + (parseInt(scaleValue.value) / 100) + ')';
    }
  };

  var onScaleMinusClick = function () {
    if (scaleValue.value === SCALE_MIN + '%') {
      scaleValue.value = SCALE_MIN + '%';
      imagePreview.style.transform = 'scale(' + SCALE_MIN / 100 + ')';
    } else {
      scaleValue.value = (parseInt(scaleValue.value)) - SCALE_STEP + '%';
      imagePreview.style.transform = 'scale(' + (parseInt(scaleValue.value) / 100) + ')';
    }
  };

  scalePlus.addEventListener('click', onScalePlusClick);
  scaleMinus.addEventListener('click', onScaleMinusClick);
})();
