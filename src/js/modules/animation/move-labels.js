import { MODAL } from '../modal-windows/modal-elements.js';

export function animateLabels() {
  const inpblArr = document.querySelectorAll('.' + MODAL + '__inpbl');

  inpblArr.forEach((block) => {
    moveLabels(block);
  });
}

function moveLabels(block) {
  const INPUT = '.' + MODAL + '__input';
  const LABEL = '.' + MODAL + '__label';
  const RFGSTAR = '.' + MODAL + '__rfstar';

  const LABEL_CLS = MODAL + '__label_active';
  const RFSTAR_CLS = MODAL + '__rfstar_active';

  const input = block.querySelector(INPUT);
  const label = input.parentNode.querySelector(LABEL);
  const rfstarEl = input.parentNode.querySelector(RFGSTAR);

  if (input.value) {
    label.classList.add(LABEL_CLS);
    if (rfstarEl) rfstarEl.classList.add(RFSTAR_CLS);
  }

  input.addEventListener('focus', () => {
    label.classList.add(LABEL_CLS);
    if (rfstarEl) rfstarEl.classList.add(RFSTAR_CLS);
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      label.classList.remove(LABEL_CLS);
      if (rfstarEl) rfstarEl.classList.remove(RFSTAR_CLS);
    }
  });
}
