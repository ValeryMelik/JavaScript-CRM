import { saveBtn } from '../modal-windows/modal-elements';

export function toggleSpinnerSaveBtn(condition = true) {
  saveBtn.classList.toggle('prmbl__sbtn_active', condition);
  toggleSpinner(saveBtn, condition);
}

export function toggleSpinnerActionsBtn(BTN, condition = true) {
  const row = document.getElementById(saveBtn.dataset.id);

  if (row) {
    const spinnerBtn = row.querySelector('.actions__btn_' + BTN);

    spinnerBtn.classList.toggle('actions__btn_active', condition);
    toggleSpinner(spinnerBtn, condition);
  }
}

function toggleSpinner(elem, condition) {
  elem.querySelector('.spinner').classList.toggle('spinner_active', condition);
}
