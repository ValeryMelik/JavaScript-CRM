import {
  MODAL,
  modalWindow,
  form,
  saveBtn,
  cancelBtn,
  capture,
} from '../modal-elements.js';

import { clearForm } from '../modal-clearing.js';

import { changeRowClient } from '../changecl-window/сс-patching.js';

import { toggleModalForm, toggleModalWindow } from '../modal-showing.js';

import { removeRowClient } from './rс-deleting.js';
import { toggleSpinnerActionsBtn } from '../../animation/spinners.js';

export function removeClientInfo(event) {
  saveBtn.removeEventListener('click', changeRowClient, { once: true });
  saveBtn.addEventListener('click', removeRowClient, { once: true });
  cancelBtn.addEventListener('click', clearForm, { once: true });

  saveBtn.disabled = false;

  form.classList.add(MODAL + '__formwin_rem');

  if (!modalWindow.classList.contains(MODAL + '_active')) {
    toggleModalWindow();
    toggleModalForm();
  }

  capture.textContent = 'Удалить';
  cancelBtn.textContent = 'Отмена';

  const row = event.target.closest('.tbody__row');
  if (row) {
    const id = row.querySelector('.tbody__id').textContent;
    saveBtn.dataset.id = id;
  }

  toggleSpinnerActionsBtn('change', false);
  toggleSpinnerActionsBtn('remove');
}
