import { clearForm } from '../modal-clearing.js';

import {
  title,
  addClientBtn,
  addContactBtn,
  saveBtn,
  cancelBtn,
  capture,
} from '../modal-elements.js';
import { toggleModalForm, toggleModalWindow } from '../modal-showing.js';
import { createNewRow } from './nc-adding.js';

addClientBtn.addEventListener('click', () => {
  saveBtn.addEventListener('click', createNewRow, { once: true });
  cancelBtn.addEventListener('click', clearForm, { once: true });

  title.innerHTML = 'Новый клиент';
  capture.textContent = 'Cохранить';
  saveBtn.dataset.id = null;
  cancelBtn.textContent = 'Отмена';
  addContactBtn.disabled = false;

  toggleModalWindow();
  toggleModalForm();
});
