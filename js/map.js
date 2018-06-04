'use strict';

window.mainPin.addEventListener('mouseup', function () {
  window.map.classList.remove('map--faded');
  window.adForm.classList.remove('ad-form--disabled');
  window.download('GET', window.common.onLoad, window.common.onError);
});

window.mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + 'px';
    window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + 'px';
    if ((window.mainPin.offsetTop - shift.y) > window.MAX_MAP_Y_COORDS) {
      window.mainPin.style.top = window.MAX_MAP_Y_COORDS + 'px';
    }
    if ((window.mainPin.offsetTop - shift.y) < window.MIN_MAP_Y_COORDS) {
      window.mainPin.style.top = window.MIN_MAP_Y_COORDS + 'px';
    }
    if ((window.mainPin.offsetLeft - shift.x) > window.MAX_MAP_X_COORDS) {
      window.mainPin.style.left = window.MAX_MAP_X_COORDS + 'px';
    }
    if ((window.mainPin.offsetLeft - shift.x) < window.MIN_MAP_X_COORDS) {
      window.mainPin.style.left = window.MIN_MAP_X_COORDS + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var onMainPinClick = function () {
  window.address.value = (parseInt(window.mainPin.style.left.slice(0, -2), 10) + window.MAIN_PIN_X_HALF_SIZE) + ', ' + (parseInt(window.mainPin.style.top.slice(0, -2), 10) + window.MAIN_PIN_Y_SIZE);
};
window.mainPin.addEventListener('mousemove', onMainPinClick);

window.map.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    var popup = window.map.querySelector('.popup');
    window.common.removePopup(popup);
  }
});

var onCloseKeydown = function (evt) {
  var popup = window.map.querySelector('.popup');
  if (evt.keyCode === 27) {
    window.common.removePopup(popup);
  }
  if (!popup) {
    window.map.removeEventListener('keydown', onCloseKeydown);
  }
};

document.addEventListener('keydown', onCloseKeydown);

