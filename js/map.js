'use strict';

var authorAvatarArr = [1, 2, 3, 4, 5, 6, 7, 8];
var offerTitleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypeArr = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckInArr = ['12:00', '13:00', '14:00'];
var offerCheckOutArr = ['12:00', '13:00', '14:00'];
var offerFeaturesArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];



var getRandomNumber = function(min, max) {
   var randomNumber = min + Math.floor(Math.random() * (max + 1 - min));
   return randomNumber;
};

function compareRandom(a, b) {
  return Math.random() - 0.5;
};

var randomAuthorAvatarArr = authorAvatarArr.sort(compareRandom);
var randomOfferTitleArr = offerTitleArr.sort(compareRandom);
var randomOfferTypeArr = offerTypeArr.sort(compareRandom);
var randomOfferCheckInArr = offerCheckInArr.sort(compareRandom);
var randomOfferCheckOutArr = offerCheckOutArr.sort(compareRandom);
var randomOfferFeaturesArr = offerFeaturesArr;
var randomOfferPhotosArr = offerPhotosArr.sort(compareRandom);


//randomOfferFeaturesArr.length = getRandomNumber(1,offerFeaturesArr.length);

var getRandomFeatures = function() {
  randomOfferFeaturesArr.length = getRandomNumber(1, offerFeaturesArr.length);
  return randomOfferFeaturesArr;
}




/*var Advertisment = {
  author: {
    avatar: 'img/avatars/user{{0' + randomAuthorAvatarArr[i] + '}}.png'
  },
  offer: {
    title: randomOfferTitleArr[i],
    address: location.x + ', ' + location.y,
    price: getRandomNumber(1000, 1000000),
    type: randomOfferTypeArr[i],
    rooms: getRandomNumber(1, 5),
    guests: getRandomNumber(1, 10),
    checkin: randomOfferCheckInArr[i],
    checkout: randomOfferCheckOutArr[i],
    features: randomOfferFeaturesArr,
    description: '',
    photos: randomOfferPhotosArr
  },
  location: {
    x: getRandomNumber(300, 900),
    y: getRandomNumber(150, 500)
  }
};*/

var advertismentArr = [];

for (var i = 1; i <= 8; i ++) {
  var Advertisment = {
    author: {
      avatar: 'img/avatars/user{{0' + randomAuthorAvatarArr[i - 1] + '}}.png'
    },
    location: {
      x: getRandomNumber(300, 900),
      y: getRandomNumber(150, 500)
    },
    offer: {
      title: randomOfferTitleArr[i - 1],
      address: this.location.x + ', ' + this.location.y, //всё равно не сработало
      price: getRandomNumber(1000, 1000000),
      type: randomOfferTypeArr[Math.floor((i - 1) / 2)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: randomOfferCheckInArr[Math.floor(i / 3)],
      checkout: randomOfferCheckOutArr[Math.floor(i / 3)],
      features: getRandomFeatures(),
      description: ' ',
      photos: randomOfferPhotosArr
    }
  };
  advertismentArr.push(Advertisment);
}

var templateArticle = document.querySelector('template').content.querySelector('article');
var templateButton = document.querySelector('template').content.querySelector('.map__pin');
var mapPinFragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

for (var i = 0; i < advertismentArr.length; i++) {
  var mapPin = templateButton.cloneNode(true);
  mapPin.style = 'left: ' + advertismentArr[i].location.x + 'px; top: ' + advertismentArr[i].location.y + 'px;';
  mapPin.src = advertismentArr[i].author.avatar;
  mapPin.alt = advertismentArr[i].offer.title;
  mapPinFragment.appendChild(mapPin);
}
mapPins.appendChild(mapPinFragment);

/*for (var i = 0; i < advertismentArr.length; i++) {
  var element
}*/
console.log(advertismentArr);

var mapCard = templateArticle.cloneNode(true);
mapCard.querySelector('.popup__title').textContent = advertismentArr[0].offer.title;
mapCard.querySelector('.popup__text--address').textContent = advertismentArr[0].offer.address;  //соответственно и здесь
mapCard.querySelector('.popup__text--price').textContent = advertismentArr[0].offer.price + '₽/ночь';
switch (advertismentArr[0].offer.type){
  case 'flat':
    mapCard.querySelector('.popup__type').textContent = 'Квартира';
    break;

  case 'palace':
    mapCard.querySelector('.popup__type').textContent = 'Дворец';
    break;

  case 'house':
    mapCard.querySelector('.popup__type').textContent = 'Дом';
    break;

  case 'bungalo':
    mapCard.querySelector('.popup__type').textContent = 'Бунгало';
    break;
}
mapCard.querySelector('.popup__text--capacity').textContent = advertismentArr[0].offer.rooms + ' комнаты для ' +
  advertismentArr[1].offer.guests + ' гостей';
mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertismentArr[0].offer.checkin +
  ', выезд до ' + advertismentArr[1].offer.checkout;
mapCard.querySelector('.popup__features').textContent = advertismentArr[0].offer.features;
mapCard.querySelector('.popup__description').textContent = advertismentArr[0].offer.description;
/*var photos = mapCard.querySelectorAll('.popup__photo');
for (i = 0; i <= photos.length; i++) { //тоже не работает, не разобрался почему =(
photos[i].src = advertismentArr[0].offer.photos[i];
}
mapCard.querySelectorAll('.popup__photo').src = advertismentArr[0].offer.photos[0]; // и просто одну фотку не объявляет
*/






//document.querySelector('.map__filters-container').insertAdjacentHTML('beforebegin', 'mapCard'); // и не разобрался как добавить Т_Т самое главное(

console.log(mapCard);


