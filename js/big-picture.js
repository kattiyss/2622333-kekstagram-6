import { isEscapeKey } from './utils.js';
import { pictures } from './picture-list.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPic = document.querySelector('.big-picture__cancel');
const bigPicImage = bigPicture.querySelector('.big-picture__img img');
const bigPicDescription = bigPicture.querySelector('.social__caption');
const bigPicLikes = bigPicture.querySelector('.likes-count');
const bigPicComments = bigPicture.querySelector('.comments-count');
const bigPicCommentList = bigPicture.querySelector('.social__comments');
const openBigPic = document.querySelector('.pictures');
const bigPicCommentCount = document.querySelector('.social__comment-count');
const bigPicCommentLoader = document.querySelector('.comments-loader');
const mainWindow = document.body;

const onCloseBigPic = () => {
  bigPicture.classList.add('hidden');
  bigPicCommentCount.classList.remove('hidden');
  bigPicCommentLoader.classList.remove('hidden');
  mainWindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onOpenBigPic = () => {
  bigPicture.classList.remove('hidden');
  bigPicCommentCount.classList.add('hidden');
  bigPicCommentLoader.classList.add('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = comment.avatar;
  avatarImg.alt = comment.name;
  avatarImg.width = 35;
  avatarImg.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(avatarImg);
  commentElement.appendChild(textElement);

  return commentElement;
};

const renderAllComments = (comments) => {
  bigPicCommentList.innerHTML = '';
  comments.forEach((comment) => {
    bigPicCommentList.appendChild(createCommentElement(comment));
  });
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const currentThumbnails = Array.from(document.querySelectorAll('.picture'));
    const thumbnailImg = thumbnail.querySelector('.picture__img');
    const thumbnailLikes = thumbnail.querySelector('.picture__likes').textContent;
    const thumbnailComments = thumbnail.querySelector('.picture__comments').textContent;

    bigPicImage.src = thumbnailImg.src;
    bigPicDescription.textContent = thumbnailImg.alt;
    bigPicLikes.textContent = thumbnailLikes;
    bigPicComments.textContent = thumbnailComments;

    const index = currentThumbnails.indexOf(thumbnail);
    if (index !== -1) {
      renderAllComments(pictures[index].comments);
    }

    onOpenBigPic();
  }
};

closeBigPic.addEventListener('click', () => {
  onCloseBigPic();
});

openBigPic.addEventListener('click', (evt) => {
  onThumbnailClick(evt);
});

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseBigPic();
  }
}

