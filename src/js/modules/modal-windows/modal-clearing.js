import { toggleModalForm, toggleModalWindow } from './modal-showing.js';

import {
  toggleSpinnerSaveBtn,
  toggleSpinnerActionsBtn,
} from '../animation/spinners.js';

import { createNewRow } from './newcl-window/nc-adding.js';
import { changeRowClient } from './changecl-window/сс-patching.js';
import { removeRowClient } from './removecl-window/rс-deleting.js';

import { MODAL, form, saveBtn } from './modal-elements.js';

export function clearForm() {
  setTimeout(() => {
    clearInputs(form);
    clearAddbl(form);
    clearErrbl(form);
    form.classList.remove('modal__formwin_rem');
  }, 300);

  clearListeners();
  toggleModalWindow(false);
  toggleModalForm(false);
  toggleSpinnerSaveBtn(false);

  toggleSpinnerActionsBtn('change', false);
  toggleSpinnerActionsBtn('remove', false);
}

function clearListeners() {
  [createNewRow, changeRowClient, removeRowClient].forEach((hanlder) => {
    saveBtn.removeEventListener('click', hanlder, { once: true });
  });
}

function clearInputs(form) {
  const inputs = form.querySelectorAll('.' + MODAL + '__input');
  inputs.forEach((input) => {
    input.value = '';
    input.classList.remove('just-validate-error-field', 'error-input');

    const inputblock = input.parentElement;

    inputblock
      .querySelector('.' + MODAL + '__label')
      .classList.remove(MODAL + '__label_active');

    const errorLabel = inputblock.querySelector('.just-validate-error-label');

    if (errorLabel) errorLabel.remove();
  });
}

function clearAddbl(form) {
  const addbl = form.querySelector('.addbl');
  addbl.classList.remove('addbl_active');
  addbl.querySelectorAll('.addbl__item').forEach((item) => {
    item.remove();
  });
}

function clearErrbl(form) {
  const errorbl = form.querySelector('.errorbl');
  errorbl.className = MODAL + '__errorbl errorbl';
  let errors = errorbl.children;
  while (errors.length) {
    const i = errors.length - 1;
    errors[i].remove();
  }
}
