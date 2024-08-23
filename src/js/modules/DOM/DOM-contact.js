import { el, h, setChildren } from 'redom';
import { validation, checkForm } from '../modal-windows/modal-validation.js';

import {
  addContactBlock,
  list,
  form,
  addContactBtn,
} from '../modal-windows/modal-elements.js';
import { hideErrorMessage } from '../modal-windows/modal-validation.js';

import Inputmask from 'inputmask';

const DIV = 'div';

const SELECT_CLS = 'select_active';
let zIndex = 25;
if (zIndex < 5) zIndex = 25;

export function createContactDOM() {
  const selectHeader = el(DIV, {
    class: 'select__header',
    onclick: selectHeaderFunc,
  });

  const selectCurrent = el('span', { class: 'select__current' });
  setChildren(selectHeader, selectCurrent);
  selectHeader.innerHTML =
    selectHeader.innerHTML +
    `<svg class="svg-reset select__arr2svg"><use xlink:href="img/sprite.svg#arr2svg"></use></svg>`;

  const selectBody = el(DIV, { class: 'select__body' });
  const selectPhone = el(DIV, 'Телефон', {
    ['data-name']: 'phone',
    class: 'select__item',
  });
  const selectEmail = el(DIV, 'Email', {
    ['data-name']: 'email',
    class: 'select__item',
  });
  const selectVk = el(DIV, 'Vk', {
    ['data-name']: 'vk',
    class: 'select__item',
  });
  const selectFb = el(DIV, 'Facebook', {
    ['data-name']: 'fb',
    class: 'select__item',
  });
  const selectOther = el(DIV, 'Другое', {
    ['data-name']: 'other',
    class: 'select__item',
  });
  [selectPhone, selectEmail, selectVk, selectFb, selectOther].forEach(
    (item) => {
      item.addEventListener('click', selectChoose);
    }
  );
  setChildren(selectBody, [
    selectPhone,
    selectEmail,
    selectVk,
    selectFb,
    selectOther,
  ]);

  const selectBlock = el(DIV, { class: 'addbl__select select' });
  selectBlock.style = `z-index: ${zIndex--}`;
  setChildren(selectBlock, [selectHeader, selectBody]);

  const input = el('input', {
    type: 'text',
    placeholder: 'Введите данные контакта',
    class: 'addbl__input',
    oninput: checkForm,
  });

  const btn = el('button', {
    type: 'button',
    class: 'btn-reset addbl__remove tooltip',
    onclick: removeContactDOM,
  });

  const tooltipText = el(DIV, 'Удалить контакт', { class: 'tooltip__text' });
  tooltipText.innerHTML =
    tooltipText.innerHTML +
    `<svg class="svg-reset tooltip__rectanglesvg"><use xlink:href="img/sprite.svg#rectanglesvg"></use></svg>`;
  setChildren(btn, tooltipText);

  btn.innerHTML =
    btn.innerHTML +
    `<svg class="svg-reset addbl__removesvg"><use xlink:href="img/sprite.svg#removesvg"></use></svg>`;

  const item = el('li', { class: 'addbl__item' });
  setChildren(item, [selectBlock, input, btn]);

  return item;
}

function selectHeaderFunc(event) {
  event._isClick = true;

  if (this.parentElement.classList.contains(SELECT_CLS)) removeActiveCls();
  else {
    removeActiveCls();
    this.parentElement.classList.add(SELECT_CLS);
  }
}

export function removeActiveCls() {
  document.querySelectorAll('.addbl__select').forEach((select) => {
    select.classList.remove(SELECT_CLS);
  });
}

function selectChoose(event) {
  event._isClick = true;

  const select = event.target.closest('.select');

  const current = select.querySelector('.select__current');
  current.textContent = event.target.textContent;

  const input = select.parentElement.querySelector('.addbl__input');
  defineMask(event.target, input);

  select.classList.remove(SELECT_CLS);

  select.querySelectorAll('.select__item').forEach((item) => {
    item.classList.remove('select__item_selected');
  });
  event.target.classList.add('select__item_selected');
}

function removeContactDOM(event) {
  addFormScroll();

  const item = this.parentElement;

  if (list.querySelectorAll('.addbl__item').length === 1)
    addContactBlock.classList.remove('addbl_active');
  item.remove();

  setTimeout(() => {
    checkForm(event);

    setTimeout(() => {
      if (!document.querySelectorAll('.just-validate-error-label').lenght)
        hideErrorMessage('contact');
    }, 300);
  }, 0);
}

export function addFormScroll() {
  setTimeout(() => {
    form.classList.toggle('extended', form.offsetHeight >= 500);
    addContactBtn.disabled =
      document.querySelector('.addbl__list').children.length >= 10;
  });
}

export function defineMask(item, input) {
  input.value = '';

  let inputMask = null;

  switch (item.dataset.name) {
    case 'phone':
      inputMask = new Inputmask('+7 (999) 999-99-99');
      validation.addField(input, [
        {
          rule: 'customRegexp',
          value: /\+7\s\(\d\d\d\)\s\d\d\d\-\d\d\-\d\d/gi,
          errorMessage: 'Ошибка: заполните поля контактов!',
        },
        {
          rule: 'required',
          errorMessage: 'Ошибка: заполните поля контактов!',
        },
      ]);
      input.addEventListener('input', checkForm);
      break;
    case 'email':
      inputMask = new Inputmask('email');
      validation.addField(input, [
        {
          rule: 'email',
          errorMessage: 'Ошибка: заполните поля контактов!',
        },
        {
          rule: 'required',
          errorMessage: 'Ошибка: заполните поля контактов!',
        },
      ]);
      break;
    case 'vk':
      inputMask = new Inputmask('vk.com/*{1,30}');
      validation.addField(input, [
        {
          rule: 'required',
          errorMessage: 'Ошибка: заполните поля контактов!',
        },
      ]);
      break;
    case 'fb':
      inputMask = new Inputmask('fb.com/*{1,30}');
      validation.addField(input, [
        {
          rule: 'required',
          errorMessage: 'Ошибка: заполните поля контактов!',
        },
      ]);
      break;
    case 'other':
      validation.addField(input, [
        {
          rule: 'required',
          errorMessage: 'Ошибка: заполните поля контактов!',
        },
      ]);
      if (input.inputmask) input.inputmask.remove();
      return;
  }

  inputMask.mask(input);
}
