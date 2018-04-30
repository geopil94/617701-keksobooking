'use strict';

var map = document.querySelector('.map');
var filters = map.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');

var authorAvatarArr = [1, 2, 3, 4, 5, 6, 7, 8];
var offerTitleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypeArr = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckInArr = ['12:00', '13:00', '14:00'];
var offerCheckOutArr = ['12:00', '13:00', '14:00'];
var offerFeaturesArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

function compareRandom() {
  return Math.random() - 0.5;
}

var randomAuthorAvatarArr = authorAvatarArr.sort(compareRandom);
var randomOfferTitleArr = offerTitleArr.sort(compareRandom);
var randomOfferTypeArr = offerTypeArr.sort(compareRandom);
var randomOfferCheckInArr = offerCheckInArr.sort(compareRandom);
var randomOfferCheckOutArr = offerCheckOutArr.sort(compareRandom);
var randomOfferPhotosArr = offerPhotosArr.sort(compareRandom);

var getRandomFeatures = function () {
  return offerFeaturesArr.slice(0, getRandomNumber(1, offerFeaturesArr.length - 1));
};

var advertisementArr = [];
var AMOUNT_OF_ADVERTISEMENTS = 8;
var fillArray = function (array) {
  for (var i = 1; i <= AMOUNT_OF_ADVERTISEMENTS; i++) {
    var Advertisement = {
      author: {
        avatar: 'img/avatars/user0' + randomAuthorAvatarArr[i - 1] + '.png'
      },
      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(150, 500)
      },
      offer: {
        title: randomOfferTitleArr[i - 1],
        address: getRandomNumber(300, 900) + ', ' + getRandomNumber(150, 500),
        price: getRandomNumber(1000, 1000000),
        type: randomOfferTypeArr[getRandomNumber(0, 3)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: randomOfferCheckInArr[Math.floor(i / 3)],
        checkout: randomOfferCheckOutArr[Math.floor(i / 3)],
        features: getRandomFeatures(),
        description: ' ',
        photos: randomOfferPhotosArr
      }
    };
    array.push(Advertisement);
  }
};
fillArray(advertisementArr);

var templateArticle = document.querySelector('template').content.querySelector('article');
var templateButton = document.querySelector('template').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var createPin = function (pins) {
  var mapPinFragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    var mapPin = templateButton.cloneNode(true);
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
      showCard(pin.data);
    });

    mapPinFragment.appendChild(mapPin);
  }
  mapPins.appendChild(mapPinFragment);
};


var addTextContent = function (whatToAdd, whereToAdd) {
  whereToAdd.textContent = whatToAdd;
};

var addSrc = function (whatToAdd, whereToAdd) {
  whereToAdd.src = whatToAdd;
};

var Types = {
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

var removePopup = function (popup) {
  map.removeChild(popup);
};

var showCard = function (currentOffer) {
  var popup = map.querySelector('.popup');
  if (popup) {
    removePopup(popup);
  }
  var mapCard = templateArticle.cloneNode(true);
  mapCard.querySelector('.popup__close').tabIndex = 0; // не понятно почему tab не ставится сразу на окно поп-апа, хотя табИндекс действительно 0
  addTextContent(currentOffer.offer.title, mapCard.querySelector('.popup__title'));
  addTextContent(currentOffer.offer.address, mapCard.querySelector('.popup__text--address'));
  addTextContent(currentOffer.offer.price + ' ₽/ночь', mapCard.querySelector('.popup__text--price'));
  addTextContent(Types[currentOffer.offer.type].ru, mapCard.querySelector('.popup__type'));
  addTextContent(currentOffer.offer.rooms + ' комнаты для ' + currentOffer.offer.guests + ' гостей', mapCard.querySelector('.popup__text--capacity'));
  addTextContent('Заезд после ' + advertisementArr[0].offer.checkin + ', выезд до ' + currentOffer.offer.checkout, mapCard.querySelector('.popup__text--time'));
  var featuresContainer = mapCard.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  for (i = 0; i < currentOffer.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + currentOffer.offer.features[i]);
    featuresContainer.appendChild(feature);
  }
  addTextContent(currentOffer.offer.description, mapCard.querySelector('.popup__description'));
  addSrc(currentOffer.offer.photos[0], mapCard.querySelector('.popup__photo'));
  for (var i = 1; i < currentOffer.offer.photos.length; i++) {
    var img = mapCard.querySelector('.popup__photo').cloneNode(true);
    addSrc(currentOffer.offer.photos[i], img);
    mapCard.querySelector('.popup__photos').appendChild(img);
  }
  addSrc(currentOffer.author.avatar, mapCard.querySelector('.popup__avatar'));

  map.insertBefore(mapCard, filters);
};

var onMainPinClick = function (evt) {
  document.querySelector('#address').value = evt.clientX + ', ' + evt.clientY;
};

var mainPin = mapPins.querySelector('.map__pin--main');

mainPin.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  createPin(advertisementArr);
});

mainPin.addEventListener('click', onMainPinClick);

map.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    var popup = map.querySelector('.popup');
    removePopup(popup);
  }
});

var onCloseKeydown = function (evt) {
  var popup = map.querySelector('.popup');
  if (evt.keyCode === 27) {
    removePopup(popup);
  }
  if (!popup) {
    map.removeEventListener('keydown', onCloseKeydown);
  }
};

document.addEventListener('keydown', onCloseKeydown);

// ///////////////////////////////////////////////////////

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var price = document.querySelector('#price');
var type = document.querySelector('#type');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var adFormSubmit = document.querySelector('.ad-form__submit');
var adForm = document.querySelector('.ad-form');
var title = document.querySelector('#title');

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
  var minPrice = TypePlaceholders[type.value];
  price.placeholder = minPrice;
  price.min = minPrice;
};

type.addEventListener('change', onTypeChange);

var onTimeInChange = function () {
  timeOut.value = timeIn.value;
};
var onTimeOutChange = function () {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

var onAdFormClick = function (evt) {
  var stopSubmit = false;
  if (title.value.length < 30) {
    title.setCustomValidity('Длина меньше 30 символов!');
    title.style.border = '2px solid red';
    stopSubmit = true;
  }
  var minPrice = TypePlaceholders[type.value];
  if (price.value < parseInt(minPrice, 10)) {
    price.style.border = '2px solid red';
    price.setCustomValidity('Цена ниже минимально возможной!');
    stopSubmit = true;
  }
  if (stopSubmit) {
    evt.preventDefault();
    setTimeout(function () {
      price.style.border = 'none';
      title.style.border = 'none';
    }, 4000);
  }
};

adFormSubmit.addEventListener('click', onAdFormClick);


