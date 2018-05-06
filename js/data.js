'use strict';

(function () {
  var authorAvatarArr = [1, 2, 3, 4, 5, 6, 7, 8];
  var offerTitleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var offerTypeArr = ['palace', 'flat', 'house', 'bungalo'];
  var offerCheckInArr = ['12:00', '13:00', '14:00'];
  var offerCheckOutArr = ['12:00', '13:00', '14:00'];
  var offerFeaturesArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var offerPhotosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var randomAuthorAvatarArr = authorAvatarArr.sort(window.common.compareRandom);
  var randomOfferTitleArr = offerTitleArr.sort(window.common.compareRandom);
  var randomOfferTypeArr = offerTypeArr.sort(window.common.compareRandom);
  var randomOfferCheckInArr = offerCheckInArr.sort(window.common.compareRandom);
  var randomOfferCheckOutArr = offerCheckOutArr.sort(window.common.compareRandom);
  var randomOfferPhotosArr = offerPhotosArr.sort(window.common.compareRandom);

  var getRandomFeatures = function () {
    return offerFeaturesArr.slice(0, window.common.getRandomNumber(1, offerFeaturesArr.length - 1));
  };
  var AMOUNT_OF_ADVERTISEMENTS = 8;
  var fillArray = function (array) {
    for (var i = 1; i <= AMOUNT_OF_ADVERTISEMENTS; i++) {
      var Advertisement = {
        author: {
          avatar: 'img/avatars/user0' + randomAuthorAvatarArr[i - 1] + '.png'
        },
        location: {
          x: window.common.getRandomNumber(window.MIN_MAP_X_COORDS, window.MAX_MAP_X_COORDS),
          y: window.common.getRandomNumber(window.MIN_MAP_Y_COORDS, window.MAX_MAP_Y_COORDS)
        },
        offer: {
          title: randomOfferTitleArr[i - 1],
          address: window.common.getRandomNumber(window.MIN_MAP_X_COORDS, window.MAX_MAP_X_COORDS) + ', ' + window.common.getRandomNumber(window.MIN_MAP_Y_COORDS, window.MAX_MAP_Y_COORDS),
          price: window.common.getRandomNumber(1000, 1000000),
          type: randomOfferTypeArr[window.common.getRandomNumber(0, 3)],
          rooms: window.common.getRandomNumber(1, 5),
          guests: window.common.getRandomNumber(1, 10),
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
  fillArray(window.advertisementArr);
})();
