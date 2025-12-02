const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_PATTERN: 'Хэштег должен начинаться с # и содержать не более 20 символов',
  INVALID_COUNT: `Не более ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_COMMENT: `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
};

const ValidatorPriority = {
  PATTERN: 1,
  INVALID_COUNT: 2,
  UNIQUENESS: 3,
  COMMENT: 1
};

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const normalizeHashtags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidHashtags = (value) =>
  normalizeHashtags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) =>
  normalizeHashtags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueHashtags = (value) => {
  const lowerCaseTags = normalizeHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  hasValidHashtags,
  ErrorText.INVALID_PATTERN,
  ValidatorPriority.PATTERN,
  true
);

pristine.addValidator(
  hashtagInput,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  ValidatorPriority.COUNT,
  true
);

pristine.addValidator(
  hashtagInput,
  hasUniqueHashtags,
  ErrorText.NOT_UNIQUE,
  ValidatorPriority.UNIQUENESS,
  true
);

pristine.addValidator(
  commentInput,
  hasValidComment,
  ErrorText.INVALID_COMMENT,
  ValidatorPriority.COMMENT,
  true
);

const onFormSubmit = (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
};

const onHashtagInput = () => {
  pristine.validate(hashtagInput);
};

const onCommentInput = () => {
  pristine.validate(commentInput);
};

const initFormValidation = () => {
  form.addEventListener('submit', onFormSubmit);
  hashtagInput.addEventListener('input', onHashtagInput);
  commentInput.addEventListener('input', onCommentInput);
};

const resetFormValidation = () => {
  pristine.reset();
};

export { resetFormValidation, initFormValidation };
