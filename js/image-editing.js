import { isEscapeKey } from './utils.js';
import { resetFormValidation, initFormValidation } from './form-validation.js';

const imageUploading = document.querySelector('.img-upload__input');
const imageEditor = document.querySelector('.img-upload__overlay');
const mainWindow = document.body;
const closeEditor = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
document.activeElement === commentField;

const closeImageEditor = () => {
  form.reset();
  imageUploading.value = '';
  mainWindow.classList.remove('modal-open');
  imageEditor.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetFormValidation();
};

const openImageEditor = () => {
  imageEditor.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initFormValidation();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeImageEditor();
  }
}

imageUploading.addEventListener('change', openImageEditor);
closeEditor.addEventListener('click', closeImageEditor);
