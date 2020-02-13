'use strict';
function randomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
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
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var pictureCard = document.querySelector('.picture');

var onPictureEscPress = function (evt) {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
  };
};

var onPictureClick = function () {
  bigPicture.classList.remove('hidden');
  commentCounter.classList.add('hidden');
  commentLoader.classList.add('hidden');
  pageBody.classList.add('modal-open');

}

var onCancelClick = function () {
  bigPicture.classList.add('hidden');
  commentCounter.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  pageBody.classList.remove('modal-open');
};

pictureCard.addEventListener ('click', onPictureClick);

bigPictureCancel.addEventListener ('click', onCancelClick);
document.addEventListener ('keydown', onPictureEscPress);

var imageInput = document.querySelector('.img-upload__input');
var imageEditPopup = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('.img-upload__cancel');
var form = document.querySelector('form');
var imagePreview = document.querySelector('.img-upload__preview img');
var effectItem = document.querySelector('.effects__item');
var effectList = document.querySelector('.effects__list');
var effectLevelValue = document.querySelector('.effect-level__value').value;
var effectLevelPin = document.querySelector('.effect-level__pin');

console.log (chrome)
/*---!!!!!!-----*/
imageEditPopup.classList.remove('hidden');
/*----!!!!!!!!!----*/

var onInputChange = function () {
  imageEditPopup.classList.remove('hidden');
}

var onUploadCancelClick = function () {
  imageEditPopup.classList.add('hidden');
  form.reset();
}

var onEditPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    imageEditPopup.classList.add('hidden');
    form.reset();
  };
};

var onEffectChgange = function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    imagePreview.classList.remove('effects__preview--none');
    imagePreview.classList.remove('effects__preview--chrome');
    imagePreview.classList.remove('effects__preview--sepia');
    imagePreview.classList.remove('effects__preview--marvin');
    imagePreview.classList.remove('effects__preview--phobos');
    imagePreview.classList.remove('effects__preview--heat');
    imagePreview.classList.add('effects__preview--' + evt.target.value);
  }
}

var chrome = document.querySelector('.effects__preview--chrome');
var sepia = document.querySelector('.effects__preview--sepia');
var marvin = document.querySelector('.effects__preview--marvin');
var phobos = document.querySelector('.effects__preview--phobos');
var heat = document.querySelector('.effects__preview--heat');
var original = document.querySelector('.effects__preview--none');


var onLevelPinMouseUp = function () {
  /*chrome.style.grayscale = effectLevelValue/100;
  sepia.style.sepia = effectLevelValue/100;
  marvin.style.invert = effectLevelValue + '%';
  phobos.style.blur = 3*effectLevelValue/100 + 'px';
  heat.style.brightness = 3*effectLevelValue/100;*/
  if (imagePreview.classList.contains('effects__preview--chrome')) {
    imagePreview.querySelector('.effects__preview--chrome').style.grayscale = effectLevelValue/100;
  }
}

effectLevelPin.addEventListener('mouseup', onLevelPinMouseUp);
effectList.addEventListener('change', onEffectChgange);
imageInput.addEventListener ('change', onInputChange);
uploadCancel.addEventListener ('click', onUploadCancelClick);
document.addEventListener ('keydown', onEditPopupEscPress);

/*---------scale----*/

var scalePlus = document.querySelector('.scale__control--bigger')
var scaleMinus = document.querySelector('.scale__control--smaller')
var scaleValue = document.querySelector('.scale__control--value')
scaleValue.value = '100%';

var onScalePlusClick = function () {
  if (scaleValue.value === '25%') {
    scaleValue.value = '50%';
    imagePreview.style.transform = 'scale(0.5)'
  }
  else if (scaleValue.value === '50%') {
          scaleValue.value = '75%';
          imagePreview.style.transform = 'scale(0.75)'
        }
        else if (scaleValue.value === '75%') {
                scaleValue.value = '100%';
                imagePreview.style.transform = 'scale(1)'
              }
}

var onScaleMinusClick = function () {
  if (scaleValue.value === '100%') {
    scaleValue.value = '75%';
    imagePreview.style.transform = 'scale(0.75)'
  }
  else if (scaleValue.value === '75%') {
          scaleValue.value = '50%';
          imagePreview.style.transform = 'scale(0.5)'
        }
        else if (scaleValue.value === '50%') {
                scaleValue.value = '25%';
                imagePreview.style.transform = 'scale(0.25)'
              }
}

scalePlus.addEventListener('click', onScalePlusClick);
scaleMinus.addEventListener('click', onScaleMinusClick);

/*------------Validation-----*/

var hashtagInput = document.querySelector('.text__hashtags');
var hashtagArr = [];

var onHashtagInput = function () {
  hashtagArr = hashtagInput.value.split(' ');
  for (i = 0; i < hashtagArr.length; i++){
    var tag = hashtagArr [i];
    if (tag[0] === '#') {
      console.log('ok')
      }
      else {
        console.log('try again')
        }
    }
}

hashtagInput.addEventListener('input', onHashtagInput);
hashtagInput.addEventListener('invalid', onHashtagInput);

console.log (hashtagArr);
