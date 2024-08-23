import { saveBtn } from '../modal-elements.js';

import { removeClient } from '../../API/API.js';

import { clearForm } from '../modal-clearing.js';

import { toggleSpinnerSaveBtn } from '../../animation/spinners.js';
import { reCreateTable } from '../../DOM/DOM-table.js';

export async function removeRowClient(event) {
  event.preventDefault();

  toggleSpinnerSaveBtn();

  const id = saveBtn.dataset.id;

  const result = await removeClient(id, removeRowClient);

  if (result) {
    reCreateTable();

    clearForm();
    saveBtn.disabled = true;
  }
}
