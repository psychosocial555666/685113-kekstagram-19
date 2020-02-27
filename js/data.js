'use strict';
(function () {
  var PHOTOS = 25;
  var COMMENT_AUTOR = ['Артем', 'Андрей', 'Лиза', 'Юлия Павловна', 'Черный властелин', 'Голум'];
  var MESSAGES = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;
  var COMMENTS_MIN = 3;
  var COMMENTS_MAX = 5;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var createPhotoElement = function (photosCount) {
    var ret = [];
    for (var i = 1; i <= photosCount; i++) {
      var userComments = [];
      var createComments = function (rand) {
        for (var j = 0; j < rand; j++) {
          var randomMessage = {
            avatar: 'img/avatar-' + window.random.getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
            message: MESSAGES [window.random.getRandomNumber(0, MESSAGES.length - 1)],
            autor: COMMENT_AUTOR [window.random.getRandomNumber(0, COMMENT_AUTOR.length - 1)]
          };
          userComments.push(randomMessage);
        }
        return userComments;
      };
      createComments(window.random.getRandomNumber(COMMENTS_MIN, COMMENTS_MAX));
      var photoElements = {
        url: 'photos/' + i + '.jpg',
        description: 'В этом блоке должно быть описание фото, но я не смог придумать=(',
        likes: window.random.getRandomNumber(LIKES_MIN, LIKES_MAX),
        comments: userComments
      };
      ret.push(photoElements);
    }
    return ret;
  };
  window.photoArr = {
    photoElementsArr: createPhotoElement(PHOTOS)
  };
})();
