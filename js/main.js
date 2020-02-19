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
/*---------Создание массива фотографий */
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
createPhotoElement();
/*---------Вставляем фото в разметку-------------*/
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

/*-----Открытие картинки в большом формате------*/

var bigPicture = document.querySelector ('.big-picture');
var socialComments = bigPicture.querySelector ('.social__comments')
var firstPicture = photoElementsArr[0];

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

/*------------Обработка событий------------*/
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var pictureCards = document.querySelector('.pictures');
console.log (pictureCards);
var onPictureEscPress = function (evt) {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
  };
};

var onPictureClick = function (evt) {
  evt.preventDefault();
  console.log (evt.target);
  if (evt.target && evt.target.matches('.picture__img')){
    bigPicture.classList.remove('hidden');
    commentCounter.classList.add('hidden');
    commentLoader.classList.add('hidden');
    pageBody.classList.add('modal-open');
  }
}

var onCancelClick = function () {
  bigPicture.classList.add('hidden');
  commentCounter.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  pageBody.classList.remove('modal-open');
};

pictureCards.addEventListener ('click', onPictureClick);

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

var onInputChange = function () {
  imageEditPopup.classList.remove('hidden');
  scaleValue.value = '100%';
  imagePreview.style.transform = 'scale(1)'
}

var onUploadCancelClick = function () {
  imageEditPopup.classList.add('hidden');
  imagePreview.classList.remove('effects__preview--none');
  imagePreview.classList.remove('effects__preview--chrome');
  imagePreview.classList.remove('effects__preview--sepia');
  imagePreview.classList.remove('effects__preview--marvin');
  imagePreview.classList.remove('effects__preview--phobos');
  imagePreview.classList.remove('effects__preview--heat');
  uploadForm.reset();
}

var onEditPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    imageEditPopup.classList.add('hidden');
    imagePreview.classList.remove('effects__preview--none');
    imagePreview.classList.remove('effects__preview--chrome');
    imagePreview.classList.remove('effects__preview--sepia');
    imagePreview.classList.remove('effects__preview--marvin');
    imagePreview.classList.remove('effects__preview--phobos');
    imagePreview.classList.remove('effects__preview--heat');
  };
};

var onEffectChgange = function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    imagePreview.style.filter = '';
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
  if (imagePreview.classList.contains('effects__preview--chrome')) {
    imagePreview.style.filter = 'grayscale(' + effectLevelValue/100 + ')';
  }
  else if (imagePreview.classList.contains('effects__preview--sepia')) {
    imagePreview.style.filter = 'sepia(' + effectLevelValue/100 + ')';
  }
  else if (imagePreview.classList.contains('effects__preview--marvin')) {
    imagePreview.style.filter = 'invert(' + effectLevelValue + '%)';
  }
  else if (imagePreview.classList.contains('effects__preview--phobos')) {
    imagePreview.style.filter = 'blur(' + 3*effectLevelValue/100 + 'px)';
  }
  else if (imagePreview.classList.contains('effects__preview--heat')) {
    imagePreview.style.filter = 'brightness(' + 3*effectLevelValue/100 + ')';
  }
}

effectLevelPin.addEventListener('mouseup', onLevelPinMouseUp);
effectList.addEventListener('change', onEffectChgange);
imageInput.addEventListener ('change', onInputChange);
uploadCancel.addEventListener ('click', onUploadCancelClick);
document.addEventListener ('keydown', onEditPopupEscPress);

/*---------Изменените размера изображения----*/

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

/*------------Валидация-----*/

var hashtagInput = document.querySelector('.text__hashtags');
var hashtagArr = [];
var uploadBtn = document.querySelector ('.img-upload__submit');
var uploadForm = document.querySelector ('.img-upload__form')

var onUploadBtnSubmit = function (evt) {
  hashtagArr = [];
  hashtagInput.setCustomValidity ('')
  hashtagArr = hashtagInput.value.split(' ');
  var ifItValid = true;
  var hashtagArrLow = [];
  var getLow = function () {
    for ( var j = 0; j < hashtagArr.length; j++) {
      var itmLow = hashtagArr[j].toLowerCase();
      hashtagArrLow.push (itmLow);
    }
    return hashtagArrLow;
  }
  console.log(getLow());
  for (i = 0; i < hashtagArr.length; i++){
    var tag = hashtagArrLow [i];
    if (tag[0] != '#') {
      ifItValid = false;
      hashtagInput.setCustomValidity ('Хэштег должен начинаться с "#"');
    }
    else if (tag.length < 2 || tag.length >20) {
      ifItValid = false;
      hashtagInput.setCustomValidity ('Хэштег должен содержать от 2-х до 20-ти символов');
    }
    else if (hashtagArr.length > 5) {
      ifItValid = false;
      hashtagInput.setCustomValidity ('Нельзя добавить более пяти хэштегов');
    }
    else if (!tag.match(/^[#]+[0-9a-zA-ZА-Яа-яЁё\s]+$/)) {
      ifItValid = false;
      hashtagInput.setCustomValidity ('Запрещенный символ');
    }
    else if (tag == hashtagArrLow[i - 1] || tag == hashtagArrLow[i - 2] ||tag == hashtagArrLow[i - 3] ||tag == hashtagArrLow[i - 4] ||tag == hashtagArrLow[i - 5]) {
      evt.preventDefault();
      hashtagInput.setCustomValidity ('Хэштеги не должны повторяться');
    }
    else if (ifItValid == false) {
      evt.preventDefault();
      return false;
    }
  }
}
uploadForm.addEventListener('submit', onUploadBtnSubmit);
hashtagInput.addEventListener ('input', onUploadBtnSubmit);
