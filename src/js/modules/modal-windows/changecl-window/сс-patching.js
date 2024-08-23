import { patchClient } from '../../API/API.js';

import { saveBtn } from '../modal-elements.js';

import { ClientForPost } from '../modal-data-preparing.js';

import { clearForm } from '../modal-clearing.js';

import { toggleSpinnerSaveBtn } from '../../animation/spinners.js';

import { reCreateTable } from '../../DOM/DOM-table.js';

export async function changeRowClient(event) {
  event.preventDefault();

  toggleSpinnerSaveBtn();

  const id = saveBtn.dataset.id;

  const changecl = JSON.stringify(new ClientForPost());

  const result = await patchClient(id, changecl, changeRowClient);

  if (result) {
    reCreateTable();

    clearForm();
  }
}
