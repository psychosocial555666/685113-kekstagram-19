'use strict';
(function () { var randomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
window.random = {
  getRandomNumber: randomNumber
}
})()
