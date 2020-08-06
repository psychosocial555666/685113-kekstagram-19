'use strict';

// Создаем необходимые константы для генерации моковых данных.

var FIRST_AVATAR = 1;
var LAST_AVATAR = 6;
var MIN_LIKES_NUMBER = 15;
var MAX_LIKES_NUMBER = 200;
var MIN_COMMENTS_LENGTH = 0;
var MAX_COMMENTS_LENGTH = 5;
var USER_PHOTOS_LENGTH = 25;

var COMMENT_AUTOR = [
  'Артем',
  'Андрей',
  'Лиза',
  'Юлия',
  'Владимир',
  'Кекс'];

var COMMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTO_DESCRIPTIONS = [
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  '#fun #party #cool #young',
  'Отдыхаем... #chill #relax #group #photo',
  'Will you still love me when Im no longer young and beautiful? (c) Ленин',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать...'
];

// Создаем неоходимые переменные.

var projectBody = document.querySelector('body');
var photosContainer = projectBody.querySelector('.pictures');

// Создаем вспомогательные утилитарные функции.

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomItemFromArray(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function showElement(elem) {
  return elem.classList.remove('hidden');
}

function hideElement(elem) {
  return elem.classList.add('hidden');
}

// Описываем функции для создания моковых данных.

function createComments(from, to) {
  var comments = [];
  var randomCommentsLength = getRandomNumber(from, to - 1);
  for (var i = from; i <= randomCommentsLength; i++) {
    var randomComment = {
      avatar: 'img/avatar-' + getRandomNumber(FIRST_AVATAR, LAST_AVATAR) + '.svg',
      message: getRandomItemFromArray(COMMENT_TEXT),
      name: getRandomItemFromArray(COMMENT_AUTOR),
    };
    comments.push(randomComment);
  }
  return comments;
}

function createUsersPhotos(userPhotosLength) {
  var usersPhotos = [];
  for (var i = 1; i <= userPhotosLength; i++) {
    var userPhoto = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
      comments: createComments(MIN_COMMENTS_LENGTH, MAX_COMMENTS_LENGTH),
      description: getRandomItemFromArray(PHOTO_DESCRIPTIONS),
    };
    usersPhotos.push(userPhoto);
  }
  return usersPhotos;
}

// Описываем функции для создания DOM-узлов.

function createPhotoElement(photoData) {
  var photoItem = document.querySelector('#picture').content.cloneNode(true);
  var photoImage = photoItem.querySelector('.picture__img');
  var photoLikes = photoItem.querySelector('.picture__likes');
  var photoComments = photoItem.querySelector('.picture__comments');

  photoImage.src = photoData.url;
  photoLikes.textContent = photoData.likes;
  photoComments.textContent = photoData.comments.length;

  return photoItem;
}

function createCommentsListElement(comment) {
  var newComment = document.createElement('li');
  newComment.className = 'social__comment';

  var commentImage = document.createElement('img');
  commentImage.className = 'social__picture';
  commentImage.src = comment.avatar;
  commentImage.alt = comment.autor;
  commentImage.style.width = '35px';
  commentImage.style.height = '35px';
  newComment.appendChild(commentImage);

  var commentText = document.createElement('p');
  commentText.className = 'social__text';
  newComment.appendChild(commentText);

  var textNode = document.createTextNode(comment.message);
  commentText.appendChild(textNode);

  return newComment;
}

// Описываем функции для отрисовки полученных узлов в DOM-дерево. Используем "createDocumentFragment"
// чтобы применить изменения точечно и только один раз.

function renderPhotos(photoArray, container) {
  var fragment = document.createDocumentFragment();

  photoArray.forEach(function (item) {
    var photoItem = createPhotoElement(item);
    fragment.appendChild(photoItem);
  });

  container.appendChild(fragment);
}

function renderComments(commentsArray, container) {
  var fragment = document.createDocumentFragment();

  commentsArray.forEach(function (item) {
    var commentItem = createCommentsListElement(item);
    fragment.appendChild(commentItem);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
}

// Описываеем функцию отображения попапа. Функция принимает на вход элемент из массива моковых данных,
// созданного нами ранее и отрисовывает попап с учетом входных данных.

function showBigPhotoPopup(elem) {

  var photoPopupElement = projectBody.querySelector('.big-picture');

  var popupImage = photoPopupElement.querySelector('.big-picture__img img');
  var popupLikes = photoPopupElement.querySelector('.likes-count');
  var popupCommentsCount = photoPopupElement.querySelector('.comments-count');
  var popupCommentsList = photoPopupElement.querySelector('.social__comments');
  var popupDescription = photoPopupElement.querySelector('.social__caption');
  var popupSocialCommentCount = photoPopupElement.querySelector('.social__comment-count');
  var popupCommentsLoader = photoPopupElement.querySelector('.comments-loader');

  popupImage.src = elem.url;
  popupLikes.textContent = elem.likes;
  popupCommentsCount.textContent = elem.comments.length;
  popupDescription.textContent = elem.description;

  renderComments(elem.comments, popupCommentsList);

  hideElement(popupSocialCommentCount);
  hideElement(popupCommentsLoader);
  projectBody.classList.add('modal-open');

  showElement(photoPopupElement);
}

// Когда все узлы созданы и готовы к отрисовке, опишем функцию, которая встроит узлы в
// DOM(снова все изменения происходят точечно)...

function renderScreenWithData() {
  var usersPhotosData = createUsersPhotos(USER_PHOTOS_LENGTH);
  renderPhotos(usersPhotosData, photosContainer);
  showBigPhotoPopup(usersPhotosData[0]);
}

// ...и применим ее.

renderScreenWithData();

