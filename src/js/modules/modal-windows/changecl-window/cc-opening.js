import { el, setChildren } from 'redom';

import {
  title,
  inputSurname,
  inputName,
  inputLastname,
  saveBtn,
  cancelBtn,
  capture,
  addContactBtn,
} from '../modal-elements.js';

import { toggleModalForm, toggleModalWindow } from '../modal-showing.js';

import { toggleSpinnerActionsBtn } from '../../animation/spinners.js';

import { clearForm } from '../modal-clearing.js';

import { animateLabels } from '../../animation/move-labels.js';
import { addContactField } from '../modal-contact-adding.js';
import { changeRowClient } from './сс-patching.js';
import { removeClientInfo } from '../removecl-window/rc-opening.js';

export function changeClientInfo(event) {
  saveBtn.addEventListener('click', changeRowClient, { once: true });
  cancelBtn.removeEventListener('click', clearForm, { once: true });
  cancelBtn.addEventListener('click', removeClientInfo, { once: true });

  const row = event.target.closest('.tbody__row');

  const id = row.querySelector('.tbody__id').textContent;
  const idElem = el('span', `ID: ${id}`, { class: 'modal__id' });
  setChildren(title, idElem);

  const SNL = row.querySelectorAll('.tbody__SNL');
  const [surname, name, lastName] = SNL;

  const contacts = reparseContacts(row);
  contacts.forEach(({ type, value }) => {
    addContactField(event, type, value);
  });

  saveBtn.disabled = true;

  title.innerHTML = 'Изменить данные ' + title.innerHTML;
  inputSurname.value = surname.textContent;
  inputName.value = name.textContent;
  inputLastname.value = lastName.textContent;
  capture.textContent = 'Cохранить';
  saveBtn.dataset.id = id;
  cancelBtn.textContent = 'Удалить клиента';
  addContactBtn.disabled = false;

  toggleSpinnerActionsBtn('change');
  animateLabels();
  toggleModalWindow();
  toggleModalForm();
}

function reparseContacts(row) {
  const contacts = row.querySelectorAll('.tooltip__link');

  return Array.prototype.map.call(contacts, (contact) => ({
    type: contact.dataset.name,
    value: contact.textContent,
  }));
}
