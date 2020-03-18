'use strict';
(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var backend = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      createNewReqest('GET', URL, onSuccess, onError);
    },
    upload: function (onSuccess, onError, data) {
      var URL = 'https://js.dump.academy/kekstagram';
      createNewReqest('POST', URL, onSuccess, onError, data);
    }
  };
  var createNewReqest = function (method, url, onSuccess, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };
  window.backend = backend;
})();
