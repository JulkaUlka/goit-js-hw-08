import throttle from 'lodash.throttle';

import localStorageService from './localStorage.js';

const feedbackFormEl = document.querySelector('.feedback-form');
const userInfo = {};

const fillFeedbackFormFields = () => {
  const userInfoFromLS = localStorageService.load('userData');

  if (userInfoFromLS === undefined) {
    return;
  }

  for (const prop in userInfoFromLS) {
    feedbackFormEl.elements[prop].value = userInfoFromLS[prop];
  }
};

fillFeedbackFormFields();

const onFeedbackFormFieldChange = event => {
  const { target } = event;

  const fieldValue = target.value;
  const fieldName = target.name;

  userInfo[fieldName] = fieldValue;

  localStorageService.save('userData', userInfo);
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const myFormData = new FormData(event.target);

  const formDataObj = Object.fromEntries(myFormData.entries());
  console.log(formDataObj);

  feedbackFormEl.reset();
  localStorageService.remove('userData');
};

const onFeedbackFormFieldLS = throttle(onFeedbackFormFieldChange, 500);

feedbackFormEl.addEventListener('input', onFeedbackFormFieldLS);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
