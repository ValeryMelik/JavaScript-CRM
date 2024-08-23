
import {
  MODAL,
  form,
  inputSurname,
  inputName,
  inputLastname,
  saveBtn,
  errorbl,
} from './modal-elements.js';

import JustValidate from 'just-validate';

export const validation = new JustValidate(form, {
  validateBeforeSubmitting: true,
  focusInvalidField: false,
});

validation
  .addField(inputSurname, [
    {
      rule: 'customRegexp',
      value: /^[-\sA-zА-яЁё]{2,}$/i,
      errorMessage: 'Ошибка: фамилия введена некорректно!',
    },
    {
      rule: 'required',
      errorMessage: 'Ошибка: поле "Фамилия" обязательно для заполнения!',
    },
  ])
  .addField(inputName, [
    {
      rule: 'customRegexp',
      value: /^[-\sA-zА-яЁё]{2,}$/gi,
      errorMessage: 'Ошибка: имя введено некорректно!',
    },
    {
      rule: 'required',
      errorMessage: 'Ошибка: поле "Имя" обязательно для заполнения!',
    },
  ])
  .addField(inputLastname, [
    {
      rule: 'customRegexp',
      value: /^[-\sA-zА-яЁё]{2,}$/gi,
      errorMessage: 'Ошибка: отчество введено некорректно!',
    },
  ]);

const JUST_VALIDATE_ERROR_LABEL = '.just-validate-error-label';
const ERRORBL__MESSAGE = 'errorbl__message';
const ERRORBL_LENGTHEN = 'errorbl_lengthen';

let checkingTimer;
export function checkForm(event) {
  clearTimeout(checkingTimer);

  checkingTimer = setTimeout(() => {
    const error = event.target.parentNode.querySelector(
      JUST_VALIDATE_ERROR_LABEL
    );
    const input = event.target;

    const name = event.target.dataset.name || 'contact';

    if (error) {
      if (checkErrorsDuplicate(error)) showErrorMessage(error, name);
      input.classList.add('error-input');
    } else {
      hideErrorMessage(name);
      input.classList.remove('error-input');
    }
  }, 300);
  checkValidation();
}

function showErrorMessage(error, name) {
  const errorMessage = document.createElement('div');

  errorMessage.className =
    `unvisible ${ERRORBL__MESSAGE} ${ERRORBL__MESSAGE}_hidden ${ERRORBL__MESSAGE}_` +
    name;
  errorMessage.textContent = error.textContent;

  const sameError = errorbl.querySelector(`.${ERRORBL__MESSAGE}_` + name);

  if (sameError) sameError.remove();
  else addLengten();

  errorbl.append(errorMessage);
  setTimeout(() => {
    errorMessage.classList.remove('unvisible', `${ERRORBL__MESSAGE}_hidden`);
  }, 100);
}

export function hideErrorMessage(name) {
  const errorMessage = errorbl.querySelector(`.${ERRORBL__MESSAGE}_` + name);

  if (name === 'contact') if (checkContactsDuplicates()) return;

  if (errorMessage) {
    errorMessage.classList.add('unvisible');
    setTimeout(() => {
      errorMessage.remove();
    }, 200);
    removeLengten();
  }
}

export function checkValidation() {
  const inputArr = document.querySelectorAll('.' + MODAL + ' input');

  const condition1 = Array.prototype.some.call(inputArr, (input) =>
    input.dataset.name === 'lastName' ? false : input.value === ''
  );

  setTimeout(() => {
    const condition2 = !!document.querySelector(JUST_VALIDATE_ERROR_LABEL);

    saveBtn.disabled = condition1 || condition2;
  }, 0);
}

function checkErrorsDuplicate(error) {
  const errorArr = errorbl.querySelectorAll('.' + ERRORBL__MESSAGE);

  return !Array.prototype.some.call(
    errorArr,
    (err) => err.textContent === error.textContent
  );
}

function checkContactsDuplicates() {
  const errorLabelArr = document.querySelectorAll(JUST_VALIDATE_ERROR_LABEL);
  let i = 0;

  errorLabelArr.forEach((err) => {
    if (err.textContent === 'Ошибка: заполните поля контактов!') i++;
  });

  return i > 0;
}

function addLengten() {
  if (errorbl.classList.contains(ERRORBL_LENGTHEN + '-3'))
    errorbl.classList.add(ERRORBL_LENGTHEN + '-4');
  else if (errorbl.classList.contains(ERRORBL_LENGTHEN + '-2'))
    errorbl.classList.add(ERRORBL_LENGTHEN + '-3');
  else if (errorbl.classList.contains(ERRORBL_LENGTHEN + '-1'))
    errorbl.classList.add(ERRORBL_LENGTHEN + '-2');
  else errorbl.classList.add(ERRORBL_LENGTHEN + '-1');
}

function removeLengten() {
  if (errorbl.classList.contains(ERRORBL_LENGTHEN + '-4'))
    errorbl.classList.remove(ERRORBL_LENGTHEN + '-4');
  else if (errorbl.classList.contains(ERRORBL_LENGTHEN + '-3'))
    errorbl.classList.remove(ERRORBL_LENGTHEN + '-3');
  else if (errorbl.classList.contains(ERRORBL_LENGTHEN + '-2'))
    errorbl.classList.remove(ERRORBL_LENGTHEN + '-2');
  else errorbl.classList.remove(ERRORBL_LENGTHEN + '-1');
}
