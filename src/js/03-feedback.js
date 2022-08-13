import throttle from 'lodash.throttle';

const email = document.querySelector('[type="email"]');
const textarea = document.querySelector('[name="message"]');
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

showFormData();

form.addEventListener('input', throttle(onFormInput, 1000));

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  JSON.parse(localStorage.getItem(STORAGE_KEY));

  localStorage.removeItem(STORAGE_KEY);
}

function showFormData() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    textarea.value = savedMessage['message'] || '';
    email.value = savedMessage['email'] || '';
  }
}
