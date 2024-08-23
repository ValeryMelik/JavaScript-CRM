import {
  addContactBlock,
  addContactBtn,
  list,
} from './modal-elements.js';

import { checkValidation } from './modal-validation.js';

import {
  addFormScroll,
  createContactDOM,
  defineMask,
} from '../DOM/DOM-contact.js';

addContactBtn.addEventListener('click', addContactField);

export function addContactField(event, type = 'phone', value = '') {
  addContactBlock.classList.add('addbl_active');

  addFormScroll();

  const item = createContactDOM();

  const select = item.querySelector(`[data-name="${type}"]`);
  const selectCapture = item.querySelector('.select__current');
  selectCapture.textContent = select.textContent;
  select.classList.add('select__item_selected');

  const input = item.querySelector('input');
  defineMask(select, input);
  input.value = value;

  list.append(item);

  checkValidation();

  setTimeout(() => {
    item.classList.add('addbl__item_show');
  }, 100);
}
