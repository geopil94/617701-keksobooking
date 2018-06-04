'use strict';

window.MIN_MAP_X_COORDS = 300;
window.MAX_MAP_X_COORDS = 900;
window.MIN_MAP_Y_COORDS = 150;
window.MAX_MAP_Y_COORDS = 500;
window.MAIN_PIN_X_HALF_SIZE = 20;
window.MAIN_PIN_Y_SIZE = 44;
window.map = document.querySelector('.map');
window.filters = window.map.querySelector('.map__filters-container');
window.adForm = document.querySelector('.ad-form');
window.address = document.querySelector('#address');
window.templateArticle = document.querySelector('template').content.querySelector('article');
window.templateButton = document.querySelector('template').content.querySelector('.map__pin');
window.mapPins = document.querySelector('.map__pins');
window.mainPin = window.mapPins.querySelector('.map__pin--main');
window.Types = {
  flat: {
    ru: 'Квартира'
  },
  palace: {
    ru: 'Дворец'
  },
  house: {
    ru: 'Дом'
  },
  bungalo: {
    ru: 'Бунгало'
  }
};
window.price = document.querySelector('#price');
window.type = document.querySelector('#type');
window.adFormSubmit = document.querySelector('.ad-form__submit');
window.title = document.querySelector('#title');
window.advertisementArr = [];


window.common = (function () {
  return {
    getRandomNumber: function (min, max) {
      return min + Math.floor(Math.random() * (max - min));
    },
    compareRandom: function () {
      return Math.random() - 0.5;
    },
    addTextContent: function (whatToAdd, whereToAdd) {
      whereToAdd.textContent = whatToAdd;
    },
    addSrc: function (whatToAdd, whereToAdd) {
      whereToAdd.src = whatToAdd;
    },
    removePopup: function (popup) {
      window.map.removeChild(popup);
    },
    showCard: function (currentOffer) {
      var popup = window.map.querySelector('.popup');
      if (popup) {
        window.common.removePopup(popup);
      }
      var mapCard = window.templateArticle.cloneNode(true);
      mapCard.querySelector('.popup__close').tabIndex = 0;
      window.common.addTextContent(currentOffer.offer.title, mapCard.querySelector('.popup__title'));
      window.common.addTextContent(currentOffer.offer.address, mapCard.querySelector('.popup__text--address'));
      window.common.addTextContent(currentOffer.offer.price + ' ₽/ночь', mapCard.querySelector('.popup__text--price'));
      window.common.addTextContent(window.Types[currentOffer.offer.type].ru, mapCard.querySelector('.popup__type'));
      window.common.addTextContent(currentOffer.offer.rooms + ' комнаты для ' + currentOffer.offer.guests + ' гостей', mapCard.querySelector('.popup__text--capacity'));
      window.common.addTextContent('Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout, mapCard.querySelector('.popup__text--time'));
      var featuresContainer = mapCard.querySelector('.popup__features');
      featuresContainer.innerHTML = '';
      for (i = 0; i < currentOffer.offer.features.length; i++) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature', 'popup__feature--' + currentOffer.offer.features[i]);
        featuresContainer.appendChild(feature);
      }
      window.common.addTextContent(currentOffer.offer.description, mapCard.querySelector('.popup__description'));
      window.common.addSrc(currentOffer.offer.photos[0], mapCard.querySelector('.popup__photo'));
      for (var i = 1; i < currentOffer.offer.photos.length; i++) {
        var img = mapCard.querySelector('.popup__photo').cloneNode(true);
        window.common.addSrc(currentOffer.offer.photos[i], img);
        mapCard.querySelector('.popup__photos').appendChild(img);
      }
      window.common.addSrc(currentOffer.author.avatar, mapCard.querySelector('.popup__avatar'));
      window.map.insertBefore(mapCard, window.filters);
    },
    createPin: function (pins) {
      var mapPinFragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        var mapPin = window.templateButton.cloneNode(true);
        mapPin.style = 'left: ' + pins[i].location.x + 'px; top: ' + pins[i].location.y + 'px;';
        mapPin.querySelector('img').src = pins[i].author.avatar;
        mapPin.querySelector('img').alt = pins[i].offer.title;
        mapPin.data = pins[i];
        mapPin.tabIndex = i;
        mapPin.addEventListener('click', function (evt) {
          var pin = evt.target;
          if (pin.tagName === 'IMG') {
            pin = pin.parentElement;
          }
          window.common.showCard(pin.data);
        });

        mapPinFragment.appendChild(mapPin);
      }
      window.mapPins.appendChild(mapPinFragment);
    },
    displayError: function (opacity) {
      var errorWindow = document.createElement('div');
      errorWindow.style.opacity = opacity;
      errorWindow.style.display = 'block';
      errorWindow.style.boxSizing = 'content-box';
      errorWindow.style.position = 'absolute';
      errorWindow.style.top = '1525px';
      errorWindow.style.left = '240px';
      errorWindow.style.fontSize = '20px';
      errorWindow.style.fontWeight = '700';
      errorWindow.style.height = '60px';
      errorWindow.style.width = '206px';
      errorWindow.style.border = '4px solid #ffaa99';
      errorWindow.style.borderRadius = '8px';
      errorWindow.style.backgroundColor = 'red';
      errorWindow.style.paddingTop = '5px';
      errorWindow.style.textAlign = 'center';
      errorWindow.innerHTML = '<span> Внимание! Что-то пошло не так! </span>';
      document.body.appendChild(errorWindow);
    },
    onLoad: function(data) {
      for (var i = 0; i <= data.length; i++) {
        window.common.createPin(data);
      }
      return console.log(data); // не забыть убрать консоль лог
    },
    onError: function(message) {
    return console.error(message);
    }
  };
})();


