'use strict';
(function () {
  var ALL_EFFECTS_CLASSES = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
  window.utils = {
    isEscEvent: function (evtEscape, action) {
      if (evtEscape.keyCode === 27) {
        action();
      }
    },
    isEnterEvent: function (evtEnter, action) {
      if (evtEnter.keyCode === 13) {
        action();
      }
    },
    allEffects: ALL_EFFECTS_CLASSES
  };
})();
