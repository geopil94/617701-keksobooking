'use strict';
window.download = function(method, onLoad, onError, data) {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        console.log('все хорошо!');
        window.common.displayError('0');
        break;
      default:
        onError('Ошибка! Статус ответа: ' + xhr.status);
        window.common.displayError('1');
    }
  });
  if (method === 'GET') {
    xhr.open(method, URL_GET);
    xhr.send();
  }
  if (method === 'POST') {
    xhr.open(method, URL_POST);
    xhr.send(data);
    console.log(xhr.readyState);
  }
};

/* data = new FormData(); // вынести в обработчик сабмита в form.js
window.upload = function (data, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  var onLoad  = function(data) {
    window.adFormSubmit.addEventListener('click', function(evt) {
      evt.preventDefault();
      xhr.open('POST', URL);
      xhr.send(data);
    })
  }
}; */
