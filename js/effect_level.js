'use strict';
(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelElement = document.querySelector('.effect-level');
  var effectLevelLine = effectLevelElement.querySelector('.effect-level__line');
  var effectLevelValue = effectLevelElement.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevelElement.querySelector('.effect-level__depth');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectList = document.querySelector('.effects__list');
  var effectLevels = {
    'effects__preview--none': '',
    'effects__preview--chrome': 'grayscale(' + effectLevelValue.value / 100 + ')',
    'effects__preview--sepia': 'sepia(' + effectLevelValue.value / 100 + ')',
    'effects__preview--marvin': 'invert(' + effectLevelValue.value + '%)',
    'effects__preview--phobos': 'blur(' + 3 * effectLevelValue.value / 100 + 'px)',
    'effects__preview--heat': 'brightness(' + 3 * effectLevelValue.value / 100 + ')'
  };
  effectLevelElement.classList.add('hidden');
  var onPinDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };
    var onPinMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var pinCoord = effectLevelPin.offsetLeft - shift.x;
      var setEffectLevel = function (delta) {
        var procent = Math.round((delta * 100) / effectLevelLine.offsetWidth);
        if (procent < 0) {
          procent = 0;
        } else if (procent > 100) {
          procent = 100;
        }
        return procent;
      };
      effectLevelPin.style.left = setEffectLevel(pinCoord) + '%';
      effectLevelValue.value = setEffectLevel(pinCoord);
      effectLevelDepth. style.width = setEffectLevel(pinCoord) + '%';

      (function applyEffectLevel() {
        imagePreview.style.filter = effectLevels[imagePreview.className];
      })();
    };
    var onPinUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinUp);
    };
    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinUp);
  };
  effectLevelPin.addEventListener('mousedown', onPinDown);
  var onEffectChgange = function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      effectLevelPin.style.left = '100%';
      effectLevelValue.value = '100';
      effectLevelDepth. style.width = '100%';
      imagePreview.style.filter = '';
      window.utils.allEffects.forEach(function (className) {
        imagePreview.classList.remove(className);
      });
      imagePreview.classList.add('effects__preview--' + evt.target.value);
      effectLevelElement.classList.remove('hidden');
      if (evt.target.value === 'none') {
        effectLevelElement.classList.add('hidden');
      }
    }
  };
  effectList.addEventListener('change', onEffectChgange);
})();
