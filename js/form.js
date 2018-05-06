'use strict';

(function () {
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var TypePlaceholders = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var RoomsCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var onCapacityChange = function () {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (option) {
        option.selected = (RoomsCapacity[roomNumber.value][0] === option.value) ? true : false;
        option.hidden = (RoomsCapacity[roomNumber.value].indexOf(option.value) >= 0) ? false : true;
      });
    }
  };

  roomNumber.addEventListener('change', onCapacityChange);

  var onTypeChange = function () {
    var minPrice = TypePlaceholders[window.type.value];
    window.price.placeholder = minPrice;
    window.price.min = minPrice;
  };

  window.type.addEventListener('change', onTypeChange);

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };
  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  var MAX_PRICE = 1000000;

  var onAdFormClick = function (evt) {
    var stopSubmit = false;
    if (window.title.value.length < 30) {
      window.title.setCustomValidity('Длина меньше 30 символов!');
      window.title.style.border = '2px solid red';
      stopSubmit = true;
    } else {
      window.title.setCustomValidity('');

    }
    var minPrice = TypePlaceholders[window.type.value];
    if (window.price.value < parseInt(minPrice, 10) || window.price.value > MAX_PRICE) {
      window.price.style.border = '2px solid red';
      window.price.setCustomValidity('Цена указана неверно!');
      stopSubmit = true;
    } else {
      window.price.setCustomValidity('');
    }
    if (stopSubmit) {
      evt.preventDefault();
      window.adForm.addEventListener('input', function () {
        window.price.style.border = 'none';
        window.title.style.border = 'none';
        window.title.setCustomValidity('');
        window.price.setCustomValidity('');
      });
    }
  };

  window.adFormSubmit.addEventListener('click', onAdFormClick);
})();


