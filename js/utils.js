'use strict';
(function () {
  var ALL_EFFECTS_CLASSES = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
  var DEBOUNCE_INTERVAL = 500;
  var ESC = 27;
  var ENT = 13;
  var lastTimeout;
  window.utils = {
    isEscEvent: function (evtEscape, action) {
      if (evtEscape.keyCode === ESC) {
        action();
      }
    },
    isEnterEvent: function (evtEnter, action) {
      if (evtEnter.keyCode === ENT) {
        action();
      }
    },
    allEffects: ALL_EFFECTS_CLASSES,
    debounce: function (callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    },
    resetValidation: function (HTMLInputElement) {
      HTMLInputElement.value = '';
      HTMLInputElement.setCustomValidity('');
      HTMLInputElement.style.boxShadow = '';
    }
  };
})();
