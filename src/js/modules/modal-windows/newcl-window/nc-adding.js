import { postNewcl } from '../../API/API.js';

import { ClientForPost } from '../modal-data-preparing.js';

import { clearForm } from '../modal-clearing.js';

import { toggleSpinnerSaveBtn } from '../../animation/spinners.js';
import { reCreateTable } from '../../DOM/DOM-table.js';

export async function createNewRow(event) {
  event.preventDefault();

  toggleSpinnerSaveBtn();

  const newcl = JSON.stringify(new ClientForPost());

  const result = await postNewcl(newcl, createNewRow);

  if (result) {
    reCreateTable();

    clearForm();
  }
}
