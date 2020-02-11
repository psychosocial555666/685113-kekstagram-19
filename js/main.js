'use strict';
function randomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var PHOTOS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var COMMENT_AUTOR = ['Артем', 'Андрей', 'Лиза', 'Юлия Павловна', 'Черный властелин', 'Голум'];
var MESSAGES = ['Всё отлично!',
                'В целом всё неплохо. Но не всё.',
                'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
                'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
                'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
                'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
              ]

var photoElementsArr = [];

var createPhotoElement = function () {

  for (var i = 0; i < PHOTOS.length; i++) {
    var userComments = [];

      var createComments = function (rand) {
        for (var u = 0; u < rand; u++) {
          var randomMessage = {
            avatar: 'img/avatar-' + randomNumber (1, 6) + '.svg',
            message: MESSAGES [randomNumber(0, MESSAGES.length-1)],
            autor: COMMENT_AUTOR [randomNumber(0, COMMENT_AUTOR.length-1)]
          }
          userComments.push (randomMessage);
        }
        return userComments;
      }
      createComments (randomNumber(5, 10));
    var photoElements = {
      url: 'photos/' + PHOTOS[i] + '.jpg',
      description: 'В этом блоке должно быть описание фото, но я не смог придумать=(',
      likes: randomNumber (15, 200),
      comments: userComments
    }
  photoElementsArr.push (photoElements);
  }
  return photoElementsArr;
}
console.log (createPhotoElement());

var userPictureTemplate = document.querySelector ('#picture')
  .content;
var userPicture = document.querySelector ('.pictures');

var renderPhoto = function (userPhoto) {
  var photoItem = userPictureTemplate.cloneNode(true);
  photoItem.querySelector ('.picture__img').src = userPhoto.url;
  photoItem.querySelector ('.picture__likes').textContent = userPhoto.likes;
  photoItem.querySelector ('.picture__comments').textContent = userPhoto.comments.length;

  return photoItem;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < PHOTOS.length; i++) {
  fragment.appendChild(renderPhoto(photoElementsArr[i]));
};

userPicture.appendChild (fragment);

/*-----module3-task3------*/

var bigPicture = document.querySelector ('.big-picture');
var socialComments = bigPicture.querySelector ('.social__comments')
var firstPicture = photoElementsArr[0];
console.log (firstPicture);

var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
var commentCounter = bigPicture.querySelector('.social__comment-count');
var commentLoader = bigPicture.querySelector('.comments-loader');
var pageBody = document.querySelector('body');

bigPicture.querySelector ('.big-picture__img img').src = firstPicture.url;
bigPicture.querySelector ('.likes-count').textContent = firstPicture.likes;
bigPicture.querySelector ('.comments-count').textContent = firstPicture.comments.length;
bigPicture.querySelector ('.social__caption').textContent = firstPicture.description;

var commentList = bigPicture.querySelector ('.social__comments');
var commentFragment = document.createDocumentFragment();

commentList.innerHTML = ''

for (var i = 0; i < firstPicture.comments.length; i++) {
  var newComment = document.createElement ('li');
  newComment.className = 'social__comment';
  newComment.innerHTML = '<img class="social__picture" src="'
    + firstPicture.comments[i].avatar
    + '"alt="'
    + firstPicture.comments[i].autor
    + '"width="35" height="35"> <p class="social__text">'
    + firstPicture.comments[i].message
    + '</p>'
  commentFragment.appendChild(newComment);
}
commentList.appendChild(commentFragment);
/*------------Events-and-Validation------------*/
var onPictureClick = function () {
  bigPicture.classList.remove('hidden');
  commentCounter.classList.add('hidden');
  commentLoader.classList.add('hidden');
  pageBody.classList.add('modal-open');
}

var onCancelClick = function () {
  bigPicture.classList.add('hidden');
};

var onPictureEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    bigPicture.classList.add('hidden');
  };
};

userPicture.addEventListener ('click', onPictureClick);

bigPictureCancel.addEventListener ('click', onCancelClick);
bigPicture.addEventListener ('keydown', onPictureEscPress);
